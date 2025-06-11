from typing import List
from app.models.entries import Entry
from app.core.exceptions import EntryNotFound, UserNotFound, CollectionNotFound, BusinessRuleViolation
from app.repository.user_repository import get_user_by_id
from app.repository.collection_repository import get_collection_by_id
from app.repository.user_analytics import create_or_update_user_analytics, update_user_analytics_on_entry_update
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
    Create a new entry for a user.
    - If no collection_id is provided, it defaults to the user's default_collection_id and sets is_draft to True.
    """
    required_fields = ["user_id"]
    missing = [field for field in required_fields if not data.get(field)]
    if missing:
        raise ValueError(f"Missing required fields: {', '.join(missing)}")

    user_id = data["user_id"]
    user = get_user_by_id(user_id=user_id)
    if not user:
        raise UserNotFound(id=user_id)

    # If collection_id is missing, assign to drafts and mark as draft
    if not data.get("collection_id"):
        if not user.default_collection_id:
            raise ValueError("User does not have a drafts collection.")
        data["is_draft"] = True
        data["collection_id"] = user.default_collection_id

    collection_id = data["collection_id"]
    collection = get_collection_by_id(collection_id)
    if not collection:
        raise CollectionNotFound(id=collection_id)
    if collection.user_id != user.id:
        raise BusinessRuleViolation("Collection does not belong to the user.")

    try:
        entry = create_entry(data)
        create_or_update_user_analytics(entry=entry)
    except Exception as e:
        raise ValueError(f"Database error: {str(e)}")

    if not entry:
        raise ValueError("Failed to create entry due to database error.")
    return entry

def get_all_entries_service() -> List[Entry]:
    """Retrieve all entries."""
    return get_all_entries()


def get_entry_by_id_service(entry_id: int) -> Entry:
    """Retrieve an entry by its ID."""
    entry = get_entry_by_id(entry_id)
    if not entry:
        raise EntryNotFound(id=entry_id)
    return entry


def get_entries_by_user_service(
        user_id: int,
        is_draft: bool = None,
        limit: int = None,
        offset: int = None
    ) -> List[Entry]:
    user = get_user_by_id(user_id=user_id)
    if not user:
        raise UserNotFound(id=user_id)

    filters = {"user_id": user_id}
    if is_draft is not None:
        filters["is_draft"] = is_draft

    return get_entries_by_filter(
        **filters,
        limit=limit,
        offset=offset,
        order_by=Entry.updated_at.desc()
    )


def get_entries_by_collection_service(collection_id: int) -> List[Entry]:
    """Get all entries in a specific collection."""
    collection = get_collection_by_id(collection_id=collection_id)
    if not collection:
        raise CollectionNotFound(id=collection_id)
    return get_entries_by_filter(collection_id=collection_id)


# def get_published_entries_service(user_id: int) -> List[Entry]:
#     """Get all published (non-draft) entries for a user."""
#     user = get_user_by_id(user_id=user_id)
#     if not user:
#         raise UserNotFound(id=user_id)
#     return get_entries_by_filter(user_id=user_id, is_draft=False)


# def get_draft_entries_service(user_id: int) -> List[Entry]:
#     """Get all draft entries of a user."""
#     user = get_user_by_id(user_id=user_id)
#     if not user:
#         raise UserNotFound(id=user_id)
#     return get_entries_by_filter(user_id=user_id, is_draft=True)


def update_entry_service(entry_id: int, **kwargs) -> Entry:
    """
    Update an entry's allowed fields.
    If collection_id is removed or set to None, is_draft is set to True.
    """
    allowed_fields = {
        'title', 'content', 'cover_image', 'mood_id', 'moodScore',
        'collection_id', 'is_draft', 'user_id','entry_mood_score'
    }

    updates = {k: v for k, v in kwargs.items() if k in allowed_fields and v is not None}

    entry = get_entry_by_id(entry_id)
    if not entry:
        raise EntryNotFound(id=entry_id)

    if "collection_id" in kwargs and not kwargs.get("collection_id"):
        updates["is_draft"] = True
    elif "collection_id" not in updates and not entry.collection_id:
        updates["is_draft"] = True

    if not updates:
        raise ValueError("No valid fields to update.")

    updated = update_entry(entry_id, updates)
    if not updated:
        raise ValueError(f"Failed to update entry with ID {entry_id}")
    
    update_user_analytics_on_entry_update(updated, updates)

    return updated


def delete_entry_service(entry_id: int) -> bool:
    """Delete an entry by its ID."""
    entry = get_entry_by_id(entry_id)
    if not entry:
        raise EntryNotFound(id=entry_id)
    return delete_entry(entry_id)
