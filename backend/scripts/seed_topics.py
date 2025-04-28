import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from app import create_app
from models import Topic


app = create_app()

topics = [
    "Data Collection",
    "Measures of Location and Spread",
    "Representations of Data",
    "Correlation",
    "Probability",
    "Statistical Distributions",
    "Hypothesis Testing",
    "Modelling in Mechanics",
    "Constant Acceleration",
    "Forces and Motion",
    "Variable Acceleration"
]

with app.app_context():
    for topic_name in topics:
        topic = Topic(name=topic_name)
        db.session.add(topic)

    db.session.commit()

print("Topics seeded successfully!")