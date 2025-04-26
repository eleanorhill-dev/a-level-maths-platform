import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import Topic, QuizQuestion, QuizScore, ScoreHistory, UserAchievement


app = create_app()

with app.app_context():
    quiz_question = QuizQuestion.query.get(88)
    
    quiz_question.code_snippet = "import math\n\nb = 7\nc = 9\nA = math.radians(60)\n\na_squared = b**2 + c**2 - 2*b*c*math.cos(_________)\na = math.sqrt(a_squared)\nprint(round(a, 2))"

    db.session.commit()
    