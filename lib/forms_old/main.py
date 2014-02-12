# Taken from Django's form module, with modifications
from exceptions import ValidationError


NON_FIELD_ERRORS = '__all__'


def get_declared_fields(bases, attrs, with_base_fields=True):
    fields = [(field_name, attrs.pop(field_name)) for field_name, obj in list(six.iteritems(attrs)) if isinstance(obj, Field)]
    fields.sort(key=lambda x: x[1].creation_counter)

    if with_base_fields:
        for base in bases[::-1]:
            if hasattr(base, 'base_fields'):
                fields = list(six.iteritems(base.base_fields)) + fields
    else:
        for base in bases[::-1]:
            if hasattr(base, 'declared_fields'):
                fields = list(six.iteritems(base.declared_fields)) + fields

    return SortedDict(fields)


class DeclarativeFieldsMetaclass(type):
    def __new__(cls, name, bases, attrs):
        attrs['base_fields'] = get_declared_fields(bases, attrs)
        new_class = super(DeclarativeFieldsMetaclass,
                     cls).__new__(cls, name, bases, attrs)
        if 'media' not in attrs:
            new_class.media = media_property(new_class)
        return new_class


class BaseForm(object):

    def __init__(self, data=None, files=None, initial=None, empty_permitted=False):
        self.is_bound = data is not None or files is not None
        self.data = data or {}
        self.files = files or {}
        self.initial = initial or {}
        self.empty_permitted = empty_permitted
        self.fields = {}
        self._errors = None

    def __iter__(self):
        for field in self.fields:
            yield self[field]

    def __getitem__(self, item):
        try:
            field = self.fields[item]
        except KeyError:
            raise KeyError('Key %r not found in Form' % item)
        return field

    @property
    def errors(self):
        if self._errors is None:
            self.full_clean()
        return self._errors

    def is_valid(self):
        return self.is_bound and not bool(self.errors)

    def full_clean(self):
        if not self.is_bound: return
        self._errors = {}
        self.cleaned_data = {}
        if self.empty_permitted and not self.has_changed(): return
        self._clean_fields()
        self._clean_form()
        self._post_clean()

    def _clean_fields(self):
        for name, field in self.fields.items():
            value = self.data[name]
            try:
                value = field.clean(value)
                if hasattr(self, 'clean_%s' % name):
                    value = getattr(self, 'clean_%s' % name)()
                    self.cleaned_data[name] = value
            except ValidationError as err:
                self._errors[name] = err.messages
                if name in self.cleaned_data:
                    del self.cleaned_data[name]

    def _clean_form(self):
        try:
            self.cleaned_data = self.clean()
        except ValidationError as err:
            self._errors[NON_FIELD_ERRORS] = err.messages

    def _post_clean(self):
        pass

    def clean(self):
        return self.cleaned_data

