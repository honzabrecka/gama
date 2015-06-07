var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.testPointCircle', function() {

  it('tests that point lays inside the circle', function() {
    const circle = gama.Circle(gama.Point(0, 0), 2);
    expect(gama.testPointCircle(gama.Point(0, 0), circle)).to.be.equal(true);
    expect(gama.testPointCircle(gama.Point(0, 2), circle)).to.be.equal(true);
    expect(gama.testPointCircle(gama.Point(-2, 0), circle)).to.be.equal(true);
    expect(gama.testPointCircle(gama.Point(1, 1), circle)).to.be.equal(true);
  });

  it('tests that point lays outside the circle', function() {
    const circle = gama.Circle(gama.Point(0, 0), 2);
    expect(gama.testPointCircle(gama.Point(4, 5), circle)).to.be.equal(false);
    expect(gama.testPointCircle(gama.Point(2, 2), circle)).to.be.equal(false);
  });

});
