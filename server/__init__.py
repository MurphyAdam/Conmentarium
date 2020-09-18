import logging, os
from logging.handlers import SMTPHandler, RotatingFileHandler
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_seasurf import SeaSurf
from flask_cors import CORS
from config import Config, Development

db = SQLAlchemy()
login_manager = LoginManager()
migrate = Migrate()
seasurf = SeaSurf()
cors = CORS()

login_manager.needs_refresh_message = (
    u"To protect your account, please reauthenticate (sign-out then sign-in) to access this page.")

def create_app(config_class=Config):
    """Construct the core application."""
    app = Flask(__name__, static_folder='../client/build/static', 
        instance_relative_config=False)
    # Application Configuration
    app.config.from_object(config_class)
    with app.app_context():
        # Initialize Plugins
        login_manager.init_app(app)
        db.init_app(app)
        migrate.init_app(app, db)
        seasurf.init_app(app)
        cors.init_app(app, resources={r'/api/*': {'origins': '*'}})
        # Initialize Global db
        db.create_all()
        # SERVE FRONTEND BP
        from server.serve_frontend_bp import serve_frontend_bp as serve_frontend_blueprint
        app.register_blueprint(serve_frontend_blueprint)
        # ERRORS BP
        from server.errors_bp import errors_bp as errors_blueprint
        app.register_blueprint(errors_blueprint)
        # Reginter API BP
        from server.api_bp import api_bp as api_blueprint
        app.register_blueprint(api_blueprint, url_prefix='/api')
        # AUTH API BP
        from server.auth_bp import auth_bp as auth_blueprint
        app.register_blueprint(auth_blueprint, url_prefix='/api/auth')
        # Configute Debugging
        if app.debug or app.testing:
            if app.config['LOG_TO_STDOUT']:
                stream_handler = logging.StreamHandler()
                stream_handler.setLevel(logging.INFO)
                app.logger.addHandler(stream_handler)
            else:
                if not os.path.exists('logs'):
                    os.mkdir('logs')
                file_handler = RotatingFileHandler('logs/conmentarium.log',
                                                   maxBytes=20480, backupCount=20)
                file_handler.setFormatter(logging.Formatter(
                    '%(asctime)s %(levelname)s: %(message)s '
                    '[in %(pathname)s:%(lineno)d]'))
                file_handler.setLevel(logging.INFO)
                app.logger.addHandler(file_handler)
            app.logger.setLevel(logging.INFO)
            app.logger.info('Conmentarium startup')
        return app
