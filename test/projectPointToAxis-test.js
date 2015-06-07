var expect = require('chai').expect;
var gama = require('../src/gama');
var E = require('./common').E;

describe('gama.projectPointToAxis', function() {

  it('prokects point to axis', function() {
    var result = gama.projectPointToAxis(gama.Vector(5, 4), gama.Point(2, 6));
    expect(result.x).to.be.closeTo(4.14634, E);
    expect(result.y).to.be.closeTo(3.31707, E);
  });

});
