import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import Topic, QuizQuestion, QuizScore

app = create_app()

with app.app_context():
    QuizScore.query.delete()
    db.session.commit()
    print("All quiz scores deleted.")
