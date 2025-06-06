from app.models.users import User
from app.core.extensions import db, bcrypt
from app.service.user_service import create_user
from app.repository.user_repository import get_user_by_email


def validate_signup_data(data: dict) -> dict:
    errors = {}
    if not data.get('email'):
        errors['email'] = 'Email is required'
    if not data.get('password'):
        errors['password'] = 'Password is required'
    if len(data.get('password', '')) < 6:
        errors['password'] = 'Password must be at least 6 characters long'
    return errors


def validate_login_data(data: dict) -> dict:
    errors = {}
    if not data.get('email'):
        errors['email'] = 'Email is required'
    if not data.get('password'):
        errors['password'] = 'Password is required'
    return errors


def authenticate_user(email: str, password: str) -> User:
    user = get_user_by_email(email)

    if not user:
        raise ValueError("Invalid email or password")

    if not user.check_password(password):
        raise ValueError("Invalid email or password")

    if not user.is_active:
        raise PermissionError("User account is deactivated")

    return user
