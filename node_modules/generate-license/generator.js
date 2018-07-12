'use strict';

var fs = require('fs');
var path = require('path');
var choices = require('./generators/choices');
var choose = require('./lib/choose');
var utils = require('./lib/utils');

module.exports = function(app) {
  if (!utils.isValid(app, 'generate-license')) return;

  /**
   * Plugins
   */

  app.use(require('generate-defaults'));
  app.use(require('./generators/tasks'));

  /**
   * Middleware for renaming generated files
   */

  app.preWrite(/\.tmpl$/, function(file, next) {
    file.basename = 'LICENSE';
    next();
  });

  /**
   * The `default` task prompts you to choose the `LICENSE` to generate. All licenses
   * from [github/choosealicense.com](https://github.com/github/choosealicense.com) are
   * available.
   *
   * ```sh
   * $ gen license
   * $ gen license --dest ./docs
   * # or
   * $ gen license:choose
   * $ gen license:choose --dest ./docs
   * ```
   * @name default
   * @api public
   */

  app.task('default', ['license']);
  app.task('license', function(cb) {
    app.build(app.options.defaultLicense || ['choose'], cb);
  });

  app.task('choose', function(cb) {
    var options = {
      message: 'Choose the license to generate',
      choices: choices,
      filter: function(str, choice) {
        var re = new RegExp(str, 'i');
        return re.test(choice.name[0]) || re.test(choice.id);
      }
    };

    choose(app, options)
      .then(function(name) {
        app.build(name, cb);
      })
      .catch(cb);
  });

  /**
   * Generate `tasks.js` file
   */

  app.task('create-tasks', function(cb) {
    return app.src('templates/*.tmpl')
      .pipe(tasks({template: 'generators/support/tasks.tmpl'}))
      .pipe(app.renderFile('*'))
      .pipe(app.dest(app.cwd));
  });

  /**
   * Generate `choices.js` file
   */

  app.task('create-choices', function(cb) {
    return app.src('templates/*.tmpl')
      .pipe(tasks({template: 'generators/support/choices.tmpl'}))
      .pipe(app.renderFile('*'))
      .pipe(app.dest(app.cwd));
  });

  app.task('create', ['create-*']);
};

/**
 * Plugin for creating tasks for generating individual files.
 *
 * The alternative would be to load in templates and create tasks on-the-fly,
 * but this approach is much faster and results in a better user experience.
 */

function tasks(options) {
  options = options || {};
  var fp = path.resolve(options.template);
  var tmpl = new utils.File({path: fp, contents: fs.readFileSync(fp)});
  var data = {tasks: []};

  return utils.through.obj(function(file, enc, next) {
    var description = options.description || file.stem;

    if (typeof description === 'function') {
      description = options.description(file);
    }

    var name = file.data['spdx-id'].toLowerCase();
    data.tasks.push({
      alias: 'license',
      deps: file.data.deps,
      path: path.relative(path.resolve('generators'), path.join(file.dirname, name) + '.tmpl'),
      name: name,
      description: file.data.title,
      relative: file.relative
    });

    next();
  }, function(next) {
    data.tasks.sort(function(a, b) {
      if (a.description > b.description) return 1;
      if (a.description < b.description) return -1;
      return 0;
    });

    tmpl.data = data;
    this.push(tmpl);
    next();
  });
}
