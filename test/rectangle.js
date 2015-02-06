// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var R = require('ramda');
var gama = require('../src/gama');

describe('Rectangle', function()
{
  it('factory', function()
  {
    assert.deepEqual({x: 1, y: 2, width: 3, height: 4}, gama.Rectangle(1, 2, 3, 4));
  });

  var pointInRectangle = gama.testPointRectangle(R.__, gama.Rectangle(10, 20, 30, 40));

  it('testPointRectangle (in)', function()
  {
    assert.equal(true, pointInRectangle(gama.Point(15, 25)));
    assert.equal(true, pointInRectangle(gama.Point(10, 25)));
    assert.equal(true, pointInRectangle(gama.Point(40, 25)));
    assert.equal(true, pointInRectangle(gama.Point(15, 20)));
    assert.equal(true, pointInRectangle(gama.Point(15, 60)));
  });
  it('testPointRectangle (out)', function()
  {
    assert.equal(false, pointInRectangle(gama.Point(5, 25)));
    assert.equal(false, pointInRectangle(gama.Point(45, 25)));
    assert.equal(false, pointInRectangle(gama.Point(15, 5)));
    assert.equal(false, pointInRectangle(gama.Point(15, 65)));
  });
});