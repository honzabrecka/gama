// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var g = require('../src/gama');

describe('deg/rad', function()
{
  it('rad2deg', function()
  {
    assert.equal(180, g.rad2deg(Math.PI));
  });

  it('deg2rad', function()
  {
    assert.equal(Math.PI, g.deg2rad(180));
  });
});