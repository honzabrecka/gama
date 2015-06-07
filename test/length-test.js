var expect = require('chai').expect;
var gama = require('../src/gama');
var E = require('./common').E;

describe('gama.length', function() {

  it('calculates length of the vector', function() {
    expect(gama.length(gama.Vector(1, 2))).to.be.closeTo(2.23606, E);
  });

});
