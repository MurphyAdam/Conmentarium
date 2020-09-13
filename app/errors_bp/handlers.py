from flask import request
from app.errors_bp import errors_bp
from app.api_bp.errors import api_json_response
from app import db

##########################  HTTP ERRORS ###########################

def wants_json_response():
    return request.accept_mimetypes['application/json'] >= \
        request.accept_mimetypes['text/html']

def wants_html_response():
    return request.accept_mimetypes['text/html'] > request.accept_mimetypes['application/json']


@errors_bp.app_errorhandler(404)
def page_not_found(e):
    return api_json_response(404)


@errors_bp.app_errorhandler(405)
def method_not_allowed(e):
    return api_json_response(405)


@errors_bp.app_errorhandler(500)
def internal_server_error(e):
    db.session.rollback()
    return api_json_response(500)

@errors_bp.app_errorhandler(403)
def forbidden(e):
    return api_json_response(403)


@errors_bp.app_errorhandler(400)
def bad_request(e):
    return api_json_response(400)


@errors_bp.app_errorhandler(401)
def unauthorized(e):
    return api_json_response(401)
