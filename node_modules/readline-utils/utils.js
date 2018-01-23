'use strict';

var isNumber = require('is-number');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('arr-flatten', 'flatten');
require('cli-width');
require('extend-shallow', 'extend');
require('get-value', 'get');
require('is-windows');
require('mute-stream', 'MuteStream');
require = fn;

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

utils.last = function(arr) {
  return arr[arr.length - 1];
};

utils.isNumber = function(n) {
  return isNumber(n) && String(n).trim() !== '';
};

utils.number = function(n) {
  return utils.isNumber(n) ? n : 1;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
