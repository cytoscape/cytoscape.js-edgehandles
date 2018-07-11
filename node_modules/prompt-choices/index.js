'use strict';

var debug = require('debug')('prompt-choices');
var Choice = require('./lib/choice');
var utils = require('./lib/utils');
var Move = require('./lib/move');

/**
 * Create a new `Choices` collection.
 *
 * ```js
 * var choices = new Choices(['foo', 'bar', 'baz']);
 * var choices = new Choices([{name: 'foo'}, {name: 'bar'}, {name: 'baz'}]);
 * ```
 * @param {Array} `choices` One or more `choice` strings or objects.
 * @api public
 */

function Choices(choices, options) {
  debug('initializing from <%s>', __filename);
  if (utils.isObject(choices) && choices.isChoices) {
    return choices;
  }
  this.options = options || {};
  utils.define(this, 'isChoices', true);
  utils.define(this, 'answers', this.options.answers || {});
  this.paginator = new utils.Paginator(this.options);
  this.original = utils.clone(choices);
  this.choices = [];
  this.keymap = {};
  this.items = [];
  this.keys = [];
  this.addChoices(choices);
}

/**
 * Render the current choices.
 *
 * @param {Number} `position` Cursor position
 * @param {Object} `options`
 * @return {String}
 * @api public
 */

Choices.prototype.render = function(position, options) {
  var opts = utils.extend({}, this.options, options);
  var len = this.choices.length;
  var num = opts.limit || 7;
  var idx = -1;
  var buf = '';

  position = position || 0;
  while (++idx < len) {
    buf += this.choices[idx].render(position);
  }

  var str = '\n' + buf.replace(/\n$/, '');
  if (len > num && opts.paginate) {
    return this.paginator.paginate(str, position, num);
  }
  return str;
};

/**
 * Add an array of normalized `choice` objects to the `choices` array. This
 * method is called in the constructor, but it can also be used to add
 * choices after instantiation.
 *
 * ```js
 * choices.addChoices(['a', 'b', 'c']);
 * ```
 * @param {Array|Object} `choices` One or more choices to add.
 * @api public
 */

Choices.prototype.addChoices = function(choices) {
  choices = utils.arrayify(choices);
  var len = choices.length;
  var idx = -1;
  var i = 0;
  while (++idx < len) {
    var choice = choices[idx];
    if (choice.type === 'separator') {
      if (!choice.isSeparator) {
        choice = new utils.Separator(choice.line);
      }

    } else if (choice.disabled) {
      choice = this.choice(choice);

    } else {
      choice = this.choice(choice);
      choice.index = i;
      i++;
      this.keymap[choice.key] = choice;
      this.keys.push(choice.key);
      this.items.push(choice);
    }
    // push normalized "choice" object onto array
    this.choices.push(choice);
  }
};

/**
 * Create a new `Choice` object.
 *
 * ```js
 * choices.choice('blue');
 * ```
 * @param {String|Object} `choice`
 * @return {Object} Returns a choice object.
 * @api public
 */

Choices.prototype.choice = function(choice) {
  return new Choice(choice, this.options);
};

/**
 * Create a new `Separator` object. See [choices-separator][] for more details.
 *
 * ```js
 * choices.separator();
 * ```
 * @param {String} `separator` Optionally pass a string to use as the separator.
 * @return {Object} Returns a separator object.
 * @api public
 */

Choices.prototype.separator = function(separator, options) {
  return new utils.Separator(separator, options);
};

/**
 * Get a non-separator choice from the collection.
 *
 * ```js
 * choices.getChoice(1);
 * ```
 * @param {Number} `idx` The selected choice index
 * @return {Object|undefined} Return the matched choice object or undefined
 * @api public
 */

Choices.prototype.getChoice = function(idx) {
  if (typeof idx === 'string') {
    idx = this.getIndex(idx);
  }
  return this.items[idx];
};

/**
 * Get the index of a non-separator choice from the collection.
 *
 * ```js
 * choices.getChoice('foo');
 * ```
 * @param {String} `key` The key of the choice to get
 * @return {Number} Index of the choice or `-1`;
 * @api public
 */

Choices.prototype.getIndex = function(key) {
  if (typeof key === 'string') {
    return this.pluck('value').indexOf(key);
  }
  return this.isValidIndex(key) ? key : -1;
};

/**
 * Get the choice or separator object at the specified index.
 *
 * ```js
 * choices.getChoice(1);
 * ```
 * @param {Number} `idx` The index of the object to get
 * @return {Object} Returns the specified choice
 * @api public
 */

Choices.prototype.get = function(idx) {
  if (!utils.isNumber(idx)) {
    throw new TypeError('expected index to be a number');
  }
  return this.items[idx];
};

/**
 * Enable the choice at the given `idx`.
 *
 * ```js
 * choices.enable(1);
 * ```
 * @param {Number} `idx` The index of the choice to enable.
 * @api public
 */

Choices.prototype.enable = function(idx) {
  if (Array.isArray(idx)) {
    return idx.forEach(this.enable.bind(this));
  }
  this.getChoice(idx).enable('checked');
  return this;
};

/**
 * Disable the choice at the given `idx`.
 *
 * ```js
 * choices.disable(1);
 * ```
 * @param {Number} `idx` The index of the choice to enable.
 * @api public
 */

Choices.prototype.disable = function(idx) {
  if (Array.isArray(idx)) {
    return idx.forEach(this.disable.bind(this));
  }
  this.getChoice(idx).disable('checked');
  return this;
};

/**
 * Toggle the choice at the given `idx`.
 *
 * ```js
 * choices.toggle(1);
 * // radio mode
 * choices.toggle(1, true);
 * ```
 * @param {Number} `idx` The index of the choice to toggle.
 * @api public
 */

Choices.prototype.toggle = function(idx, radio) {
  if (radio) {
    utils.toggleArray(this.items, 'checked', idx);
  } else {
    this.getChoice(idx).toggle();
  }
  return this;
};

/**
 * Return choices that return truthy based on the given `val`.
 *
 * @param {Object|Function|String|RegExp} `val`
 * @return {Array} Matching choices or empty array
 * @api public
 */

Choices.prototype.where = function(val) {
  var res = [];

  if (typeof val === 'function') {
    return this.filter(val);
  }

  if (typeof val === 'string') {
    return this.filter(function(choice) {
      return choice.name === val || choice.key === val;
    });
  }

  if (utils.typeOf(val) === 'regexp') {
    return this.filter(function(choice) {
      return val.test(choice.name) || val.test(choice.key);
    });
  }

  if (utils.isObject(val)) {
    return this.filter(function(choice) {
      for (var key in val) {
        if (!choice.hasOwnProperty(key)) {
          return false;
        }
        return val[key] === choice[key];
      }
    });
  }

  if (Array.isArray(val)) {
    var acc = [];
    for (var i = 0; i < val.length; i++) {
      acc = acc.concat(this.where.call(this, val[i]));
    }
    return acc;
  }

  return [];
};

/**
 * Returns true if the given `index` is a valid choice index.
 * @param {String} `key` Property name to use for plucking objects.
 * @return {Array} Plucked objects
 * @api public
 */

Choices.prototype.isValidIndex = function(idx) {
  return utils.isNumber(idx) && idx !== -1 && idx < this.items.length;
};

/**
 * Return the `.key` property from the choice at the given index.
 * @param {String} `key` Property name to use for plucking objects.
 * @return {Array} Plucked objects
 * @api public
 */

Choices.prototype.key = function(key) {
  return this.getChoice(key).key;
};

/**
 * Pluck an object with the specified key from the choices collection.
 * @param {String} `key` Property name to use for plucking objects.
 * @return {Array} Plucked objects
 * @api public
 */

Choices.prototype.pluck = function(key) {
  return this.items.map(function(choice) {
    return choice[key];
  });
};

/**
 * Convenience array methods
 */

Choices.prototype.indexOf = function() {
  return this.getChoice(this.keys.indexOf.apply(this.keys, arguments));
};

Choices.prototype.forEach = function() {
  return this.items.forEach.apply(this.items, arguments);
};

Choices.prototype.filter = function() {
  return this.items.filter.apply(this.items, arguments);
};

/**
 * Getter for getting the length of the collection.
 * @name .length
 * @api public
 */

Object.defineProperty(Choices.prototype, 'checked', {
  set: function() {
    throw new Error('.checked is a getter and cannot be defined');
  },
  get: function() {
    return this.items.reduce(function(acc, choice) {
      if (choice.checked === true) {
        acc.push(choice.value);
      }
      return acc;
    }, []);
  }
});

Object.defineProperty(Choices.prototype, 'length', {
  set: function() {
    throw new Error('.length is a getter and cannot be defined');
  },
  get: function() {
    return this.items.length;
  }
});

Object.defineProperty(Choices.prototype, 'move', {
  set: function(move) {
    utils.define(this, '_move', move);
  },
  get: function() {
    if (this._move) return this._move;
    utils.define(this, '_move', new Move(this, this.options));
    return this._move;
  }
});

/**
 * Create a new `Separator` object. See [choices-separator][] for more details.
 *
 * ```js
 * new Choices.Separator();
 * ```
 * @param {String} `separator` Optionally pass a string to use as the separator.
 * @return {Object} Returns a separator object.
 * @api public
 */

Choices.Separator = utils.Separator;

/**
 * Expose `Choices`
 */

module.exports = Choices;
