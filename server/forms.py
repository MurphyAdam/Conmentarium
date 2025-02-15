import re

from flask import flash
from flask_login import current_user
from validator_collection import validators, checkers, errors

from server.models import User, Notes
from server.functions import is_empty


def is_valid_password(password):
    if password and not is_empty(password, minimum=8):
        return True
    return False


def is_valid_username(username):
    pattern = r'^[A-Za-z0-9_]*$'
    valid = re.search(pattern, username)
    if (username and valid) and not is_empty(username, minimum=4) and len(username) < 30:
        return True
    else:
        return False

def signin_validator(email_or_username, password):
    errors = list()
    if email_or_username and checkers.is_string(email_or_username):
        user = User.query.filter(
            (User.email == email_or_username) | 
            (User.username == email_or_username)
            ).first()
        if user:
            if not user.check_password(password):
                errors.append("Password is incorrect.")
        else:
            errors.append("No account with this email/ username exists.")
    else:
        errors.append("Email or password is invalid")
    if len(errors) == 0:
        return True, errors, user
    if len(errors) > 0:
        return False, errors, None

def signup_validator(username, email, password):
    errors = list()
    if email and checkers.is_email(email):
        check_email = User.query.filter_by(email=email).first()
        if not check_email:
            pass
        else:
            errors.append("An account is already registred with this email.")
    else:
        errors.append("Email is invalid.")
    if username and checkers.is_string(username):
        user = User.query.filter(User.username==username).first()
        if user:
            errors.append("An account is already registered with this username.")
    if password and is_valid_password(password):
        pass
    else:
        errors.append("Password is invalid: must be 8 characters \
            minimum and a mixture of both letters and numbers.")
    if len(errors) == 0:
        return True, errors, user
    if len(errors) > 0:
        return False, errors, None

def notes_validator(title, 
    body, 
    color,
    tags):
    errors = list()
    if title:
        if not is_empty(title, minimum=1):
            pass
        else:
            errors.append("Title is invalid. Must be a string of 1 characters minimum.")        
    if body and not is_empty(body, minimum=1):
        pass
    else:
        errors.append("Body is invalid: must be 1 characters minimum.")
    if color:
        if not checkers.is_string(color):
            pass
    else:
        errors.append("Color is invalid. Must be string.")
    if tags:
        if not is_empty(tags, minimum=2):
            pass
        else:
            errors.append("Tags is invalid. Must be at least one tag of two characters minimum.")    
    if len(errors) == 0:
        return True, errors
    if len(errors) > 0:
        return False, errors

