from flask import Blueprint, request, jsonify
from app.service.mood_service import (
    create_mood_service,
    get_all_moods_service,
    get_mood_by_id_service,
    get_mood_by_type_service,
    update_mood_service,
    delete_mood_service,
)

mood_bp = Blueprint("mood",__name__, url_prefix="/moods")

@mood_bp.route("/", methods=["GET"])
def get_all_moods():
    moods = get_all_moods_service()
    return jsonify([m.to_dict() for m in moods]), 200

@mood_bp.route("/<int:mood_id>", methods=["GET"])
def get_mood_by_id(mood_id):
    mood = get_mood_by_id_service(mood_id)
    if not mood:
        return jsonify({"error": "Mood not found"}), 404
    return jsonify(mood.to_dict()), 200

@mood_bp.route("/type/<string:mood_type>", methods=["GET"])
def get_mood_by_type(mood_type):
    mood = get_mood_by_type_service(mood_type)
    if not mood:
        return jsonify({"error": "Mood not found"}), 404
    return jsonify(mood.to_dict()), 200

@mood_bp.route("/", methods=["POST"])
def create_mood():
    data = request.get_json()
    mood_type = data.get("type")
    emoji = data.get("emoji")
    try:
        mood = create_mood_service(mood_type, emoji)
        return jsonify(mood.to_dict()), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400


@mood_bp.route("/<int:mood_id>", methods=["PUT"])
def update_mood(mood_id):
    data = request.get_json()
    try:
        mood = update_mood_service(mood_id, **data)
        return jsonify(mood.to_dict()), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    

@mood_bp.route("/<int:mood_id>", methods=["DELETE"])
def delete_mood(mood_id):
    delete_mood_service(mood_id)
    return jsonify({"message": "Mood deleted"}), 200