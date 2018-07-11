'use strict';

var debug = require('debug')('choices-separator');
var repeat = require('repeat-string');
var gray = require('ansi-gray');

/**
 * Separator object, used in choices arrays in prompts to create a visual break
 * between sections.
 *
 * @param {String} `line` String to use as a separator
 * @api public
 */

function Separator(line) {
  debug('initializing from <%s>', __filename);
  this.isSeparator = true;
  this.prefix = ' ';
  this.type = 'separator';
  this.chars = {middot: '·', line: '─', bullet: '•'};
  this.line = this.chars[line] || line;
  if (!this.line) {
    this.line = gray(repeat(this.chars.line, 8));
  } else {
    this.line = gray(this.line);
  }
}

/**
 * Render the separator line with a prefix.
 * @return {String}
 */

Separator.prototype.render = function() {
  return this.prefix + this.line + '\n';
};

/**
 * Helper function returning false if object is a separator
 * @param  {Object} `obj` object to test against
 * @return {Boolean} Returns false if the given object is a separator
 * @api public
 */

Separator.exclude = function(obj) {
  return obj.type !== 'separator';
};

/**
 * Stringify separator
 * @return {String} the separator display string
 * @api public
 */

Separator.prototype.toString = function() {
  return this.line;
};

/**
 * Expose `Separator`
 */

module.exports = Separator;
