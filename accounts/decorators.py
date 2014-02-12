import httplib2
import webapp2
from oauth2client.client import AccessTokenRefreshError
from models import Credentials
from accounts.utils import load_session_credentials, create_service, store_userid


def auth_required(handler_method):
    '''
    Decorator to require that the user has authenticated the app
    '''
    def check_auth(self, *args, **kwargs):
        self.userid, self.credentials = load_session_credentials(self)
        # self.mirror_service = create_service('mirror', 'v1', self.credentials)
        if self.credentials:
            try:
                # self.credentials.refresh(httplib2.Http())
                return handler_method(self, *args, **kwargs)
            except AccessTokenRefreshError:
                store_userid(self, '')
                credentials_entity = Credentials.get_by_key_name(self.userid)
                if credentials_entity:
                    credentials_entity.delete()
        self.redirect(webapp2.uri_for('auth'))
    return check_auth
