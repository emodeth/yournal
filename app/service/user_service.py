from typing import Optional, List
from app.models import User, Collection, Entry
from app.core.exceptions import UserNotFound
from app.repository.user_repository import (
    get_user_by_id,
    get_all_users,
    get_user_by_email,
    create_user,
    update_user
)
from app.repository.collection_repository import get_collections_by_filter
from app.repository.entry_repository import get_entries_by_filter


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
    return created

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

    collections = get_collections_by_filter(user_id=user.id, parent_id=None, limit=limit, offset=offset)
    
    if not collections:
        return list()
    
    serialized = []
    for c in collections:
        latest_entry = (
            get_entries_by_filter(
                collection_id=c.id,
                order_by=Entry.updated_at.desc(),
                limit=1
            )
        )
        latest = latest_entry[0] if latest_entry else None

        serialized.append({
            "id": c.id,
            "name": c.name,
            "latest_entry": {
                "id": latest.id,
                "title": latest.title,
                "updated_at": latest.updated_at.isoformat()
            } if latest else None
        })

    return serialized