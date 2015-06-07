var expect = require('chai').expect;
var gama = require('../src/gama');
var R = require('ramda');

describe('gama.testPointPolygon', function() {

  it('tests that point lays inside rectangle', function() {
    var pointLiesInRectangle = gama.testPointPolygon(R.__, gama.Polygon([
      gama.Point(0, 0),
      gama.Point(2, 0),
      gama.Point(2, 2),
      gama.Point(0, 2)
    ]));
    expect(pointLiesInRectangle(gama.Point(1, 1))).to.be.equal(true);
    expect(pointLiesInRectangle(gama.Point(2, 0))).to.be.equal(true);
    expect(pointLiesInRectangle(gama.Point(3, 3))).to.be.equal(false);
  });

  it('tests that point lays inside triangle', function() {
    var pointLiesInTriangle = gama.testPointPolygon(R.__, gama.Polygon([
      gama.Point(0, 1),
      gama.Point(1, 3),
      gama.Point(2, 2)
    ]));
    expect(pointLiesInTriangle(gama.Point(1, 2))).to.be.equal(true);
    expect(pointLiesInTriangle(gama.Point(2, 2))).to.be.equal(true);
    expect(pointLiesInTriangle(gama.Point(0, 2))).to.be.equal(false);
    expect(pointLiesInTriangle(gama.Point(1, 1))).to.be.equal(false);
    expect(pointLiesInTriangle(gama.Point(1, 1.5))).to.be.equal(true);
    expect(pointLiesInTriangle(gama.Point(1, 1.3))).to.be.equal(false);
  });

});
