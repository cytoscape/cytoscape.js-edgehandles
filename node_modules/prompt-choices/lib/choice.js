'use strict';

var log = require('log-utils');
var radio = require('radio-symbol');
var utils = require('./utils');

/**
 * Create a new `Choice` to create a normalized choice object from the given input.
 * @param {String|Object} `val` Choice value. If an object is passed, it should contains at least one of `value` or `name` property.
 * @api public
 */

function Choice(choice, options) {
  if (typeof choice === 'string') {
    choice = { name: choice };
  }
  if (!utils.isObject(choice)) {
    throw new TypeError('expected choice to be a string or object');
  }
  if (choice.type === 'separator' || choice.isSeparator) {
    choice.isSeparator = true;
    return choice;
  }
  if (choice.isChoice || choice instanceof Choice) {
    return choice;
  }
  this.initChoice(choice, options);
}

/**
 * Initialize choice.
 * @param {Object} `choice`
 * @param {Object} `options`
 */

Choice.prototype.initChoice = function(choice, options) {
  utils.define(this, 'isChoice', true);
  this.name = null;
  this.short = null;
  this.value = null;
  this.disabled = false;
  this.checked = false;
  utils.define(this, 'position', 0);
  utils.define(this, 'index', 0);
  utils.define(this, 'options', options || {});

  utils.extend(this, choice);
  this.name = choice.name || choice.value;
  this.value = choice.hasOwnProperty('value') ? choice.value : choice.name;
  this.short = choice.short || choice.name;
  utils.define(this, 'key', this.key || this.short);

  if (!this.options.hasOwnProperty('pointer')) {
    this.options.pointer = log.cyan(utils.pointer(this.options));
  }
};

Choice.prototype.render = function(idx) {
  if (this.type === 'separator') {
    return this.value || ' ---\n';
  }
  this.position = idx;
  return this.line;
};

Choice.prototype.toggle = function() {
  this.checked = !this.checked;
  return this;
};

Choice.prototype.enable = function(prop) {
  utils.set(this, prop, true);
  return this;
};

Choice.prototype.disable = function(prop) {
  utils.set(this, prop, false);
  return this;
};

Choice.prototype.format = function(str) {
  if (typeof this.options.format === 'function') {
    str = this.options.format.call(this, str);
  }
  return this.disabled ? log.gray(str) : str;
};

Object.defineProperty(Choice.prototype, 'prefix', {
  set: function(val) {
    utils.define(this, '_pointer', val);
  },
  get: function() {
    var val = typeof this._pointer === 'string' ? this._pointer : this.options.pointer;
    return this.position === this.index ? val : ' ';
  }
});

Object.defineProperty(Choice.prototype, 'symbol', {
  set: function() {
    throw new Error('.symbol is a getter and cannot be defined');
  },
  get: function() {
    if (typeof this.options.symbol === 'string') {
      return this.options.symbol;
    }
    return this.disabled ? radio.disabled : (this.checked ? radio.on : radio.off);
  }
});

/**
 * Getter for getting the line to render for a choice
 * @name .line
 * @api public
 */

Object.defineProperty(Choice.prototype, 'line', {
  set: function() {
    throw new Error('.line is a getter and cannot be defined');
  },
  get: function() {
    var val = this.value;
    if (typeof this.disabled === 'string') {
      this._pointer = ' ';
      val += ` (${this.disabled})`;
    } else if (this.disabled === true) {
      this._pointer = ' ';
      val += ` (Disabled)`;
    }
    return this.prefix + this.symbol + ' ' + this.format(val) + '\n';
  }
});

/**
 * Getter for getting the line to render for a choice
 * @name .line
 * @api public
 */

Object.defineProperty(Choice.prototype, 'disabled', {
  enumerable: true,
  set: function(disabled) {
    utils.define(this, '_disabled', disabled);
  },
  get: function() {
    if (typeof this._disabled === 'function') {
      return this._disabled.call(this, this.options.answers);
    }
    return this._disabled;
  }
});

function disabled(choice) {
  var symbol = process.platform === 'win32' ? ' (×) ' : ' ⓧ ';
  return log.dim(symbol + choice.name + ' (' + (choice.disabled || 'Disabled') + ')');
}

/**
 * Expose Choice
 */

module.exports = Choice;
