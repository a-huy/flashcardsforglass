from webapp2 import RequestHandler, Route
from accounts.utils import get_mirror_service, get_full_url
from accounts.decorators import auth_required
import logging
import json
from google.appengine.ext import ndb
from base.handlers import UrlConf


class MirrorFlashcardService(object):

    def __init__(self, userid, handler, *args, **kwargs):
        self.service = get_mirror_service(userid)
        self.handler = handler

    def get_card_body(self, card, start=False, notify_user=True):
        body = {
            'html': card.curr_side_content(),
            'notification': {
                'level': 'DEFAULT'
            },
            'menuItems': [
                {
                    'id': '%s|%s' % ('flip', card.key.urlsafe()),
                    'action': 'CUSTOM',
                    'values': [
                        {
                           'displayName': 'Flip',
                           'iconUrl': get_full_url(self.handler, '/static/images/menu_icons/rotate-icon.png')
                        }
                    ]
                }
            ],
            'speakableType': 'Flashcard'
        }
        if not start:
            body['menuItems'].append(
                {
                    'id': '%s|%s' % ('pause', card.key.urlsafe()),
                    'action': 'CUSTOM',
                    'values': [
                        {
                            'state': 'DEFAULT',
                            'displayName': 'Pause',
                            'iconUrl': get_full_url(self.handler, '/static/images/menu_icons/ic_music_pause_50.png')
                        },
                        {
                            'state': 'PENDING',
                            'displayName': 'Pausing',
                            'iconUrl': get_full_url(self.handler, '/static/images/menu_icons/ic_music_pause_50.png')
                        },
                        {
                            'state': 'CONFIRMED',
                            'displayName': 'Paused',
                            'iconUrl': get_full_url(self.handler, '/static/images/menu_icons/ic_done_50.png')
                        }
                    ]
                }
            )
        else:
            body['menuItems'].append(
                {
                    'id': '%s|%s' % ('start', card.key.urlsafe()),
                    'action': 'CUSTOM',
                    'values': [
                        {
                            'state': 'DEFAULT',
                            'displayName': 'Start',
                            'iconUrl': get_full_url(self.handler, '/static/images/menu_icons/ic_music_play_50.png')
                        },
                        {
                            'state': 'PENDING',
                            'displayName': 'Starting',
                            'iconUrl': get_full_url(self.handler, '/static/images/menu_icons/ic_music_play_50.png')
                        },
                        {
                            'state': 'CONFIRMED',
                            'displayName': 'Started',
                            'iconUrl': get_full_url(self.handler, '/static/images/menu_icons/ic_done_50.png')
                        }
                    ]
                }
            )
        if not notify_user: del body['notification']
        body['menuItems'].append({ 'action': 'DELETE' })
        return body

    def send_card(self, card):
        self.service.timeline().insert(body=self.get_card_body(card)).execute()

    def flip_card(self, card_id, notification):
        logging.info('Flipping card with id %s' % card_id)
        card = ndb.Key(urlsafe=card_id).get()
        if not card:
            logging.error('Could not find Card entity with id %s' % card_id)
            return
        card.flip()
        self.service.timeline().update(id=notification['itemId'], body=self.get_card_body(card)).execute()

    def pause_stream(self, card_id, notification):
        card = ndb.Key(urlsafe=card_id).get()
        deck = ndb.Key(urlsafe=card_id).parent().get()
        deck.deselect()
        self.service.timeline().update(id=notification['itemId'], body=self.get_card_body(card, start=True, notify_user=False)).execute()

    def start_stream(self, card_id, notification):
        card = ndb.Key(urlsafe=card_id).get()
        deck = ndb.Key(urlsafe=card_id).parent().get()
        deck.active = True
        deck.send_card_task()
        self.service.timeline().update(id=notification['itemId'], body=self.get_card_body(card, notify_user=False)).execute()

    def handle_timeline_custom(self, notification):
        try:
            action, payload = notification['userActions'][0]['payload'].split('|')
        except Exception as exn:
            logging.error('An error occurred while handling custom notification: %s' % exn)
            return
        if action == 'flip':
            self.flip_card(payload, notification)
        elif action == 'pause':
            self.pause_stream(payload, notification)
        elif action == 'start':
            self.start_stream(payload, notification)
        else:
            logging.error('The Mirror Flashcard Service does not know how to handle the custom action %s' % action)


    def list_subscriptions(self):
        out = ''
        try:
            subscriptions = self.service.subscriptions().list().execute()

            for subscription in subscriptions.get('items', []):
                out += '%s\n' % ('Collection: %s' % subscription.get('collection'))
                out += '%s\n' % ('User token: %s' % subscription.get('userToken'))
                out += '%s\n' % ('Verify token: %s' % subscription.get('verifyToken'))
                out += '%s\n' % ('Callback URL: %s' % subscription.get('callbackUrl'))

                if subscription.get('operation'):
                    out += '%s\n' % ('Operation:')
                    for operation in subscription['operation']:
                        out += '%s\n' % ('  * %s' % operation)
                else:
                    out += '%s\n' % ('Operation: ALL')
            return out
        except Exception as e:
            print 'An error occurred: %s' % e


class MirrorNotificationHandler(RequestHandler):

    def post(self, *args, **kwargs):
        try:
            notification = json.loads(self.request.body)
            logging.info(notification)
        except Exception as exn:
            logging.exception('An error occurred: %s' % exn)
            return
        collection = notification.get('collection', None)
        userActions = notification.get('userActions', None)
        userid = notification.get('userToken', None)
        if not collection or not userActions or not userid:
            logging.error('Received a notification but missing one or more of collection, action, and userid fields.')
            return
        action = userActions[0]['type'].lower()
        logging.info('Received a notification with collection %s, action %s, userid %s' % (collection, action, userid))
        service = MirrorFlashcardService(userid, self)
        notification_handler = getattr(service, 'handle_%s_%s' % (collection, action), None)
        if not notification_handler:
            logging.warning('The Mirror Flashcard Service did not know how to handle a %s %s' % (collection, action))
        else: notification_handler(notification)


class MirrorSubscriptionsHandler(RequestHandler):

    @auth_required
    def get(self, *args, **kwargs):
        service = MirrorFlashcardService(self.userid, self)
        subs = service.list_subscriptions()
        self.response.write(subs)


MIRROR_URLS = list(UrlConf(
    Route('/mirror/notify', handler=MirrorNotificationHandler, name='mirror.notify'),
    Route('/mirror/subscriptions', handler=MirrorSubscriptionsHandler, name='mirror.subscriptions')
))
