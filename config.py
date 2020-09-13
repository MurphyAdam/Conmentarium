import os
from dotenv import load_dotenv

"""
	Flask config classes.
	All config classes inherit from the base class
	Config.

"""

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):

	"""
	Environment variabbles
	"""
	APP_ENV = os.environ.get('APP_ENV') or 'production'
	TESTING = os.environ.get('TESTING') or False
	DEBUG = os.environ.get('DEBUG') or False

	"""
	Sessions and security variabbles
	"""
	SESSION_PROTECTION = 'basic'
	SECRET_KEY = os.environ.get('SECRET_KEY') or \
	b'some_very_strong_and_long_key_@_2020'

	"""
	Logs variabbles
	"""
	LOG_TO_STDOUT = os.environ.get('LOG_TO_STDOUT')

	"""
	Databases variabbles
	"""
	SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
	'sqlite:///' + os.path.join(basedir, 'notebookz/Adam.db')
	SQLALCHEMY_TRACK_MODIFICATIONS = False

class Development(Config):

	"""
	Environment variabbles
	"""
	APP_ENV = os.environ.get('APP_ENV') or 'development'
	TESTING = os.environ.get('TESTING') or False
	DEBUG = os.environ.get('DEBUG') or True

	"""
	Sessions and security variabbles
	"""
	SESSION_PROTECTION = 'basic'
	SECRET_KEY = os.environ.get('SECRET_KEY') or \
	b'DevelopmentKey468475641;::454574551fdkJNdy'

	"""
	Databases variabbles
	"""
	SQLALCHEMY_DATABASE_URI = "postgresql://postgres@localhost/notebookz"
	SQLALCHEMY_TRACK_MODIFICATIONS = False
	SQLALCHEMY_ECHO = False

class Testing(Config):

	"""
	Environment variabbles
	"""
	APP_ENV = os.environ.get('APP_ENV') or 'testing'
	TESTING = os.environ.get('TESTING') or True
	DEBUG = os.environ.get('DEBUG') or False

	"""
	Databases variabbles
	"""
	SQLALCHEMY_DATABASE_URI = "postgresql://postgres@localhost/notebookz"
	SQLALCHEMY_TRACK_MODIFICATIONS = False
	SQLALCHEMY_ECHO = False