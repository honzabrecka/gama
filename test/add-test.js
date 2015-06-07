var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.add', function() {

  it('adds two points', function() {
    expect(gama.add(gama.Point(1, 2), gama.Point(5, 6))).to.be.eql({x: 6, y: 8});
  });

  it('adds two vectors', function() {
    expect(gama.add(gama.Vector(1, 2), gama.Vector(5, 6))).to.be.eql({x: 6, y: 8});
  });

});
