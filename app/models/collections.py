from app.core.extensions import db
from .utils import get_current_datetime, SerializableMixin

class Collection(db.Model, SerializableMixin):
    __tablename__ = "collections"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)  # Allow null for draft/autosave
    description = db.Column(db.Text, nullable=True)

    # parent_id = db.Column(db.Integer, db.ForeignKey("collections.id", ondelete="CASCADE"), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    created_at = db.Column(db.DateTime(timezone=True), default=get_current_datetime)
    updated_at = db.Column(db.DateTime(timezone=True), default=get_current_datetime, onupdate=get_current_datetime)

    # parent = db.relationship("Collection", remote_side=[id], backref="children", lazy=True)
    user = db.relationship("User", back_populates="collections", lazy=True)

