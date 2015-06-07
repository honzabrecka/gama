var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.Vector', function() {

  it('creates vector from two numbers', function() {
    expect(gama.Vector(1, 2)).to.be.eql({x: 1, y: 2});
  });

  it('creates vector from two vectors', function() {
    var a = gama.Vector(1, 2);
    var b = gama.Vector(10, 9);
    expect(gama.Vector(a, b)).to.be.eql({x: 9, y: 7});
  });

});
