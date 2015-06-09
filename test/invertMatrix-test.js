var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.invertMatrix', function() {

  it('inverts matrix', function() {
    expect(gama.invertMatrix([3, -4, 5, 2, -3, 1, 3, -5, -1])).to.be.eql([-8, 29, -11, -5, 18, -7, 1, -3, 1]);
  });

});
