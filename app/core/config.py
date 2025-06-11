import os
from datetime import timedelta
from dotenv import load_dotenv
from redis import from_url as redis_from_url

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

    # Session configuration
    SESSION_TYPE = 'redis'
    SESSION_REDIS = redis_from_url(os.getenv('REDIS_URL', 'redis://localhost:6379'))
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = os.getenv('SESSION_USE_SIGNER', 'False').lower() == 'true'
    SESSION_KEY_PREFIX = 'session:'
    SESSION_COOKIE_NAME = 'my_session'
    SESSION_COOKIE_SAMESITE = os.getenv('SESSION_COOKIE_SAMESITE', 'Lax')
    SESSION_COOKIE_SECURE = os.getenv('SESSION_COOKIE_SECURE', 'False').lower() == 'true'

    PERMANENT_SESSION_LIFETIME = timedelta(days=int(os.getenv('PERMANENT_SESSION_LIFETIME', 3)))
