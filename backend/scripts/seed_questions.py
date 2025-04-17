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
                "question_text": "What will the following code output?\n\n"
                                 "a = 1\n"
                                 "b = -6\n"
                                 "c = 9\n"
                                 "discriminant = b**2 - 4*a*c\n"
                                 "print(discriminant)",
                "question_type": "multiple_choice",
                "options": ["0", "3", "36", "-36"],
                "correct_answer": "0",
                "explanation": "Discriminant = b² - 4ac = (-6)² - 4*1*9 = 36 - 36 = 0."
            },
            {
                "question_text": "What does the following Python function return?\n\n"
                                 "def discriminant(a, b, c):\n"
                                 "    return b**2 - 4*a*c\n\n"
                                 "print(discriminant(1, -2, 1))",
                "question_type": "multiple_choice",
                "options": ["0", "-2", "2", "4"],
                "correct_answer": "0",
                "explanation": "(-2)² - 4*1*1 = 4 - 4 = 0."
            },
            {
                "question_text": "What is the correct way to calculate the x-coordinate of the vertex of a parabola using Python?",
                "question_type": "multiple_choice",
                "options": ["x_vertex = -b / (2 * a)", "x_vertex = b / (2 * a)", "x_vertex = (-b + math.sqrt(b**2 - 4*a*c)) / (2 * a)", "x_vertex = (-b * c) / (2 * a)"],
                "correct_answer": "x_vertex = -b / (2 * a)",
                "explanation": "The vertex's x-coordinate of a quadratic is found using -b / (2a)."
            },
            {
                "question_text": "What will the following code print?\n\n"
                                 "from sympy import symbols, Eq, solve\n"
                                 "x = symbols('x')\n"
                                 "equation = Eq(x**2 + 2*x + 1, 0)\n"
                                 "print(solve(equation, x))",
                "question_type": "multiple_choice",
                "options": ["[-1]", "[1]", "[-1, -1]", "[-2, 2]"],
                "correct_answer": "[-1]",
                "explanation": "The equation x² + 2x + 1 = 0 factors to (x + 1)² = 0 → x = -1."
            },
            {
                "question_text": "Given the function f(x) = (x - 1)**2 + 2, what does the graph's vertex represent in Python plotting?",
                "question_type": "multiple_choice",
                "options": ["The minimum point (1, 2)", "The maximum point (1, 2)", "The y-intercept", "The axis of symmetry"],
                "correct_answer": "The minimum point (1, 2)",
                "explanation": "In the form (x - h)² + k, the vertex is at (h, k), which here is (1, 2)."
            },
            {
                "question_text": "What type of roots does the quadratic equation `2x² + 4x + 5 = 0` have?",
                "question_type": "multiple_choice",
                "options": ["One real root", "Two real roots", "No real roots", "It cannot be solved"],
                "correct_answer": "No real roots",
                "explanation": "Discriminant = 4² - 4×2×5 = 16 - 40 = -24 → discriminant < 0 → no real roots."
            },
            {
                "question_text": "What would the Python code output for this equation?\n\n"
                                 "```from sympy import solve, symbols\nx = symbols('x')\nprint(solve(x**2 - 5*x + 6, x))```",
                "question_type": "multiple_choice",
                "options": ["[2, 3]", "[3, 2]", "[1, 6]", "[-2, -3]"],
                "correct_answer": "[2, 3]",
                "explanation": "x² - 5x + 6 = 0 factors to (x - 2)(x - 3) → x = 2, 3."
            },
            {
                "question_text": "Fill in the blank to complete the square using Python:\n\n"
                                 "```from sympy import symbols, expand\n"
                                 "x = symbols('x')\n"
                                 "expression = (x - 3)**2 + 4\n"
                                 "expanded = __________(expression)\n"
                                 "print(expanded)```",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "expand",
                "explanation": "To expand a completed square expression, use SymPy's expand() function."
            },
            {
                "question_text": "Fill in the blank to compute the discriminant of a quadratic in Python:\n\n"
                                 "```a = 1\nb = 2\nc = 3\nd = b**2 - ___ * a * c\nprint(d)```",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "4",
                "explanation": "The standard discriminant formula is b² - 4ac."
            },
            {
                "question_text": "Fill in the blank to define a quadratic equation in Python:\n\n"
                                 "```from sympy import Eq, symbols\n"
                                 "x = symbols('x')\n"
                                 "equation = Eq(x**2 + 5*x + 6, ___)```",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "0",
                "explanation": "Quadratic equations are set equal to 0 when solving."
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
            print(f"{len(questions)} questions added to the 'Quadratics' topic.")
        except Exception as e:
            db.session.rollback()
            print(f"Error during commit: {e}")
            return

        total = QuizQuestion.query.count()
        print(f"Total questions now in the QuizQuestion table: {total}")

if __name__ == "__main__":
    seed_questions()
