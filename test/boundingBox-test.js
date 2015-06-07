var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.boundingBox', function() {

  it('calculates bounding box (all vertices in plus)', function() {
    var triangle = gama.Polygon([
      gama.Point(0, 1),
      gama.Point(1, 3),
      gama.Point(2, 2)
    ]);
    expect(gama.boundingBox(triangle)).to.eql({x: 0, y: 1, width: 2, height: 2});
  });

  it('calculates bounding box (some vertices in minus)', function() {
    var triangle = gama.Polygon([
      gama.Point(-1, 2),
      gama.Point(0, 2),
      gama.Point(1, 0)
    ]);
    expect(gama.boundingBox(triangle)).to.eql({x: -1, y: 0, width: 2, height: 2});
  });

  it('calculates bounding box (all vertices in minus)', function() {
    var triangle = gama.Polygon([
      gama.Point(-2, 1),
      gama.Point(-1, 1),
      gama.Point(-1, -1)
    ]);
    expect(gama.boundingBox(triangle)).to.eql({x: -2, y: -1, width: 1, height: 2});
  });

});
