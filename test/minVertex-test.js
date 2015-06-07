var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.minVertex', function() {

  it('gets the min vertex', function() {
    var triangle = gama.Polygon([
      gama.Point(0, 1),
      gama.Point(1, 3),
      gama.Point(2, 2)
    ]);
    expect(gama.minVertex(triangle)).to.eql({x: 0, y: 1});
  });

});
