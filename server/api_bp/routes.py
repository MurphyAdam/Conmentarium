from datetime import datetime
from flask import request
from flask_login import login_required, current_user
from server.api_bp import api_bp
from server.schemas import note_schema, notes_schema
from server.forms import notes_validator
from server.functions import is_empty
from server.models import Notes, Tag
from server import db

@api_bp.route("/handshake")
def handshake():
    time = datetime.utcnow()
    return {
            "code": 200,
            "message": "Hello, honey. It's time for server handshake :-(", 
            "time": time,
        }, 200

@api_bp.route('/notebook', methods=["GET", "POST"])
@login_required
def gp_notebook():
	if request.method == "GET":
		notes = current_user.get_notes()
		if notes:
			return {
				"code": 200,
				"message":"Notes retrieved", 
				"success": True,
				"notes": notes_schema.dump(notes),
				}, 200
		return {
			"code": 200,
			"message":"No Notes found", 
			"success": True,
			"notes": None,
			}, 200
	if request.method == "POST":
		json_data = request.get_json()
		title = json_data.get("title")
		body = json_data.get("body")
		color = json_data.get("color")
		tags = json_data.get("tags")
		validate = notes_validator(title, 
		body, 
		color, 
		tags)
		if not validate[0]:
			return {
				"code": 400,
				"message":"Please review the errors", 
				"success": False,
				"errors": validate[1],
				}, 400
		if is_empty(tags, minimum=2):
			tags = None
		else:
			tags = [notes.tags.append(add_tags(tag.strip())) for tag in tags.split(",")]
		note = Notes(
			user_id=current_user.id, 
			title=title, 
			body=body, 
			color=color,
			tags_string=tags)
		db.session.add(note)
		db.session.commit()
		if note:
			return {"code": 200,
				"message":"Note added successfully!", 
				"success": True,
				"note_id": note.id
				}, 200
		return {    
			"code": 400,
			"message":"Could not add to database. "
			"Might be an enternal error. Please try again later.", 
			"success": False,
			"note_id": None
			}, 400

@api_bp.route('/notebook/<int:id>', methods=["GET", "PUT", "DELETE"])
@login_required
def gpd_notebooks(id):
	note = current_user.get_note(id)
	if not note:
	  return {
      "code": 404,
      "message":"note with that id was not found", 
      "success": False,
      "category":"is-warning",
      "note_id": id, 
  }, 404
	if request.method == "GET":
		if note:
			return {
				"code": 200,
				"message":"Notes retrieved", 
				"success": True,
				"note": note_schema.dump(note),
			}, 200
	if request.method == "PUT":
		json_data = request.get_json()
		title = json_data.get("title")
		body = json_data.get("body")
		color = json_data.get("color")
		tags = json_data.get("tags")
		validate = notes_validator(title, 
			body, 
			color, 
			tags)
		if not validate[0]:
			return {
				"code": 400,
				"message":"Please review the errors", 
				"success": False,
				"errors": validate[1],
				}, 400
		if is_empty(tags, minimum=2):
			tags = None
		else:
			tags = [note.tags.append(add_tags(tag.strip())) for tag in tags.split(",")]
		update_note = current_user.update_note(note_id=id, title=title, body=body, color=color, tags_string=tags)
		db.session.commit()
		if update_note:
			return {
				"code": 200,
				"message":"Note updated successfully!", 
				"success": True,
				"category":"is-primary",
				"note": note_schema.dump(note),
				}, 200
		return {
			"code": 400,
			"message":"Could not add to database. Might be an enternal error."
			" Or that you may not have permission to do so. Please try again later.", 
			"success": False,
			"category":"is-warning",
			}, 400
	if request.method == "DELETE":
		db.session.delete(note)
		db.session.commit()
		return {
			"code": 200,
			"message":"Note deleted successfully", 
			"success": True,
			"category":"is-primary",
			"note_id": id, 
		}, 200

def add_tags(tag):
	if tag is None:
		return
	existing_tag = Tag.query.filter(Tag.name == tag.lower()).one_or_none()
	"""if it does return existing tag objec to list"""
	if existing_tag is not None:
		return existing_tag
	else:
		new_tag = Tag()
		new_tag.name = tag.lower().strip()
		return new_tag