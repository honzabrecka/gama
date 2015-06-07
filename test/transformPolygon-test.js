var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.transformPolygon', function() {

  it('transforms polygon (translation)', function() {
    var rectangle = gama.Polygon([
      gama.Point(0, 0),
      gama.Point(4, 0),
      gama.Point(4, 2),
      gama.Point(0, 2)
    ]);
    expect(gama.transformPolygon(gama.Matrix(1, 0, 4, 0, 1, 5), rectangle)).to.be.eql({vertices: [
      {x: 4, y: 5},
      {x: 8, y: 5},
      {x: 8, y: 7},
      {x: 4, y: 7}
    ]});
  });

});
