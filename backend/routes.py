from flask import render_template, request, redirect, url_for, session, flash, jsonify, g, make_response, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, Topic, QuizQuestion, QuizScore, ScoreHistory
from utils import evaluate_code
from datetime import datetime
import subprocess
from functools import wraps

quiz_bp = Blueprint('quiz_bp', __name__)

def get_user_by_username(uname):
    user = User.query.filter_by(uname=uname).first() 
    return user

def get_user_by_id(id):
    user = User.query.filter_by(id=id).first() 
    return user

def get_user_from_database(id):
    user = User.query.get(id) 
    if user:
        print(f"User found: {user.uname}")
        return {
            'id': user.id,
            'fname': user.fname,
            'sname': user.sname,
            'uname': user.uname,
            'email': user.email
        }
    return None


def login_required(func):
    def wrapper(*args, **kwargs):
        if not session.get("user_id") and request.endpoint not in ['login', 'register', 'static']:
            return redirect(url_for('login'))
        return func(*args, **kwargs)
    wrapper.__name__ = func.__name__
    return wrapper


def register_routes(app, db, bcrypt):

    @app.route('/')
    @login_required
    def home():
        return app.send_static_file('index.html')

    @app.route('/login', methods=['POST'])
    def login():
        if not request.is_json:
            return jsonify({"message": "Request must be JSON"}), 400

        data = request.get_json()
        uname = data.get('uname')
        pword = data.get('pword')

        if not uname or not pword:
            return jsonify({"message": "Username and password are required"}), 400

        user = get_user_by_username(uname)

        if user and bcrypt.check_password_hash(user.pword, pword):
            session["user_id"] = user.id
            print("Stored in session:", session.get("user_id"))  
            return jsonify({"id": user.id, "message": "Login successful"}), 200

        return jsonify({"message": "Invalid credentials"}), 401


    @app.route('/register', methods=['POST'])
    def register():
        if not request.is_json:
            return jsonify({"message": "Request must be JSON"}), 400

        data = request.get_json()
        fname = data.get('fname')
        sname = data.get('sname')
        email = data.get('email')
        uname = data.get('uname')
        pword = data.get('pword')

        if not all([fname, sname, email, uname, pword]):
            return jsonify({"message": "All fields are required"}), 400

        hashed_password = bcrypt.generate_password_hash(pword).decode('utf-8')
        new_user = User(fname=fname, sname=sname, email=email, uname=uname, pword=hashed_password)

        try:
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"message": "User registered successfully"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": "Error occurred while registering user", "error": str(e)}), 500

    @app.route("/logout", methods=["POST"])
    def logout():
        print("Before clearing:", dict(session)) 
        session.clear()
        print("After clearing:", dict(session)) 

        response = make_response(jsonify({"message": "Logged out"}))
        response.set_cookie("session", "", expires=0)
        return response

    
    @app.route('/profile', methods=['GET'])
    def profile():
        user_id = session.get('user_id')  
        if user_id is None:
            return 'Unauthorized', 401  
        
        user = User.query.get(user_id)
        return jsonify(user.to_dict())


    @quiz_bp.route('/<int:topic_id>', methods=['GET'])
    def get_quiz_questions(topic_id):
        topic = Topic.query.get_or_404(topic_id)
        questions = QuizQuestion.query.filter_by(topic_id=topic_id).all()
        quiz_data = [
            {
                "id": question.id,
                "question_text": question.question_text,
                "question_type": question.question_type,
                "options": question.options if question.options else None,
                "correct_answer": question.correct_answer,
                "explanation": question.explanation
            }
            for question in questions
        ]
        return jsonify(quiz_data)
    

    @quiz_bp.route('/submit', methods=['POST'])
    def submit_quiz():
        data = request.get_json()
        print("Received payload:", data)

        user_id = data['user_id']
        topic_id = data['topic_id']
        answers = data['answers'] 
        total_questions = len(answers)
        correct_answers = 0
        wrong_explanations = []

        for idx, answer in enumerate(answers):
            print("Checking answer:", answer)
            question = QuizQuestion.query.get(answer['id'])
            if not question:
                continue
            correct = question.correct_answer.strip()
            user_ans = answer['answer'].strip()

            if user_ans == correct:
                correct_answers += 1
            else:
                wrong_explanations.append({
                    "question_number": idx + 1,
                    "question": question.question_text,
                    "your_answer": user_ans,
                    "correct_answer": correct,
                    "explanation": question.explanation or "No explanation provided."
                })


        score = (correct_answers / total_questions) * 100

        quiz_score = QuizScore.query.filter_by(user_id=user_id, topic_id=topic_id).first()
        if quiz_score:
            quiz_score.most_recent_score = score
            quiz_score.highest_score = max(score, quiz_score.highest_score)
            quiz_score.lowest_score = min(score, quiz_score.lowest_score)
            quiz_score.average_score = (quiz_score.average_score * quiz_score.total_attempts + score) / (quiz_score.total_attempts + 1)
            quiz_score.total_attempts += 1
        else:
            quiz_score = QuizScore(
                user_id=user_id,
                topic_id=topic_id,
                most_recent_score=score,
                highest_score=score,
                lowest_score=score,
                average_score=score,
                total_attempts=1
            )
            db.session.add(quiz_score)

        score_history = ScoreHistory(
            user_id=user_id,
            topic_id=topic_id,
            score=score,
            date_attempted=datetime.utcnow()
        )
        db.session.add(score_history)

        db.session.commit()

        return jsonify({
            "message": "Quiz submitted successfully",
            "score": score,
            "explanations": wrong_explanations
        })



    @app.route('/user_scores/<int:user_id>', methods=['GET'])
    def get_user_scores(user_id):
        scores = QuizScore.query.filter_by(user_id=user_id).all()
        if not scores:
            return jsonify({"message": "No scores found for this user."})

        score_data = []
        for score in scores:
            score_data.append({
                "topic_id": score.topic_id,
                "most_recent_score": score.most_recent_score,
                "highest_score": score.highest_score,
                "lowest_score": score.lowest_score,
                "average_score": score.average_score,
                "total_attempts": score.total_attempts
            })

        return jsonify({"user_id": user_id, "scores": score_data})



        
    
    app.register_blueprint(quiz_bp, url_prefix='/quiz')

