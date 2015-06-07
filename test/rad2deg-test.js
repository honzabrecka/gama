var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.rad2deg', function() {

  it('converts radians to degrees', function() {
    expect(gama.rad2deg(Math.PI)).to.be.equal(180);
  });

});
