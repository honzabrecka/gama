// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var gama = require('../src/gama');

describe('Point', function()
{
  it('factory', function()
  {
    assert.deepEqual({x: 1, y: 2}, gama.Point(1, 2));
  });

  it('isPoint', function()
  {
    assert.equal(true, gama.isPoint({x: 1, y: 2}));
    assert.equal(true, gama.isPoint(gama.Point(1, 2)));
    assert.equal(true, gama.isPoint(gama.Vector(1, 2)));
    assert.equal(false, gama.isPoint({x: 1}));
    assert.equal(false, gama.isPoint({y: 2}));
    assert.equal(false, gama.isPoint({foo: 'bar'}));
    assert.equal(false, gama.isPoint(4));
  });

  it('rotatePoint', function()
  {
    assert.deepEqual(gama.Point(19.030843443754843, 15.891111469379062), gama.rotatePoint(gama.Point(20, 30), 7)(gama.Point(10, 20)));
  });

  it('add', function()
  {
    assert.deepEqual(gama.Point(6, 8), gama.add(gama.Point(1, 2), gama.Point(5, 6)));
  });

  it('subtract', function()
  {
    assert.deepEqual(gama.Point(-4, -6), gama.subtract(gama.Point(5, 8), gama.Point(1, 2)));
  });

  it('distance2', function()
  {
    assert.equal(2, gama.distance2(gama.Point(1, 1), gama.Point(2, 2)));
  });

  it('distance', function()
  {
    assert.equal(1.4142135623730951, gama.distance(gama.Point(1, 1), gama.Point(2, 2)));
  });
});