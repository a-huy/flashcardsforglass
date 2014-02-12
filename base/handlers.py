import webapp2
import json
import logging
import traceback
import sys
from settings import JINJA_ENV
from accounts.utils import load_session_credentials
from google.appengine.api import memcache, mail
from base.utils import app_in_dev


class Http404(Exception):
    pass


class UrlConf(object):

    def __init__(self, *args, **kwargs):
        self.confs = []
        for arg in args:
            if isinstance(arg, webapp2.Route):
                slash_route = webapp2.Route(arg.template + '/', arg.handler)
                self.confs += [arg, slash_route]

    def __iter__(self):
        for route in self.confs:
            yield route


# Handle 500 errors. If in prod, send an email.
def handle_500(request, response, exception):
    logging.exception('%s' % (exception))
    if not app_in_dev():
        sender = 'monitoring@flashcardsforglass.appspotmail.com'
        subject = '[GAE] ERROR: %s' % exception
        body = ''.join(traceback.format_exception(*sys.exc_info()))
        mail.send_mail_to_admins(sender, subject, body)
    response.write(JINJA_ENV.get_template('500.html').render())
    response.set_status(500)


class BaseRequestHandler(webapp2.RequestHandler):

    def extra_context(self, context):
        userid, credentials = load_session_credentials(self)
        context.update({
            'is_authenticated': bool(userid),
            'userid': userid,
            'credentials': credentials
        })
        return context

    def render(self, template_file, context={}):
        template = JINJA_ENV.get_template(template_file)
        self.response.write(template.render(self.extra_context(context)))

    def render_from_cache(self, template_file, context={}):
        content = memcache.get(self.request.path_qs)
        if content: pass
        else:
            template = JINJA_ENV.get_template(template_file)
            content = template.render(self.extra_context(context))
            memcache.set(self.request.path_qs, content, 86400)
        self.response.write(content)


class AuthMixin(object):

    auth_required = False

    def is_authenticated(self):
        userid, credentials = load_session_credentials(self)
        if credentials:
            self.userid = userid
            self.credentials = credentials
        return bool(credentials)


class TemplateRequestHandler(AuthMixin, BaseRequestHandler):

    template_name = ''

    def get(self, *args, **kwargs):
        try:
            if self.auth_required and not self.is_authenticated():
                self.redirect(webapp2.uri_for('auth'))
            context = self.get_context_data(*args, **kwargs)
            self.render(self.template_name, context=context)
        except Http404:
            self.response.status = 404

    def get_context_data(self, *args, **kwargs):
        return {}


class FormRequestHandler(AuthMixin, BaseRequestHandler):

    template_name = ''
    form_class = None

    def get_form(self, *args, **kwargs):
        return self.form_class()

    def get(self, *args, **kwargs):
        if self.auth_required and not self.is_authenticated():
            self.redirect(webapp2.uri_for('auth'))
        context = {
            'form': self.get_form(*args, **kwargs)
        }
        context.update(self.get_context_data(*args, **kwargs))
        self.render(self.template_name, context=context)

    def post(self, *args, **kwargs):
        if self.auth_required and not self.is_authenticated():
            self.redirect(webapp2.uri_for('auth'))
        form = self.form_class(self.request.POST)
        if form.is_valid(): self.form_valid(form, *args, **kwargs)
        else: self.form_invalid(form, *args, **kwargs)

    def form_valid(self, form, *args, **kwargs):
        pass

    def form_invalid(self, form, *args, **kwargs):
        pass

    def get_context_data(self, *args, **kwargs):
        return {}


class AJAXFormRequestHandler(FormRequestHandler):

    def response_json(self, payload={}, status=200):
        self.response.content_type = 'application/json'
        self.response.status = status
        self.response.write(json.dumps(payload))

    def form_valid(self, form, *args, **kwargs):
        self.response_json({
            'redirect_url': self.get_redirect_url(*args, **kwargs)
        })

    def form_invalid(self, form, *args, **kwargs):
        self.response_json({
            'errors': form.errors
        }, 400)

    def get_redirect_url(self, *args, **kwargs):
        return self.request.path