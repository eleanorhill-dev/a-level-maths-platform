import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import Topic, QuizQuestion, QuizScore, ScoreHistory, UserAchievement


app = create_app()

with app.app_context():
    ids_to_delete = [327, 326, 325, 324, 323, 322, 321]
    try:
        # Delete questions with the given IDs
        QuizQuestion.query.filter(QuizQuestion.id.in_(ids_to_delete)).delete(synchronize_session=False)
        db.session.commit()
        print(f"Deleted questions with IDs: {ids_to_delete}")
    except Exception as e:
        db.session.rollback()
        print(f"Error during delete: {e}")
