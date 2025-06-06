from flask import render_template, request, redirect, url_for, session, flash, jsonify, g, make_response, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, Topic, QuizQuestion, QuizScore, ScoreHistory, UserAchievement
from utils import evaluate_code
from datetime import datetime, timedelta
from functools import wraps
from services.analytics_service import *
import re
from sqlalchemy import func
from flask_cors import cross_origin

quiz_bp = Blueprint('quiz_bp', __name__)
analytics_bp = Blueprint('analytics_bp', __name__)

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
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not session.get("user_id") and request.endpoint not in ['login', 'register', 'static']:
            if request.accept_mimetypes.accept_json or request.path.startswith("/api") or request.headers.get("X-Requested-With") == "XMLHttpRequest":
                return jsonify({"error": "Unauthorized"}), 401
            return redirect(url_for('login'))
        return func(*args, **kwargs)
    wrapper.__name__ = func.__name__
    return wrapper


# XP calculation function
def calculate_xp(score_percentage):
    if score_percentage == 100:
        return 15
    return max(1, min(10, score_percentage // 10))



def get_analytics_data(user_id):
    # Total quizzes
    total_quizzes_taken = db.session.query(ScoreHistory).filter_by(user_id=user_id).count()
    print("Total quizzes:", total_quizzes_taken)

    # Average score
    average_score = db.session.query(func.avg(ScoreHistory.score)).filter_by(user_id=user_id).scalar() or 0
    average_score = round(average_score, 2)
    print("Average score:", average_score)

    # Highest scoring topic
    highest = db.session.query(Topic.name, db.func.max(QuizScore.highest_score)) \
        .join(QuizScore, QuizScore.topic_id == Topic.id) \
        .filter(QuizScore.user_id == user_id) \
        .group_by(Topic.name) \
        .order_by(db.func.max(QuizScore.highest_score).desc()).first()

    highest_scoring_topic = {
        'name': highest[0] if highest else 'N/A',
        'score': round(highest[1], 2) if highest else 'N/A'
    }
    print("Highest scoring topic:", highest_scoring_topic)

    # Lowest scoring topic
    lowest = db.session.query(Topic.name, db.func.min(QuizScore.lowest_score)) \
        .join(QuizScore, QuizScore.topic_id == Topic.id) \
        .filter(QuizScore.user_id == user_id) \
        .group_by(Topic.name) \
        .order_by(db.func.min(QuizScore.lowest_score).asc()).first()

    lowest_scoring_topic = {
        'name': lowest[0] if lowest else 'N/A',
        'score': round(lowest[1], 2) if lowest else 'N/A'
    }
    print("Lowest scoring topic:", lowest_scoring_topic)


    # Most attempted topic
    most_attempted = db.session.query(Topic.name, func.count(ScoreHistory.id).label('attempts')) \
        .join(Topic, Topic.id == ScoreHistory.topic_id) \
        .filter(ScoreHistory.user_id == user_id) \
        .group_by(Topic.name) \
        .order_by(func.count(ScoreHistory.id).desc()) \
        .first()

    most_attempted_topic = {
        'name': most_attempted[0] if most_attempted else 'N/A',
        'attempts': most_attempted[1] if most_attempted else 0
    }
    print("Most attempted topic:", most_attempted_topic)

    # Achievements
    achievements = db.session.query(UserAchievement.name, UserAchievement.description, UserAchievement.date_earned) \
        .filter_by(user_id=user_id).all()

    achievement_list = [
        {'name': a.name, 'description': a.description, 'date_earned': a.date_earned.strftime('%Y-%m-%d')}
        for a in achievements
    ]
    print("Achievements:", achievement_list)

    # Current streak (number of distinct days)
    streak_dates = db.session.query(
        func.date(ScoreHistory.date_attempted)
    ).filter(ScoreHistory.user_id == user_id) \
     .group_by(func.date(ScoreHistory.date_attempted)) \
     .order_by(func.date(ScoreHistory.date_attempted).desc()).all()

    current_streak = len(streak_dates)
    print("Current streak:", current_streak)

    # Score history for progress chart
    score_history_raw = db.session.query(
        func.date(ScoreHistory.date_attempted),
        ScoreHistory.score
    ).filter_by(user_id=user_id).order_by(ScoreHistory.date_attempted.asc()).all()

    score_history = [
        {'date_attempted': date, 'score': round(score, 2)}
        for date, score in score_history_raw
    ]

    # Activity heatmap data
    activity_raw = db.session.query(
        func.date(ScoreHistory.date_attempted),
        func.count(ScoreHistory.id)
    ).filter_by(user_id=user_id).group_by(func.date(ScoreHistory.date_attempted)).all()

    activity_data = [
        {'date': date, 'count': count}
        for date, count in activity_raw
    ]


    return {
        'total_quizzes_taken': total_quizzes_taken,
        'average_score': average_score,
        'highest_scoring_topic': highest_scoring_topic,
        'lowest_scoring_topic': lowest_scoring_topic,
        'most_attempted_topic': most_attempted_topic,
        'achievements': achievement_list,
        'current_streak': current_streak,
        'score_history': score_history,        
        'activity_data': activity_data
    }


def register_routes(app, db, bcrypt):

    @app.route('/')
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
        
        if User.query.filter_by(email=email).first():
            return "Email already in use", 400
        if User.query.filter_by(uname=uname).first():
            return "Username already in use", 400

        password_pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$'
        if not re.match(password_pattern, pword):
            return "Password does not meet complexity requirements", 400


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
    @login_required
    def logout():
        print("Before clearing:", dict(session)) 
        session.clear()
        print("After clearing:", dict(session)) 

        response = make_response(jsonify({"message": "Logged out"}))
        response.set_cookie("session", "", expires=0)
        return response

    
    @app.route('/profile', methods=['GET'])
    @login_required
    def profile():
        user_id = session.get('user_id')
        if user_id is None:
            return 'Unauthorized', 401

        user = User.query.get(user_id)

        now = datetime.utcnow()
        start_of_month = datetime(now.year, now.month, 1)
        quizzes_this_month = ScoreHistory.query.filter(
            ScoreHistory.user_id == user_id,
            ScoreHistory.date_attempted >= start_of_month
        ).count()

        return jsonify({
            'fname': user.fname,
            'sname': user.sname,
            'email': user.email,
            'uname': user.uname,
            'profile_pic': user.profile_pic or "/main_images/default_avatar.webp",
            'learning_goal': user.learning_goal or 0,
            'quizzes_completed_this_month': quizzes_this_month
        })
        


    @app.route('/update-avatar', methods=['POST'])
    @cross_origin(origins='http://localhost:3000', supports_credentials=True)
    @login_required
    def update_avatar():
        print("Session data:", session)
        if 'user_id' not in session:
            return jsonify({'error': 'Not logged in'}), 401

        user = User.query.get(session['user_id'])
        if not user:
            return jsonify({'error': 'User not found'}), 404

        data = request.get_json()
        if not data or 'avatarUrl' not in data:
            return jsonify({'error': 'No avatar URL provided'}), 400

        user.profile_pic = data['avatarUrl']
        db.session.commit()

        return jsonify({'success': True})


    @app.route('/update-profile', methods=['POST'])
    @cross_origin(origins='http://localhost:3000', supports_credentials=True)
    @login_required
    def update_profile():
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({"error": "User not authenticated"}), 401

        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        data = request.get_json()
        allowed_fields = ['fname', 'sname', 'email', 'uname']
        updated = False

        new_email = data.get("email")
        if new_email:
            if not re.match(r"[^@]+@[^@]+\.[^@]+", new_email):
                return jsonify({"error": "Invalid email format"}), 400

            existing_email = User.query.filter(User.email == new_email, User.id != user_id).first()
            if existing_email:
                return jsonify({"error": "Email is already in use"}), 400

            user.email = new_email
            updated = True

        new_uname = data.get("uname")
        if new_uname:
            existing_uname = User.query.filter(User.uname == new_uname, User.id != user_id).first()
            if existing_uname:
                return jsonify({"error": "Username is already taken"}), 400

            user.uname = new_uname
            updated = True

        for field in ['fname', 'sname']:
            if field in data:
                setattr(user, field, data[field])
                updated = True

        if updated:
            db.session.commit()
            return jsonify({"message": "Profile updated successfully!"}), 200
        else:
            return jsonify({"error": "No valid fields to update"}), 400




    @app.route('/set-learning-goal', methods=['POST'])
    @cross_origin(origins='http://localhost:3000', supports_credentials=True)
    @login_required
    def set_learning_goal():
        if 'user_id' not in session:
            return jsonify({'error': 'Not logged in'}), 401

        data = request.get_json()
        goal = data.get('learningGoal')

        if goal is None or not isinstance(goal, int) or goal < 1:
            return jsonify({'error': 'Invalid goal'}), 400

        user = User.query.get(session['user_id'])
        user.learning_goal = goal
        db.session.commit()

        return jsonify({'message': 'Learning goal updated successfully'}), 200


    @app.route('/change-password', methods=['POST'])
    @cross_origin(origins='http://localhost:3000', supports_credentials=True)
    @login_required
    def change_password():
        if 'user_id' not in session:
            return jsonify({'error': 'Not logged in'}), 401

        data = request.get_json()
        current_password = data.get('currentPassword')
        new_password = data.get('newPassword')
        confirm_new_password = data.get('confirmNewPassword')

        if not current_password or not new_password or not confirm_new_password:
            return jsonify({'error': 'Please provide both current and new passwords'}), 400

        if new_password != confirm_new_password:
            return jsonify({'error': 'New password and confirmation do not match'}), 400

        if current_password == new_password:
            return jsonify({'error': 'New password cannot be the same as the current password'}), 400

        password_pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$'
        if not re.match(password_pattern, new_password):
            return jsonify({'error': 'New password must be at least 8 characters with uppercase, lowercase, number, and symbol'}), 400

        user = User.query.get(session['user_id'])
        
        if not bcrypt.check_password_hash(user.pword, current_password):
             return jsonify({'error': 'Current password is incorrect'}), 400

        print("Old hash:", user.pword)
        user.pword = bcrypt.generate_password_hash(new_password).decode('utf-8')
        print("New hash:", user.pword)
        db.session.commit()
        updated_user = User.query.get(session['user_id'])
        print("DB hash after commit:", updated_user.pword)

        return jsonify({'message': 'Password changed successfully'}), 200



    @app.route('/delete-account', methods=['DELETE'])
    @cross_origin(origins='http://localhost:3000', supports_credentials=True)
    @login_required
    def delete_account():
        if 'user_id' not in session:
            return jsonify({"error": "Unauthorized"}), 401

        user_id = session['user_id']

        try:
            user = User.query.get(user_id)

            if user:
                ScoreHistory.query.filter_by(user_id=user_id).delete()
                UserAchievement.query.filter_by(user_id=user_id).delete()
                QuizScore.query.filter_by(user_id=user_id).delete()
                
                db.session.delete(user)
                db.session.commit()

                session.pop('user_id', None)

                return jsonify({"message": "Account and all associated data deleted successfully"}), 200
            else:
                return jsonify({"error": "User not found"}), 404

        except Exception as e:
            db.session.rollback()
            print(f"Error deleting account: {e}")
            return jsonify({"error": "Error deleting account"}), 500
        

    @app.route("/get_user_xp", methods=["GET"])
    @login_required
    def get_user_xp():
        if 'user_id' not in session:
            return jsonify({"error": "Unauthorized"}), 401

        user_id = session['user_id']

        total_xp = db.session.query(
            db.func.coalesce(db.func.sum(QuizScore.total_xp_earned), 0)
        ).filter_by(user_id=user_id).scalar()

        response = jsonify({"total_xp": total_xp})
        response.headers["Cache-Control"] = "no-store"
        return response


    @app.route("/topic-progress", methods=["GET"])
    @login_required
    def get_topic_progress():
        user_id = session['user_id']

        results = (
            db.session.query(
                Topic.name,
                QuizScore.highest_score
            )
            .join(QuizScore, QuizScore.topic_id == Topic.id)
            .filter(QuizScore.user_id == user_id)
            .all()
        )

        progress = [
            {
                "topic_name": topic_name,
                "highest_score": highest_score
            }
            for topic_name, highest_score in results
        ]

        return jsonify(progress), 200





    @quiz_bp.route('/<int:topic_id>', methods=['GET'])
    @login_required
    def get_quiz_questions(topic_id):
        topic = Topic.query.get_or_404(topic_id)
        questions = QuizQuestion.query.filter_by(topic_id=topic_id).all()
        quiz_data = [
            {
                "id": question.id,
                "question_text": question.question_text,
                "question_type": question.question_type,
                "code_snippet": question.code_snippet or "",
                "options": question.options if question.options else None,
                "correct_answer": question.correct_answer,
                "explanation": question.explanation
            }
            for question in questions
        ]
        return jsonify(quiz_data)
    

    @quiz_bp.route('/submit', methods=['POST'])
    @login_required
    def submit_quiz():
        data = request.get_json()

        user_id = data['user_id']
        topic_id = data['topic_id']
        original_answers = {answer['id']: answer['answer'] for answer in data['original_answers']}
        answers = data['answers']
        
        total_questions = len(answers)
        correct_answers = 0
        wrong_explanations = []

        def normalize_answer(ans):
            return re.sub(r"\s+", "", ans)

        for idx, answer in enumerate(answers):
            print("Checking answer:", answer)
            question = QuizQuestion.query.get(answer['id'])
            if not question:
                continue
            
            correct = normalize_answer(question.correct_answer)
            user_ans = normalize_answer(answer['answer'])

            if user_ans == correct:
                correct_answers += 1
            else:
                wrong_explanations.append({
                    "question_number": idx + 1,
                    "question": question.question_text,
                    "your_answer": original_answers.get(answer['id'], ""), 
                    "correct_answer": question.correct_answer, 
                    "explanation": question.explanation or "No explanation provided."
                })

        score = (correct_answers / total_questions) * 100

        xp_earned = calculate_xp(score)

        quiz_score = QuizScore.query.filter_by(user_id=user_id, topic_id=topic_id).first()
        if quiz_score:
            quiz_score.most_recent_score = score
            quiz_score.xp_earned = xp_earned
            quiz_score.highest_score = max(score, quiz_score.highest_score)
            quiz_score.lowest_score = min(score, quiz_score.lowest_score)
            quiz_score.average_score = (quiz_score.average_score * quiz_score.total_attempts + score) / (quiz_score.total_attempts + 1)
            quiz_score.total_attempts += 1
            quiz_score.total_xp_earned += xp_earned
        else:
            quiz_score = QuizScore(
                user_id=user_id,
                topic_id=topic_id,
                most_recent_score=score,
                xp_earned=xp_earned,
                highest_score=score,
                lowest_score=score,
                average_score=score,
                total_attempts=1,
                total_xp_earned=xp_earned
            )
            db.session.add(quiz_score)

        score_history = ScoreHistory(
            user_id=user_id,
            topic_id=topic_id,
            score=score,
            xp_earned=xp_earned,
            date_attempted=datetime.utcnow()
        )
        db.session.add(score_history)

        db.session.commit()

        award_details = []
        total_xp_earned = quiz_score.total_xp_earned

        check_and_award_achievements(user_id, topic_id, score, total_xp_earned, award_details)

        return jsonify({
            "message": "Quiz submitted successfully",
            "score": score,
            "xp_earned": xp_earned,
            "explanations": wrong_explanations,
            "awarded_achievements": award_details
        })
        



    @app.route('/user_scores/<int:user_id>', methods=['GET'])
    @login_required
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
    



    @app.route('/api/analytics', methods=['GET'])
    @login_required
    def get_analytics():
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'error': 'User not authenticated'}), 401

        analytics_data = get_analytics_data(user_id)
        if not analytics_data:
            return jsonify({'error': 'No analytics data found for this user'}), 404

        today = datetime.utcnow().date()
        seven_days_ago = today - timedelta(days=6)

        xp_results = (
            db.session.query(
                func.date(ScoreHistory.date_attempted).label('date'),
                func.sum(ScoreHistory.xp_earned).label('total_xp')
            )
            .filter(
                ScoreHistory.user_id == user_id,
                ScoreHistory.date_attempted >= seven_days_ago
            )
            .group_by(func.date(ScoreHistory.date_attempted))
            .all()
        )

        xp_dict = {str(row.date): int(row.total_xp or 0) for row in xp_results}

        xp_by_day = []
        for i in range(7):
            day = seven_days_ago + timedelta(days=i)
            day_str = day.isoformat()
            xp_by_day.append({
                "date": day_str,
                "xp": xp_dict.get(day_str, 0)
            })


        analytics_data["xp_by_day"] = xp_by_day
        print(analytics_data["xp_by_day"]);

        return jsonify(analytics_data)



    @app.route('/api/achievements', methods=['GET'])
    @login_required
    def get_user_achievements():
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'error': 'User not authenticated'}), 401

        achievements = db.session.query(UserAchievement).filter_by(user_id=user_id).all()
        
        return jsonify([{
            'name': achievement.name,
            'description': achievement.description,
            'date_earned': achievement.date_earned
        } for achievement in achievements])



    def check_and_award_achievements(user_id, topic_id, score, total_xp_earned, award_details):

        def award(name, description):
            exists = UserAchievement.query.filter_by(user_id=user_id, name=name).first()
            if not exists:
                new_achievement = UserAchievement(
                    user_id=user_id,
                    name=name,
                    description=description,
                    date_earned=datetime.utcnow()
                )
                db.session.add(new_achievement)
                db.session.commit()
                print(f"Awarded achievement: {new_achievement.name}")

                award_details.append({
                    "name": name,
                    "description": description
                })

        history = ScoreHistory.query.filter_by(user_id=user_id).order_by(ScoreHistory.date_attempted).all()
        scores = [h.score for h in history]
        topic_attempts = db.session.query(ScoreHistory.topic_id).filter_by(user_id=user_id).distinct().count()
        topic_specific_attempts = ScoreHistory.query.filter_by(user_id=user_id, topic_id=topic_id).count()
        topics_total = Topic.query.count()

        today = datetime.utcnow().date()
        dates_attempted = set(h.date_attempted.date() for h in history)

        # First quiz
        if len(history) == 1:
            award("First Quiz!", "Completed your first quiz!")

        # Quiz counts
        if len(history) >= 5:
            award("Practice Makes Progress", "Completed 5 quizzes total.")
        if len(history) >= 10:
            award("Double Digits", "Completed 10 quizzes total.")
        if len(history) >= 25:
            award("Persistent Learner", "Completed 25 quizzes total.")
        if len(history) >= 50:
            award("Marathon Mind", "Completed 50 quizzes total.")

        # Perfect Score
        if score == 100:
            award("Perfect Score", "Scored 100% on a quiz!")

        # High Flyer (90%+ on 5 quizzes)
        if len([s for s in scores if s >= 90]) >= 5:
            award("High Flyer", "Scored 90%+ on 5 quizzes.")

        # Consistent Ace (3 in a row over 80%)
        for i in range(len(scores) - 2):
            if all(s >= 80 for s in scores[i:i+3]):
                award("Consistent Ace", "Scored 80%+ on 3 quizzes in a row.")
                break

        # Comeback King/Queen (Improved by 30% over lowest)
        if len(scores) >= 2:
            min_score = min(scores)
            if score - min_score >= 30:
                award("Comeback King/Queen", "Improved your score by 30% from your lowest.")

        # Bounce Back (after two <50%)
        if len(scores) >= 3:
            if scores[-3] < 50 and scores[-2] < 50 and scores[-1] > scores[-2] and scores[-1] > 50:
                award("Bounce Back", "Improved after two tough quizzes!")

        # Topic variety
        if topic_attempts >= 5:
            award("Explorer", "Tried 5 different topics.")
        if topic_attempts >= 10:
            award("Globetrotter", "Tried 10 different topics.")

        # Master of One
        if topic_specific_attempts >= 10:
            topic_name = Topic.query.get(topic_id).name
            award("Master of One", f"Completed 10 quizzes on {topic_name}.")

        # Well Rounded
        if topic_attempts == topics_total:
            award("Well Rounded", "Attempted a quiz from every topic.")

        # Streak achievements
        def check_streak(days):
            for i in range(len(dates_attempted) - days + 1):
                streak = sorted(dates_attempted)[i:i + days]
                if all(streak[j] == streak[0] + timedelta(days=j) for j in range(days)):
                    return True
            return False

        if check_streak(3):
            award("3-Day Streak", "Completed a quiz 3 days in a row.")
        if check_streak(5):
            award("5-Day Streak", "Completed a quiz 5 days in a row.")
        if check_streak(7):
            award("7-Day Warrior", "Completed a quiz 7 days in a row.")

        # First Improvement
        topic_scores = [h.score for h in history if h.topic_id == topic_id]
        if len(topic_scores) >= 2 and topic_scores[-1] > topic_scores[-2]:
            award("First Improvement", "Improved your score on a topic quiz!")

        # XP Earned
        if total_xp_earned >= 1000:
            award("Quiz Champion", "Gained a total of 1000 XP")
        elif total_xp_earned >= 500:
            award("Master of the Basics", "Gained a total of 500 XP")
        elif total_xp_earned >= 250:
            award("Rising Star", "Gained a total of 250 XP")
        elif total_xp_earned >= 100:
            award("Aspiring Scholar", "Gained a total of 100 XP")
        elif total_xp_earned >= 50:
            award("Novice Learner", "Gained a total of 50 XP")

    
    app.register_blueprint(quiz_bp, url_prefix='/quiz')
    app.register_blueprint(analytics_bp, url_prefix='/analytics')

