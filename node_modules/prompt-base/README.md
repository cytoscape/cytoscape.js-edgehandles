# prompt-base [![NPM version](https://img.shields.io/npm/v/prompt-base.svg?style=flat)](https://www.npmjs.com/package/prompt-base) [![NPM monthly downloads](https://img.shields.io/npm/dm/prompt-base.svg?style=flat)](https://npmjs.org/package/prompt-base)  [![NPM total downloads](https://img.shields.io/npm/dt/prompt-base.svg?style=flat)](https://npmjs.org/package/prompt-base) [![Linux Build Status](https://img.shields.io/travis/enquirer/prompt-base.svg?style=flat&label=Travis)](https://travis-ci.org/enquirer/prompt-base)

> Base prompt module used for creating custom prompt types for Enquirer.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save prompt-base
```

## Usage

```js
var Prompt = require('prompt-base');
var prompt = new Prompt({
  name: 'color',
  message: 'What is your favorite color?'
});

prompt.run()
  .then(function(answer) {
    console.log(answer);
  })
```

## API

### [Prompt](index.js#L32)

Create a new Prompt with the given `question` object, `answers` and optional instance of [readline-ui](https://github.com/enquirer/readline-ui).

**Example**

```js
var prompt = new Prompt({
  name: 'color',
  message: 'What is your favorite color?'
});

prompt.ask(function(answer) {
  console.log(answer);
  //=> 'blue'
});
```

**Params**

* `question` **{Object}**: Plain object or instance of [prompt-question](https://github.com/enquirer/prompt-question).
* `answers` **{Object}**: Optionally pass an answers object from a prompt manager (like [enquirer](https://github.com/enquirer/enquirer)).
* `ui` **{Object}**: Optionally pass an instance of [readline-ui](https://github.com/enquirer/readline-ui). If not passed, an instance is created for you.

### [.run](index.js#L140)

Initialize a prompt and resolve answers. If `question.when` returns false,
the prompt will be skipped.

**Params**

* `answers` **{Object}**
* `returns` **{Promise}**

### [.render](index.js#L177)

Render the current prompt input. This can be replaced by custom prompts.

**Example**

```js
prompt.ui.on('keypress', prompt.render.bind(prompt));
```

### [.format](index.js#L278)

Returns a formatted prompt message.

* `returns` **{String}**

### [.choices](index.js#L336)

Getter for getting the choices array from the question.

* `returns` **{Object}**: Choices object

### [.message](index.js#L353)

Getter that returns `question.message` after passing it to [format](#format).

* `returns` **{String}**: A formatted prompt message.

### [.prefix](index.js#L371)

Getter that returns the prefix to use before `question.message`. The
default value is a green `?`.

* `returns` **{String}**: The formatted prefix.

### [.Separator](index.js#L391)

Create a new `Separator` object. See [choices-separator](https://github.com/enquirer/choices-separator) for more details.

**Example**

```js
new Prompt.Separator();
```

**Params**

* `separator` **{String}**: Optionally pass a string to use as the separator.
* `returns` **{Object}**: Returns a separator object.

## Examples

**Instantiate**

The main purpose of this library is to be inherited by other libraries to create custom prompt types. However, the main export is a function that can be instantiated to run basic "input" prompts, if you want to see how everything works, run examples, tests, etc.

```js
var Prompt = require('prompt-base');
var prompt = new Prompt({
  name: 'first',
  message: 'What is your name?'
});

// callback
prompt.ask(function(answer) {
  console.log(answer);
  //=> 'Jon'
});

// promise
prompt.run()
  .then(function(answers) {
    console.log(answers);
    //=> {first: 'Jon'}
  });
```

**Inherit**

```js
var Prompt = require('prompt-base');

function CustomPrompt(/*question, answers, rl*/) {
  Prompt.apply(this, arguments);
}

util.inherits(CustomPrompt, Prompt);
```

## In the wild

The following custom prompts were created using this library:

* [prompt-checkbox](https://www.npmjs.com/package/prompt-checkbox): Multiple-choice/checkbox prompt. Can be used standalone or with a prompt system like [Enquirer](https://github.com/enquirer/enquirer). | [homepage](https://github.com/enquirer/prompt-checkbox "Multiple-choice/checkbox prompt. Can be used standalone or with a prompt system like [Enquirer].")
* [prompt-confirm](https://www.npmjs.com/package/prompt-confirm): Confirm (yes/no) prompt. Can be used standalone or with a prompt system like [Enquirer](https://github.com/enquirer/enquirer). | [homepage](https://github.com/enquirer/prompt-confirm "Confirm (yes/no) prompt. Can be used standalone or with a prompt system like [Enquirer].")
* [prompt-editor](https://www.npmjs.com/package/prompt-editor): Editor prompt. Opens your text editor and waits for you to save your input during… [more](https://github.com/enquirer/prompt-editor) | [homepage](https://github.com/enquirer/prompt-editor "Editor prompt. Opens your text editor and waits for you to save your input during a prompt. Can be used standalone or with a prompt system like [Enquirer].")
* [prompt-expand](https://www.npmjs.com/package/prompt-expand): Expand prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-expand) | [homepage](https://github.com/enquirer/prompt-expand "Expand prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")
* [prompt-list](https://www.npmjs.com/package/prompt-list): List-style prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-list) | [homepage](https://github.com/enquirer/prompt-list "List-style prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")
* [prompt-password](https://www.npmjs.com/package/prompt-password): Password prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-password) | [homepage](https://github.com/enquirer/prompt-password "Password prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")
* [prompt-radio](https://www.npmjs.com/package/prompt-radio): Radio prompt. This prompt behaves like other radio-button interfaces, where only one choice is enabled… [more](https://github.com/enquirer/prompt-radio) | [homepage](https://github.com/enquirer/prompt-radio "Radio prompt. This prompt behaves like other radio-button interfaces, where only one choice is enabled whilst all others are disabled. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")
* [prompt-rawlist](https://www.npmjs.com/package/prompt-rawlist): Rawlist prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-rawlist) | [homepage](https://github.com/enquirer/prompt-rawlist "Rawlist prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")

## About

### Related projects

* [enquirer](https://www.npmjs.com/package/enquirer): Intuitive, plugin-based prompt system for node.js. Much faster and lighter alternative to Inquirer, with all… [more](https://github.com/enquirer/enquirer) | [homepage](https://github.com/enquirer/enquirer "Intuitive, plugin-based prompt system for node.js. Much faster and lighter alternative to Inquirer, with all the same prompt types and more, but without the bloat.")
* [prompt-choices](https://www.npmjs.com/package/prompt-choices): Create an array of multiple choice objects for use in prompts. | [homepage](https://github.com/enquirer/prompt-choices "Create an array of multiple choice objects for use in prompts.")
* [prompt-question](https://www.npmjs.com/package/prompt-question): Question object, used by Enquirer and prompt plugins. | [homepage](https://github.com/enquirer/prompt-question "Question object, used by Enquirer and prompt plugins.")
* [readline-utils](https://www.npmjs.com/package/readline-utils): Readline utils, for moving the cursor, clearing lines, creating a readline interface, and more. | [homepage](https://github.com/enquirer/readline-utils "Readline utils, for moving the cursor, clearing lines, creating a readline interface, and more.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for avice on opening issues, pull requests, and coding standards.

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

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
Released under the [MIT license](https://github.com/enquirer/prompt-base/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.2.0, on December 07, 2016._