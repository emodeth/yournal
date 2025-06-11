import os
from datetime import timedelta
from dotenv import load_dotenv
from redis import from_url, Redis

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    if not SECRET_KEY:
        raise ValueError("SECRET_KEY not set. Define it in your environment or .env file.")

    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    if not SQLALCHEMY_DATABASE_URI:
        raise ValueError("DATABASE_URL not set in environment.")

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # File handling
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

    # Session settings
    SESSION_TYPE = 'redis'

    redis_url = os.getenv('REDIS_URL')
    if redis_url:
        SESSION_REDIS = from_url(redis_url)
    else:
        SESSION_REDIS = Redis(
            host=os.getenv('REDIS_HOST', 'localhost'),
            port=int(os.getenv('REDIS_PORT', 6379))
        )

    SESSION_PERMANENT = os.getenv('SESSION_PERMANENT', 'False') == 'True'
    # SESSION_USE_SIGNER = os.getenv('SESSION_USE_SIGNER', 'False') == 'True'
    SESSION_KEY_PREFIX = os.getenv('SESSION_KEY_PREFIX', 'session:')
    SESSION_COOKIE_NAME = os.getenv('SESSION_COOKIE_NAME', 'my_session')

    # Secure cookie settings
    SESSION_COOKIE_SAMESITE = os.getenv('SESSION_COOKIE_SAMESITE', None)
    SESSION_COOKIE_SECURE = os.getenv('SESSION_COOKIE_SECURE') == 'True'

    # Session lifetime
    PERMANENT_SESSION_LIFETIME = timedelta(
        days=int(os.getenv('PERMANENT_SESSION_LIFETIME', 3))
    )
