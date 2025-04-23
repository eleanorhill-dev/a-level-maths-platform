import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import QuizQuestion, Topic

app = create_app()

def seed_questions():
    with app.app_context():
        topic = Topic.query.filter_by(name="Exponentials and Logarithms").first()
        if not topic:
            print("Topic 'Exponentials and Logarithms' not found. Make sure it exists in the database.")
            return
        
        print(f"Topic found: {topic.name} (ID: {topic.id})")

        questions = [
            {
                "question_text": "What is the output of the following code?",
                "code_snippet": "import numpy as np\nprint(np.exp(0))",
                "question_type": "multiple_choice",
                "options": ["0", "1", "e", "Error"],
                "correct_answer": "1",
                "explanation": "Any number to the power of 0 is equal to 1. In this example, e⁰ = 1."
            },
            {
                "question_text": "Which of the following functions grows faster as x → ∞?",
                "code_snippet": "f = lamba x: 2**x\ng = lamba x: x**5",
                "question_type": "multiple_choice",
                "options": ["f(x)", "g(x)", "They grow at the same rate", "It depends on x"],
                "correct_answer": "f(x)",
                "explanation": "Exponential functions always outgrow polynomials for large x."
            },
            {
                "question_text": "Which of the following graphs represents the function y = eˣ?",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": ["exponentials1.png", "exponentials2.png", "exponentials3.png", "exponentials4.png"],
                "correct_answer": "exponentials1.png",
                "explanation": "The graph of y = eˣ increases rapidly and has a horizontal asymptote at y = 0."
            },
            {
                "question_text": "Which of the following is true for all x > 0?",
                "code_snippet": "import numpy as np\nx = 5",
                "question_type": "multiple_choice",
                "options": ["np.log(np.exp(x)) == x", "np.exp(np.log(x)) == x", "Both A and B", "Neither A nor B"],
                "correct_answer": "Both A and B",
                "explanation": "Logs and exponentials are inverse functions."
            },
            {
                "question_text": "Which of the following models exponential decay?",
                "code_snippet": "import numpy as np\nt = np.linspace(0, 10, 100)\nA = 1000",
                "question_type": "multiple_choice",
                "options": ["A * np.exp(0.3 * t)", "A * np.exp(-0.3 * t)", "A * t**2", "A * np.log(t + 1)"],
                "correct_answer": "A * np.exp(-0.3 * t)",
                "explanation": "Negative exponent = decay."
            },
            {
                "question_text": "What does applying np.log() to a set of exponential data achieve?",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": ["Makes it grow faster", "Makes it decrease", "Linearises it", "It has no effect"],
                "correct_answer": "Linearises it",
                "explanation": "Exponential trends become linear in a log plot."
            },
            {
                "question_text": "Which value is closest to the natural logarithm of 1?",
                "code_snippet": "print(np.log(1))",
                "question_type": "multiple_choice",
                "options": ["1", "2.71", "Undefined", "0"],
                "correct_answer": "0",
                "explanation": "ln(1) = 0, since e⁰ = 1 and they are inverse functions."
            },
            {
                "question_text": "Complete the code to print the value of e² using NumPy:",
                "code_snippet": "import numpy as np\nprint(np.________(2))",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "exp",
                "explanation": "np.exp(2) computes e²."
            },
            {
                "question_text": "Fill in the blank to calculate the value of eˣ, given that x = ln(9):",
                "code_snippet": "from sympy import symbols, Eq, solve, exp, log\n\nx = symbols('x')\nequation = Eq(exp(x), ___________)\nsolution = solve(equation, x)\nprint(solution[0])",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "log(9)",
                "explanation": "eˣ = eˡᵒᵍ⁽⁹⁾ = log(2log(3)) when computed."
            },
            {
                "question_text": "Fill in the blank to calculate the natural logarithm of the value 1000 using NumPy and print the result:",
                "code_snippet": "import numpy as np\nvalue = 1000\nlog_value = np._____________(value)\nprint(log_value)",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "log",
                "explanation": "The correct NumPy function to compute the natural logarithm of a number is log()."
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
            print(f"{len(questions)} questions added to the 'Exponentials and Logarithms' topic.")
        except Exception as e:
            db.session.rollback()
            print(f"Error during commit: {e}")
            return

        total = QuizQuestion.query.count()
        print(f"Total questions now in the QuizQuestion table: {total}")

if __name__ == "__main__":
    seed_questions()
