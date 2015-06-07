var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.negate', function() {

  it('negates vector', function() {
    expect(gama.negate(gama.Vector(1, 2))).to.be.eql({x: -1, y: -2});
  });

});
