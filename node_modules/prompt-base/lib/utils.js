'use strict';

/**
 * Utils
 */

exports.noop = function(next) {
  next();
};

exports.isString = function(val) {
  return val && typeof val === 'string';
};
