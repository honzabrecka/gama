var expect = require('chai').expect;
var gama = require('../src/gama');

describe('gama.isVector', function() {

  it('is vector (Point)', function() {
    expect(gama.isVector(gama.Point(1, 2))).to.be.equal(true);
  });

  it('is vector (Vector)', function() {
    expect(gama.isVector(gama.Vector(1, 2))).to.be.equal(true);
  });

  it('is vector (map with x and y)', function() {
    expect(gama.isVector({x: 1, y: 2})).to.be.equal(true);
  });

  it('is not vector (map with x only)', function() {
    expect(gama.isVector({x: 1})).to.be.equal(false);
  });

  it('is not vector (map with y only)', function() {
    expect(gama.isVector({y: 1})).to.be.equal(false);
  });

  it('is not vector (map without both x and y)', function() {
    expect(gama.isVector({z: 1})).to.be.equal(false);
  });

  it('is not vector (Number)', function() {
    expect(gama.isVector(5)).to.be.equal(false);
  });

  it('is not vector (Object)', function() {
    expect(gama.isVector({})).to.be.equal(false);
  });

  it('is not vector (String)', function() {
    expect(gama.isVector('a')).to.be.equal(false);
  });

  it('is not vector (null)', function() {
    expect(gama.isVector(null)).to.be.equal(false);
  });

  it('is not vector (undefined)', function() {
    expect(gama.isVector(undefined)).to.be.equal(false);
  });

});
