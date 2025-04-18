from models import ScoreHistory, Topic
from sqlalchemy.sql import func
from datetime import datetime, timedelta
from collections import defaultdict
from extensions import db

def get_highest_scoring_topic(user_id):
    results = db.session.query(
        ScoreHistory.topic_id,
        func.avg(ScoreHistory.score).label("avg_score")
    ).filter_by(user_id=user_id).group_by(ScoreHistory.topic_id).all()

    if not results:
        return None

    highest = max(results, key=lambda r: r.avg_score)
    topic = Topic.query.get(highest.topic_id)
    return {"topic": topic.name, "average_score": round(highest.avg_score, 2)}

def get_lowest_scoring_topic(user_id):
    results = db.session.query(
        ScoreHistory.topic_id,
        func.avg(ScoreHistory.score).label("avg_score")
    ).filter_by(user_id=user_id).group_by(ScoreHistory.topic_id).all()

    if not results:
        return None

    lowest = min(results, key=lambda r: r.avg_score)
    topic = Topic.query.get(lowest.topic_id)
    return {"topic": topic.name, "average_score": round(lowest.avg_score, 2)}

def get_average_score_across_all_topics(user_id):
    scores = db.session.query(ScoreHistory.score).filter_by(user_id=user_id).all()
    if not scores:
        return 0
    average = sum(score.score for score in scores) / len(scores)
    return round(average, 2)

def get_total_quizzes_taken(user_id):
    return ScoreHistory.query.filter_by(user_id=user_id).count()

def get_most_improved_topic(user_id):
    history = db.session.query(
        ScoreHistory.topic_id,
        ScoreHistory.score,
        ScoreHistory.date_attempted
    ).filter_by(user_id=user_id).order_by(ScoreHistory.topic_id, ScoreHistory.date_attempted).all()

    if not history:
        return None

    topic_scores = defaultdict(list)
    for record in history:
        topic_scores[record.topic_id].append((record.date_attempted, record.score))

    improvements = []
    for topic_id, records in topic_scores.items():
        if len(records) >= 2:
            scores = [score for _, score in records]
            improvement = scores[-1] - scores[0]
            improvements.append((topic_id, improvement))

    if not improvements:
        return None

    most_improved = max(improvements, key=lambda x: x[1])
    topic = Topic.query.get(most_improved[0])
    return {"topic": topic.name, "score_improvement": round(most_improved[1], 2)}

def get_activity_heatmap(user_id):
    results = db.session.query(
        func.date(ScoreHistory.date_attempted),
        func.count().label("attempts")
    ).filter_by(user_id=user_id).group_by(func.date(ScoreHistory.date_attempted)).all()

    return [{"date": str(date), "attempts": attempts} for date, attempts in results]

def get_progress_badges(user_id):
    badges = []
    total_attempts = get_total_quizzes_taken(user_id)
    perfect_scores = ScoreHistory.query.filter_by(user_id=user_id, score=100).count()

    if total_attempts >= 5:
        badges.append("🎯 Completed 5 quizzes")
    if perfect_scores >= 1:
        badges.append("🏆 Scored 100% on a quiz")
    if total_attempts >= 10:
        badges.append("🔥 Quiz Pro: 10+ attempts")
    
    return badges
