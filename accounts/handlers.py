import webapp2
import logging
from urlparse import urlparse
from oauth2client.appengine import StorageByKeyName
from oauth2client.client import flow_from_clientsecrets, FlowExchangeError
from models import Credentials
from settings import OAUTH_SCOPES, OAUTH_CALLBACK_PATH, APP_GLASS_CONTACT_ID, APP_GLASS_CONTACT_NAME, \
    OAUTH_REVOKE_ENDPOINT
from accounts.utils import create_service, store_userid, get_full_url, clear_userid
from base.handlers import BaseRequestHandler, UrlConf


class OAuthBaseRequestHandler(BaseRequestHandler):

    def create_oauth_flow(self):
        flow = flow_from_clientsecrets('client_secrets.json', scope=OAUTH_SCOPES)
        pr = urlparse(self.request.url)
        flow.redirect_uri = '%s://%s%s' % (pr.scheme, pr.netloc, OAUTH_CALLBACK_PATH)
        return flow


class OAuthCodeRequestHandler(OAuthBaseRequestHandler):

    def get(self):
        flow = self.create_oauth_flow()
        flow.params['approval_prompt'] = 'force'
        uri = flow.step1_get_authorize_url()
        self.redirect(str(uri))


class OAuthCodeExchangeHandler(OAuthBaseRequestHandler):

    def get(self):
        code = self.request.get('code')
        if not code:
            #TODO: handle not receiving a code
            return None
        oauth_flow = self.create_oauth_flow()

        try:
            creds = oauth_flow.step2_exchange(code)
        except FlowExchangeError:
            #TODO: handle flow exchange error
            return None

        users_service = create_service('oauth2', 'v2', creds)
        #TODO: check for errors
        user = users_service.userinfo().get().execute()

        userid = user.get('id')

        StorageByKeyName(Credentials, userid, 'credentials').put(creds)
        logging.info('Successfully stored new credentials for user: %s', userid)
        store_userid(self, userid)

        self._perform_post_auth_tasks(userid, creds)
        self.redirect(webapp2.uri_for('decks.listing'))

    def _perform_post_auth_tasks(self, userid, creds):
        mirror_service = create_service('mirror', 'v1', creds)
        hostname = get_full_url(self, '')

        # Check to see if we are in production
        if hostname.startswith('https://'):
            subscription_body = {
                'collection': 'timeline',
                'userToken': userid,
                'callbackUrl': get_full_url(self, webapp2.uri_for('mirror.notify'))
            }
            mirror_service.subscriptions().insert(body=subscription_body).execute()
        else:
            logging.info('Post auth tasks are not supported on local development or staging.')

        # timeline_item_body = {
        #     'text': 'Welcome to Flashcards for Glass',
        #     'notification': {
        #         'level': 'DEFAULT'
        #     }
        # }
        # mirror_service.timeline().insert(body=timeline_item_body).execute()


class LogoutHandler(BaseRequestHandler):

    def get(self):
        # urlfetch.fetch(OAUTH_REVOKE_ENDPOINT % self.credentials.refresh_token)
        # store_userid(self, '')
        # credentials_entity = Credentials.get_by_key_name(self.userid)
        # if credentials_entity: credentials_entity.delete()
        clear_userid(self)
        self.redirect(webapp2.uri_for('home'))


OAUTH_URLS = list(UrlConf(
    webapp2.Route('/auth', handler=OAuthCodeRequestHandler, name='auth'),
    webapp2.Route('/oauth2callback', handler=OAuthCodeExchangeHandler, name='oauth2callback'),
    webapp2.Route('/logout', handler=LogoutHandler, name='logout')
))
