// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var gama = require('../src/gama');

describe('Matrix', function()
{
  it('factory', function()
  {
    assert.deepEqual([1, 2, 5, 3, 4, 6, 0, 0, 1], gama.Matrix(1, 2, 3, 4, 5, 6));
  });

  it('empty matrix factory', function()
  {
    assert.deepEqual([1, 0, 0, 0, 1, 0, 0, 0, 1], gama.EmptyMatrix());
  });

  it('multiply', function() {
    var A = [1, 4, 7, 2, 5, 8, 3, 6, 9];
    var B = [4, 10, 4, 2, 12, 5, 8, 4, 9];

    assert.deepEqual([36, 90, 144, 41, 98, 155, 43, 106, 169], gama.multiplyMatrix(A, B));
  });

  it('translate', function() {
    assert.deepEqual([1, 0, 2, 0, 1, 4, 0, 0, 1], gama.translateMatrix(gama.Vector(2, 4), gama.EmptyMatrix()));
  });

  it('scale', function() {
    assert.deepEqual([2, 0, 0, 0, 4, 0, 0, 0, 1], gama.scaleMatrix(gama.Vector(2, 4), gama.EmptyMatrix()));
  });

  it('rotate', function() {
    assert.deepEqual([1, 0, 0, 0, 1, 0, 0, 0, 1], gama.rotateMatrix(0, gama.EmptyMatrix()));
  });

  it('invertMatrix', function () {
    assert.deepEqual([-2, 1, 1, 5/3, -2/3, -2, 0, 0, 1], gama.invertMatrix([2,3,4,5,6,7,0,0,1]))
  });
});