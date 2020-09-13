from flask import Blueprint
serve_frontend_bp = Blueprint('serve_frontend_bp', __name__)
from app.serve_frontend_bp import routes
