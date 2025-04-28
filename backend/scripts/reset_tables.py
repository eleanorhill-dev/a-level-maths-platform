import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import Topic, QuizQuestion, QuizScore, ScoreHistory, UserAchievement


app = create_app()

with app.app_context():
    quiz_question = QuizQuestion.query.get(152)
    
    quiz_question.question_text = "Which of the following is true when data values are coded using:"

    db.session.commit()
    