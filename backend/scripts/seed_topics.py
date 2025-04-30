import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import Topic


app = create_app()

topics = [
    "Algebraic Methods 2",
    "Functions and Graphs",
    "Sequences and Series",
    "The Binomial Expansion 2",
    "Radians",
    "Trigonometric Functions",
    "Trigonometry and Modelling",
    "Parametric Equations",
    "Differentiation 2",
    "Numerical Methods",
    "Integration 2",
    "Vectors 2"
]

with app.app_context():
    for topic_name in topics:
        topic = Topic(name=topic_name)
        db.session.add(topic)

    db.session.commit()

print("Topics seeded successfully!")