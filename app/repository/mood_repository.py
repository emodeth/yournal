from app.core.extensions import db
from app.models.moods import Mood

def get_all_moods():
    """Retrieve all moods."""
    return Mood.query.all()

def get_mood_by_id(mood_id: int):
    """Retrieve a mood by its ID."""
    return Mood.query.get(mood_id)

def get_mood_by_type(mood_type: str):
    """Retrieve a mood by its type string."""
    return Mood.query.filter_by(type=mood_type).first()

def create_mood(mood_type: str, emoji: str = None):
    """Create a new mood."""
    mood = Mood(type=mood_type, emoji=emoji)
    db.session.add(mood)
    db.session.commit()
    return mood

def update_mood(mood_id: int, updates: dict):
    """Update an existing mood by ID using a dictionary of fields."""
    mood = get_mood_by_id(mood_id)
    if not mood:
        return None
    for key, value in updates.items():
        if hasattr(mood, key) and value is not None:
            setattr(mood, key, value)
    db.session.commit()
    return mood

def delete_mood(mood_id: int):
    """Delete a mood by ID."""
    mood = get_mood_by_id(mood_id)
    if not mood:
        return False
    db.session.delete(mood)
    db.session.commit()
    return True
