import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import Topic, QuizQuestion

app = create_app()

with app.app_context():
    QuizQuestion.query.delete()
    db.session.commit()
    print("All quiz questions deleted.")

    Topic.query.delete()
    db.session.commit()
    print("All topics deleted.")