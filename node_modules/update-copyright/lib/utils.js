'use strict';

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('engine', 'Engine');
require('leven');
require('load-pkg');
require('mixin-deep', 'merge');
require('isobject', 'isObject');
require('omit-empty');
require('parse-author');
require('parse-copyright');
require('update-year');
require('year');
require = fn;

/**
 * Utils
 */

utils.strip = function(str) {
  return str.replace(/^[\W\s]+|[\W\s]+$/g, '');
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
