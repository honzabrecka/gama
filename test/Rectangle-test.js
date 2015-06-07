var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.Rectangle', function() {

  it('creates rectangle', function() {
    expect(gama.Rectangle(1, 2, 3, 4)).to.be.eql({x: 1, y: 2, width: 3, height: 4});
  });

});
