'use strict';

var file = require('./file');

module.exports = function(app) {
  /**
   * Generate a(n) `afl-3.0` license file to the current working directory.
   *
   * ```sh
   * $ gen license:afl-3.0
   * $ gen license:afl-3.0 --dest ./foo
   * ```
   * @name afl-3.0
   * @api public
   */

  app.task('afl-3.0', ['license-afl-3.0']);
  app.task('license-afl-3.0', { silent: true }, function() {
    return file(app, '../templates/afl-3.0.tmpl');
  });

  /**
   * Generate a(n) `apache-2.0` license file to the current working directory.
   *
   * ```sh
   * $ gen license:apache-2.0
   * $ gen license:apache-2.0 --dest ./foo
   * ```
   * @name apache-2.0
   * @api public
   */

  app.task('apache-2.0', ['license-apache-2.0']);
  app.task('license-apache-2.0', { silent: true }, function() {
    return file(app, '../templates/apache-2.0.tmpl');
  });

  /**
   * Generate a(n) `artistic-2.0` license file to the current working directory.
   *
   * ```sh
   * $ gen license:artistic-2.0
   * $ gen license:artistic-2.0 --dest ./foo
   * ```
   * @name artistic-2.0
   * @api public
   */

  app.task('artistic-2.0', ['license-artistic-2.0']);
  app.task('license-artistic-2.0', { silent: true }, function() {
    return file(app, '../templates/artistic-2.0.tmpl');
  });

  /**
   * Generate a(n) `bsd-2-clause` license file to the current working directory.
   *
   * ```sh
   * $ gen license:bsd-2-clause
   * $ gen license:bsd-2-clause --dest ./foo
   * ```
   * @name bsd-2-clause
   * @api public
   */

  app.task('bsd-2-clause', ['license-bsd-2-clause']);
  app.task('license-bsd-2-clause', { silent: true }, function() {
    return file(app, '../templates/bsd-2-clause.tmpl');
  });

  /**
   * Generate a(n) `bsd-3-clause` license file to the current working directory.
   *
   * ```sh
   * $ gen license:bsd-3-clause
   * $ gen license:bsd-3-clause --dest ./foo
   * ```
   * @name bsd-3-clause
   * @api public
   */

  app.task('bsd-3-clause', ['license-bsd-3-clause']);
  app.task('license-bsd-3-clause', { silent: true }, function() {
    return file(app, '../templates/bsd-3-clause.tmpl');
  });

  /**
   * Generate a(n) `bsd-3-clause-clear` license file to the current working directory.
   *
   * ```sh
   * $ gen license:bsd-3-clause-clear
   * $ gen license:bsd-3-clause-clear --dest ./foo
   * ```
   * @name bsd-3-clause-clear
   * @api public
   */

  app.task('bsd-3-clause-clear', ['license-bsd-3-clause-clear']);
  app.task('license-bsd-3-clause-clear', { silent: true }, function() {
    return file(app, '../templates/bsd-3-clause-clear.tmpl');
  });

  /**
   * Generate a(n) `cc-by-4.0` license file to the current working directory.
   *
   * ```sh
   * $ gen license:cc-by-4.0
   * $ gen license:cc-by-4.0 --dest ./foo
   * ```
   * @name cc-by-4.0
   * @api public
   */

  app.task('cc-by-4.0', ['license-cc-by-4.0']);
  app.task('license-cc-by-4.0', { silent: true }, function() {
    return file(app, '../templates/cc-by-4.0.tmpl');
  });

  /**
   * Generate a(n) `cc-by-sa-4.0` license file to the current working directory.
   *
   * ```sh
   * $ gen license:cc-by-sa-4.0
   * $ gen license:cc-by-sa-4.0 --dest ./foo
   * ```
   * @name cc-by-sa-4.0
   * @api public
   */

  app.task('cc-by-sa-4.0', ['license-cc-by-sa-4.0']);
  app.task('license-cc-by-sa-4.0', { silent: true }, function() {
    return file(app, '../templates/cc-by-sa-4.0.tmpl');
  });

  /**
   * Generate a(n) `cc0-1.0` license file to the current working directory.
   *
   * ```sh
   * $ gen license:cc0-1.0
   * $ gen license:cc0-1.0 --dest ./foo
   * ```
   * @name cc0-1.0
   * @api public
   */

  app.task('cc0-1.0', ['license-cc0-1.0']);
  app.task('license-cc0-1.0', { silent: true }, function() {
    return file(app, '../templates/cc0-1.0.tmpl');
  });

  /**
   * Generate a(n) `wtfpl` license file to the current working directory.
   *
   * ```sh
   * $ gen license:wtfpl
   * $ gen license:wtfpl --dest ./foo
   * ```
   * @name wtfpl
   * @api public
   */

  app.task('wtfpl', ['license-wtfpl']);
  app.task('license-wtfpl', { silent: true }, function() {
    return file(app, '../templates/wtfpl.tmpl');
  });

  /**
   * Generate a(n) `epl-1.0` license file to the current working directory.
   *
   * ```sh
   * $ gen license:epl-1.0
   * $ gen license:epl-1.0 --dest ./foo
   * ```
   * @name epl-1.0
   * @api public
   */

  app.task('epl-1.0', ['license-epl-1.0']);
  app.task('license-epl-1.0', { silent: true }, function() {
    return file(app, '../templates/epl-1.0.tmpl');
  });

  /**
   * Generate a(n) `eupl-1.1` license file to the current working directory.
   *
   * ```sh
   * $ gen license:eupl-1.1
   * $ gen license:eupl-1.1 --dest ./foo
   * ```
   * @name eupl-1.1
   * @api public
   */

  app.task('eupl-1.1', ['license-eupl-1.1']);
  app.task('license-eupl-1.1', { silent: true }, function() {
    return file(app, '../templates/eupl-1.1.tmpl');
  });

  /**
   * Generate a(n) `agpl-3.0` license file to the current working directory.
   *
   * ```sh
   * $ gen license:agpl-3.0
   * $ gen license:agpl-3.0 --dest ./foo
   * ```
   * @name agpl-3.0
   * @api public
   */

  app.task('agpl-3.0', ['license-agpl-3.0']);
  app.task('license-agpl-3.0', { silent: true }, function() {
    return file(app, '../templates/agpl-3.0.tmpl');
  });

  /**
   * Generate a(n) `gpl-2.0` license file to the current working directory.
   *
   * ```sh
   * $ gen license:gpl-2.0
   * $ gen license:gpl-2.0 --dest ./foo
   * ```
   * @name gpl-2.0
   * @api public
   */

  app.task('gpl-2.0', ['license-gpl-2.0']);
  app.task('license-gpl-2.0', { silent: true }, function() {
    return file(app, '../templates/gpl-2.0.tmpl');
  });

  /**
   * Generate a(n) `gpl-3.0` license file to the current working directory.
   *
   * ```sh
   * $ gen license:gpl-3.0
   * $ gen license:gpl-3.0 --dest ./foo
   * ```
   * @name gpl-3.0
   * @api public
   */

  app.task('gpl-3.0', ['license-gpl-3.0']);
  app.task('license-gpl-3.0', { silent: true }, function() {
    return file(app, '../templates/gpl-3.0.tmpl');
  });

  /**
   * Generate a(n) `lgpl-2.1` license file to the current working directory.
   *
   * ```sh
   * $ gen license:lgpl-2.1
   * $ gen license:lgpl-2.1 --dest ./foo
   * ```
   * @name lgpl-2.1
   * @api public
   */

  app.task('lgpl-2.1', ['license-lgpl-2.1']);
  app.task('license-lgpl-2.1', { silent: true }, function() {
    return file(app, '../templates/lgpl-2.1.tmpl');
  });

  /**
   * Generate a(n) `lgpl-3.0` license file to the current working directory.
   *
   * ```sh
   * $ gen license:lgpl-3.0
   * $ gen license:lgpl-3.0 --dest ./foo
   * ```
   * @name lgpl-3.0
   * @api public
   */

  app.task('lgpl-3.0', ['license-lgpl-3.0']);
  app.task('license-lgpl-3.0', { silent: true }, ['gpl-3.0'], function() {
    return file(app, '../templates/lgpl-3.0.tmpl');
  });

  /**
   * Generate a(n) `isc` license file to the current working directory.
   *
   * ```sh
   * $ gen license:isc
   * $ gen license:isc --dest ./foo
   * ```
   * @name isc
   * @api public
   */

  app.task('isc', ['license-isc']);
  app.task('license-isc', { silent: true }, function() {
    return file(app, '../templates/isc.tmpl');
  });

  /**
   * Generate a(n) `lppl-1.3c` license file to the current working directory.
   *
   * ```sh
   * $ gen license:lppl-1.3c
   * $ gen license:lppl-1.3c --dest ./foo
   * ```
   * @name lppl-1.3c
   * @api public
   */

  app.task('lppl-1.3c', ['license-lppl-1.3c']);
  app.task('license-lppl-1.3c', { silent: true }, function() {
    return file(app, '../templates/lppl-1.3c.tmpl');
  });

  /**
   * Generate a(n) `mit` license file to the current working directory.
   *
   * ```sh
   * $ gen license:mit
   * $ gen license:mit --dest ./foo
   * ```
   * @name mit
   * @api public
   */

  app.task('mit', ['license-mit']);
  app.task('license-mit', { silent: true }, function() {
    return file(app, '../templates/mit.tmpl');
  });

  /**
   * Generate a(n) `ms-pl` license file to the current working directory.
   *
   * ```sh
   * $ gen license:ms-pl
   * $ gen license:ms-pl --dest ./foo
   * ```
   * @name ms-pl
   * @api public
   */

  app.task('ms-pl', ['license-ms-pl']);
  app.task('license-ms-pl', { silent: true }, function() {
    return file(app, '../templates/ms-pl.tmpl');
  });

  /**
   * Generate a(n) `ms-rl` license file to the current working directory.
   *
   * ```sh
   * $ gen license:ms-rl
   * $ gen license:ms-rl --dest ./foo
   * ```
   * @name ms-rl
   * @api public
   */

  app.task('ms-rl', ['license-ms-rl']);
  app.task('license-ms-rl', { silent: true }, function() {
    return file(app, '../templates/ms-rl.tmpl');
  });

  /**
   * Generate a(n) `mpl-2.0` license file to the current working directory.
   *
   * ```sh
   * $ gen license:mpl-2.0
   * $ gen license:mpl-2.0 --dest ./foo
   * ```
   * @name mpl-2.0
   * @api public
   */

  app.task('mpl-2.0', ['license-mpl-2.0']);
  app.task('license-mpl-2.0', { silent: true }, function() {
    return file(app, '../templates/mpl-2.0.tmpl');
  });

  /**
   * Generate a(n) `osl-3.0` license file to the current working directory.
   *
   * ```sh
   * $ gen license:osl-3.0
   * $ gen license:osl-3.0 --dest ./foo
   * ```
   * @name osl-3.0
   * @api public
   */

  app.task('osl-3.0', ['license-osl-3.0']);
  app.task('license-osl-3.0', { silent: true }, function() {
    return file(app, '../templates/osl-3.0.tmpl');
  });

  /**
   * Generate a(n) `ofl-1.1` license file to the current working directory.
   *
   * ```sh
   * $ gen license:ofl-1.1
   * $ gen license:ofl-1.1 --dest ./foo
   * ```
   * @name ofl-1.1
   * @api public
   */

  app.task('ofl-1.1', ['license-ofl-1.1']);
  app.task('license-ofl-1.1', { silent: true }, function() {
    return file(app, '../templates/ofl-1.1.tmpl');
  });

  /**
   * Generate a(n) `unlicense` license file to the current working directory.
   *
   * ```sh
   * $ gen license:unlicense
   * $ gen license:unlicense --dest ./foo
   * ```
   * @name unlicense
   * @api public
   */

  app.task('unlicense', ['license-unlicense']);
  app.task('license-unlicense', { silent: true }, function() {
    return file(app, '../templates/unlicense.tmpl');
  });

  /**
   * Generate a(n) `zlib` license file to the current working directory.
   *
   * ```sh
   * $ gen license:zlib
   * $ gen license:zlib --dest ./foo
   * ```
   * @name zlib
   * @api public
   */

  app.task('zlib', ['license-zlib']);
  app.task('license-zlib', { silent: true }, function() {
    return file(app, '../templates/zlib.tmpl');
  });

};
