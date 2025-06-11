from app.core.extensions import db
from .utils import get_current_datetime


class UserAnalytics(db.Model):
    __tablename__ = "user_analytics"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    date = db.Column(db.Date, nullable=False, index=True)
    average_score = db.Column(db.Float, nullable=True)

    created_at = db.Column(db.DateTime, default=get_current_datetime)
    updated_at = db.Column(db.DateTime, default=get_current_datetime, onupdate=get_current_datetime)

    user = db.relationship("User", backref="analytics", lazy=True)
