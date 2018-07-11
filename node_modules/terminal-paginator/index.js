'use strict';

var debug = require('debug')('terminal-paginator');
var log = require('log-utils');

/**
 * The paginator keeps track of a pointer index in a list
 * and returns a subset of the choices if the list is too
 * long.
 */

function Paginator(options) {
  debug('initializing from <%s>', __filename);
  this.options = options || {};
  this.lastIndex = 0;
  this.pointer = 0;
}

Paginator.prototype.paginate = function(output, selected, limit) {
  limit = limit || this.options.limit || 7;
  var lines = output.split('\n');

  // Return if we don't have enough visible lines to paginate
  if (lines.length <= limit) {
    return output;
  }

  // get the approximate "middle" of the visible list
  var middle = Math.ceil(limit / 2);

  // Move the pointer when a down keypress is entered, and limit it
  // approximately half the length of the limit, to keep the pointer
  // the middle of the visible list
  if (this.pointer < middle && this.lastIndex < selected && selected - this.lastIndex < limit) {
    this.pointer = Math.min(middle, this.pointer + selected - this.lastIndex);
  }

  // store reference to the index of the currently selected item
  this.lastIndex = selected;

  // Duplicate lines to create the illusion of an infinite list
  var infinite = lines.concat(lines).concat(lines).filter(Boolean);
  var topIndex = Math.max(0, selected + lines.length - this.pointer);

  // Create the visible list based on the limit and current cursor position
  var visible = infinite.splice(topIndex, limit).join('\n');
  visible += '\n';
  visible += log.dim('(Move up and down to reveal more choices)');

  // ensure that output has a leading newline, so that the first
  // list item begins on the next line after the prompt question
  if (visible.charAt(0) !== '\n') {
    visible = '\n' + visible;
  }

  return visible;
};

/**
 * Expose `Paginator`
 */

module.exports = Paginator;
