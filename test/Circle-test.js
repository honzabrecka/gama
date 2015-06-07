var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.Circle', function() {

  it('creates circle', function() {
    expect(gama.Circle(gama.Point(1, 2), 3)).to.be.eql({position: {x: 1, y: 2}, radius: 3});
  });

});
