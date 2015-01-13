// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var gama = require('../src/gama');

describe('Polygon', function()
{
  it('factory', function()
  {
    assert.deepEqual({vertices: 'value'}, gama.Polygon('value'));
  });

  it('axes', function()
  {
    var result = gama.axes(gama.Polygon([
      gama.Point(0, 0),
      gama.Point(2, 0),
      gama.Point(2, 2),
      gama.Point(0, 2)
    ]));
    assert.equal(4, result.length);
    assert.deepEqual(gama.Vector(0, -2), result[0]);
    assert.deepEqual(gama.Vector(2, 0), result[1]);
    assert.deepEqual(gama.Vector(0, 2), result[2]);
    assert.deepEqual(gama.Vector(-2, 0), result[3]);
  });

  it('minVertex', function()
  {
    var triangle = gama.Polygon([
      gama.Point(0, 1),
      gama.Point(1, 3),
      gama.Point(2, 2)
    ]);

    assert.deepEqual(gama.Point(0, 1), gama.minVertex(triangle));
  });

  it('maxVertex', function()
  {
    var triangle = gama.Polygon([
      gama.Point(0, 1),
      gama.Point(1, 3),
      gama.Point(2, 2)
    ]);
    
    assert.deepEqual(gama.Point(2, 3), gama.maxVertex(triangle));
  });

  it('boundingBox (all vertices in plus)', function()
  {
    var triangle = gama.Polygon([
      gama.Point(0, 1),
      gama.Point(1, 3),
      gama.Point(2, 2)
    ]);
    
    assert.deepEqual(gama.Rectangle(0, 1, 2, 2), gama.boundingBox(triangle));
  });

  it('boundingBox (some vertices in minus)', function()
  {
    var triangle = gama.Polygon([
      gama.Point(-1, 2),
      gama.Point(0, 2),
      gama.Point(1, 0)
    ]);
    
    assert.deepEqual(gama.Rectangle(-1, 0, 2, 2), gama.boundingBox(triangle));
  });

  it('boundingBox (all vertices in minus)', function()
  {
    var triangle = gama.Polygon([
      gama.Point(-2, 1),
      gama.Point(-1, 1),
      gama.Point(-1, -1)
    ]);
    
    assert.deepEqual(gama.Rectangle(-2, -1, 1, 2), gama.boundingBox(triangle));
  });
});