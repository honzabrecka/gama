var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.testCircleCircle', function() {

  var circleOverlapsCircle = gama.testCircleCircle(gama.Circle(gama.Point(3, 4), 2));

  it('tests that two circles overlap (same positions and radiuses)', function() {
    expect(circleOverlapsCircle(gama.Circle(gama.Point(3, 4), 2))).to.be.equal(true);
  });

  it('tests that two circles overlap (same positions, different radiuses)', function() {
    expect(circleOverlapsCircle(gama.Circle(gama.Point(3, 4), 1))).to.be.equal(true);
    expect(circleOverlapsCircle(gama.Circle(gama.Point(3, 4), 3))).to.be.equal(true);
  });

  it('tests that two circles overlap (touch)', function() {
    expect(circleOverlapsCircle(gama.Circle(gama.Point(0, 4), 1))).to.be.equal(true);
  });

  it('tests that two circles overlap (both are the same)', function() {
    expect(circleOverlapsCircle(gama.Circle(gama.Point(3, 4), 2))).to.be.equal(true);
  });

  it('tests that two circles overlap', function() {
    expect(circleOverlapsCircle(gama.Circle(gama.Point(1, 1), 2))).to.be.equal(true);
  });

  it('tests that two circles do not overlap', function() {
    expect(circleOverlapsCircle(gama.Circle(gama.Point(1, 1), 1))).to.be.equal(false);
  });

});
