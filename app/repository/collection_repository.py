from typing import List, Optional
from sqlalchemy.exc import SQLAlchemyError
from app.core.extensions import db
from app.models.collections import Collection


def get_collection_by_id(collection_id: int) -> Optional[Collection]:
    return Collection.query.get(collection_id)


def get_all_collections() -> List[Collection]:
    return Collection.query.all()


# def get_collections_by_filter(**filters) -> List[Collection]:
#     return Collection.query.filter_by(**filters).all()

def get_collections_by_filter(limit=None, offset=None, order_by=None, **filters) -> List[Collection]:
    query = Collection.query.filter_by(**filters)
    
    if order_by is not None:
        query = query.order_by(order_by)
    if offset is not None:
        query = query.offset(offset)
    if limit is not None:
        query = query.limit(limit)
    
    return query.all()

def create_collection(data: dict) -> Optional[Collection]:
    try:
        collection = Collection(**data)
        db.session.add(collection)
        db.session.commit()
        return collection
    except SQLAlchemyError:
        db.session.rollback()
        return None


def update_collection(collection_id: int, updates: dict) -> Optional[Collection]:
    collection = get_collection_by_id(collection_id)
    if not collection:
        return None

    for key, value in updates.items():
        if hasattr(collection, key) and value is not None:
            setattr(collection, key, value)

    try:
        db.session.commit()
        return collection
    except SQLAlchemyError:
        db.session.rollback()
        return None


def delete_collection(collection_id: int) -> bool:
    collection = get_collection_by_id(collection_id)
    if not collection:
        return False

    try:
        db.session.delete(collection)
        db.session.commit()
        return True
    except SQLAlchemyError:
        db.session.rollback()
        return False
