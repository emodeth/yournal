from flask import Blueprint, request, jsonify, session
from flask_login import login_user, logout_user, login_required
from app.core.extensions import db
from app.core.extensions import bcrypt
from app.service.auth_service import validate_signup_data, validate_login_data 
from app.service.user_service import get_user_by_email, create_user_service
from app.service import auth_service
from flask_login import current_user

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    try:
        data = {
            "email":data.get('email'),
            "password":data.get('password'),
            "name":data.get('name')}
        
        user = create_user_service(data)
        login_user(user)
        return jsonify({"message": "Signup successful", "user": {"id": user.id, "email": user.email}}), 201
    except ValueError as e:
        return jsonify({"message": str(e)}), 409


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    try:
        user = auth_service.authenticate_user(
            email=data.get('email'),
            password=data.get('password')
        )
        login_user(user)
        return jsonify({"message": "Login successful", "user": {"id": user.id, "email": user.email}}), 200
    except ValueError as e:
        return jsonify({"message": str(e)}), 401
    except PermissionError as e:
        return jsonify({"message": str(e)}), 403


@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200


@auth_bp.route('/me', methods=['GET'])
@login_required
def get_current_user():
    
    return jsonify({
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.name,
        "is_authenticated": current_user.is_authenticated
    }), 200