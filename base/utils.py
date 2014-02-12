import uuid
import string
import os

def random_slug(length):
    slug_chars = string.ascii_letters + string.digits + '-'
    slug = ''
    while True:
        block = str(uuid.uuid4()).replace('-', '')
        for argi in xrange(16):
            if len(slug) == length: return slug
            ind = int(block[argi * 2:(argi + 1) * 2], 16) % 64
            if ind == 63: continue
            slug += slug_chars[ind]


def app_in_dev():
    return os.environ['APPLICATION_ID'].startswith('dev')
