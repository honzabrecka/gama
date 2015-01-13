// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var gama = require('../src/gama');

describe('Vector', function()
{
  it('factory', function()
  {
    assert.deepEqual({x: 1, y: 2}, gama.Vector(1, 2));
  });

  it('factory from two points', function()
  {
    assert.deepEqual({x: 2, y: 2}, gama.Vector(
      gama.Point(1, 2),
      gama.Point(3, 4)
    ));
  });

  it('isVector', function()
  {
    assert.equal(true, gama.isVector({x: 1, y: 2}));
    assert.equal(true, gama.isVector(gama.Point(1, 2)));
    assert.equal(true, gama.isVector(gama.Vector(1, 2)));
    assert.equal(false, gama.isVector({x: 1}));
    assert.equal(false, gama.isVector({y: 2}));
    assert.equal(false, gama.isVector({foo: 'bar'}));
    assert.equal(false, gama.isVector(4));
  });

  it('add', function()
  {
    var result = gama.add(gama.Vector(1, 2), gama.Vector(5, 6));
    assert.equal(6, result.x);
    assert.equal(8, result.y);
  });

  it('subtract', function()
  {
    var result = gama.subtract(gama.Vector(5, 8), gama.Vector(1, 2));
    assert.equal(-4, result.x);
    assert.equal(-6, result.y);
  });

  it('normal', function()
  {
    var result = gama.normal(gama.Vector(-5, 4));
    assert.equal(4, result.x);
    assert.equal(5, result.y);
  });

  it('dot', function()
  {
    assert.equal(30, gama.dot(gama.Vector(3.6, 4.8), gama.Vector(3, 4)));
  });

  it('angle', function()
  {
    assert.equal(0, gama.angle(gama.Vector(-2, 4), gama.Vector(2, 1)));
    assert.equal(0.7592566023652966, gama.angle(gama.Vector(-2, 4), gama.Vector(1, 4)));
  });

  it('unit', function()
  {
    var result = gama.unit(gama.Vector(1, 2));
    assert.equal(0.4472135954999579, result.x);
    assert.equal(0.8944271909999159, result.y);
    assert.equal(1, Math.round(gama.length(result)));
  });

  it('negate', function()
  {
    var result = gama.negate(gama.Vector(1, 2));
    assert.equal(-1, result.x);
    assert.equal(-2, result.y);
  });

  it('length2', function()
  {
    assert.equal(5, gama.length2(gama.Vector(1, 2)));
  });

  it('length', function()
  {
    assert.equal(2.23606797749979, gama.length(gama.Vector(1, 2)));
  });

  it('scaleVector by vector', function()
  {
    var result = gama.scaleVector(gama.Vector(2, 4), gama.Vector(1, 1));
    assert.equal(2, result.x);
    assert.equal(4, result.y);
  });

  it('scaleVector by scalar', function()
  {
    var result = gama.scaleVector(5, gama.Vector(1, 2));
    assert.equal(5, result.x);
    assert.equal(10, result.y);
  });
});