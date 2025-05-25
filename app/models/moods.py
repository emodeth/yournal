from app.core.extensions import db
from .utils import get_current_datetime


class Mood(db.Model):
    __tablename__ = "moods"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), unique=True, nullable=False)
    emoji = db.Column(db.String(10))  

    created_at = db.Column(db.DateTime(timezone=True), default=get_current_datetime)
    updated_at = db.Column(db.DateTime(timezone=True), default=get_current_datetime, onupdate=get_current_datetime)

    def __repr__(self):
        return f"<Mood {self.type} {self.emoji}>"
