import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from datetime import datetime, timedelta, timezone
import random
from app.core.extensions import db
from app.models.users import User
from app.models.entries import Entry
from app.repository.user_analytics import  create_or_update_user_analytics
from werkzeug.security import generate_password_hash
from app.service.user_service import create_user_service


def seed_user_and_entries():
    # 1. Create test user
    data = {
        "email":"test3@test.com",
        "password":"test"
    }
    test_user = create_user_service(data)

    user_id = test_user.id
    print(f"Created user with ID: {user_id}")

    # 2. Create entries from May 11 to June 10
    start_date = datetime(2025, 5, 11, tzinfo=timezone.utc)

    all_entries = []
    for day_offset in range(31):
        day = start_date + timedelta(days=day_offset)

        # Random number of entries for the day (1 to 3)
        num_entries = random.randint(0, 3)

        for entry_index in range(num_entries):
            mood_id = random.choice([1, 2])  # Valid mood IDs
            score = random.randint(1, 10)

            entry = Entry(
                user_id=user_id,
                title=f"Entry {day_offset + 1}-{entry_index + 1}",
                content={"Content": "test"},
                cover_image="image_url",
                mood_id=mood_id,
                entry_mood_score=score,
                collection_id=None,
                is_draft=True,
                created_at=day,
            )

            db.session.add(entry)
            all_entries.append(entry)

        db.session.flush()  # Ensure entries get IDs so analytics can be calculated

        # Create or update analytics once per day after adding all entries
        for entry in all_entries[-num_entries:]:
            create_or_update_user_analytics(entry)

    db.session.commit()
    print("Seeded multiple entries per day and corresponding analytics.")


if __name__ == "__main__":
    from app import create_app
    app = create_app()
    
    with app.app_context():
        seed_user_and_entries()