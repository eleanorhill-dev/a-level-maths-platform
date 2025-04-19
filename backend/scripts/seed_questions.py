import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import QuizQuestion, Topic

app = create_app()

def seed_questions():
    with app.app_context():
        topic = Topic.query.filter_by(name="Equations and Inequalities").first()
        if not topic:
            print("Topic 'Equations and Inequalities' not found. Make sure it exists in the database.")
            return
        
        print(f"Topic found: {topic.name} (ID: {topic.id})")

        questions = [
            {
                "question_text": "What would be the result of the following Python code?",
                "code_snippet": "from sympy import symbols, solve\nx, y = symbols('x, y')\nsolve((2*x + 4*y - 12, x - 3*y - 6), (x,y))",
                "question_type": "multiple_choice",
                "options": ["{x: -6, y: 0}", "{x: 0, y: 6}", "{x: 0, y: -6}", "{x: 6, y: 0}"],
                "correct_answer": "{x: 6, y: 0}",
                "explanation": "When you substitute x = 6 and y = 0 into both of the equations (shown below), they result in the expected outputs.\n2x + 4y = 12\n x - 3y = 6"
            },
            {
                "question_text": "Select the correct line of code that would return [(0, 1), (4, 5)]\n",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": ["solve(x**2 - 3*x - y + 1, x - y + 1)", "solve((x**2 - 3*x - y + 1, x - y + 1), (x,y))", "solve((x,y), (x**2 - 3*x - y + 1, x - y + 1))", "solve((x**2 - 3*x + 1 = y, x + 1 = y), (x,y))"],
                "correct_answer": "solve((x**2 - 3*x - y + 1, x - y + 1), (x,y))",
                "explanation": "SymPys' solve function takes the two equations (equated to zero), and x and y as parameters."
            },
            {
                "question_text": "When solving linear simultaneous equations, what does the resultant point (x, y) look like on a graph of the two equations?\n",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": ["The point where the two lines intersect", "The point where both lines are parallel", "The midpoint of the two lines", "The point where the lines are furthest apart"],
                "correct_answer": "The point where the two lines intersect",
                "explanation": "The solution to a pair of simultaneous equations is the set of values that satisfy both equations. For linear simultaneous equations, there is one x-value and one y-value that do this, and on a graph, this appears as the point where the two lines intersect. Therefore, the point of intersection represents the solution, as it lies on both lines."
            },
            {
                "question_text": "What would the following Python code output?",
                "code_snippet": "from sympy import symbols, solve\nx, y = symbols('x, y')\nsolve(3*x - 18 > 3)",
                "question_type": "multiple_choice",
                "options": ["7 < x ∧ x < ∞", "x > 7", "7", "7 ≤ x ∧ x < ∞"],
                "correct_answer": "7 < x ∧ x < ∞",
                "explanation": "SymPy expresses solutions using interval notation. The strict inequality x > 7 corresponds to the interval: 7 < x ∧ x < ∞."
            },
            {
                "question_text": "In relation to inequalities, what does a region on a graph show?\n",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": ["The boundary between where the inequality is true and false", "The set of points that satisfy the inequality", "The x-intercepts and y-intercepts of the graph", "The set of points that do not satisfy the inequality"],
                "correct_answer": "The set of points that satisfy the inequality",
                "explanation": "When graphing an inequality, the region that is shaded represents all the coordinate points (x, y) that make the inequality true. This region includes all the possible solutions. If the inequality is strict (< or >), the boundary line is usually dashed to show that it's not included. If it's ≤ or ≥, the line is solid to show it's part of the solution. The shaded area - the region - is where the inequality holds."
            },
            {
                "question_text": "Which of the following pairs of lines would have no solution when solved simultaneously?\n",
                "code_snippet": None,
                "question_type": "multiple_choice",
                "options": ["y = 2x + 3 and y = 2x - 4", "y = -x + 5 and y = 2x - 1", "y = x and y = -x", "y = 3x + 2 and y = x + 2"],
                "correct_answer": "y = 2x + 3 and y = 2x - 4",
                "explanation": "These lines are parallel and have the same gradient (2), but different y-intercepts. Parallel lines never meet, so there is no point (x, y) that satisfies both equations - meaning there is no solution."
            },
            {
                "question_text": "What does the following Python code return?",
                "code_snippet": "from sympy import symbols, solve\nx, y = symbols('x y')\nsolve((2*x + y - 10, 4*x + 2*y - 20), (x, y))",
                "question_type": "multiple_choice",
                "options": ["No solutions", "Infinite values of y", "{x: 2, y: 6}", "{x: 5 - y/2}"],
                "correct_answer": "{x: 5 - y/2}",
                "explanation": "The equations are dependent (the second is a multiple of the first), so SymPy returns a parametric solution rather than a unique point. It expresses x in terms of y: {x: 5 - y/2}."
            },
            {
                "question_text": "Fill in the blank to solve the inequality. The expected ouput of the code is: -5 < x ∧ x < ∞.",
                "code_snippet": "from sympy import symbols, solve\nx, y = symbols('x, y')\nsolve(x + ________ > 6, x)",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "11",
                "explanation": "The inequality x + 11 > 6 equates to x > -5, which is the intended output."
            },
            {
                "question_text": "Fill in the blank to graph the region of an inequality:",
                "code_snippet": "import numpy as np\nimport matplotlib.pyplot as plt\nx = np.linspace(-10, 10, 400)\ny = (6 - 2 * x) / 3\nplt.plot(x, y, label='2x + 3y <= 6')\nplt._________________(x, y, -10, where=(y >= -10), color='lightblue', alpha=0.5)\nplt.xlabel('x')\nplt.ylabel('y')\nplt.legend()\nplt.grid(True)\nplt.show()",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "fill_between",
                "explanation": "The fill_between function from Matplotlib is used to shade the area between a curve and a baseline. In the context of inequalities, this visually represents the region of the graph where the inequality holds true."
            },
            {
                "question_text": "Fill in the blank to solve two linear equations in Python:",
                "code_snippet": "from sympy import symbols, solve\nx, y = symbols('x, y')\nsolve((3*x + 2*y - 4, 6*x - 2*y - 7), (__________, y))",
                "question_type": "fill_in_the_blank",
                "options": None,
                "correct_answer": "x",
                "explanation": "The solve function from SymPy is used to find the solution to equations. When solving simultaneous equations involving multiple variables, you must specify all the variables you want to solve for. In this case, the two linear equations involve x and y, so both variables need to be passed as a tuple in the second argument of solve()."
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
            print(f"{len(questions)} questions added to the 'EquationsAndInequalities' topic.")
        except Exception as e:
            db.session.rollback()
            print(f"Error during commit: {e}")
            return

        total = QuizQuestion.query.count()
        print(f"Total questions now in the QuizQuestion table: {total}")

if __name__ == "__main__":
    seed_questions()
