from flask import Blueprint
errors_bp = Blueprint('errors_bp', __name__)
from server.errors_bp import handlers
