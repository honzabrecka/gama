var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.Point', function() {

  it('creates point', function() {
    expect(gama.Point(1, 2)).to.be.eql({x: 1, y: 2});
  });

});
