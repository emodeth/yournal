from flask import Blueprint, request, jsonify
from app.service.entry_service import (
    create_entry_service,
    get_all_entries_service,
    get_entry_by_id_service,
    get_entries_by_collection_service,
    update_entry_service,
    delete_entry_service,
)

entry_bp = Blueprint("entry", __name__, url_prefix="/entries")

@entry_bp.route("/", methods=["POST"])
def create_entry():
    data = request.get_json()
    try:
        entry = create_entry_service(data)
        return jsonify(entry_id=entry.id), 201
    except ValueError as e:
        return jsonify(error=str(e)), 400
    except Exception as e:
        return jsonify(error="Internal server error"), 500

@entry_bp.route("/", methods=["GET"])
def get_all_entries():
    entries = get_all_entries_service()
    return jsonify([entry.to_dict() for entry in entries]), 200

@entry_bp.route("/<int:entry_id>", methods=["GET"])
def get_entry_by_id(entry_id):
    entry = get_entry_by_id_service(entry_id)
    if not entry:
        return jsonify(error="Entry not found"), 404
    return jsonify(entry.to_dict()), 200


@entry_bp.route("/<int:entry_id>", methods=["PUT"])
def update_entry(entry_id):
    data = request.get_json()
    try:
        entry = update_entry_service(entry_id, **data)
        return jsonify(entry.to_dict()), 200
    except ValueError as e:
        return jsonify(error=str(e)), 400

@entry_bp.route("/<int:entry_id>", methods=["DELETE"])
def delete_entry(entry_id):
    try:
        delete_entry_service(entry_id)
        return jsonify(message="Entry deleted"), 200
    except ValueError as e:
        return jsonify(error=str(e)), 404