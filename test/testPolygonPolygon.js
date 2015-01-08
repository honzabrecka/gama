// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var g = require('../src/gama');

describe('collision test: Polygon and Polygon', function()
{
  it('rectangle overlaps rectangle', function()
  {
    var polygonOverlapsRectangle = g.testPolygonPolygon(g.Polygon([
      g.Point(0, 0),
      g.Point(2, 0),
      g.Point(2, 2),
      g.Point(0, 2)
    ]));

    assert.equal(true, polygonOverlapsRectangle(g.Polygon([
      g.Point(1, 1),
      g.Point(3, 1),
      g.Point(3, 3),
      g.Point(1, 3)
    ])));

    assert.equal(false, polygonOverlapsRectangle(g.Polygon([
      g.Point(3, 0),
      g.Point(5, 0),
      g.Point(5, 2),
      g.Point(3, 2)
    ])));
  });

  it('triangle overlaps triangle', function()
  {
    var polygonOverlapsTriangle = g.testPolygonPolygon(g.Polygon([
      g.Point(0, 1),
      g.Point(1, 3),
      g.Point(2, 2)
    ]));

    assert.equal(true, polygonOverlapsTriangle(g.Polygon([
      g.Point(1, 0),
      g.Point(2, 3),
      g.Point(3, 2)
    ])));

    assert.equal(false, polygonOverlapsTriangle(g.Polygon([
      g.Point(2, 0),
      g.Point(3, 1),
      g.Point(3, 0)
    ])));      
  });
});