'use strict';

var extend = require('extend-shallow');

module.exports = function(app, options) {
  var opts = extend({}, options);
  var AutoComplete = require('prompt-autocompletion');

  var autocomplete = new AutoComplete({
    name: 'tasks',
    type: 'autocomplete',
    message: opts.message,
    source: listTasks(opts)
  });

  return autocomplete.run()
    .then(function(answer) {
      return answer;
    });
};

function listTasks(options) {
  return function(answers, str) {
    return new Promise(function(resolve) {
      resolve(options.choices.filter(filter(str, options)));
    });
  };
}

function filter(str, options) {
  return function(choice, choices) {
    if (typeof options.filter === 'function') {
      return options.filter(str, choice, choices);
    }
    return new RegExp(str, 'i').test(choice.name[0]);
  };
}
