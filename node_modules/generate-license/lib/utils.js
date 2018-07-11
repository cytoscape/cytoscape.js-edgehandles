'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('is-valid-app', 'isValid');
require('through2', 'through');
require('vinyl', 'File');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
