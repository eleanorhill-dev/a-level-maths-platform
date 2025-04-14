import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import Topic


app = create_app()

topics = [
    "Algebraic Expressions",
    "Quadratics",
    "Equations and Inequalities",
    "Graphs and Transformations",
    "Straight Line Graphs",
    "Circles",
    "Algebraic Methods",
    "The Binomial Expansion",
    "Trigonometric Ratios",
    "Trigonometric Identities and Equations",
    "Vectors",
    "Differentiation",
    "Integration",
    "Exponentials and Logarithms"
]

with app.app_context():
    for topic_name in topics:
        topic = Topic(name=topic_name)
        db.session.add(topic)

    db.session.commit()

print("Topics seeded successfully!")