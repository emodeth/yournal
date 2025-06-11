from typing import List, Optional
from app.core.extensions import db
from app.models import User, Entry, Collection, UserAnalytics
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import func
from datetime import datetime, timedelta, timezone



def get_user_by_id(user_id:int) -> Optional[User]:
    return User.query.get(user_id)

def get_all_users() -> List[User]:
    return User.query.filter_by(is_active=True).all()

def get_entries_by_filter(**filters) -> List[User]:
    return User.query.filter_by(**filters).all()

def get_user_by_email(email: str) -> Optional[User]:
    return User.query.filter_by(email=email).first()

def create_user(data: dict) -> Optional[User]:
    try:
        user = User(**data)
        db.session.add(user)
        db.session.commit()
        return user
    except SQLAlchemyError:
        db.session.rollback()
        return None

def update_user(user_id: int, updates: dict) -> Optional[User]:
    user = get_user_by_id(user_id)
    if not user:
        return None
    for key, value in updates.items():
        if hasattr(user, key) and value is not None:
            setattr(user, key, value)
    try:
        db.session.commit()
        return user
    except SQLAlchemyError:
        db.session.rollback()
        return None

def delete_user(user_id: int) -> bool:
    user = get_user_by_id(user_id)
    if not user:
        return False
    try:
        db.session.delete(user)
        db.session.commit()
        return True
    except SQLAlchemyError:
        db.session.rollback()
        return False
    
def get_total_entry_count_by_user_id(user_id: int) -> int:
    return db.session.query(Entry).filter(Entry.user_id == user_id).count()

def get_total_collection_count_by_user_id(user_id: int) -> int:
    return db.session.query(Collection).filter(Collection.user_id == user_id).count()


def get_average_mood_score_by_user_id(user_id: int) -> float | None:
    result = (
        db.session.query(func.avg(UserAnalytics.average_score))
        .filter(UserAnalytics.user_id == user_id)
        .scalar()
    )
    return round(result, 2) if result is not None else None


def get_streak_day_count_by_user_id(user_id: int) -> int:
    dates = (
        db.session.query(UserAnalytics.date)
        .filter(UserAnalytics.user_id == user_id)
        .distinct()
        .order_by(UserAnalytics.date.desc())
        .all()
    )

    date_list = [d[0] for d in dates]
    if not date_list:
        return 0

    streak = 0
    current_date = datetime.now(timezone.utc).date() - timedelta(days=1)

    for day in date_list:

        if day == current_date:
            streak += 1
            current_date -= timedelta(days=1)
        elif day == current_date + timedelta(days=1):  # Covers the case where today *is* used
            streak += 1
            current_date = day - timedelta(days=1)
        else:
            break

    return streak