import datetime
from django import forms
from django.utils.text import slugify
from models import Deck
from base.utils import random_slug


class AddDeckForm(forms.Form):

    def __init__(self, *args, **kwargs):
        if args:
            raw_data = args[0]
            if 'start' in raw_data:
                raw_data['start'] = str(datetime.datetime.strptime(raw_data['start'], '%H:%M'))
                args = [raw_data] + list(args)[1:]
        super(AddDeckForm, self).__init__(*args, **kwargs)

    def clean(self):
        data = super(AddDeckForm, self).clean()
        if self.errors: return data
        data['id'] = '%s-%s' % (slugify(data['name']), random_slug(4))
        return data

    def clean_delay(self):
        delay = self.cleaned_data['delay']
        # Convert minutes into seconds
        return delay * 60

    def clean_start(self):
        start = self.cleaned_data['start']
        if not start:
            return datetime.datetime.strptime('0000', '%H%M')
        return start

    name = forms.CharField(max_length=100)
    delay = forms.IntegerField()
    start = forms.DateTimeField(required=False)
    deck_template_name = forms.CharField(max_length=100, required=False)


class EditDeckForm(forms.Form):

    def __init__(self, *args, **kwargs):
        if args:
            raw_data = args[0]
            if 'start' in raw_data:
                raw_data['start'] = str(datetime.datetime.strptime(raw_data['start'], '%H:%M'))
                args = [raw_data] + list(args)[1:]
        super(EditDeckForm, self).__init__(*args, **kwargs)

    def clean_delay(self):
        delay = self.cleaned_data['delay']
        # Convert minutes into seconds
        return delay * 60

    def clean_start(self):
        start = self.cleaned_data['start']
        if not start:
            return datetime.datetime.strptime('0000', '%H%M')
        return start

    name = forms.CharField(max_length=100)
    delay = forms.IntegerField()
    start = forms.DateTimeField(required=False)


class AddCardForm(forms.Form):

    title = forms.CharField(max_length=100, required=False)
    front_content = forms.CharField()
    back_content = forms.CharField()
    hex_marker = forms.CharField(required=False)


class EditCardForm(forms.Form):

    title = forms.CharField(max_length=100, required=False)
    front_content = forms.CharField()
    back_content = forms.CharField()
    hex_marker = forms.CharField(required=False)
