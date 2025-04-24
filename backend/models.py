from extensions import db
from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(100), nullable=False)
    sname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    uname = db.Column(db.String(100), unique=True, nullable=False)
    pword = db.Column(db.String(100), nullable=False)
    profile_pic = db.Column(db.String(255), nullable=True, default=None)
    learning_goal = db.Column(db.Integer, nullable=True, default=0)
    
    def to_dict(self):
        return {
            'id' : self.id,
            'fname' : self.fname,
            'sname' : self.sname,
            'email' : self.email,
            'uname' : self.uname,
            'pword' : self.pword,
            'profile_pic': self.profile_pic or "/main_images/default_avatar.webp",
            'learning_goal': self.learning_goal
        }
    
class Topic(db.Model):
    __tablename__ = 'topics'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

    def __repr__(self):
        return f"Topic: {self.name}"

    quiz_questions = db.relationship('QuizQuestion', back_populates='topic', cascade="all, delete-orphan")

    
class QuizQuestion(db.Model):
    __tablename__ = 'questions'
    
    id = db.Column(db.Integer, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    question_type = db.Column(db.String(20), nullable=False) 
    code_snippet = db.Column(db.Text) 
    options = db.Column(db.JSON) 
    correct_answer = db.Column(db.Text) 
    explanation = db.Column(db.Text)

    def to_dict(self):
        return {
            'id': self.id,
            'topic_id': self.topic_id,
            'question_text': self.question_text,
            'question_type': self.question_type,
            'code_snippet': self.code_snippet,
            'options': self.options,
            'correct_answer': self.correct_answer,
            'explanation': self.explanation
        }

    topic = db.relationship('Topic', back_populates='quiz_questions')
    

class QuizScore(db.Model):
    __tablename__ = 'quiz_scores'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    most_recent_score = db.Column(db.Integer, nullable=False)
    highest_score = db.Column(db.Integer, nullable=False)
    lowest_score = db.Column(db.Integer, nullable=False)
    average_score = db.Column(db.Float, nullable=False)
    total_attempts = db.Column(db.Integer, nullable=False, default=1)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'topic_id': self.topic_id,
            'most_recent_score': self.most_recent_score,
            'highest_score': self.highest_score,
            'lowest_score': self.lowest_score,
            'average_score': self.average_score,
            'total_attempts': self.total_attempts
        }

    user = db.relationship('User', backref='quiz_scores')
    topic = db.relationship('Topic', backref='quiz_scores')

class ScoreHistory(db.Model):
    __tablename__ = 'score_history'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    score = db.Column(db.Float, nullable=False)
    date_attempted = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'topic_id': self.topic_id,
            'score': self.score,
            'date_attempted': self.date_attempted
        }
    

class UserAchievement(db.Model):
    __tablename__ = 'user_achievements'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    date_earned = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'date_earned': self.date_earned
        }

    user = db.relationship('User', backref='achievements')