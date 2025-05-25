from typing import List, Optional
from sqlalchemy.exc import SQLAlchemyError
from app.core.extensions import db
from app.models.moods import Mood

def get_mood_by_id(mood_id: int) -> Optional[Mood]:
    return Mood.query.get(mood_id)

def get_all_moods() -> List[Mood]:
    return Mood.query.all()

def get_moods_by_filter(**filters) -> List[Mood]:
    return Mood.query.filter_by(**filters).all()

def get_mood_by_type(mood_type: str) -> Optional[Mood]:
    return Mood.query.filter_by(type=mood_type).first()

def create_mood(data: dict) -> Optional[Mood]:
    try:
        mood = Mood(**data)
        db.session.add(mood)
        db.session.commit()
        return mood
    except SQLAlchemyError:
        db.session.rollback()
        return None

def update_mood(mood_id: int, updates: dict) -> Optional[Mood]:
    mood = get_mood_by_id(mood_id)
    if not mood:
        return None
    for key, value in updates.items():
        if hasattr(mood, key) and value is not None:
            setattr(mood, key, value)
    try:
        db.session.commit()
        return mood
    except SQLAlchemyError:
        db.session.rollback()
        return None

def delete_mood(mood_id: int) -> bool:
    mood = get_mood_by_id(mood_id)
    if not mood:
        return False
    try:
        db.session.delete(mood)
        db.session.commit()
        return True
    except SQLAlchemyError:
        db.session.rollback()
        return False