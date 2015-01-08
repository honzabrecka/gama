// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var g = require('../src/gama');

describe('SAT', function()
{
  it('projectPointToAxis', function()
  {
    assert.deepEqual({x: 3.5999999999999996, y: 4.8}, g.projectPointToAxis(g.Vector(3, 4), g.Point(2, 6)));
  });

  it('projectionsOverlap', function()
  {
    assert.equal(true, g.projectionsOverlap([1, 4], [2, 5]));
    assert.equal(true, g.projectionsOverlap([1, 4], [2, 4]));
    assert.equal(false, g.projectionsOverlap([1, 4], [2, -5]));
  });
});