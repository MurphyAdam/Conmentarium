from flask import Blueprint
serve_frontend_bp = Blueprint('serve_frontend_bp', __name__)
from server.serve_frontend_bp import routes
