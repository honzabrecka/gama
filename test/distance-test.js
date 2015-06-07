var expect = require('chai').expect;
var gama = require('../src/gama');
var E = require('./common').E;

describe('gama.distance', function() {

  it('calculates distance between two points', function() {
    expect(gama.distance(gama.Point(1, 1), gama.Point(2, 2))).to.be.closeTo(1.41421, E);
  });

  it('calculates distance between two vectors', function() {
    expect(gama.distance(gama.Vector(1, 1), gama.Vector(2, 2))).to.be.closeTo(1.41421, E);
  });

});
