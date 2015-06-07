var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.Matrix', function() {

  it('creates matrix', function() {
    expect(gama.Matrix(1, 2, 3, 4, 5, 6)).to.be.eql([1, 2, 3, 4, 5, 6, 0, 0, 1]);
  });

});
