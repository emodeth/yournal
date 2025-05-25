from app.core.extensions import db
from .utils import get_current_datetime


class CollectionAnalytics(db.Model):
    __tablename__ = "collection_analytics"

    id = db.Column(db.Integer, primary_key=True)
    collection_id = db.Column(db.Integer, db.ForeignKey("collections.id"), nullable=False)

    date = db.Column(db.Date, nullable=False, index=True)
    average_score = db.Column(db.Float, nullable=True)
    dominant_mood_id = db.Column(db.Integer, db.ForeignKey("moods.id"), nullable=True)

    created_at = db.Column(db.DateTime, default=get_current_datetime)
    updated_at = db.Column(db.DateTime, default=get_current_datetime, onupdate=get_current_datetime)

    collection = db.relationship("Collection", backref="analytics", lazy=True)
    dominant_mood = db.relationship("Mood", lazy=True)
