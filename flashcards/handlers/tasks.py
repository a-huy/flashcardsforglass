import webapp2
import logging
from models import Deck
from mirror import MirrorFlashcardService


class SendFlashCardTask(webapp2.RequestHandler):

    def post(self, *args, **kwargs):
        logging.info('Starting SendFlashCardTask with POST info %s' % self.request.POST)
        userid = self.request.get('userid', None)

        if not userid: return
        deck = Deck.query(Deck.userid==userid, Deck.active==True).get()
        if not deck: return

        card = deck.get_next_card()
        mirror_service = MirrorFlashcardService(userid, self)
        mirror_service.send_card(card)

        deck.send_card_task()
