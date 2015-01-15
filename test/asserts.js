// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var assert = require('assert');
var asserts = exports;

var d = .00000000001;

asserts.almostEqual = function(expected, actual) {
  if (Math.abs(expected - actual) > d) {
    assert.fail(actual, expected, 'Numbers are not almost equal.');
  }
};

asserts.points = function(expected, actual) {
  asserts.almostEqual(expected.x, actual.x);
  asserts.almostEqual(expected.y, actual.y);
}

asserts.vectors = asserts.points;

asserts.polygons = function(expected, actual) {
  for (var i = 0; i < expected.vertices.length; i++) {
    asserts.points(expected.vertices[i], actual.vertices[i]);
  }
}