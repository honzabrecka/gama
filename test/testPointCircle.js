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

describe('collision test: Point and Circle', function()
{
  it('point lays in circle', function()
  {
    var pointLaysInCircle = gama.testPointCircle(R.__, gama.Circle(
      gama.Point(3, 4),
      2
    ));

    assert.equal(true, pointLaysInCircle(gama.Point(3, 4)));
    assert.equal(true, pointLaysInCircle(gama.Point(2, 4)));
    assert.equal(true, pointLaysInCircle(gama.Point(1, 4)));
    assert.equal(false, pointLaysInCircle(gama.Point(1, 1)));
    assert.equal(false, pointLaysInCircle(gama.Point(1, 2)));
  });
});