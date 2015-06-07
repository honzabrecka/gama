var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.isConcave', function() {

  it('ensures that generic polygon is concave', function() {
    var polygon = gama.Polygon([
      gama.Point(0, 0),
      gama.Point(4, 0),
      gama.Point(4, 2),
      gama.Point(2, 1),
      gama.Point(0, 2)
    ]);
    expect(gama.isConcave(polygon)).to.be.equal(true);
  });

  it('ensures that rectangle is not concave', function() {
    var rectangle = gama.Polygon([
      gama.Point(0, 0),
      gama.Point(4, 0),
      gama.Point(4, 2),
      gama.Point(0, 2)
    ]);
    expect(gama.isConcave(rectangle)).to.be.equal(false);
  });  

});
