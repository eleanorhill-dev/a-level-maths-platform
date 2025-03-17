from app import create_app, db 
from models import Topic

app = create_app()

with app.app_context():
    topics_to_delete = Topic.query.filter(Topic.id >= 1).all()
    
    for topic in topics_to_delete:
        db.session.delete(topic)

    db.session.commit()

    print(f"Deleted {len(topics_to_delete)} topics.")
