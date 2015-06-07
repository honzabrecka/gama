var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.EmptyMatrix', function() {

  it('creates empty matrix', function() {
    expect(gama.EmptyMatrix()).to.be.eql([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  });

});
