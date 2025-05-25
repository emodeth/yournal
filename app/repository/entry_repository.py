from typing import List, Optional
from sqlalchemy.exc import SQLAlchemyError
from app.core.extensions import db
from app.models.entries import Entry

def get_entry_by_id(entry_id: int) -> Optional[Entry]:
    return Entry.query.get(entry_id)

def get_all_entries() -> List[Entry]:
    return Entry.query.all()

def get_entries_by_filter(**filters) -> List[Entry]:
    return Entry.query.filter_by(**filters).all()

def create_entry(data: dict) -> Optional[Entry]:
    try:
        entry = Entry(**data)
        db.session.add(entry)
        db.session.commit()
        return entry
    except SQLAlchemyError:
        db.session.rollback()
        return None

def update_entry(entry_id: int, updates: dict) -> Optional[Entry]:
    entry = get_entry_by_id(entry_id)
    if not entry:
        return None
    for key, value in updates.items():
        if hasattr(entry, key) and value is not None:
            setattr(entry, key, value)
    try:
        db.session.commit()
        return entry
    except SQLAlchemyError:
        db.session.rollback()
        return None

def delete_entry(entry_id: int) -> bool:
    entry = get_entry_by_id(entry_id)
    if not entry:
        return False
    try:
        db.session.delete(entry)
        db.session.commit()
        return True
    except SQLAlchemyError:
        db.session.rollback()
        return False
