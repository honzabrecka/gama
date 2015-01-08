// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var g = require('../src/gama');

describe('Matrix', function()
{
  it('factory', function()
  {
    assert.deepEqual([1, 2, 3, 4, 5, 6], g.Matrix(1, 2, 3, 4, 5, 6));
  });

  it('empty matrix factory', function()
  {
    assert.deepEqual([1, 0, 0, 1, 0, 0], g.EmptyMatrix());
  });  
});