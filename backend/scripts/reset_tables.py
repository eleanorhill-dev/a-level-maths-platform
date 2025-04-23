import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import Topic, QuizQuestion, QuizScore, ScoreHistory

app = create_app()

with app.app_context():
    topics_to_delete = Topic.query.filter(Topic.id > 14).all()
    for topic in topics_to_delete:
        db.session.delete(topic)
    print("All duplicate topics deleted.")

    db.session.commit()
