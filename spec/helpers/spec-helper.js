'use strict';

var CustomMatchers = require('./custom-matchers');

// Add all customer matchers
beforeEach(jasmine.addMatchers.bind(null, CustomMatchers));
