'use strict';

/**
 * Generate a single file
 */

module.exports = function file(app, name) {
  return app.src(name, { cwd: __dirname })
    .pipe(app.renderFile('*', {layout: null})).on('error', console.log)
    .pipe(app.conflicts(app.cwd))
    .pipe(app.dest(app.cwd));
};
