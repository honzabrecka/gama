# Γ [![Build Status](https://travis-ci.org/honzabrecka/gama.svg?branch=master)](https://travis-ci.org/honzabrecka/gama)

A practical 2D math/geometry library for functional JavaScript, based on [Ramda](http://ramdajs.com/).

## Why Gama?

Gama is based on Ramda and follows its philosophy. The primary features of Gama are:

- Immutability and side-effect free functions are at the heart of its design philosophy. This can help you get the job done with simple, elegant code.
- Functions are automatically curried. This allows you to easily build up new functions from old ones simply by not supplying the final parameters.

## Installation

To use with node:

	$ npm install gama

To use directly in the browser:

	<script src="path/to/yourCopyOfGama/dist/gama.min.js"></script>

## Use

```js
var gama = require('gama');
```

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

$ gulp lint
$ gulp test
```