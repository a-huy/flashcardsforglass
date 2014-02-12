from google.appengine.ext import ndb
from oauth2client.appengine import CredentialsNDBProperty
from datetime import datetime as dt
from google.appengine.api import taskqueue
from base.utils import random_slug
from webapp2 import uri_for
import logging


class BaseEntityMixin(object):

    created_date = ndb.DateTimeProperty(auto_now_add=True)
    modified_date = ndb.DateTimeProperty(auto_now=True)


class Deck(BaseEntityMixin, ndb.Model):

    userid = ndb.StringProperty()
    name = ndb.StringProperty(indexed=False)
    delay = ndb.IntegerProperty() # in seconds
    start = ndb.DateTimeProperty()
    active = ndb.BooleanProperty(default=False)
    curr_ind = ndb.IntegerProperty(default=0)
    task_name = ndb.StringProperty(required=False, indexed=False)

    @classmethod
    def filter_by_userid(cls, userid):
        return cls.query(cls.userid==userid).order(-cls.created_date)

    @classmethod
    def save_to_user(cls, **data):
        return cls(**data)

    @classmethod
    def clear_active(cls):
        active_decks = cls.query(cls.active==True)
        batch = []
        for deck in active_decks:
            deck.active = False
            deck.stop_card_task()
            deck.task_name = None
            batch.append(deck)
        ndb.put_multi(batch)

    @property
    def card_count(self):
        return Card.filter_by_deck(self.key.id()).count()

    def get_next_card(self):
        logging.info('Getting next card for %s' % self.key.id())
        card_count = self.card_count
        logging.info('Card count: %s' % card_count)
        if card_count == 0: return
        if self.curr_ind >= card_count: self.curr_ind = 0
        logging.info('Current deck index: %s' % self.curr_ind)
        card = Card.query(ancestor=ndb.Key('Deck', self.key.id())).order(Card.index, -Card.created_date).fetch(1, offset=self.curr_ind)[0]
        self.curr_ind += 1
        self.put()
        return card

    def secs_until_next_card(self):
        def time_to_secs(time):
            return sum(float(i) * 60**index for index, i in enumerate(str(time).split(":")[::-1]))
        secs_left = self.delay - (int(time_to_secs(dt.now().time()) - time_to_secs(self.start.time())) % self.delay)
        return secs_left

    @ndb.transactional
    def send_card_task(self, start=False):
        if start and self.task_name: return
        logging.info('Starting send task for deck %s' % self.key.id())
        self.task_name = random_slug(32)
        taskqueue.add(
            url=uri_for('task.card.send'),
            name=self.task_name,
            countdown=self.secs_until_next_card(),
            params={'userid': self.userid},
        )
        self.put()

    def stop_card_task(self):
        try:
            taskqueue.Queue().delete_tasks_by_name([self.task_name])
        except taskqueue.BadTaskStateError:
            pass

    @ndb.transactional
    def deselect(self):
        self.active = False
        self.stop_card_task()
        self.task_name = None
        self.put()

    def delete_descendants(self):
        return ndb.delete_multi(ndb.Query(ancestor=self.key).iter(keys_only=True))

    def reorder(self, urlsafe_ids):
        cards = ndb.Query(ancestor=self.key)
        cards_map = {x.key.urlsafe(): x for x in cards}
        for ind, uid in enumerate(urlsafe_ids):
            cards_map[uid].index = ind + 1
        ndb.put_multi(cards_map.values())


class Card(BaseEntityMixin, ndb.Model):

    title = ndb.StringProperty(indexed=False, required=False)
    front_content = ndb.TextProperty()
    back_content = ndb.TextProperty()
    hex_marker = ndb.StringProperty(indexed=False, required=False)
    curr_side = ndb.BooleanProperty(default=False) # 0 for front, 1 for back
    index = ndb.IntegerProperty(default=1)

    @classmethod
    def filter_by_deck(cls, deck_id):
        return cls.query(ancestor=ndb.Key('Deck', deck_id))

    @classmethod
    def save_to_deck(cls, deck_id, **data):
        return cls(parent=ndb.Key('Deck', deck_id), **data)

    def flip(self):
        self.curr_side = not self.curr_side
        self.put()

    def curr_side_content(self):
        return self.back_content if self.curr_side else self.front_content


class Credentials(BaseEntityMixin, ndb.Model):

    credentials = CredentialsNDBProperty()
