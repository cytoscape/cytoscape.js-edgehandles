'use strict';

var utils = require('./utils');

/**
 * Normalize the `author` value to ensure the copyright statement
 * has the correct value:
 *   - If the statement already has an author, that will be used.
 *   - If the statement does not have an author, the package.json author is used
 *   - If the statement has an author that is misspelled, it will be corrected
 */

module.exports = function(ctx, pkg, options) {
  var opts = utils.merge({}, options);
  if (opts.author && typeof opts.author === 'string') {
    return opts.author;
  }

  pkg.author = toAuthorString(pkg.author);
  ctx.author = toAuthorString(ctx.author);

  ctx.author = ctx.author.replace(/contributors\.?/, '');
  if (!pkg.author) {
    return ctx.author;
  }

  // if both authors are equal, return the author
  if (pkg.author === ctx.author) {
    return pkg.author;
  }

  // fix obvious misspellings
  var dist = opts && typeof opts.distance === 'number' ? opts.distance : 4;
  if (utils.leven(ctx.author, pkg.author) < dist) {
    return pkg.author;
  }

  // if the package.json author has no similarity to the context author,
  // we should assume the context author (from the original banner) is
  // the correct one
  if (utils.strip(pkg.author).indexOf(utils.strip(ctx.author)) === -1) {
    return ctx.author;
  }

  // if multiple authors are defined in the original banner, use those,
  // otherwise use the author string defined in package.json
  return /,/.test(ctx.author) ? ctx.author : pkg.author;
};

function toAuthorString(author) {
  if (typeof author === 'string') {
    author = utils.parseAuthor(author);
  }
  if (utils.isObject(author)) {
    return author.name;
  }
  return '';
}
