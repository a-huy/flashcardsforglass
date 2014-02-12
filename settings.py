import jinja2
import os
import webapp2


# Emails to send errors to
ADMINS = ['anguyenhuy@gmail.com']

# Setup jinja2 environment
JINJA_ENV = jinja2.Environment(
    loader = jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')),
    extensions = ['jinja2.ext.autoescape'],
    autoescape = True
)
JINJA_ENV.globals['uri_for'] = webapp2.uri_for

# Setting used by lib/sessions
SESSION_SECRET = open('session.secret').read()

# Settings for enabling the Mirror API
OAUTH_SCOPES = ('https://www.googleapis.com/auth/glass.timeline '
                'https://www.googleapis.com/auth/glass.location '
                'https://www.googleapis.com/auth/userinfo.profile')

OAUTH_CALLBACK_PATH = '/oauth2callback'

OAUTH_REVOKE_ENDPOINT = 'https://accounts.google.com/o/oauth2/revoke?token=%s'

# App-specific settings
APP_GLASS_CONTACT_ID = 'flashcards-for-glass'

APP_GLASS_CONTACT_NAME = 'Flashcards for Glass'

# Hack to get Django to work
SECRET_KEY = SESSION_SECRET

DECK_TEMPLATES_PATH = os.path.join(os.path.dirname(__file__), 'templates/decks')
