#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import sys
sys.path.insert(0, 'lib')

# Hack to get Django to work
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

import webapp2
from home.handlers import HOME_URLS
from accounts.handlers import OAUTH_URLS
from flashcards.handlers import FLASHCARDS_URLS
from mirror.handlers import MIRROR_URLS
from base.handlers import handle_500

URLS = HOME_URLS + OAUTH_URLS + FLASHCARDS_URLS + MIRROR_URLS

app = webapp2.WSGIApplication(URLS)
app.error_handlers[500] = handle_500
