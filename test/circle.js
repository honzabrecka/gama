// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var gama = require('../src/gama');

describe('Circle', function()
{
  it('factory', function()
  {
    assert.deepEqual({position: {x: 1, y: 2}, radius: 3}, gama.Circle(gama.Point(1, 2), 3));
  });
});