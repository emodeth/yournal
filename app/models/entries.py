from app.core.extensions import db
from .utils import get_current_datetime, SerializableMixin

class Entry(db.Model, SerializableMixin):
    __tablename__ = "entries"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=True)       
    content = db.Column(db.JSON, nullable=True)     
    cover_image = db.Column(db.String(255), nullable=True)

    mood_id = db.Column(db.Integer, db.ForeignKey("moods.id"), nullable=True)
    mood_score = db.Column(db.Integer, nullable=True)

    collection_id = db.Column(db.Integer, db.ForeignKey("collections.id"), nullable=True)
    is_draft = db.Column(db.Boolean, default=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False) 

    created_at = db.Column(db.DateTime(timezone=True), default=get_current_datetime)
    updated_at = db.Column(db.DateTime(timezone=True), default=get_current_datetime, onupdate=get_current_datetime)

    mood = db.relationship("Mood", backref="entries", lazy=True)
    collection = db.relationship("Collection", backref="entries", lazy=True)
    user = db.relationship("User", back_populates="entries", lazy=True)