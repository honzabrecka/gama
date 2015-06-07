var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.projectionsOverlap', function() {

  it('tests that two projections overlap', function() {
    expect(gama.projectionsOverlap([1, 4], [2, 5])).to.be.equal(true);
    expect(gama.projectionsOverlap([1, 4], [2, 4])).to.be.equal(true);
    expect(gama.projectionsOverlap([1, 4], [2, -5])).to.be.equal(false);
  });

});
