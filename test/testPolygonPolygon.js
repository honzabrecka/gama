// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var gama = require('../src/gama');

describe('collision test: Polygon and Polygon', function()
{
  it('rectangle overlaps rectangle', function()
  {
    var polygonOverlapsRectangle = gama.testPolygonPolygon(gama.Polygon([
      gama.Point(0, 0),
      gama.Point(2, 0),
      gama.Point(2, 2),
      gama.Point(0, 2)
    ]));

    assert.equal(true, polygonOverlapsRectangle(gama.Polygon([
      gama.Point(1, 1),
      gama.Point(3, 1),
      gama.Point(3, 3),
      gama.Point(1, 3)
    ])));

    assert.equal(false, polygonOverlapsRectangle(gama.Polygon([
      gama.Point(3, 0),
      gama.Point(5, 0),
      gama.Point(5, 2),
      gama.Point(3, 2)
    ])));
  });

  it('triangle overlaps triangle', function()
  {
    var polygonOverlapsTriangle = gama.testPolygonPolygon(gama.Polygon([
      gama.Point(0, 1),
      gama.Point(1, 3),
      gama.Point(2, 2)
    ]));

    assert.equal(true, polygonOverlapsTriangle(gama.Polygon([
      gama.Point(1, 0),
      gama.Point(2, 3),
      gama.Point(3, 2)
    ])));

    assert.equal(false, polygonOverlapsTriangle(gama.Polygon([
      gama.Point(2, 0),
      gama.Point(3, 1),
      gama.Point(3, 0)
    ])));      
  });
});