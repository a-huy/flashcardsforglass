from webapp2 import uri_for, RequestHandler
from google.appengine.ext import ndb
from base.handlers import AJAXFormRequestHandler, BaseRequestHandler
from flashcards.forms import AddCardForm, EditCardForm
from models import Deck, Card
from base.handlers import Http404
from accounts.decorators import auth_required
from google.appengine.api import memcache
import logging


class CardAddFormHandler(AJAXFormRequestHandler):

    template_name = 'cards/modify_card.html'
    form_class = AddCardForm
    auth_required = True

    def form_valid(self, form, *args, **kwargs):
        data = form.cleaned_data
        deck = Deck.get_by_id(kwargs['deck_slug'])
        Card.save_to_deck(deck.key.id(), **data).put()
        super(CardAddFormHandler, self).form_valid(form, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):
        deck = Deck.get_by_id(kwargs['deck_slug'])
        return {
            'action': 'add',
            'deck': deck
        }

    def get_redirect_url(self, *args, **kwargs):
        return uri_for('deck.info', slug=kwargs['deck_slug'])


class CardEditFormHandler(AJAXFormRequestHandler):

    template_name = 'cards/modify_card.html'
    form_class = EditCardForm
    auth_required = True

    def get_form(self, *args, **kwargs):
        self.card = ndb.Key(urlsafe=kwargs['card_id']).get()
        return self.form_class(initial=self.card.to_dict())

    def form_valid(self, form, *args, **kwargs):
        data = form.cleaned_data
        self.card = ndb.Key(urlsafe=kwargs['card_id']).get()
        self.card.populate(**data)
        self.card.put()
        memcache.delete(uri_for('card.preview') + '?card=%s' % self.card.key.urlsafe())
        memcache.delete(uri_for('card.preview') + '?card=%s&side=back' % self.card.key.urlsafe())
        super(CardEditFormHandler, self).form_valid(form, *args, **kwargs)

    def get_context_data(self, *args, **kwargs):
        deck = self.card.key.parent().get()
        return {
            'action': 'edit',
            'deck': deck,
            'card': self.card
        }

    def get_redirect_url(self, *args, **kwargs):
        deck = self.card.key.parent().get()
        return uri_for('deck.info', slug=deck.key.id())


class CardDeleteHandler(RequestHandler):

    @auth_required
    def delete(self, *args, **kwargs):
        card = ndb.Key(urlsafe=kwargs['card_id']).get()
        if not card:
            self.response.status = 404
            logging.info('Could not delete card with urlsafe key %s, card not found' % kwargs['card_id'])
            return
        logging.info('Deleting card with id %s' % card.key.id())
        card.key.delete()


class CardPreviewHandler(BaseRequestHandler):

    template_name = 'cards/card_preview.html'

    @auth_required
    def get(self, *args, **kwargs):
        try:
            context = self.get_context_data(*args, **kwargs)
            if context['card'] or context['template']:
                self.render_from_cache(self.template_name, context=context)
            else: self.render(self.template_name, context=context)
        except Http404:
            self.response.status = 404

    def get_context_data(self, *args, **kwargs):
        template_slug = self.request.get('template', None)
        card_id = self.request.get('card', None)
        side = self.request.get('side', 'front')
        size = self.request.get('size', None)
        card = ndb.Key(urlsafe=card_id).get() if card_id else None
        return {
            'template': template_slug,
            'card': card,
            'side': side,
            'size': size
        }
