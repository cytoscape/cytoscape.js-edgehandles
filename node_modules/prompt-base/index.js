'use strict';

var Base = require('base');
var log = require('log-utils');
var UI = require('readline-ui');
var debug = require('debug')('prompt-base');
var define = require('define-property');
var Question = require('prompt-question');
var utils = require('./lib/utils');

/**
 * Create a new Prompt with the given `question` object, `answers` and optional instance
 * of [readline-ui][].
 *
 * ```js
 * var prompt = new Prompt({
 *   name: 'color',
 *   message: 'What is your favorite color?'
 * });
 *
 * prompt.ask(function(answer) {
 *   console.log(answer);
 *   //=> 'blue'
 * });
 * ```
 * @param {Object} `question` Plain object or instance of [prompt-question][].
 * @param {Object} `answers` Optionally pass an answers object from a prompt manager (like [enquirer][]).
 * @param {Object} `ui` Optionally pass an instance of [readline-ui][]. If not passed, an instance is created for you.
 * @api public
 */

function Prompt(question, answers, ui) {
  if (!(this instanceof Prompt)) {
    var proto = Object.create(Prompt.prototype);
    Prompt.apply(proto, arguments);
    return proto;
  }

  Base.call(this);

  if (!question) {
    throw new TypeError('expected question to be a string or object');
  }

  debug('initializing from <%s>', __filename);
  this.question = new Question(question);
  this.answers = answers || {};
  this.status = 'pending';
  this.session = true;
  this.called = 0;
  this.ui = ui;

  if (!utils.isString(this.question.message)) {
    throw new TypeError('expected message to be a string');
  }
  if (!utils.isString(this.question.name)) {
    throw new TypeError('expected name to be a string');
  }

  define(this, 'options', this.question);
  if (typeof this.ui === 'undefined') {
    this.ui = UI.create(this.options);
  }

  this.question.options = this.question.options || {};
  this.question.options.ui = this.ui;
  this.rl = this.ui.rl;
  this.bindEvents();
};

/**
 * Inherit `Base`
 */

Base.extend(Prompt);

/**
 * Default `when` method, overridden in custom prompts.
 */

Prompt.prototype.bindEvents = function() {
  this.close = this.ui.close.bind(this.ui);
  this.onKeypress = this.onKeypress.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
};

/**
 * Default `when` method, overridden in custom prompts.
 */

Prompt.prototype.when = function(answers) {
  if (typeof this.question.when === 'function') {
    return this.question.when.call(this, this.answers);
  }
  return true;
};

/**
 * Default `validate` method, overridden in custom prompts.
 */

Prompt.prototype.validate = function(val) {
  if (typeof this.question.validate === 'function') {
    return this.question.validate(val, this.answers);
  }
  return val !== false;
};

/**
 * Default `filter` method, overridden in custom prompts.
 */

Prompt.prototype.filter = function(val) {
  if (typeof this.question.filter === 'function') {
    return this.question.filter.apply(this, arguments);
  }
  return val;
};

/**
 * Default `transform` method, overridden in custom prompts.
 */

Prompt.prototype.transform = function(val) {
  if (typeof this.question.transform === 'function') {
    return this.question.transform.apply(this, arguments);
  }
  return val;
};

/**
 * Initialize a prompt and resolve answers. If `question.when` returns false,
 * the prompt will be skipped.
 *
 * @param {Object} `answers`
 * @return {Promise}
 * @api public
 */

Prompt.prototype.run = function(answers) {
  this.resume();

  var name = this.question.name;
  if (!this.when(answers)) {
    this.end(false);
    return Promise.resolve();
  }
  var ask = this.ask.bind(this);
  answers = answers || {};

  return new Promise(function(resolve) {
    ask(function(value) {
      answers[name] = value;
      resolve(value);
    });
  });
};

/**
 * Default `ask` method, overridden in custom prompts.
 */

Prompt.prototype.ask = function(callback) {
  this.callback = callback;
  this.only('keypress', this.onKeypress.bind(this));
  this.only('error', this.onError.bind(this));
  this.only('line', this.onSubmit.bind(this));
  this.render();
};

/**
 * Render the current prompt input. This can be replaced by custom prompts.
 *
 * ```js
 * prompt.ui.on('keypress', prompt.render.bind(prompt));
 * ```
 * @api public
 */

Prompt.prototype.render = function(state) {
  var append = typeof state === 'string'
    ? log.red('>> ') + state
    : '';

  var message = this.message;
  var answer = this.status === 'answered'
    ? log.cyan(this.answer)
    : this.rl.line;

  this.ui.render(message + answer, append);
};

/**
 * On `keypress` events.
 */

Prompt.prototype.move = function(name, event) {
  if (name && typeof this.choices.move[name] === 'function') {
    this.position = this.choices.move[name](this.position, event);
    this.render();
  }
};

/**
 * On `keypress` events.
 */

Prompt.prototype.onKeypress = function() {
  var state = this.rl.line ? this.validate(this.rl.line) : true;
  this.render(state);
};

/**
 * When the answer is submitted (user presses `enter` key), re-render
 * and pass answer to callback. This can be replaced by custom prompts.
 * @param {Object} `input`
 */

Prompt.prototype.onSubmit = function(input) {
  this.answer = this.question.getAnswer(input);
  var isValid = this.validate(this.answer);
  if (isValid === true) {
    this.status = 'answered';
    this.submitAnswer();
  } else {
    this.rl.line += this.answer;
    this.render(isValid);
  }
};

/**
 * On `error` events
 * @param {Object} `event`
 */

Prompt.prototype.onError = function(error) {
  this.render(error);
};

/**
 * Re-render and pass the final answer to the callback. This can be replaced
 * by custom prompts, but it probably won't need to be.
 */

Prompt.prototype.submitAnswer = function(input) {
  if (this.status === 'pending') {
    this.status = 'answered';
    this.answer = this.question.getAnswer(input);
  }
  this.end();
  this.emit('answer', this.answer);
  this.callback(this.answer);
};

/**
 * Default `when` method, overridden in custom prompts.
 */

Prompt.prototype.only = function(name, fn) {
  this._only = this._only || {};
  if (arguments.length === 0) {
    for (var key in this._only) {
      this.ui.off(key, this._only[key]);
    }
    return;
  }
  if (arguments.length === 1) {
    return this._only[name];
  }
  this._only[name] = fn;
  this.ui.on(name, fn);
  return fn;
};

/**
 * Returns a formatted prompt message.
 * @return {String}
 * @api public
 */

Prompt.prototype.format = function(msg) {
  var message = this.prefix + log.bold(msg) + ' ';
  if (this.question.hasDefault && this.status !== 'answered') {
    message += log.dim('(' + this.question.default + ') ');
  }
  return message;
};

/**
 * Pause readline
 */

Prompt.prototype.end = function(render) {
  this.only();
  if (render !== false) {
    this.render();
  }
  this.ui.end();
  this.pause();
};

/**
 * Pause readline
 */

Prompt.prototype.pause = function() {
  this.rl.pause();
};

/**
 * Resume readline
 */

Prompt.prototype.resume = function() {
  this.status = 'pending';
  this.rl.resume();
};

/**
 * Close readline
 */

Prompt.prototype.close = function() {
  this.ui.close();
};

/**
 * Used if `when` returns false
 */

Prompt.prototype.noop = utils.noop;

/**
 * Getter for getting the choices array from the question.
 *
 * @name .choices
 * @return {Object} Choices object
 * @api public
 */

Object.defineProperty(Prompt.prototype, 'choices', {
  set: function(val) {
    define(this, '_choices', val);
  },
  get: function() {
    return (this._choices || this.question.choices);
  }
});

/**
 * Getter that returns `question.message` after passing it to [format](#format).
 *
 * @name .message
 * @return {String} A formatted prompt message.
 * @api public
 */

Object.defineProperty(Prompt.prototype, 'message', {
  set: function() {
    throw new Error('.message is a getter and cannot be defined');
  },
  get: function() {
    return this.format(this.question.message);
  }
});

/**
 * Getter that returns the prefix to use before `question.message`. The
 * default value is a green `?`.
 *
 * @name .prefix
 * @return {String} The formatted prefix.
 * @api public
 */

Object.defineProperty(Prompt.prototype, 'prefix', {
  set: function() {
    throw new Error('.prefix is a getter and cannot be defined');
  },
  get: function() {
    return this.question.prefix || (log.cyan('?') + ' ');
  }
});

/**
 * Create a new `Separator` object. See [choices-separator][] for more details.
 *
 * ```js
 * new Prompt.Separator();
 * ```
 * @param {String} `separator` Optionally pass a string to use as the separator.
 * @return {Object} Returns a separator object.
 * @api public
 */

Prompt.Separator = Question.Separator;

/**
 * Expose `Prompt`
 */

module.exports = Prompt;
