var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.scaleVector', function() {

  it('scales vector by vector', function() {
    expect(gama.scaleVector(gama.Vector(2, 4), gama.Vector(1, 1))).to.be.eql({x: 2, y: 4});
  });

  it('scales vector by scalar', function() {
    expect(gama.scaleVector(5, gama.Vector(1, 2))).to.be.eql({x: 5, y: 10});
  });

});
