from flask import Blueprint, request, jsonify
from app.service.user_service import (
    create_user_service,
    get_user_by_id_service,
    get_all_users_service,
    update_user_service,
    delete_user_service,
    get_collections_by_user_id,
    get_user_dashboard_data
)
from app.service.entry_service import get_entries_by_user_service


user_bp = Blueprint("user", __name__, url_prefix="/users")

@user_bp.route("/", methods=["POST"])
def create_user():
    data = request.get_json()
    try:
        user = create_user_service(data)
        return jsonify(user_id=user.id), 201
    except ValueError as e:
        return jsonify(error=str(e)), 400
    except Exception:
        return jsonify(error="Internal server error"), 500

@user_bp.route("/", methods=["GET"])
def get_all_users():
    users = get_all_users_service()
    return jsonify([{"id": u.id, "email": u.email, "name": u.name} for u in users]), 200

@user_bp.route("/<int:user_id>", methods=["GET"])
def get_user_by_id(user_id):
    user = get_user_by_id_service(user_id)
    return jsonify({"id": user.id, "email": user.email, "name": user.name, "default_collection_id":user.default_collection_id}), 200

@user_bp.route("/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json()
    try:
        user = update_user_service(user_id, **data)
        return jsonify(user_id=user.id), 200
    except ValueError as e:
        return jsonify(error=str(e)), 400

@user_bp.route("/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        result = delete_user_service(user_id)
        if result:
            return jsonify(message="User deactivated"), 200
        else:
            return jsonify(message="User already inactive"), 200
    except ValueError as e:
        return jsonify(error=str(e)), 404

@user_bp.route("/<int:user_id>/entries", methods=["GET"])
def get_entries_by_user(user_id):
    draft = request.args.get("draft")
    limit = request.args.get("limit", default=10, type=int)
    offset = request.args.get("offset", default=0, type=int)

    if draft is not None:
        if draft.lower() == "true":
            is_draft = True
        elif draft.lower() == "false":
            is_draft = False
        else:
            return jsonify(error="Invalid draft filter. Use true or false."), 400
    else:
        is_draft = None

    try:
        entries = get_entries_by_user_service(
            user_id=user_id,
            is_draft=is_draft,
            limit=limit,
            offset=offset
        )
        return jsonify([entry.to_dict() for entry in entries]), 200
    except ValueError as e:
        return jsonify(error=str(e)), 404


@user_bp.route("/<int:user_id>/collections", methods=["GET"])
def get_collections_by_user(user_id):
    try:
        limit = request.args.get("limit", default=10, type=int)
        offset = request.args.get("offset", default=0, type=int)

        collections = get_collections_by_user_id(user_id=user_id, limit=limit, offset=offset)
        return jsonify(collections), 200
    except ValueError as e:
        return jsonify(error=str(e)), 404
    

@user_bp.route("/<int:user_id>/dashboard", methods=["GET"])
def get_analytics_by_user(user_id):
    days = request.args.get("days", default=30, type=int)
    data = get_user_dashboard_data(user_id, days)
    return jsonify(data)