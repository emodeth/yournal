from flask import Flask, session
from flask_cors import CORS
from .extensions import db, migrate, sess, login_manager, bcrypt
from .error_handlers import register_error_handlers
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Configure app management
    app.secret_key = app.config['SECRET_KEY']

    # Initialize extensions
    sess.init_app(app)  
    login_manager.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    from app import models # Ensures all models are visible to Flask-Migrate 
    from app.repository.user_repository import get_user_by_id

    @login_manager.user_loader
    def load_user(user_id):
        return get_user_by_id(user_id)
    
    CORS(app, resources={r"/*": {"origins": "https://yournal-83mj.vercel.app/"}}, supports_credentials=True)

    @app.route("/health")
    def health():
        return "Hello from Flask inside Docker(healthy)"
    
    register_error_handlers(app)
    
    from app.controller import mood_bp, entry_bp, user_bp, auth_bp, collection_bp
    app.register_blueprint(mood_bp)
    app.register_blueprint(entry_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(collection_bp)


    return app