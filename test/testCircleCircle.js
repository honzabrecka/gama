// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var g = require('../src/gama');

describe('collision test: Circle and Circle', function()
{
  var circleOverlapsCircle = g.testCircleCircle(g.Circle(
    g.Point(3, 4),
    2
  ));

  it('same positions and radiuses', function()
  {
    assert.equal(true, circleOverlapsCircle(g.Circle(
      g.Point(3, 4), 
      2
    )));
  });

  it('same positions, different radiuses', function()
  {
    assert.equal(true, circleOverlapsCircle(g.Circle(
      g.Point(3, 4), 
      1
    )));
  });

  it('overlaps', function()
  {
    assert.equal(true, circleOverlapsCircle(g.Circle(
      g.Point(1, 1), 
      2
    )));
  });

  it('touch', function()
  {
    assert.equal(true, circleOverlapsCircle(g.Circle(
      g.Point(0, 4), 
      1
    )));
  });

  it('outside', function()
  {
    assert.equal(false, circleOverlapsCircle(g.Circle(
      g.Point(1, 1), 
      1
    )));
  });
});