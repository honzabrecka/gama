var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.maxVertex', function() {

  it('gets the max vertex', function() {
    var triangle = gama.Polygon([
      gama.Point(0, 1),
      gama.Point(1, 3),
      gama.Point(2, 2)
    ]);
    expect(gama.maxVertex(triangle)).to.eql({x: 2, y: 3});
  });

});
