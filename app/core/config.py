import os
from datetime import timedelta
from dotenv import load_dotenv
from redis import Redis

load_dotenv()


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

    # Configure session management
    SESSION_TYPE = 'redis'
    SESSION_REDIS = Redis(host=os.getenv('REDIS_HOST', 'localhost'),port=int(os.getenv('REDIS_PORT', 6379)))
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = False 
    SESSION_KEY_PREFIX = 'session:'
    SESSION_COOKIE_NAME = 'my_session'
    # SESSION_FILE_DIR = './api/sessions'
    SESSION_COOKIE_SECURE = True  
    PERMANENT_SESSION_LIFETIME = timedelta(days=int(os.getenv('PERMANENT_SESSION_LIFETIME', 3)))