var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.subtract', function() {

  it('subtracts two points', function() {
    expect(gama.subtract(gama.Point(1, 2), gama.Point(5, 8))).to.be.eql({x: -4, y: -6});
  });

  it('subtracts two vectors', function() {
    expect(gama.subtract(gama.Vector(1, 2), gama.Vector(5, 8))).to.be.eql({x: -4, y: -6});
  });

});
