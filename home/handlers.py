import webapp2
from base.handlers import TemplateRequestHandler


class MainHandler(TemplateRequestHandler):

    template_name = 'index.html'


HOME_URLS = [
    webapp2.Route('/', handler=MainHandler, name='home')
]
