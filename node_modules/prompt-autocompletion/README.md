# prompt-autocompletion [![NPM version](https://img.shields.io/npm/v/prompt-autocompletion.svg?style=flat)](https://www.npmjs.com/package/prompt-autocompletion) [![NPM downloads](https://img.shields.io/npm/dm/prompt-autocompletion.svg?style=flat)](https://npmjs.org/package/prompt-autocompletion)

> Prompt that autocompletes as you type. Can be used standalone or with a prompt system like [enquirer](https://github.com/enquirer/enquirer)

![prompt-autocompletion example](https://raw.githubusercontent.com/enquirer/prompt-autocompletion/master/example.gif)

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save prompt-autocompletion
```

## Example usage

```js
var states = ['Alabama', 'Alaska', 'American Samoa', ...];
var AutoComplete = require('prompt-autocompletion');
var autocomplete = new AutoComplete({
  type: 'autocomplete',
  name: 'from',
  message: 'Select a state to travel from',
  source: searchStates
});

// promise
autocomplete.run()
  .then(function(answer) {
    console.log(answer);
  });

// or async
autocomplete
  .ask(function(answer) {
    console.log(answer);
  });

function searchStates(answers, input) {
  return new Promise(function(resolve) {
    resolve(states.filter(filter(input)));
  });
}

function filter(input) {
  return function(state) {
    return new RegExp(input, 'i').exec(state) !== null;
  };
}
```

## Enquirer usage

```js
var states = ['Alabama', 'Alaska', 'American Samoa', ...];
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('autocomplete', require('prompt-autocompletion'));
var questions = [
  {
    type: 'autocomplete',
    name: 'from',
    message: 'Select a state to travel from',
    source: searchStates
  },
  {
    type: 'autocomplete',
    name: 'to',
    message: 'Select a state to travel to',
    source: searchStates
  }
];

enquirer.ask(questions)
  .then(function(answers) {
    console.log(answers);
  })
  .catch(function(err) {
    console.log(err);
  });

function searchStates(answers, input) {
  return new Promise(function(resolve) {
    resolve(states.filter(filter(input)));
  });
}

function filter(input) {
  return function(state) {
    return new RegExp(input, 'i').exec(state) !== null;
  };
}
```

## Prompts

Other prompt modules:

* [prompt-checkbox](https://www.npmjs.com/package/prompt-checkbox): Multiple-choice/checkbox prompt. Can be used standalone or with a prompt system like [Enquirer](https://github.com/enquirer/enquirer). | [homepage](https://github.com/enquirer/prompt-checkbox "Multiple-choice/checkbox prompt. Can be used standalone or with a prompt system like [Enquirer].")
* [prompt-confirm](https://www.npmjs.com/package/prompt-confirm): Confirm (yes/no) prompt. Can be used standalone or with a prompt system like [Enquirer](https://github.com/enquirer/enquirer). | [homepage](https://github.com/enquirer/prompt-confirm "Confirm (yes/no) prompt. Can be used standalone or with a prompt system like [Enquirer].")
* [prompt-editor](https://www.npmjs.com/package/prompt-editor): Editor prompt. Opens your text editor and waits for you to save your input during… [more](https://github.com/enquirer/prompt-editor) | [homepage](https://github.com/enquirer/prompt-editor "Editor prompt. Opens your text editor and waits for you to save your input during a prompt. Can be used standalone or with a prompt system like [Enquirer].")
* [prompt-expand](https://www.npmjs.com/package/prompt-expand): Expand prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-expand) | [homepage](https://github.com/enquirer/prompt-expand "Expand prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")
* [prompt-list](https://www.npmjs.com/package/prompt-list): List-style prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-list) | [homepage](https://github.com/enquirer/prompt-list "List-style prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")
* [prompt-password](https://www.npmjs.com/package/prompt-password): Password prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-password) | [homepage](https://github.com/enquirer/prompt-password "Password prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")
* [prompt-radio](https://www.npmjs.com/package/prompt-radio): Radio prompt. This prompt behaves like other radio-button interfaces, where only one choice is enabled… [more](https://github.com/enquirer/prompt-radio) | [homepage](https://github.com/enquirer/prompt-radio "Radio prompt. This prompt behaves like other radio-button interfaces, where only one choice is enabled whilst all others are disabled. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")
* [prompt-rawlist](https://www.npmjs.com/package/prompt-rawlist): Rawlist prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-rawlist) | [homepage](https://github.com/enquirer/prompt-rawlist "Rawlist prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")

## Attribution

This is entirely based on https://www.npmjs.com/package/inquirer-autocomplete-prompt Copyright (c) 2015, Martin Hansen [martin@martinhansen.no](mailto:martin@martinhansen.no)

Thanks, Martin!

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for avice on opening issues, pull requests, and coding standards.

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/enquirer/prompt-autocompletion/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.1.31, on October 13, 2016._