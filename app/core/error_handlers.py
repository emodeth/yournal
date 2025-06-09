from flask import jsonify
from app.core.exceptions import DomainException

def register_error_handlers(app):
    @app.errorhandler(DomainException)
    def handle_domain_exception(error):
        return jsonify(error.to_dict()), error.status_code

    @app.errorhandler(404)
    def handle_not_found(e):
        return jsonify({"error": "Route not found"}), 404

    @app.errorhandler(500)
    def handle_internal_error(e):
        return jsonify({"error": "Internal server error"}), 500
