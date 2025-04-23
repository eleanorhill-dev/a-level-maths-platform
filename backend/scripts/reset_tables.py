import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import Topic, QuizQuestion, QuizScore, ScoreHistory, UserAchievement

app = create_app()

with app.app_context():
    db.session.query(ScoreHistory).delete()
    db.session.query(UserAchievement).delete()

    db.session.commit()
