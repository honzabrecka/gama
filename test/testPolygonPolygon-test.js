var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.testPolygonPolygon', function() {

  it('tests that two polygons overlap', function() {
    var a = gama.Polygon([
      gama.Point(0, 0),
      gama.Point(2, 0),
      gama.Point(2, 1),
      gama.Point(0, 1)
    ]);
    var b = gama.Polygon([
      gama.Point(1, 0),
      gama.Point(3, 0),
      gama.Point(3, 1),
      gama.Point(1, 1)
    ]);
    expect(gama.testPolygonPolygon(a, b)).to.be.equal(true);
  });

  it('tests that two polygons do not overlap', function() {
    var a = gama.Polygon([
      gama.Point(0, 0),
      gama.Point(2, 0),
      gama.Point(2, 1),
      gama.Point(0, 1)
    ]);
    var b = gama.Polygon([
      gama.Point(5, 0),
      gama.Point(7, 0),
      gama.Point(7, 1),
      gama.Point(5, 1)
    ]);
    expect(gama.testPolygonPolygon(a, b)).to.be.equal(false);
  });

});
