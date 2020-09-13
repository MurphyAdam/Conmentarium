import datetime
from marshmallow import Schema, fields, ValidationError

class UserSchema(Schema):
	id = fields.Integer(dump_only=True)
	username = fields.String()
	notes_count = fields.Integer()
	registered_on = fields.DateTime(dump_only=True)

class TagSchema(Schema):
	id = fields.Integer(dump_only=True)
	name = fields.String()

class NoteSchema(Schema):
	id = fields.Integer(dump_only=True)
	title = fields.String()
	body = fields.String()
	color = fields.String()
	tags = fields.String(attribute='tags_string')
	date_created = fields.DateTime(dump_only=True)
	date_updated = fields.DateTime(dump_only=True)

user_schema = UserSchema()
users_schema = UserSchema(many=True)

note_schema = NoteSchema()
notes_schema = NoteSchema(many=True)

tag_schema = TagSchema()
tags_schema = TagSchema(many=True)