from typing import Optional, List, Dict, Any
from app.models.collections import Collection
from app.repository.collection_repository import (
    get_collection_by_id,
    get_all_collections,
    get_collections_by_filter,
    create_collection,
    update_collection,
    delete_collection,
)
from app.repository.entry_repository import get_entries_by_filter


def create_collection_service(data: dict) -> Collection:
    """
    Create a new collection.
    Required: user_id
    Optional: parent_id, name, description
    """
    required_fields = ["user_id"]
    missing = [field for field in required_fields if not data.get(field)]
    if missing:
        raise ValueError(f"Missing required fields: {', '.join(missing)}")

    collection = create_collection(data)
    if not collection:
        raise ValueError("Failed to create collection.")
    return collection


def get_all_collections_service() -> List[Collection]:
    return get_all_collections()


def get_collection_by_id_service(collection_id: int) -> Optional[Collection]:
    return get_collection_by_id(collection_id)


def get_collections_by_user_service(user_id: int) -> List[Collection]:
    return get_collections_by_filter(user_id=user_id)


def get_child_collections_service(parent_id: int) -> List[Collection]:
    return get_collections_by_filter(parent_id=parent_id)


def get_parent_collection_service(collection_id: int) -> Optional[Collection]:
    collection = get_collection_by_id(collection_id)
    if not collection:
        raise ValueError(f"Collection with ID {collection_id} not found.")
    if not collection.parent:
        return None 
    return collection.parent


def update_collection_service(collection_id: int, **kwargs) -> Optional[Collection]:
    allowed_fields = {"name", "description", "parent_id"}
    updates = {k: v for k, v in kwargs.items() if k in allowed_fields and v is not None}

    if not updates:
        raise ValueError("No valid fields to update.")

    updated = update_collection(collection_id, updates)
    if not updated:
        raise ValueError("Failed to update collection.")
    return updated


def delete_collection_service(collection_id: int) -> bool:
    collection = get_collection_by_id(collection_id)
    if not collection:
        raise ValueError(f"Collection with ID {collection_id} not found.")
    return delete_collection(collection_id)


def get_collection_contents_service(collection_id: int) -> Dict[str, Any]:
    collection = get_collection_by_id(collection_id)
    if not collection:
        raise ValueError(f"Collection with ID {collection_id} not found.")

    entries = get_entries_by_filter(collection_id=collection_id)
    serialized_entries = [
        {"id": entry.id, "title": entry.title}
        for entry in entries
    ]

    serialized_subcollections = [
        {"id": child.id, "name": child.name}
        for child in collection.children
    ]

    return {
        "entries": serialized_entries,
        "collections": serialized_subcollections
    }
