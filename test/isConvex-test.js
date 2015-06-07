var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.isConvex', function() {

  it('ensures that triangle is convex', function() {
    var triangle = gama.Polygon([
      gama.Point(-2, 1),
      gama.Point(-1, 1),
      gama.Point(-1, -1)
    ]);
    expect(gama.isConvex(triangle)).to.be.equal(true);
  });

  it('ensures that rectangle is convex', function() {
    var rectangle = gama.Polygon([
      gama.Point(0, 0),
      gama.Point(4, 0),
      gama.Point(4, 2),
      gama.Point(0, 2)
    ]);
    expect(gama.isConvex(rectangle)).to.be.equal(true);
  });

  it('ensures that concave polygon is not convex', function() {
    var polygon = gama.Polygon([
      gama.Point(0, 0),
      gama.Point(4, 0),
      gama.Point(4, 2),
      gama.Point(2, 1),
      gama.Point(0, 2)
    ]);
    expect(gama.isConvex(polygon)).to.be.equal(false);
  });

});
