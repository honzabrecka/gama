var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.axes', function() {

  it('calculates axes', function() {
    expect(gama.axes(gama.Polygon([
      gama.Point(0, 0),
      gama.Point(2, 0),
      gama.Point(2, 2),
      gama.Point(0, 2)
    ]))).to.eql([
      {x: 2, y: 0},
      {x: 0, y: 2},
      {x: -2, y: 0},
      {x: 0, y: -2}
    ]);
  });

});
