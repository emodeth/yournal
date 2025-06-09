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
        return jsonify(collection.to_dict()), 201
    except ValueError as e:
        return jsonify(error=str(e)), 400
    except Exception:
        return jsonify(error="Internal server error"), 500


@collection_bp.route("/", methods=["GET"])
def get_all_collections():
    collections = get_all_collections_service()
    result = [c.to_dict()for c in collections]
    return jsonify(result), 200


@collection_bp.route("/<int:collection_id>", methods=["GET"])
def get_collection_by_id(collection_id):
    collection = get_collection_by_id_service(collection_id)
    return jsonify(collection.to_dict()), 200


@collection_bp.route("/<int:collection_id>", methods=["PUT"])
def update_collection(collection_id):
    data = request.get_json()
    try:
        updated = update_collection_service(collection_id, **data)
        return jsonify(updated.to_dict()), 200
    except ValueError as e:
        return jsonify(message=str(e)), 400


@collection_bp.route("/<int:collection_id>", methods=["DELETE"])
def delete_collection(collection_id):
    try:
        result = delete_collection_service(collection_id)
        if result:
            return jsonify(message="Collection deleted"), 200
    except ValueError as e:
        return jsonify(message=str(e)), 404
    

@collection_bp.route("/<int:collection_id>/children", methods=["GET"])
def get_child_collections(collection_id):

    limit = request.args.get("limit", default=10, type=int)
    offset = request.args.get("offset", default=0, type=int)

    children = get_child_collections_service(collection_id, limit, offset)
    result = [c.to_dict() for c in children]
    return jsonify(result), 200


@collection_bp.route("/<int:collection_id>/parent", methods=["GET"])
def get_parent_collection(collection_id):
    try:
        parent = get_parent_collection_service(collection_id)
        if not parent:
            return jsonify(message="No parent collection found"), 200
        return jsonify(parent.to_dict()), 200
    except ValueError as e:
        return jsonify(message=str(e)), 404


@collection_bp.route("/<int:collection_id>/contents", methods=["GET"])
def get_collection_contents(collection_id):
    try:
        contents = get_collection_contents_service(collection_id)
        return jsonify(contents), 200
    except ValueError as e:
        return jsonify(message=str(e)), 404
