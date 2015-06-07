var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.testPointRectangle', function() {

  it('test that point lays inside the rectangle', function() {
    const rect = gama.Rectangle(0, 0, 4, 2);
    expect(gama.testPointRectangle(gama.Point(1, 1), rect)).to.be.equal(true);
    expect(gama.testPointRectangle(gama.Point(0, 1), rect)).to.be.equal(true);
    expect(gama.testPointRectangle(gama.Point(1, 0), rect)).to.be.equal(true);
    expect(gama.testPointRectangle(gama.Point(1, 2), rect)).to.be.equal(true);
    expect(gama.testPointRectangle(gama.Point(4, 2), rect)).to.be.equal(true);
  });

  it('test that point lays outside the rectangle', function() {
    const rect = gama.Rectangle(0, 0, 4, 2);
    expect(gama.testPointRectangle(gama.Point(-1, 1), rect)).to.be.equal(false);
    expect(gama.testPointRectangle(gama.Point(5, 5), rect)).to.be.equal(false);
    expect(gama.testPointRectangle(gama.Point(0, 5), rect)).to.be.equal(false);
  });

});
