var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.length2', function() {

  it('calculates length of the vector', function() {
    expect(gama.length2(gama.Vector(1, 2))).to.be.equal(5);
  });

});
