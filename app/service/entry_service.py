from typing import Optional, List
from app.models.entries import Entry
from app.repository.entry_repository import (
    get_all_entries,
    get_entry_by_id,
    get_entries_by_filter,
    create_entry,
    update_entry,
    delete_entry,
)

def create_entry_service(data: dict) -> Entry:
    """
    Create a new entry.
    If no collection_id is provided, is_draft is set to True.
    """
    # Validate required fields
    required_fields = ["user_id"]
    missing = [field for field in required_fields if not data.get(field)]
    if missing:
        raise ValueError(f"Missing required fields: {', '.join(missing)}")

    if not data.get("collection_id"):
        data["is_draft"] = True

    try:
        entry = create_entry(data)
    except Exception as e:
        raise ValueError(f"Database error: {str(e)}")

    if not entry:
        raise ValueError("Failed to create entry due to database error.")
    return entry


def get_all_entries_service() -> List[Entry]:
    """Retrieve all entries."""
    return get_all_entries()


def get_entry_by_id_service(entry_id: int) -> Optional[Entry]:
    """Retrieve an entry by its ID."""
    return get_entry_by_id(entry_id)


def get_entries_by_user_service(user_id: int) -> List[Entry]:
    """Get all entries for a specific user."""
    return get_entries_by_filter(user_id=user_id)


def get_entries_by_collection_service(collection_id: int) -> List[Entry]:
    """Get all entries in a specific collection."""
    return get_entries_by_filter(collection_id=collection_id)


def get_published_entries_service(user_id: int) -> List[Entry]:
    """Get all published (non-draft) entries for a user."""
    return get_entries_by_filter(user_id=user_id, is_draft=False)


def get_draft_entries_service(user_id: int) -> List[Entry]:
    """Get all draft entries of a user."""
    return get_entries_by_filter(user_id=user_id, is_draft=True)


def update_entry_service(entry_id: int, **kwargs) -> Optional[Entry]:
    """
    Update an entry's allowed fields.
    If collection_id is removed or set to None, is_draft is set to True.
    """
    allowed_fields = {
        'title', 'content', 'cover_image', 'mood_id', 'moodScore',
        'collection_id', 'is_draft', 'user_id'
    }

    updates = {k: v for k, v in kwargs.items() if k in allowed_fields and v is not None}

    entry = get_entry_by_id(entry_id)
    if not entry:
        raise ValueError(f"Entry with ID {entry_id} not found.")

    if "collection_id" in kwargs and not kwargs.get("collection_id"):
        updates["is_draft"] = True
    elif "collection_id" not in updates and not entry.collection_id:
        updates["is_draft"] = True

    if not updates:
        raise ValueError("No valid fields to update.")

    updated = update_entry(entry_id, updates)
    if not updated:
        raise ValueError(f"Failed to update entry with ID {entry_id}")
    return updated


def delete_entry_service(entry_id: int) -> bool:
    """Delete an entry by its ID."""
    entry = get_entry_by_id(entry_id)
    if not entry:
        raise ValueError(f"Entry with ID {entry_id} not found.")
    return delete_entry(entry_id)
