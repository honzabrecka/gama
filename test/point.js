// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var g = require('../src/gama');

describe('Point', function()
{
  it('factory', function()
  {
    assert.deepEqual({x: 1, y: 2}, g.Point(1, 2));
  });

  it('isPoint', function()
  {
    assert.equal(true, g.isPoint({x: 1, y: 2}));
    assert.equal(true, g.isPoint(g.Point(1, 2)));
    assert.equal(true, g.isPoint(g.Vector(1, 2)));
    assert.equal(false, g.isPoint({x: 1}));
    assert.equal(false, g.isPoint({y: 2}));
    assert.equal(false, g.isPoint({foo: 'bar'}));
    assert.equal(false, g.isPoint(4));
  });

  it('rotatePoint', function()
  {
    assert.deepEqual(g.Point(19.030843443754843, 15.891111469379062), g.rotatePoint(g.Point(10, 20), g.Point(20, 30), 7));
  });

  it('add', function()
  {
    assert.deepEqual(g.Point(6, 8), g.add(g.Point(1, 2), g.Point(5, 6)));
  });

  it('subtract', function()
  {
    assert.deepEqual(g.Point(-4, -6), g.subtract(g.Point(5, 8), g.Point(1, 2)));
  });

  it('distance2', function()
  {
    assert.equal(2, g.distance2(g.Point(1, 1), g.Point(2, 2)));
  });

  it('distance', function()
  {
    assert.equal(1.4142135623730951, g.distance(g.Point(1, 1), g.Point(2, 2)));
  });
});