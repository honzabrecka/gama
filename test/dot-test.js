var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.dot', function() {

  it('calculates the dot product of two vectors', function() {
    expect(gama.dot(gama.Vector(3.6, 4.8), gama.Vector(3, 4))).to.be.equal(30);
  });

});
