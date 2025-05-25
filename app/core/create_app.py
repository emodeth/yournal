from flask import Flask, session
from flask_cors import CORS
from .extensions import db, migrate, sess, login_manager, bcrypt
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
    
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

    @app.route("/health")
    def health():
        return "Hello from Flask inside Docker(healthy)"
    
    from app.controller import mood_bp
    app.register_blueprint(mood_bp)

    return app