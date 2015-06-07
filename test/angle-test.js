var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.angle', function() {

  it('calculates angle between two vectors', function() {
    expect(gama.angle(gama.Vector(-2, 4), gama.Vector(2, 1))).to.be.equal(0);
  });

});
