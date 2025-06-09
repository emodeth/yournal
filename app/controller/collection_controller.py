from flask import Blueprint, request, jsonify
from app.service.collection_service import (
    create_collection_service,
    get_all_collections_service,
    get_collection_by_id_service,
    get_parent_collection_service,
    get_child_collections_service,
    update_collection_service,
    delete_collection_service,
    get_collection_contents_service,
)

collection_bp = Blueprint("collection", __name__, url_prefix="/collections")

@collection_bp.route("/", methods=["POST"])
def create_collection():
    data = request.get_json()
    try:
        collection = create_collection_service(data)
        return jsonify({"id": collection.id}), 201
    except ValueError as e:
        return jsonify(error=str(e)), 400
    except Exception:
        return jsonify(error="Internal server error"), 500


@collection_bp.route("/", methods=["GET"])
def get_all_collections():
    collections = get_all_collections_service()
    result = [
        {"id": c.id, "name": c.name, "description": c.description, "parent_id": c.parent_id, "user_id": c.user_id}
        for c in collections
    ]
    return jsonify(result), 200


@collection_bp.route("/<int:collection_id>", methods=["GET"])
def get_collection_by_id(collection_id):
    collection = get_collection_by_id_service(collection_id)
    return jsonify({
        "id": collection.id,
        "name": collection.name,
        "description": collection.description,
        "parent_id": collection.parent_id,
        "user_id": collection.user_id
    }), 200


@collection_bp.route("/<int:collection_id>", methods=["PUT"])
def update_collection(collection_id):
    data = request.get_json()
    try:
        updated = update_collection_service(collection_id, **data)
        return jsonify({"id": updated.id}), 200
    except ValueError as e:
        return jsonify(error=str(e)), 400


@collection_bp.route("/<int:collection_id>", methods=["DELETE"])
def delete_collection(collection_id):
    try:
        result = delete_collection_service(collection_id)
        if result:
            return jsonify(message="Collection deleted"), 200
    except ValueError as e:
        return jsonify(error=str(e)), 404
    

@collection_bp.route("/<int:collection_id>/children", methods=["GET"])
def get_child_collections(collection_id):

    limit = request.args.get("limit", default=10, type=int)
    offset = request.args.get("offset", default=0, type=int)

    children = get_child_collections_service(collection_id, limit, offset)
    result = [{"id": c.id, "name": c.name, "description": c.description, "parent_id": c.parent_id} for c in children]
    return jsonify(result), 200


@collection_bp.route("/<int:collection_id>/parent", methods=["GET"])
def get_parent_collection(collection_id):
    try:
        parent = get_parent_collection_service(collection_id)
        if not parent:
            return jsonify(message="No parent collection found"), 200
        result = {
            "id": parent.id,
            "name": parent.name,
            "description": parent.description,
            "parent_id": parent.parent_id,
            "user_id": parent.user_id,
            "created_at": parent.created_at.isoformat() if parent.created_at else None,
            "updated_at": parent.updated_at.isoformat() if parent.updated_at else None,
        }
        return jsonify(result), 200
    except ValueError as e:
        return jsonify(error=str(e)), 404


@collection_bp.route("/<int:collection_id>/contents", methods=["GET"])
def get_collection_contents(collection_id):
    try:
        contents = get_collection_contents_service(collection_id)
        return jsonify(contents), 200
    except ValueError as e:
        return jsonify(error=str(e)), 404
