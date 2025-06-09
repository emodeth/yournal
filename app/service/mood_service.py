from typing import Optional, List
from app.models.moods import Mood
from app.core.exceptions import MoodNotFound
from app.repository.mood_repository import (
    get_all_moods,
    get_mood_by_id,
    get_mood_by_type,
    create_mood,
    update_mood,
    delete_mood,
)


def create_mood_service(mood_type: str, emoji: Optional[str] = None) -> Mood:
    """
    Create a new mood if it doesn't already exist.

    Args:
        mood_type (str): The name/type of the mood.
        emoji (Optional[str]): Optional emoji representation.

    Raises:
        ValueError: If the mood type already exists.

    Returns:
        Mood: The created Mood instance.
    """
    if get_mood_by_type(mood_type):
        raise ValueError(f"Mood '{mood_type}' already exists.")
    
    data = {"type":mood_type, "emoji":emoji }
    
    new_mood = create_mood(data)
    if not new_mood:
        raise ValueError("Failed to create mood due to database error.")
    return new_mood


def get_all_moods_service() -> List[Mood]:
    """
    Retrieve all moods from the database.

    Returns:
        List[Mood]: List of all Mood instances.
    """
    return get_all_moods()


def get_mood_by_id_service(mood_id: int) -> Optional[Mood]:
    """
    Retrieve a mood by its ID.

    Args:
        mood_id (int): Mood ID.

    Returns:
        Optional[Mood]: The Mood instance if found, else None.
    """
    mood = get_mood_by_id(mood_id)
    if not mood:
        raise MoodNotFound(id=mood_id)
    return mood


def get_mood_by_type_service(mood_type: str) -> Optional[Mood]:
    """
    Retrieve a mood by its type.

    Args:
        mood_type (str): The name/type of the mood.

    Returns:
        Optional[Mood]: The Mood instance if found, else None.
    """
    return get_mood_by_type(mood_type)


def update_mood_service(mood_id: int, **kwargs) -> Optional[Mood]:
    """
    Update a mood's allowed fields.

    Args:
        mood_id (int): ID of the mood to update.
        **kwargs: Fields to update (must be in 'type', 'emoji').

    Raises:
        ValueError: If no valid fields are provided.

    Returns:
        Optional[Mood]: Updated Mood instance, or None if not found.
    """
    allowed_fields = {'type', 'emoji'}
    updates = {k: v for k, v in kwargs.items() if k in allowed_fields and v is not None}

    if not updates:
        raise ValueError("No valid fields to update.")

    updated = update_mood(mood_id, updates)
    if not updated:
        raise ValueError(f"Failed to update mood with ID {mood_id}")
    return updated


def delete_mood_service(mood_id: int) -> bool:
    """
    Delete a mood by its ID.

    Args:
        mood_id (int): Mood ID.

    Returns:
        bool: True if deletion was successful, False otherwise.
    """
    mood = get_mood_by_id(mood)
    if not mood:
        raise MoodNotFound(id=mood_id)
    return delete_mood(mood_id)
