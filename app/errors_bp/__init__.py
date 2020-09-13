from flask import Blueprint
errors_bp = Blueprint('errors_bp', __name__)
from app.errors_bp import handlers
