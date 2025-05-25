from typing import Optional, List
from app.models.users import User
from app.repository.user_repository import (
    get_user_by_id,
    get_all_users,
    get_user_by_email,
    create_user,
    update_user,
)

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

def get_user_by_id_service(user_id: int) -> Optional[User]:
    return get_user_by_id(user_id)

def get_all_users_service() -> List[User]:
    return get_all_users()

def update_user_service(user_id: int, **kwargs) -> Optional[User]:
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
    user = get_user_by_id(user_id)
    if not user:
        raise ValueError("User not found.")
    if not user.is_active:
        return False  # Already inactive
    return update_user(user_id, {"is_active": False}) # soft delete!