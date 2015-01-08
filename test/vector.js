// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var g = require('../src/gama');

describe('Vector', function()
{
  it('factory', function()
  {
    assert.deepEqual({x: 1, y: 2}, g.Vector(1, 2));
  });

  it('factory from two points', function()
  {
    assert.deepEqual({x: 2, y: 2}, g.Vector(
      g.Point(1, 2),
      g.Point(3, 4)
    ));
  });

  it('isVector', function()
  {
    assert.equal(true, g.isVector({x: 1, y: 2}));
    assert.equal(true, g.isVector(g.Point(1, 2)));
    assert.equal(true, g.isVector(g.Vector(1, 2)));
    assert.equal(false, g.isVector({x: 1}));
    assert.equal(false, g.isVector({y: 2}));
    assert.equal(false, g.isVector({foo: 'bar'}));
    assert.equal(false, g.isVector(4));
  });

  it('add', function()
  {
    var result = g.add(g.Vector(1, 2), g.Vector(5, 6));
    assert.equal(6, result.x);
    assert.equal(8, result.y);
  });

  it('subtract', function()
  {
    var result = g.subtract(g.Vector(5, 8), g.Vector(1, 2));
    assert.equal(-4, result.x);
    assert.equal(-6, result.y);
  });

  it('normal', function()
  {
    var result = g.normal(g.Vector(-5, 4));
    assert.equal(4, result.x);
    assert.equal(5, result.y);
  });

  it('dot', function()
  {
    assert.equal(30, g.dot(g.Vector(3.6, 4.8), g.Vector(3, 4)));
  });

  it('unit', function()
  {
    var result = g.unit(g.Vector(1, 2));
    assert.equal(0.4472135954999579, result.x);
    assert.equal(0.8944271909999159, result.y);
    assert.equal(1, Math.round(g.vectorLength(result)));
  });

  it('negate', function()
  {
    var result = g.negate(g.Vector(1, 2));
    assert.equal(-1, result.x);
    assert.equal(-2, result.y);
  });

  it('vectorLength2', function()
  {
    assert.equal(5, g.vectorLength2(g.Vector(1, 2)));
  });

  it('vectorLength', function()
  {
    assert.equal(2.23606797749979, g.vectorLength(g.Vector(1, 2)));
  });

  it('scaleVector by vector', function()
  {
    var result = g.scaleVector(g.Vector(2, 4), g.Vector(1, 1));
    assert.equal(2, result.x);
    assert.equal(4, result.y);
  });

  it('scaleVector by scalar', function()
  {
    var result = g.scaleVector(5, g.Vector(1, 2));
    assert.equal(5, result.x);
    assert.equal(10, result.y);
  });
});