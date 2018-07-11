/*!
 * update-year <https://github.com/jonschlinkert/update-year>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var unique = require('array-unique');
var year = +require('year')();

module.exports = function updateYear(str) {
  str = String(str);
  var segs = unique(str.split(', '));
  var len = segs.length;

  if (len === 1 && +segs[0] === year) {
    return segs[0];
  }

  if (len === 1 && !/-/.test(str)) {
    return createRange(str, year);
  }

  if (len > 1 && +segs[len - 1] === year) {
    segs.pop();
    len--;
  }

  if (+segs[len - 1] === year) {
    if (+segs[0] === year - 1) {
      return segs.join('-');
    }
    return str;
  }

  var last = segs.pop();
  var prefix = createPrefix(segs, last);

  var years = unique(last.split('-') || []);
  len = years.length;

  if (len === 1) {
    return prefix + createRange(+last, year);
  }

  if (+years[len - 1] === year - 1) {
    return prefix + years[0] + '-' + year;
  }

  if (+years[len - 1] === year) {
    return prefix + last;
  }

  return prefix + last + ', ' + year;
};

function createPrefix(segs, last) {
  if (segs.length === 0) {
    return '';
  }
  if (segs.length === 1 && last) {
    return segs[0] + ', ';
  }
  return segs.join(', ') + ', ';
}

function createRange(num, year) {
  if (!num) return year;
  num = +num;
  if (num === year) {
    return String(year);
  }
  if (num === (year - 1)) {
    return num + '-' + year;
  }
  if (num < year) {
    return num + ', ' + year;
  }
}

module.exports.matchRange = function matchRange(str) {
  var re = /((?:19|20)[0-9]{2}(?:[\d-]|\sto\s)*)/g;
  var lines = str.split(/[\r\n]+/);
  var len = lines.length, i = -1;
  var res = [];

  while (len--) {
    var line = lines[++i];
    var match = line.match(re);
    if (match) {
      res.push(match.join(', '));
    }
  }
  return res;
};
