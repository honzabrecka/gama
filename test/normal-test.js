var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.normal', function() {

  it('returns normal vector', function() {
    expect(gama.normal(gama.Vector(-5, 4))).to.be.eql({x: 4, y: 5});
  });

});
