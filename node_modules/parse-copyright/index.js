/*!
 * parse-copyright <https://github.com/jonschlinkert/parse-copyright>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var regex = require('copyright-regex');

module.exports = function (str, options) {
  var res = [];
  var match;

  while (match = parse(str, options)) {
    str = str.replace(match.statement, '');
    res.push(match);
  }

  return res;
};

function parse(str, options) {
  var match = regex().exec(str);
  if (!match) { return null; }

  if (!isValid(match[0])) {
    return null;
  }

  if (options && options.original) {
    res.original = str;
  }

  var res = {};
  // 'Copyright (c) 2013-2015, 2016, Jon Schlinkert'
  if (match[0]) { res.statement = match[0]; }
  // 'Copyright'
  if (match[1]) { res.prefix = match[1]; }
  // '(c)'
  if (match[2]) { res.symbol = match[2]; }
  // '2013-2015, 2016, '
  if (match[3]) { res.dateRange = clean(match[3]); }
  if (match[3]) { res.first = first(res.dateRange); }
  // '2016'
  if (match[4]) { res.latest = match[4]; }
  // 'Jon Schlinkert'
  if (match[5]) { res.author = clean(match[5]); }
  return res;
}

function first(str) {
  var years = str.split(/\W/);
  if (years && years.length && /^\d+$/.test(years[0])) {
    return years[0];
  }
  return null;
}

function clean(str) {
  return str.replace(/^\W*|\W*$/g, '');
}

function isValid(str) {
  if (!/(?:(?:19|20)[0-9]{2})/.test(str)) {
    return false;
  }
  return true;
}