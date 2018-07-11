'use strict';

var parseCopyright = require('parse-copyright');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('delete', 'del');
require('engine', 'Engine');
require('extend-shallow', 'extend');
require('is-valid-app', 'isValid');
require('parser-front-matter', 'parser');
require('through2', 'through');
require('update-copyright', 'copyright');
require('year');
require = fn;

utils.parse = function(str) {
  var sections = ['MIT License', 'Permission is hereby granted'];
  var lines = str.trim().split('\n');
  var tok = { prefix: '', authors: [] };
  var len = lines.length;
  var idx = -1;

  var first = lines[0];
  if (contains(sections[0], first)) {
    tok.prefix = lines.shift();
    len--;
  }

  while (++idx < len) {
    var line = lines[idx];
    if (!line.trim()) continue;
    if (contains(sections[1], line)) {
      tok.license = lines.slice(idx).join('\n');
      break;
    }
    tok.authors = tok.authors.concat(parseCopyright(line.trim()));
  }

  tok.authors = arrayify(tok.authors);
  var latest = null;
  var num = 0;

  if (tok.authors.length > 1) {
    tok.authors.sort(function(a, b) {
      var anum = Number(a.latest);
      var bnum = Number(b.latest);
      if (anum > num) {
        latest = a;
        num = anum;
      }
      if (bnum > num) {
        latest = b;
        num = bnum;
      }
      if (anum < bnum) return 1;
      if (anum > bnum) return -1;
      return 0;
    });

    if (latest) {
      tok.latest = latest;
    }

  } else {
    tok.latest = tok.authors[0];
  }
  return tok;
};

function contains(a, b) {
  return compact(b).indexOf(compact(a)) !== -1;
}

function compact(str) {
  return str.replace(/\s/g, '').toLowerCase();
}

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

/**
 * Expose `utils` modules
 */

module.exports = utils;
