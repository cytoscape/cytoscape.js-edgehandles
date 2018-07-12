/*!
 * update-copyright <https://github.com/jonschlinkert/update-copyright>
 *
 * Copyright © 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var author = require('./lib/author');
var defaults = require('./lib/defaults');
var template = require('./lib/template');
var utils = require('./lib/utils');

module.exports = function(str, options) {
  options = options || {};
  var context = {};

  if (typeof str === 'string') {
    var match = utils.parseCopyright(str);
    if (match.length) {
      context = match[0];
    }
  } else {
    options = str;
    str = '';
  }

  return updateCopyright(str, context, options);
};

/**
 * Parse the copyright statement and update the year or year range.
 *
 * @param {Object} `context`
 * @return {String}
 */

function updateYear(context) {
  return context.dateRange
    ? utils.updateYear(context.dateRange, String(utils.year()))
    : utils.year();
}

/**
 * Update an existing copyright statement, or create a new one
 * if one isn't passed.
 *
 * @param {String} `str` String with copyright statement
 * @param {Object} `context` Context to use for rendering the copyright template
 * @param {Object} `options`
 * @return {String}
 */

function updateCopyright(str, context, options) {
  if (typeof str !== 'string') {
    options = context;
    context = str;
    str = null;
  }

  var opts = utils.merge({template: template, copyright: ''}, options);
  var pkg = opts.pkg || utils.loadPkg.sync(process.cwd());
  var engine = new utils.Engine(opts);

  // create the template context from defaults, package.json,
  // context from parsing the original statement, and options.
  var ctx = utils.merge({}, defaults, pkg, context, opts);
  ctx.authors = ctx.author = author(ctx, pkg, options);
  ctx.years = ctx.year = updateYear(ctx);
  var statement = ctx.statement;

  // if no original statement was found, create one with the template
  if (typeof statement === 'undefined') {
    return engine.render(opts.template, ctx);
  }

  // necessary since the copyright regex doesn't match
  // the trailing dot. If it does later this is future-proof
  if (statement[statement.length - 1] !== '.') {
    var ch = statement + '.';
    if (str.indexOf(ch) !== -1) {
      statement = ch;
    }
  }

  // create the new copyright statement
  var newStatement = engine.render(opts.template, ctx);
  if (str == null) {
    return newStatement;
  }

  // if the original string is no more than a copyright statement
  // just return the new one
  if (statement.trim() === str.trim() || opts.statementOnly === true) {
    return newStatement;
  }

  return str.replace(statement, newStatement);
}

/**
 * Expose `parse`
 */

module.exports.parse = utils.parseCopyright;
module.exports.defaults = defaults;
module.exports.updateYear = updateYear;
module.exports.template = template;
module.exports.author = author;
