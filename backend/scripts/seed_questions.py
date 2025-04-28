import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import QuizQuestion, Topic

app = create_app()

def seed_questions():
    with app.app_context():
        topic = Topic.query.filter_by(name="Variable Acceleration").first()
        if not topic:
            print("Topic 'Variable Acceleration' not found. Make sure it exists in the database.")
            return
        
        print(f"Topic found: {topic.name} (ID: {topic.id})")

        questions = [
            {
                "question_text": "A particle has velocity v(t) = 3t² - 2t + 5. What is the particle's velocity at t = 2 seconds?",
                "code_snippet": "import sympy as sp\n\nt = sp.symbols('t')\nv = 3*t**2 - 2*t + 5\nvelocity_at_2 = v.subs(t, 2)\nprint(velocity_at_2)",
                "question_type": "multiple_choice",
                "options": ["13", "17", "11", "9"],
                "correct_answer": "13",
                "explanation": "Substituting t = 2 into v(t) = 3t² - 2t + 5 gives v(2) = 13 m/s."
            },
            {
                "question_text": "What does differentiating displacement with respect to time give you?",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": ["Acceleration", "Displacement", "Velocity", "Speed"],
                "correct_answer": "Velocity",
                "explanation": "Differentiating displacement s(t) gives velocity v(t)."
            },
            {
                "question_text": "A particle has velocity v(t) = -t² + 4t. Find the time when the velocity is maximum.",
                "code_snippet": "import sympy as sp\n\nt = sp.symbols('t')\nv = -t**2 + 4*t\ncritical_time = sp.solve(sp.diff(v, t), t)\nprint(critical_time)",
                "question_type": "multiple_choice",
                "options": ["t = 1", "t = 2", "t = 3", "t = 4"],
                "correct_answer": "t = 2",
                "explanation": "The maximum velocity occurs when the derivative of v(t) equals 0; solving -2t + 4 = 0 gives t = 2."
            },
            {
                "question_text": "The velocity of a particle is v(t) = 2t + 3. Find the displacement from t = 0 to t = 2 seconds.",
                "code_snippet": "import sympy as sp\n\nt = sp.symbols('t')\nv = 2*t + 3\ndisplacement = sp.integrate(v, (t, 0, 2))\nprint(displacement)",
                "question_type": "multiple_choice",
                "options": ["10", "12", "14", "16"],
                "correct_answer": "10",
                "explanation": "Integrating v(t) from 0 to 2 gives the displacement: ∫(2t + 3) dt from 0 to 2 equals 10 m."
            },
            {
                "question_text": "Which constant acceleration formula links displacement, initial velocity, time, and acceleration?",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": [
                    "s = ut + 0.5at²",
                    "v = u + at",
                    "v² = u² + 2as",
                    "s = (u + v)t"
                ],
                "correct_answer": "s = ut + 0.5at²",
                "explanation": "This formula links s, u, a, and t directly: s = ut + 1/2at²."
            },
            {
                "question_text": "Fill in the blank to define acceleration by differentiating velocity:",
                "code_snippet": "import sympy as sp\n\nt = sp.symbols('t')\nv = 5*t**2 - 3*t + 7\na = sp.diff(v, ________)\nprint(a)",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "t",
                "explanation": "Acceleration is the derivative of velocity with respect to time t."
            },
            {
                "question_text": "Fill in the blank: Displacement can be found by integrating ________ with respect to time.",
                "code_snippet": "s = sp.integrate(_________, t)",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "velocity",
                "explanation": "Displacement is the integral of velocity over time."
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
            print(f"{len(questions)} questions added to the 'VariableAcceleration' topic.")
        except Exception as e:
            db.session.rollback()
            print(f"Error during commit: {e}")
            return

        total = QuizQuestion.query.count()
        print(f"Total questions now in the QuizQuestion table: {total}")

if __name__ == "__main__":
    seed_questions()
