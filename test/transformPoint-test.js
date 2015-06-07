var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.transformPoint', function() {

  it('transforms point (translation)', function() {
    expect(gama.transformPoint(gama.Matrix(1, 0, 4, 0, 1, 5), gama.Point(1, 2))).to.be.eql({x: 5, y: 7});
  });

});
