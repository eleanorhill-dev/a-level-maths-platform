import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import Topic, QuizQuestion, QuizScore, ScoreHistory, UserAchievement


app = create_app()

with app.app_context():
    quiz_question = QuizQuestion.query.get(216)
    
    quiz_question.explanation = "This formula links s, u, a, and t directly: s = ut + 1/2at²."

    db.session.commit()
    