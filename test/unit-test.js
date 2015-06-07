var expect = require('chai').expect;
var gama = require('../src/gama');
var E = require('./common').E;

describe('gama.unit', function() {

  it('returns unit vector', function() {
    var result = gama.unit(gama.Vector(1, 2))
    expect(result.x).to.be.closeTo(0.44721, E);
    expect(result.y).to.be.closeTo(0.89442, E);
  });

});
