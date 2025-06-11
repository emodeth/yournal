from typing import Optional, List
from app.models import User, Collection, Entry
from app.core.exceptions import UserNotFound
from app.service.collection_service import create_collection
from app.repository.user_repository import (
    get_user_by_id,
    get_all_users,
    get_user_by_email,
    create_user,
    update_user,
    get_average_mood_score_by_user_id,
    get_total_collection_count_by_user_id,
    get_total_entry_count_by_user_id,
    get_streak_day_count_by_user_id
)
from app.repository.collection_repository import get_collections_by_filter
from app.repository.entry_repository import get_entries_by_filter
from app.repository.user_analytics import get_user_analytics_scores



def create_user_service(data: dict) -> User:
    """
    Create a new user with validation and password hashing.
    """
    required_fields = ["email", "password"]
    missing = [field for field in required_fields if not data.get(field)]
    if missing:
        raise ValueError(f"Missing required fields: {', '.join(missing)}")

    if get_user_by_email(data["email"]):
        raise ValueError("A user with this email already exists.")

    user = User(email=data["email"], name=data.get("name"))
    user.set_password(data["password"])
    if data.get("image_url"):
        user.image_url = data["image_url"]

    created = create_user({
        "email": user.email,
        "name": user.name,
        "pwd_hash": user.pwd_hash,
        "image_url": user.image_url,
        "is_active": True,
    })
    if not created:
        raise ValueError("Failed to create user due to database error.")
    
    draft_collection = create_collection({
        "user_id":created.id,
        "name": "General",
        "description":"Default collection to start with."
    })

    if not draft_collection:
        raise ValueError("Failed to create drafts collection")
    
    created.default_collection_id = draft_collection.id

    updated_user = update_user(created.id, {"default_collection_id":draft_collection.id})

    if not updated_user:
        raise ValueError("Failed to update user with drafts collection")

    return updated_user


def get_user_by_id_service(user_id: int) -> User:
    user = get_user_by_id(user_id=user_id)
    if not user:
        raise UserNotFound(id=user_id)
    return user

def get_all_users_service() -> List[User]:
    return get_all_users()

def update_user_service(user_id: int, **kwargs) -> Optional[User]:
    user = get_user_by_id(user_id=user_id)
    if not user:
        raise UserNotFound(id=user_id)
    
    allowed_fields = {"email", "name", "image_url", "is_active"}
    updates = {k: v for k, v in kwargs.items() if k in allowed_fields and v is not None}

    if "password" in kwargs:
        password = kwargs.pop("password")
        if password:
            user = get_user_by_id(user_id)
            if not user:
                raise ValueError("User not found.")
            user.set_password(password)
            updates["pwd_hash"] = user.pwd_hash

    if not updates:
        raise ValueError("No valid fields to update.")
    
    updated = update_user(user_id, updates)
    if not updated:
        raise ValueError("Failed to update user.")
    return updated

def delete_user_service(user_id: int) -> bool:
    user = get_user_by_id(user_id=user_id)
    if not user:
        raise UserNotFound(id=user_id)
    if not user.is_active:
        return False  # Already inactive
    return update_user(user_id, {"is_active": False}) # soft delete!

def get_collections_by_user_id(user_id:int) -> List[Collection]:
    user = get_user_by_id(user_id=user_id)
    if not user:
        raise UserNotFound(id=user_id)
    
    collections = get_collections_by_filter(user_id=user.id)

    serialized = [{"id":c.id,"name":c.name}for c in collections]

    return serialized

def get_collections_by_user_id(user_id: int, limit: int = None, offset: int = None) -> List[dict]:
    user = get_user_by_id(user_id=user_id)
    if not user:
        raise UserNotFound(id=user_id)

    collections = get_collections_by_filter(user_id=user.id, limit=limit, offset=offset)
    if not collections:
        return []

    serialized = []
    for c in collections:
        entries = get_entries_by_filter(collection_id=c.id, order_by=Entry.updated_at.desc())
        latest = entries[0] if entries else None
        entry_count = len(entries)

        latest_entry = None
        if latest:
            latest_entry = {
                "id": latest.id,
                "title": latest.title,
                "updated_at": latest.updated_at.isoformat() if latest.updated_at else None
            }

        serialized.append({
            "id": c.id,
            "name": c.name,
            "description": c.description,
            "entry_count": entry_count,
            "latest_entry": latest_entry,
            "entries":[e.to_dict() for e in entries]
        })

    return serialized

def get_user_dashboard_data(user_id: int, days: int = 30):
    user = get_user_by_id(user_id)
    if not user:
        raise UserNotFound(id=user_id)

    data_points = get_user_analytics_scores(user_id=user_id, days=days)
    return {
        "chart_data": [{"date": d.isoformat(), "score": s} for d, s in data_points],
        "total_entries": get_total_entry_count_by_user_id(user_id),
        "total_collections": get_total_collection_count_by_user_id(user_id),
        "average_mood": get_average_mood_score_by_user_id(user_id),
        "streak_days": get_streak_day_count_by_user_id(user_id)
    }