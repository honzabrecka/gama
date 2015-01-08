// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var g = require('../src/gama');

describe('collision test: Point and Circle', function()
{
  it('point lays in circle', function()
  {
    var pointLaysInCircle = g.testPointCircle(undefined, g.Circle(
      g.Point(3, 4),
      2
    ));

    assert.equal(true, pointLaysInCircle(g.Point(3, 4)));
    assert.equal(true, pointLaysInCircle(g.Point(2, 4)));
    assert.equal(true, pointLaysInCircle(g.Point(1, 4)));
    assert.equal(false, pointLaysInCircle(g.Point(1, 1)));
    assert.equal(false, pointLaysInCircle(g.Point(1, 2)));
  });
});