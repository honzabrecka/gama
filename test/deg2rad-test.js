var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.deg2rad', function() {

  it('converts degrees to radians', function() {
    expect(gama.deg2rad(180)).to.be.equal(Math.PI);
  });

});
