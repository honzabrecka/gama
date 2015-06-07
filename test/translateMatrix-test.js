var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.translateMatrix', function() {

  it('translates matrix', function() {
    expect(gama.translateMatrix(gama.Vector(2, 4), gama.EmptyMatrix())).to.be.eql([1, 0, 2, 0, 1, 4, 0, 0, 1]);
  });

});
