# -*- coding: utf-8 -*-
import os
import jwt
import json
import base64

from datetime import datetime, timedelta
import datetime as dt
from time import time
from hashlib import md5

from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import Flask, url_for
from flask import current_app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, desc, distinct
from sqlalchemy.ext.hybrid import Comparator, hybrid_property
from flask_login import UserMixin, AnonymousUserMixin, current_user
from server import db, login_manager


@login_manager.user_loader
def load_user(user_id):
    """Check if user is logged-in on every page load."""
    if user_id is not None:
        return User.query.get(int(user_id))
    return None

note_tag = db.Table('tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
    db.Column('note_id', db.Integer, db.ForeignKey('notes.id'))
    )

class User(UserMixin, db.Model):

    __table_args__ = {'extend_existing': True}
    id = db.Column('id',db.Integer , primary_key=True)
    username = db.Column('username', db.String(), unique=False , index=True)
    email = db.Column('email',db.String(),unique=True , index=True)
    password = db.Column('password' , db.String())
    registered_on = db.Column('registered_on' , db.DateTime(timezone=True), server_default=func.now())
    notes = db.relationship('Notes', backref='author', lazy='dynamic', cascade="all, delete-orphan")
    trashed_notes = db.relationship('Trash', backref='author', lazy='dynamic', cascade="all, delete-orphan")

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def generate_confirmation_token(self, expiration=3600):
        s = Serializer(current_app.config['SECRET_KEY'], expiration)
        return s.dumps({'confirm': self.id})

    def confirm(self, token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except:
            return False
        if data.get('confirm') != self.id:
            return False
        self.confirmed = True
        db.session.add(self)
        return True

    def avatar(self, size=128):
        return 'https://www.gravatar.com/avatar/?d=monsterid&s={}'.format(size)

    @property
    def _links(self):
        return {'avatar': self.avatar(128)}

    def get_notes(self):
        notes = self.notes.limit(50).all()
        return notes

    def get_note(self, note_id):
        return self.notes.filter_by(id=note_id).first()

    def delete_note(self, note_id):
        note = self.notes.filter_by(id=note_id).first()
        if note:
            db.session.delete(note)

    def update_note(self, note_id, title=None, body=None, color=None, tags_string=None):
        return self.notes.filter_by(id=note_id).update(
            { 
                Notes.title:title,
                Notes.body: body,
                Notes.color: color,
                Notes.tags_string: tags_string
            })

    def move_note_to_trash(self, note):
        if note:
            trashed_note = Trash(
                user_id=self.id, 
                title=note.title, 
                body=note.body, 
                color=note.color,
                tags_string=note.tags_string)
            db.session.add(trashed_note)
            self.delete_note(note.id)
            db.session.commit()
            return trashed_note
        return None

    def restore_from_trash(self, note_id):
        trashed_note = self.get_trashed_note(note_id)
        if trashed_note:
            note = Notes(
                user_id=self.id, 
                title=trashed_note.title, 
                body=trashed_note.body, 
                color=trashed_note.color,
                tags_string=trashed_note.tags_string)
            db.session.add(note)
            self.delete_trashed_notes(note_id=note_id)
            db.session.commit()
            return note
        return None

    def get_trashed_notes(self):
        notes = self.trashed_notes.limit(50).all()
        return notes

    def get_trashed_note(self, note_id):
        return self.trashed_notes.filter_by(id=note_id).first()

    def delete_trashed_notes(self, note_id=None, all=False):
        if not note_id and not all:
            return None
        if note_id:
            self.trashed_notes.filter_by(id=note_id).delete()
        if all:
            self.trashed_notes.delete()
        db.session.commit()

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    def __repr__(self):
        return '<User %r>' % (self.username)

class AnonymousUser(AnonymousUserMixin):

    @property
    def is_admin(self):
        return False

class CaseInsensitiveComparator(Comparator):
    def __eq__(self, other):
        return func.lower(self.__clause_element__()) == func.lower(other)

class Tag(db.Model):
    __table_args__ = {'extend_existing': True}
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, unique=True, nullable=False)
    notes = db.relationship('Notes', secondary = note_tag, back_populates = "tags")

class Notes(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String)
    body = db.Column(db.Text)
    color = db.Column(db.String)
    tags_string = db.Column(db.String())
    tags = db.relationship('Tag',secondary=note_tag, 
                        back_populates="notes", single_parent=True, cascade="all, delete-orphan")
    date_created = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    date_updated = db.Column(db.DateTime, onupdate=datetime.utcnow, default=datetime.utcnow)

    @property
    def is_trash(self):
        return False

    def __repr__(self):
        return '<Notes %r>' % self.title

class Trash(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String)
    body = db.Column(db.Text)
    color = db.Column(db.String)
    tags_string = db.Column(db.String())
    date_created = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    @property
    def is_trash(self):
        return True

    def __repr__(self):
        return '<Trash %r>' % self.title
