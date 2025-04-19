import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import QuizQuestion, Topic

app = create_app()

def seed_questions():
    with app.app_context():
        topic = Topic.query.filter_by(name="Quadratics").first()
        if not topic:
            print("Topic 'Quadratics' not found. Make sure it exists in the database.")
            return
        
        print(f"Topic found: {topic.name} (ID: {topic.id})")

        questions = [
            {
                "question_text": "What will the following Python code output?",
                "code_snippet": "a = 1\nb = -6\nc = 9\ndiscriminant = b**2 - 4*a*c\nprint(discriminant)",
                "question_type": "multiple_choice",
                "options": ["-36", "3", "36", "0"],
                "correct_answer": "0",
                "explanation": "Discriminant = b² - 4ac = (-6)² - 4*1*9 = 36 - 36 = 0."
            },
            {
                "question_text": "What does the following Python function return?",
                "code_snippet": "def discriminant(a, b, c):\n    return b**2 - 4*a*c\nprint(discriminant(1, -2, 1))",
                "question_type": "multiple_choice",
                "options": ["2", "-2", "0", "4"],
                "correct_answer": "0",
                "explanation": "(-2)² - 4*1*1 = 4 - 4 = 0."
            },
            {
                "question_text": "What is the correct way to calculate the x-coordinate of the vertex of a parabola using Python?",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": ["x_vertex = -b / (2 * a)", "x_vertex = b / (2 * a)", "x_vertex = (-b + math.sqrt(b**2 - 4*a*c)) / (2 * a)", "x_vertex = (-b * c) / (2 * a)"],
                "correct_answer": "x_vertex = -b / (2 * a)",
                "explanation": "The vertex's x-coordinate of a quadratic is found using -b / (2a)."
            },
            {
                "question_text": "What will the following Python code print?",
                "code_snippet": "from sympy import symbols, solve\nx = symbols('x')\nsolve(x**2 + 2*x + 1, x)",
                "question_type": "multiple_choice",
                "options": ["[-1]", "[1]", "[-1, -1]", "[-2, 2]"],
                "correct_answer": "[-1]",
                "explanation": "The equation x² + 2x + 1 = 0 factors to (x + 1)² = 0. Therefore, x = -1."
            },
            {
                "question_text": "Given the function f(x), shown below, what does the graph's vertex represent in Python plotting?",
                "code_snippet": "f(x) = (x - 1)**2 + 2",
                "question_type": "multiple_choice",
                "options": ["The maximum point (1, 2)", "The y-intercept", "The axis of symmetry", "The minimum point (1, 2)"],
                "correct_answer": "The minimum point (1, 2)",
                "explanation": "In the form (x - h)² + k, the vertex is at (h, k), which here is (1, 2)."
            },
            {
                "question_text": "What type of roots does the quadratic equation `2x² + 4x + 5 = 0` have?",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": ["One real root", "Two real roots", "No real roots", "It cannot be solved"],
                "correct_answer": "No real roots",
                "explanation": "Discriminant = 4² - 4*2*5 = 16 - 40 = -24. Since -24 < 0, there are no real roots."
            },
            {
                "question_text": "What will be the output of the following Python code?",
                "code_snippet": "from sympy import solve, symbols\nx = symbols('x')\nsolve(x**2 - 5*x + 6, x)",
                "question_type": "multiple_choice",
                "options": ["[3, 2]", "[2, 3]", "[1, 6]", "[-2, -3]"],
                "correct_answer": "[2, 3]",
                "explanation": "x² - 5x + 6 = 0 factors to (x - 2)(x - 3). Therefore, x = 2, 3."
            },
            {
                "question_text": "Fill in the blank to complete the square using Python:",
                "code_snippet": "from sympy import symbols, expand\nx = symbols('x')\nexpression = (x - 3)**2 + 4\nexpanded_expression = _________(expression)\nprint(expanded_expression)",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "expand",
                "explanation": "To expand a completed square expression, use SymPy's expand() function."
            },
            {
                "question_text": "Fill in the blank to compute the discriminant of a quadratic in Python:",
                "code_snippet": "a = 1\nb = 2\nc = 3\nd = b**2 - _____*a*c\nprint(d)",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "4",
                "explanation": "The standard discriminant formula is b² - 4ac."
            },
            {
                "question_text": "Fill in the blank to define a quadratic equation in Python:",
                "code_snippet": "from sympy import Eq, symbols\nx = symbols('x')\nequation = Eq(x**2 + 5*x + 6, _______)",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "0",
                "explanation": "Quadratic equations are set to equal 0 when solving."
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
            print(f"{len(questions)} questions added to the 'Quadratics' topic.")
        except Exception as e:
            db.session.rollback()
            print(f"Error during commit: {e}")
            return

        total = QuizQuestion.query.count()
        print(f"Total questions now in the QuizQuestion table: {total}")

if __name__ == "__main__":
    seed_questions()
