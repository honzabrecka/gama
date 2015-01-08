// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var g = require('../src/gama');

describe('Polygon', function()
{
  it('factory', function()
  {
    assert.deepEqual({vertices: 'value'}, g.Polygon('value'));
  });

  it('polygonAxes', function()
  {
    var result = g.polygonAxes(g.Polygon([
      g.Point(0, 0),
      g.Point(2, 0),
      g.Point(2, 2),
      g.Point(0, 2)
    ]));
    assert.equal(4, result.length);
    assert.deepEqual(g.Vector(0, -2), result[0]);
    assert.deepEqual(g.Vector(2, 0), result[1]);
    assert.deepEqual(g.Vector(0, 2), result[2]);
    assert.deepEqual(g.Vector(-2, 0), result[3]);
  });

  it('polygonMinVertex', function()
  {
    var triangle = g.Polygon([
      g.Point(0, 1),
      g.Point(1, 3),
      g.Point(2, 2)
    ]);

    assert.deepEqual(g.Point(0, 1), g.polygonMinVertex(triangle));
  });

  it('polygonMaxVertex', function()
  {
    var triangle = g.Polygon([
      g.Point(0, 1),
      g.Point(1, 3),
      g.Point(2, 2)
    ]);
    
    assert.deepEqual(g.Point(2, 3), g.polygonMaxVertex(triangle));
  });

  it('polygonBoundingBox (all vertices in plus)', function()
  {
    var triangle = g.Polygon([
      g.Point(0, 1),
      g.Point(1, 3),
      g.Point(2, 2)
    ]);
    
    assert.deepEqual(g.Rectangle(0, 1, 2, 2), g.polygonBoundingBox(triangle));
  });

  it('polygonBoundingBox (some vertices in minus)', function()
  {
    var triangle = g.Polygon([
      g.Point(-1, 2),
      g.Point(0, 2),
      g.Point(1, 0)
    ]);
    
    assert.deepEqual(g.Rectangle(-1, 0, 2, 2), g.polygonBoundingBox(triangle));
  });

  it('polygonBoundingBox (all vertices in minus)', function()
  {
    var triangle = g.Polygon([
      g.Point(-2, 1),
      g.Point(-1, 1),
      g.Point(-1, -1)
    ]);
    
    assert.deepEqual(g.Rectangle(-2, -1, 1, 2), g.polygonBoundingBox(triangle));
  });
});