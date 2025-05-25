from app.core.extensions import db, bcrypt
from flask_login import UserMixin
from .utils import get_current_datetime


class User(db.Model, UserMixin):
    
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)

    name = db.Column(db.String(100), nullable=True)
    pwd_hash = db.Column(db.String(255), nullable=False)

    image_url = db.Column(db.String(500), nullable=True) 
    is_active = db.Column(db.Boolean, default=True)

    created_at = db.Column(db.DateTime(timezone=True), default=get_current_datetime)
    updated_at = db.Column(db.DateTime(timezone=True), default=get_current_datetime, onupdate=get_current_datetime)

    collections = db.relationship("Collection", back_populates="user", lazy=True)
    entries = db.relationship("Entry", back_populates="user", lazy=True)

    def set_password(self, password: str):
        self.pwd_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password: str) -> bool:
        return bcrypt.check_password_hash(self.pwd_hash, password)
    
    def __repr__(self):
        return f"<User {self.email}>"
    