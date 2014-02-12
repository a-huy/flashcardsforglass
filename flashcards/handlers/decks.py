from base.handlers import BaseRequestHandler, AJAXFormRequestHandler, TemplateRequestHandler, Http404
from accounts.decorators import auth_required
from models import Deck, Card
from flashcards.forms import AddDeckForm, EditDeckForm
from webapp2 import uri_for
from settings import DECK_TEMPLATES_PATH
from google.appengine.ext import ndb
import logging
import json
import os


class DeckListingHandler(BaseRequestHandler):

    @auth_required
    def get(self, template='cards/decks_listing.html'):
        decks = Deck.filter_by_userid(self.userid).order(Deck.created_date)
        context = {
            'decks': decks
        }
        self.render(template, context)


class DeckInfoHandler(TemplateRequestHandler):

    template_name = 'cards/deck_info.html'
    auth_required = True

    def get_context_data(self, *args, **kwargs):
        deck = Deck.get_by_id(kwargs['slug'])
        if not deck: raise Http404
        cards = list(Card.filter_by_deck(deck.key.id()).order(Card.index))
        return {
            'deck': deck,
            'cards': cards
        }


class DeckCardOrderHandler(TemplateRequestHandler):

    template_name = 'cards/card_order_modal.html'
    auth_required = True

    def get_context_data(self, *args, **kwargs):
        cards = list(Card.filter_by_deck(kwargs['slug']).order(Card.index))
        return {
            'deck_id': kwargs['slug'],
            'cards': cards
        }

    def post(self, *args, **kwargs):
        if self.auth_required and not self.is_authenticated():
            self.redirect(uri_for('auth'))
        card_ids_raw = self.request.get('card_ids', None)
        card_ids = json.loads(card_ids_raw)
        if not card_ids:
            self.response.status = 400
            return
        deck = Deck.get_by_id(kwargs['slug'])
        deck.reorder(card_ids)


class DeckAddFormHandler(AJAXFormRequestHandler):

    template_name = 'cards/add_deck.html'
    form_class = AddDeckForm
    auth_required = True

    def create_from_template(self, deck_template_name, new_deck_id):
        try:
            with open(os.path.join(DECK_TEMPLATES_PATH, deck_template_name + '.json')) as deck_file:
                deck_json = json.loads(deck_file.read())
                new_cards = []
                for card_json in deck_json['cards']:
                    new_cards.append(Card.save_to_deck(new_deck_id, **card_json))
                ndb.put_multi(new_cards)
        except Exception as exn:
            logging.exception('An error occurred while creating deck from template %s: %s' % (deck_template_name, exn))

    def form_valid(self, form, *args, **kwargs):
        data = form.cleaned_data
        data['userid'] = self.userid
        deck_template = None
        if 'deck_template_name' in data:
            deck_template = data['deck_template_name']
            del data['deck_template_name']
        new_deck_key = Deck.save_to_user(**data).put()
        if deck_template and deck_template != 'None':
            self.create_from_template(deck_template, new_deck_key.id())

    def get_context_data(self, *args, **kwargs):
        deck_template_names = [x.replace('.json', '') for x in os.listdir(DECK_TEMPLATES_PATH)]
        return {'deck_template_names': deck_template_names}


class DeckEditFormHandler(AJAXFormRequestHandler):

    template_name = 'cards/edit_deck.html'
    form_class = EditDeckForm
    auth_required = True

    def form_valid(self, form, *args, **kwargs):
        data = form.cleaned_data
        deck = Deck.get_by_id(kwargs['slug'])
        deck.populate(**data)
        deck.put()

    def get_form(self, *args, **kwargs):
        slug = kwargs['slug']
        self.slug = slug
        self.deck = Deck.get_by_id(slug)
        return self.form_class(initial=self.deck.to_dict())

    def get_context_data(self, *args, **kwargs):
        return {'slug': kwargs['slug']}


class DeckDeleteHandler(TemplateRequestHandler):

    template_name = 'cards/delete_deck_confirm.html'

    @auth_required
    def delete(self, *args, **kwargs):
        deck = Deck.get_by_id(kwargs['slug'])
        if not deck:
            self.response.status = 404
            logging.info('Could not delete deck with slug %s, card not found' % kwargs['slug'])
            return
        deck_slug = deck.key.id()
        logging.info('Deleting all descendants of deck with slug %s' % deck_slug)
        deck.delete_descendants()
        logging.info('Deleting deck with slug %s' % deck_slug)
        deck.key.delete()

    def get_context_data(self, *args, **kwargs):
        deck = Deck.get_by_id(kwargs['slug'])
        if not deck: raise Http404
        return {'deck': deck}


class DeckSelectHandler(BaseRequestHandler):

    @auth_required
    def post(self, *args, **kwargs):
        logging.info('Clearing all active decks for user %s' % self.userid)
        Deck.clear_active()
        selected_deck = Deck.get_by_id(kwargs['slug'])
        if not selected_deck:
            self.response.status = 404
            return
        selected_deck.active = True
        selected_deck.send_card_task(start=True)

class DeckUnselectHandler(BaseRequestHandler):

    @auth_required
    def post(self, *args, **kwargs):
        deck = Deck.get_by_id(kwargs['slug'])
        if not deck:
            self.response.status = 404
            return
        deck.deselect()
