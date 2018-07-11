/*!
 * copyright-regex <https://github.com/regexhq/copyright-regex>
 *
 * Copyright (c) 2015-2016 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function copyrightRegex() {
  return /(?!.*(?:\{|\}|\);))(?:(copyright)[ \t]*(?:(&copy;|\(c\)|&#(?:169|xa9;)|©)[ \t]+)?)(?:((?:((?:(?:19|20)[0-9]{2}))[^\w\n]*)*)([ \t,\w]*))/i;
};
