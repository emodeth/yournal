from app.models.user_analytics import UserAnalytics
from app.models.entries import Entry
from app.models.moods import Mood
from app.core.extensions import db
from sqlalchemy import func
from datetime import date, timedelta, datetime, timezone


def get_user_analytics_scores(user_id: int, days: int = 30):
    """
    Retrieve (date, average_score) pairs from UserAnalytics for the past `days` days.
    
    Args:
        user_id (int): ID of the user.
        days (int): Number of past days to include (default: 30).
        
    Returns:
        List[Tuple[date, float]]: A list of (date, average_score) tuples sorted by date ASC.
    """
    start_date = date.today() - timedelta(days=days)

    results = (
        db.session.query(UserAnalytics.date, UserAnalytics.average_score)
        .filter(
            UserAnalytics.user_id == user_id,
            UserAnalytics.date >= start_date
        )
        .order_by(UserAnalytics.date.asc())
        .all()
    )
    print(results)

    return results


def create_or_update_user_analytics(entry: Entry):
    analytics_date = entry.created_at.date()

    entries = (
        Entry.query
        .filter(
            Entry.user_id == entry.user_id,
            func.date(Entry.created_at) == analytics_date,
            Entry.mood_id.isnot(None),
            Entry.entry_mood_score.isnot(None)
        )
        .join(Mood, Mood.id == Entry.mood_id)
        .with_entities(Entry.entry_mood_score, Mood.mood_weight, Entry.mood_id)
        .all()
    )

    if not entries:
        return None

    weighted_sum = 0
    total_weight = 0

    for score, weight, _ in entries:
        weighted = score * weight
        weighted_sum += weighted
        total_weight += weight

    average_score = round(weighted_sum / total_weight, 2) if total_weight > 0 else None

    analytics = UserAnalytics.query.filter_by(user_id=entry.user_id, date=analytics_date).first()
    
    if not analytics:
        analytics = UserAnalytics(user_id=entry.user_id, date=analytics_date)

    analytics.average_score = average_score

    db.session.add(analytics)
    db.session.commit()
    return analytics


def update_user_analytics_on_entry_update(entry: Entry, updated_fields: dict):
    """
    Recalculate and update the user's analytics if the mood-related fields changed
    and the entry is still within the 24-hour update window.
    """
    mood_related_fields = {"mood_id", "entry_mood_score"}
    if not mood_related_fields.intersection(updated_fields.keys()):
        return

    now = datetime.now(timezone.utc)
    if (now - entry.created_at) > timedelta(hours=24):
        return
    
    create_or_update_user_analytics(entry)