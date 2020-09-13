from flask import jsonify
from werkzeug.http import HTTP_STATUS_CODES
from server.api_bp import api_bp
from server.exceptions import ValidationError

def api_json_response(status_code, message=None, extra_data=None):
    payload = {'status': HTTP_STATUS_CODES.get(status_code, 'Unknown error')}
    if message:
        payload['message'] = message
    if extra_data:
        payload['extra_data'] = extra_data
    response = jsonify(payload)
    response.status_code = status_code
    return response

def okay(message):
    return api_json_response(200, message)

def bad_request(message):
    return api_json_response(400, message)

def unauthorized(message):
    return api_json_response(401, message)


def enternal_server_error(message):
    return api_json_response(500, message)


def method_not_allowed(message):
    return api_json_response(405, message)


@api_bp.errorhandler(ValidationError)
def validation_error(e):
	return bad_request(e.args[0])