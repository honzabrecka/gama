var expect = require('chai').expect;
var gama = require('../src/gama');
var E = require('./common').E;

describe('gama.rotateMatrix', function() {

  it('rotates matrix', function() {
    var result = gama.rotateMatrix(Math.PI, gama.EmptyMatrix());
    expect(result[0]).to.be.closeTo(-1, E);
    expect(result[1]).to.be.closeTo(-1.2246063538223773e-16, E);
    expect(result[2]).to.be.closeTo(0, E);
    expect(result[3]).to.be.closeTo(-1.2246063538223773e-16, E);
    expect(result[4]).to.be.closeTo(-1, E);
    expect(result[5]).to.be.closeTo(0, E);
    expect(result[6]).to.be.closeTo(0, E);
    expect(result[7]).to.be.closeTo(0, E);
    expect(result[8]).to.be.closeTo(1, E);
  });

});
