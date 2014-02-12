from webapp2 import Route
from base.handlers import UrlConf
from decks import *
from cards import *
from tasks import *

FLASHCARDS_URLS = list(UrlConf(
    Route('/decks', handler=DeckListingHandler, name='decks.listing'),
    Route('/deck/add', handler=DeckAddFormHandler, name='deck.add'),
    Route('/deck/<slug:[a-zA-Z0-9-]+>', handler=DeckInfoHandler, name='deck.info'),
    Route('/deck/edit/<slug:[a-zA-Z0-9-]+>', handler=DeckEditFormHandler, name='deck.edit'),
    Route('/deck/delete/<slug:[a-zA-Z0-9-]+>', handler=DeckDeleteHandler, name='deck.delete'),
    Route('/deck/order/<slug:[a-zA-Z0-9-]+>', handler=DeckCardOrderHandler, name='deck.order'),
    Route('/deck/select/<slug:[a-zA-Z0-9-]+>', handler=DeckSelectHandler, name='deck.select'),
    Route('/deck/unselect/<slug:[a-zA-Z0-9-]+>', handler=DeckUnselectHandler, name='deck.unselect'),
    Route('/card/preview', handler=CardPreviewHandler, name='card.preview'),
    Route('/card/add/<deck_slug:[a-zA-Z0-9-]+>', handler=CardAddFormHandler, name='card.add'),
    Route('/card/edit/<card_id:[a-zA-Z0-9-]+>', handler=CardEditFormHandler, name='card.edit'),
    Route('/card/delete/<card_id:[a-zA-Z0-9-]+>', handler=CardDeleteHandler, name='card.delete'),
    Route('/task/card/send', handler=SendFlashCardTask, name='task.card.send'),
))
