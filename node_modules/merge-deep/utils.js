'use strict';

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

require('arr-union', 'union');
require('clone-deep', 'clone');
require('kind-of', 'typeOf');
require = fn;

utils.isObject = function(val) {
  return utils.typeOf(val) === 'object' || utils.typeOf(val) === 'function';
};

/**
 * Expose `utils` modules
 */

module.exports = utils;

