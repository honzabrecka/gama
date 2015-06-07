var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.distance2', function() {

  it('calculates distance between two points', function() {
    expect(gama.distance2(gama.Point(1, 1), gama.Point(2, 2))).to.be.equal(2);
  });

  it('calculates distance between two vectors', function() {
    expect(gama.distance2(gama.Vector(1, 1), gama.Vector(2, 2))).to.be.equal(2);
  });

});
