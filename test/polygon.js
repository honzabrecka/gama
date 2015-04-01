// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var asserts = require('./asserts');
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
    asserts.vectors(gama.Vector(2, 0), result[0]);
    asserts.vectors(gama.Vector(0, 2), result[1]);
    asserts.vectors(gama.Vector(-2, 0), result[2]);
    asserts.vectors(gama.Vector(0, -2), result[3]);
  });

  it('minVertex', function()
  {
    var triangle = gama.Polygon([
      gama.Point(0, 1),
      gama.Point(1, 3),
      gama.Point(2, 2)
    ]);

    asserts.points(gama.Point(0, 1), gama.minVertex(triangle));
  });

  it('maxVertex', function()
  {
    var triangle = gama.Polygon([
      gama.Point(0, 1),
      gama.Point(1, 3),
      gama.Point(2, 2)
    ]);
    
    asserts.points(gama.Point(2, 3), gama.maxVertex(triangle));
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
    var rotatePolygon = function(point, angle, polygon) {
      var matrix = gama.rotateAround(angle, point, gama.EmptyMatrix());
      return gama.transformPolygon(matrix, polygon);
    };

    // center, 180°
    asserts.polygons(
      gama.Polygon([
        gama.Point(4, 2),
        gama.Point(0, 2),
        gama.Point(0, 0),
        gama.Point(4, 0)
      ]),
      rotatePolygon(center, Math.PI, rectangle)
    );

    // center, 90°
    asserts.polygons(
      gama.Polygon([
        gama.Point(3, -1),
        gama.Point(3, 3),
        gama.Point(1, 3),
        gama.Point(1, -1)
      ]),
      rotatePolygon(center, Math.PI * .5, rectangle)
    );

    // top left, 90°
    asserts.polygons(
      gama.Polygon([
        gama.Point(0, 0),
        gama.Point(0, 4),
        gama.Point(-2, 4),
        gama.Point(-2, 0)
      ]),
      rotatePolygon(rectangle.vertices[0], gama.deg2rad(90), rectangle)
    );
  });

  it('isConvex', function()
  {
    var triangle = gama.Polygon([
      gama.Point(-2, 1),
      gama.Point(-1, 1),
      gama.Point(-1, -1)
    ]);
    var rectangle = gama.Polygon([
      gama.Point(0, 0),
      gama.Point(4, 0),
      gama.Point(4, 2),
      gama.Point(0, 2)
    ]);

    assert.equal(true, gama.isConvex(triangle));
    assert.equal(true, gama.isConvex(rectangle));
    assert.equal(false, gama.isConcave(triangle));
    assert.equal(false, gama.isConcave(rectangle));
  });

  it('isConcave', function()
  {
    var polygon = gama.Polygon([
      gama.Point(0, 0),
      gama.Point(4, 0),
      gama.Point(4, 2),
      gama.Point(2, 1),
      gama.Point(0, 2)
    ]);

    assert.equal(true, gama.isConcave(polygon));
    assert.equal(false, gama.isConvex(polygon));
  });

  it('rectangle2polygon', function()
  {
    var rectangle = gama.Rectangle(0, 0, 4, 2);
    var polygon = gama.Polygon([
      gama.Point(0, 0),
      gama.Point(4, 0),
      gama.Point(4, 2),
      gama.Point(0, 2)
    ]);
    asserts.polygons(polygon, gama.rectangle2polygon(rectangle));
  });
});