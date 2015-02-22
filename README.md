# Γ [![Build Status](https://travis-ci.org/honzabrecka/gama.svg?branch=master)](https://travis-ci.org/honzabrecka/gama) [![Dependency Status](https://david-dm.org/honzabrecka/gama.svg)](https://david-dm.org/honzabrecka/gama)

A practical math/geometry library for functional JavaScript, based on [Ramda](http://ramdajs.com/).

## Why gama?

Gama is based on Ramda and follows its philosophy:

The primary features of Gama (Ramda) are:

- Immutability and side-effect free functions are at the heart of its design philosophy. This can help you get the job done with simple, elegant code.
- Functions are automatically curried. This allows you to easily build up new functions from old ones simply by not supplying the final parameters.
- The parameters to functions are arranged to make it convenient for currying. The data to be operated on is generally supplied last.

## Installation

To use with node:

	$ npm install gama

To use directly in the browser:

	<script src="path/to/yourCopyOfGama/dist/gama.min.js"></script>

## Use

```js
var gama = require('gama');
var R = require('ramda');
```

## Documentation

Please review the [API documentation](http://honzabrecka.com/gama).

## Building

```bash
$ npm install -g gulp
$ npm install

$ gulp dist
```

## Testing

```bash
$ npm install -g gulp
$ npm install

$ gulp linter
$ gulp test
```