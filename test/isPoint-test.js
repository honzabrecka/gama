var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.isPoint', function() {

  it('is point (Point)', function() {
    expect(gama.isPoint(gama.Point(1, 2))).to.be.equal(true);
  });

  it('is point (Vector)', function() {
    expect(gama.isPoint(gama.Vector(1, 2))).to.be.equal(true);
  });

  it('is point (map with x and y)', function() {
    expect(gama.isPoint({x: 1, y: 2})).to.be.equal(true);
  });

  it('is not point (map with x only)', function() {
    expect(gama.isPoint({x: 1})).to.be.equal(false);
  });

  it('is not point (map with y only)', function() {
    expect(gama.isPoint({y: 1})).to.be.equal(false);
  });

  it('is not point (map without both x and y)', function() {
    expect(gama.isPoint({z: 1})).to.be.equal(false);
  });

  it('is not point (Number)', function() {
    expect(gama.isPoint(5)).to.be.equal(false);
  });

  it('is not point (Object)', function() {
    expect(gama.isPoint({})).to.be.equal(false);
  });

  it('is not point (String)', function() {
    expect(gama.isPoint('a')).to.be.equal(false);
  });

  it('is not point (null)', function() {
    expect(gama.isPoint(null)).to.be.equal(false);
  });

  it('is not point (undefined)', function() {
    expect(gama.isPoint(undefined)).to.be.equal(false);
  });

});
