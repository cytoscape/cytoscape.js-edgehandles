/*!
 * delete <https://github.com/jonschlinkert/delete>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var each = require('async-each');
var extend = require('extend-shallow');
var rimraf = require('rimraf');
var glob = require('matched');

function del(patterns, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (typeof cb !== 'function') {
    return del.promise.apply(del, arguments);
  }

  var opts = extend({cwd: process.cwd()}, options);
  var deleted = [];

  if (patterns === '' && isCurrentDir(opts.cwd)) {
    cb(null, deleted);
    return;
  }

  glob(patterns, opts, function(err, files) {
    if (err) {
      cb(err);
      return;
    }

    each(files, function(file, next) {
      var fp = path.resolve(opts.cwd, file);

      fs.stat(fp, function(err, stat) {
        if (err) {
          next();
          return;
        }

        try {
          assertDirectory(fp, opts);
        } catch (err) {
          next(err);
          return;
        }

        rimraf(fp, {disableGlob: true}, function(err) {
          if (err) return next(err);
          deleted.push(fp);
          next();
        });
      });
    }, function(err) {
      cb(err, deleted.sort());
    });
  });
}

del.sync = function delSync(patterns, options) {
  var opts = extend({cwd: process.cwd()}, options);
  var deleted = [];

  if (patterns === '' && isCurrentDir(opts.cwd)) {
    return [];
  }

  glob.sync(patterns, opts).forEach(function(file) {
    var fp = path.resolve(opts.cwd, file);
    assertDirectory(fp, opts);
    rimraf.sync(fp, {disableGlob: true});
    deleted.push(fp);
  });

  deleted.sort();
  return deleted;
};

del.promise = function delPromise(patterns, options) {
  var opts = extend({cwd: process.cwd()}, options);
  var deleted = [];

  if (patterns === '' && isCurrentDir(opts.cwd)) {
    return Promise.resolve(deleted);
  }

  return glob.promise(patterns, opts)
    .then(function(files) {
      // sync is actually faster than async most of the time
      files.forEach(function(fp) {
        del.sync(fp, opts);
        deleted.push(fp);
      });
      return deleted;
    });
};

function assertDirectory(fp, options) {
  if (options && options.force === true) {
    return;
  }
  if (isCurrentDir(fp) === true) {
    throw new Error('CAUTION! to delete the current working directory "options.force" must be set to true');
  }
  if (insideCurrentDir(fp) === false) {
    throw new Error('CAUTION! to delete files or folders outside the current working directory "options.force" must be set to true');
  }
}

function insideCurrentDir(fp) {
  var cwd = stripSlash(process.cwd());
  fp = stripSlash(path.normalize(path.resolve(fp)));
  if (path.sep === '\\') {
    cwd = cwd.toLowerCase();
    fp = fp.toLowerCase();
  }
  return fp.slice(0, cwd.length) === cwd;
}

function stripSlash(fp) {
  if (fp.slice(-1) === '/') {
    return fp.slice(0, -1);
  }
  return fp;
}

function isCurrentDir(fp) {
  return process.cwd() === path.resolve(fp);
}

/**
 * Expose `del`
 */

module.exports = del;
