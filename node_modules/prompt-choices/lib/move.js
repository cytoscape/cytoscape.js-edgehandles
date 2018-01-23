'use strict';

var utils = require('./utils');

function Move(choices, options) {
  if (typeof options === 'undefined') {
    throw new TypeError('expected an object');
  }
  this.options = options;
  utils.define(this, 'choices', choices);
  this.length = this.choices.length;
  this.num = 0;
}

Move.prototype.up = function(num) {
  return (num > 0) ? num - 1 : this.length - 1;
};

Move.prototype.down = function(num) {
  return (num < this.length - 1) ? num + 1 : 0;
};

Move.prototype.number = function(num, event) {
  var n = Number(event.value);
  if (n <= this.length && n > 0) {
    this.space(n - 1);
  }
  return n - 1;
};

Move.prototype.space = function(num) {
  this.choices.toggle(num, this.options.radio);
  return num;
};

/**
 * Expose `Move`
 */

module.exports = Move;
