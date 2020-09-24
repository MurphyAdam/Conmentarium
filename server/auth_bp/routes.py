# -*- coding: utf-8 -*-
from flask import request
from flask_login import login_required, logout_user, current_user, login_user

from server.forms import signin_validator, signup_validator

from server.models import User
from server import db
from server.auth_bp import auth_bp
from server.schemas import user_schema

@auth_bp.route("/signin", methods=["POST"])
def signin():
    json_data = request.get_json()
    email_or_username = json_data.get("emailOrUsername")
    password = json_data.get("password")
    validate = signin_validator(email_or_username, password)
    """
    signin_validator() method validates user signin credits.
    if validation is a success, it returns three objects:
    True, errors, user_to_login
    obj:1: Bolean True: validation is a success
    obj:2: list of errors. In this case an empty list.
    obj:3: a user object: used to login the user.
    if validation fails, it returns also three objects:
    obj:1: Bolean False: validation is a failure
    obj:2: list of errors.
    obj:3: None
    """
    if not validate[0]:
        return {
                    "code": 400,
                    "message":"Please review the errors", 
                    "success": False,
                    "errors": validate[1],
                }, 400
    user = validate[2]
    login_user(user, remember=True)
    return {
                "code": 200,
                "message":"successfully logged-in", 
                "success": True,
                "user": user_schema.dump(user),
            }, 200

@auth_bp.route("/signup", methods=["POST"])
def signup():
    json_data = request.get_json()
    username = json_data.get("username")
    email = json_data.get("email")
    password = json_data.get("password")
    validate = signup_validator(username, 
        email,
        password)
    """
    The signup_validator() method returns two values:
    param:1: Bolean type: True if validation successed, False otherwise
    param:2: List type: List of errors in both cases. Empty if Bolean is True.
    """
    if not validate[0]:
        return {
                    "code": 400,
                    "message":"Please review the errors", 
                    "success": False,
                    "errors": validate[1],
                }, 400
    add_user = User(username=username, email=email)
    add_user.set_password(password)
    db.session.add(add_user)
    db.session.commit()
    return {
                "code": 200,
                "message":"Your account was successfully created!", 
                "success": True,
            }, 200

@auth_bp.route('/logout')
@login_required
def signout():
    try:
        logout_user()
        return {
                    "code": 200,
                    "message":"successfully logged-out", 
                    "success": True,
                    "user": None
                }, 200
    except Exception:
        return {
                    "code": 400,
                    "message":"Could not logout.", 
                    "success": True,
                    "user": None
                }, 400

@auth_bp.route('/current_user/<int:id>')
def user_is_authenticated(id):
    if id:
        if current_user.is_authenticated:
            if current_user.id == int(id):
                return {
                            "code": 200,
                            "authenticated": True,
                            "message":"User is logged-in", 
                            "success": True,
                            "user": user_schema.dump(current_user),
                        }, 200
    return {
                "code": 400,
                "authenticated": False,
                "message":"Either user id missing or you are not authenticated.", 
                "success": False,
                "user": None
            }, 400
