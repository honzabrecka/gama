// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var gama = require('../src/gama');

function assertPolygon(expected, actual) {
  var d = .000000000001;

  for (var i = 0; i < expected.vertices.length; i++) {
    if (Math.abs(expected.vertices[i].x - actual.vertices[i].x) > d
      || Math.abs(expected.vertices[i].y - actual.vertices[i].y) > d) {
      assert.fail(actual, expected, 'Vertices doesn\'t match.');
    }
  }
}

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

  it('rotatePolygon', function()
  {
    var rectangle = gama.Polygon([
      gama.Point(0, 0),
      gama.Point(4, 0),
      gama.Point(4, 2),
      gama.Point(0, 2)
    ]);
    var center = gama.scaleVector(.5, gama.Vector(
      rectangle.vertices[0],
      rectangle.vertices[2]
    ));

    // center, 180°
    assertPolygon(
      gama.Polygon([
        gama.Point(4, 2),
        gama.Point(0, 2),
        gama.Point(0, 0),
        gama.Point(4, 0)
      ]),
      gama.rotatePolygon(center, Math.PI)(rectangle)
    );

    // center, 90°
    assertPolygon(
      gama.Polygon([
        gama.Point(3, -1),
        gama.Point(3, 3),
        gama.Point(1, 3),
        gama.Point(1, -1)
      ]),
      gama.rotatePolygon(center, Math.PI * .5)(rectangle)
    );

    // top left, 90°
    assertPolygon(
      gama.Polygon([
        gama.Point(2, 0),
        gama.Point(2, 4),
        gama.Point(0, 4),
        gama.Point(0, 0)
      ]),
      gama.rotatePolygon(center, rectangle.vertices[0])(rectangle)
    );
  });
});