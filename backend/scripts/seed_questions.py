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
                "question_text": "What is the simplified form of the following Python expression?\n\n```python\nexpression = x**3 * x**4\n```",
                "question_type": "multiple_choice",
                "options": ["expression = x**7", "expression = x**12", "expression = x**1", "expression = x**34"],
                "correct_answer": "expression = x**7",
                "explanation": "The expression simplifies as x^3 * x^4 = x^7."
            },
            {
                "question_text": "What is the output of the following Python code?\n\n```python\nfrom sympy import symbols, expand\nx = symbols('x')\nexpression = (x + 2) * (x + 5)\nprint(expand(expression))\n```",
                "question_type": "multiple_choice",
                "options": ["x**2 + 10*x + 7", "x*2 + 7*x + 10", "x**7 + 2*x + 10", "x**2 + 7*x + 10"],
                "correct_answer": "x**2 + 7*x + 10",
                "explanation": "Expanding the expression gives (x + 2)(x + 5) = x^2 + 7x + 10."
            },
            {
                "question_text": "Which Python function is used to factor an expression\n",
                "question_type": "multiple_choice",
                "options": ["factor()", "factor_expression()", ".factor_expression", ".factor"],
                "correct_answer": "factor()",
                "explanation": "To factor an expression in Python (e.g. x**2 - 9), you must use the SymPy import factor(x**2 - 9), which gives the output (x - 3)*(x + 3)."
            },
            {
                "question_text": "What is the result of the following line of Python code?\n\n```python\nprint(3**-2)\n```",
                "question_type": "multiple_choice",
                "options": ["-1/3", "-9", "-1/9", "1/9"],
                "correct_answer": "1/9",
                "explanation": "3 to the power of -2 gives a result of 1/9."
            },
            {
                "question_text": "What is the result of the following Python code?\n\n```python\nfrom sympy import sqrt\nsurd_expression = sqrt(120)\nprint(surd_expression.simplify())\n```",
                "question_type": "multiple_choice",
                "options": ["3*sqrt(20)", "6*sqrt(20)", "2*sqrt(30)", "10*sqrt(12)"],
                "correct_answer": "2*sqrt(30)",
                "explanation": "Simplifying sqrt(120) gives sqrt(4)*sqrt(30), which equates to 2*sqrt(30)."
            },
            {
                "question_text": "What is the output of the following Python code?\n\n```python\nfrom sympy import symbols, expand\nx = symbols('x')\nexpression = ((x + 2)**2)\nprint(expand(expression))\n```",
                "question_type": "multiple_choice",
                "options": ["x**2 + 4", "x**2 + 4*x + 4", "4*x + 4", "x**4 + 2*x + 4"],
                "correct_answer": "x**2 + 4*x + 4",
                "explanation": "Expanding (x + 2)**2 gives (x + 2) * (x + 2), which then expands to x**2 + 4*x + 4."
            },
            {
                "question_text": "Which of the following is a correct simplified version of (x^3 * x^2) / x?\n",
                "question_type": "multiple_choice",
                "options": ["x**5", "x**6", "x**4", "x**2"],
                "correct_answer": "x**4",
                "explanation": "x^3 * x^2 = x^5, and x^5 / x = x^4."
            },

            {
                "question_text": "Fill in the blank to correctly expand the expression:\n\n```python\nfrom sympy import symbols, expand\nx = symbols('x')\nexpression = (x + 2) * (x + 3)\nexpanded_expression = __________________(expression)\nprint(expanded_expression)\n```",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "expand",
                "explanation": "To expand an expression in Python, use the SymPy import expand()."
            },
            {
                "question_text": "Fill in the blank to complete the equation if the output of the code is 9:\n\n```python\na = 27 ** (_________)\nprint(a)\n```",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "1/3",
                "explanation": "27 to the power of 1/3 gives an output of 9."
            },
            {
                "question_text": "Fill in the blank to correctly rationalise the denominator:\n\n```python\nfrom sympy import sqrt, Rational\nexpr = ___________(1, sqrt(2))\nrationalised_expr = expr * (sqrt(2)/sqrt(2))\nprint(rationalised_expr)\n```",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "Rational",
                "explanation": "To rationalise a denominator in Python, use the SymPy import Rational()."
            }
        ]

        for question in questions:
            quiz_question = QuizQuestion(
                topic_id=topic.id,
                question_text=question["question_text"],
                question_type=question["question_type"],
                options=question.get("options"),
                correct_answer=question["correct_answer"],
                explanation=question["explanation"]
            )
            db.session.add(quiz_question)
            print(f"➕ Queued question with topic_id = {quiz_question.topic_id}")

        try:
            db.session.commit()
            print(f"{len(questions)} questions added to the 'Algebraic Expressions' topic.")
        except Exception as e:
            db.session.rollback()
            print(f"Error during commit: {e}")
            return

        total = QuizQuestion.query.count()
        print(f"Total questions now in the QuizQuestion table: {total}")

if __name__ == "__main__":
    seed_questions()
