'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('clone-deep', 'clone');
require('define-property', 'define');
require('extend-shallow', 'extend');
require('kind-of', 'typeOf');
require = fn;

/**
 * Extend the given `obj` with `options`
 */

utils.assign = function(obj, options) {
  options = options || {};
  var cache = {};
  for (var key in options) {
    var val = options[key];
    if (utils.isObject(val)) {
      utils.extend(cache, val);
    } else if (typeof val !== 'undefined') {
      cache[key] = val;
    }
  }
  cache.message = cache.message || cache.name;
  utils.extend(obj, cache);
  utils.define(obj, 'cache', cache);
};

/**
 * Return true if `val` is an object
 */

utils.isObject = function(val) {
  return utils.typeOf(val) === 'object';
};

/**
 * Cast `val` to an array.
 */

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Return true if `obj` contains the given `key`
 */

utils.has = function(obj, key) {
  return utils.isObject(obj) && obj.hasOwnProperty(key);
};

/**
 * Return true if `arr` contains any of the given `keys`
 */

utils.hasAny = function(obj, keys) {
  if (!utils.isObject(obj)) {
    return false;
  }

  keys = utils.arrayify(keys);
  for (var i = 0; i < keys.length; i++) {
    if (utils.has(obj, keys[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Return true if `obj` is a Question object
 */

utils.isQuestion = function(obj) {
  if (!utils.isObject(obj) || !obj.name || !obj.type) {
    return false;
  }
  return utils.hasAny(obj, [
    'message',
    'default',
    'choices',
    'filter',
    'paginated',
    'validate',
    'when'
  ]);
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
