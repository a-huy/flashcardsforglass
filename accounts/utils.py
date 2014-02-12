import httplib2
import sessions
from urlparse import urlparse
from apiclient.discovery import build
from oauth2client.appengine import StorageByKeyName
from settings import SESSION_SECRET
from models import Credentials


def get_full_url(request_handler, path):
    pr = urlparse(request_handler.request.url)
    return '%s://%s%s' % (pr.scheme, pr.netloc, path)


def load_session_credentials(request_handler):
    session = sessions.LilCookies(request_handler, SESSION_SECRET)
    userid = session.get_secure_cookie(name='userid')
    if userid:
        return userid, StorageByKeyName(Credentials, userid, 'credentials').get()
    return None, None


def store_userid(request_handler, userid):
    session = sessions.LilCookies(request_handler, SESSION_SECRET)
    session.set_secure_cookie(name='userid', value=userid)


def clear_userid(request_handler):
    session = sessions.LilCookies(request_handler, SESSION_SECRET)
    session.clear_cookie('userid')


def create_service(service, version, creds=None):
    http = httplib2.Http()
    if creds: creds.authorize(http)
    return build(service, version, http=http)

def get_mirror_service(userid):
    creds = StorageByKeyName(Credentials, userid, 'credentials').get()
    return create_service('mirror', 'v1', creds)
