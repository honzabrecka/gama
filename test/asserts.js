// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var asserts = exports;

asserts.points = function(expected, actual) {
  var d = .00000000001;

  if (Math.abs(expected.x - actual.x) > d
    || Math.abs(expected.y - actual.y) > d) {
    assert.fail(actual, expected, 'Points do not match.');
  }
}

asserts.vectors = asserts.points;

asserts.polygons = function(expected, actual) {
  for (var i = 0; i < expected.vertices.length; i++) {
    asserts.points(expected.vertices[i], actual.vertices[i]);
  }
}