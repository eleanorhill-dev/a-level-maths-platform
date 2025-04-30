import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import QuizQuestion, Topic

app = create_app()

def seed_questions():
    with app.app_context():
        topic = Topic.query.filter_by(name="Algebraic Expressions").first()
        if not topic:
            print("Topic 'Algebraic Expressions' not found. Make sure it exists in the database.")
            return
        
        print(f"Topic found: {topic.name} (ID: {topic.id})")

        questions = [
            {
                "question_text": "",
                "code_snippet": "",
                "question_type": "multiple_choice",
                "options": ["", "", "", ""],
                "correct_answer": "",
                "explanation": ""
            },
            {
                "question_text": "",
                "code_snippet": "",
                "question_type": "multiple_choice",
                "options": ["", "", "", ""],
                "correct_answer": "",
                "explanation": ""
            },
            {
                "question_text": "",
                "code_snippet": "",
                "question_type": "multiple_choice",
                "options": ["", "", "", ""],
                "correct_answer": "",
                "explanation": ""
            },
            {
                "question_text": "",
                "code_snippet": "",
                "question_type": "multiple_choice",
                "options": ["", "", "", ""],
                "correct_answer": "",
                "explanation": ""
            },
            {
                "question_text": "",
                "code_snippet": "",
                "question_type": "multiple_choice",
                "options": ["", "", "", ""],
                "correct_answer": "",
                "explanation": ""
            },
            {
                "question_text": "",
                "code_snippet": "",
                "question_type": "multiple_choice",
                "options": ["", "", "", ""],
                "correct_answer": "",
                "explanation": ""
            },
            {
                "question_text": "",
                "code_snippet": "",
                "question_type": "multiple_choice",
                "options": ["", "", "", ""],
                "correct_answer": "",
                "explanation": ""
            },
            {
                "question_text": "Fill in the blank to",
                "code_snippet": "",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "",
                "explanation": ""
            },
            {
                "question_text": "Fill in the blank to",
                "code_snippet": "",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "",
                "explanation": ""
            },
            {
                "question_text": "Fill in the blank to",
                "code_snippet": "",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "",
                "explanation": ""
            }
        ]

        for question in questions:
            quiz_question = QuizQuestion(
                topic_id=topic.id,
                question_text=question["question_text"],
                code_snippet=question["code_snippet"],
                question_type=question["question_type"],
                options=question.get("options"),
                correct_answer=question["correct_answer"],
                explanation=question["explanation"]
            )
            db.session.add(quiz_question)
            print(f"➕ Queued question with topic_id = {quiz_question.topic_id}")

        try:
            db.session.commit()
            print(f"{len(questions)} questions added to the 'AlgebraicExpressions' topic.")
        except Exception as e:
            db.session.rollback()
            print(f"Error during commit: {e}")
            return

        total = QuizQuestion.query.count()
        print(f"Total questions now in the QuizQuestion table: {total}")

if __name__ == "__main__":
    seed_questions()
