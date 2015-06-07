var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.rectangle2polygon', function() {

  it('converts rectangle to polygon', function() {
    expect(gama.rectangle2polygon(gama.Rectangle(0, 0, 4, 2))).to.eql({vertices: [
      {x: 0, y: 0},
      {x: 4, y: 0},
      {x: 4, y: 2},
      {x: 0, y: 2}
    ]});
  });

});
