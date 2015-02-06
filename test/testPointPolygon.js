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

describe('collision test: Point and Polygon', function()
{
  it('point lies inside rectangle', function()
  {
    var pointLiesInRectangle = gama.testPointPolygon(R.__, gama.Polygon([
      gama.Point(0, 0),
      gama.Point(2, 0),
      gama.Point(2, 2),
      gama.Point(0, 2)
    ]));

    assert.equal(true, pointLiesInRectangle(gama.Point(1, 1)));
    assert.equal(true, pointLiesInRectangle(gama.Point(2, 0)));
    assert.equal(false, pointLiesInRectangle(gama.Point(3, 3)));
  });

  it('point lies inside triangle', function()
  {
    var pointLiesInTriangle = gama.testPointPolygon(R.__, gama.Polygon([
      gama.Point(0, 1),
      gama.Point(1, 3),
      gama.Point(2, 2)
    ]));

    assert.equal(true, pointLiesInTriangle(gama.Point(1, 2)));
    assert.equal(true, pointLiesInTriangle(gama.Point(2, 2)));
    assert.equal(false, pointLiesInTriangle(gama.Point(0, 2)));
    assert.equal(false, pointLiesInTriangle(gama.Point(1, 1)));
    assert.equal(true, pointLiesInTriangle(gama.Point(1, 1.5)));
    assert.equal(false, pointLiesInTriangle(gama.Point(1, 1.3)));
  });
});