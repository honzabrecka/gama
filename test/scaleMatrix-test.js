var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.scaleMatrix', function() {

  it('scales matrix', function() {
    expect(gama.scaleMatrix(gama.Vector(2, 4), gama.EmptyMatrix())).to.be.eql([2, 0, 0, 0, 4, 0, 0, 0, 1]);
  });

});
