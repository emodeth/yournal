from sqlalchemy.exc import IntegrityError
from app.repository.mood_repository import (
    get_all_moods,
    get_mood_by_id,
    get_mood_by_type,
    create_mood,
    update_mood,
    delete_mood,
)

def create_mood_service(mood_type: str, emoji: str = None):
    if get_mood_by_type(mood_type):
        raise ValueError(f"Mood '{mood_type}' already exists.")
    return create_mood(mood_type, emoji)

def get_all_moods_service():
    return get_all_moods()

def get_mood_by_id_service(mood_id: int):
    mood = get_mood_by_id(mood_id)
    if not mood:
        return None
    return mood

def get_mood_by_type_service(mood_type: str):
    mood = get_mood_by_type(mood_type)
    if not mood:
        return None
    return mood

def update_mood_service(mood_id: int, **kwargs):
    allowed_fields = {'type', 'emoji'}
    updates = {k: v for k, v in kwargs.items() if k in allowed_fields and v is not None}
    if not updates:
        raise ValueError("No valid fields to update.")
    return update_mood(mood_id, updates)

def delete_mood_service(mood_id: int):
    return delete_mood(mood_id)