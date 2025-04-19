import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import Topic, QuizQuestion, QuizScore, ScoreHistory

app = create_app()

with app.app_context():
    # Delete all quiz questions
    QuizQuestion.query.delete()
    print("All quiz questions deleted.")

    # Delete all score history entries
    ScoreHistory.query.delete()
    print("All score history entries deleted.")

    db.session.commit()
