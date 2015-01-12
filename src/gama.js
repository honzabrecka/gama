// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var R = require('ramda');

/**
 * A practical math/geometry library for functional JavaScript, based on Ramda.
 *
 * @exports gama
 */
var g = exports;

var sortAsc = R.sort(function(a, b) {
  return a - b;
});

//----------------------------------------------
// factories

/**
 * Creates an object representing point.
 *
 * @func
 * @category Function
 * @param {Number} x
 * @param {Number} y
 * @param {Point}
 * @example
 * 
 * g.Point(1, 2)// -> {x: 1, y: 2}
 */
g.Point = function(x, y) {
  return {
    x: x,
    y: y
  };
};

/**
 * Creates an object representing vector.
 *
 * @func
 * @category Function
 * @param {Number|Point} x
 * @param {Number|Point} y
 * @param {Vector}
 * @example
 * 
 * g.Vector(1, 2)// -> {x: 1, y: 2}
 * g.Vector(g.Point(1, 2), g.Point(3, 4))// -> {x: 2, y: 2}
 */
g.Vector = R.op(function(x, y) {
  if (g.isPoint(x) && g.isPoint(y)) {
    return g.subtract(x, y);
  }

  return {
    x: x,
    y: y
  };
});

/**
 * Creates an object representing rectangle.
 *
 * @func
 * @category Function
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Rectangle}
 * @example
 * 
 * g.Rectangle(1, 2, 3, 4)// -> {x: 1, y: 2, width: 3, height: 4}
 */
g.Rectangle = function(x, y, width, height) {
  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
};

/**
 * Creates an object representing polygon.
 *
 * @func
 * @category Function
 * @param {Array} vertices List of vertices.
 * @param {Polygon}
 * @example
 * 
 * // triangle
 * g.Polygon([g.Point(1, 2), g.Point(2, 3), g.Point(1, 3)])
 */
g.Polygon = function(vertices) {
  return {
    vertices: vertices
  };
};

/**
 * Creates an object representing circle.
 *
 * @func
 * @category Function
 * @param {Point} position
 * @param {Number} radius
 * @param {Circle}
 * @example
 * 
 * g.Circle(g.Point(1, 2), 2)
 */
g.Circle = function(position, radius) {
  return {
    position: position,
    radius: radius
  };
};

/**
 * Creates a list representing matrix.
 *
 * @func
 * @category Function
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} tx
 * @param {Number} ty
 * @param {Matrix}
 * @example
 * 
 * g.Matrix(1, 2, 3, 4, 5, 6)// -> [1, 2, 3, 4, 5, 6]
 */
g.Matrix = function(a, b, c, d, tx, ty) {
  return [a, b, c, d, tx, ty];
};

/**
 * Creates an object representing empty matrix.
 *
 * @func
 * @category Function
 * @param {Matrix}
 * @example
 * 
 * g.EmptyMatrix()// -> [1, 0, 0, 1, 0, 0]
 */
g.EmptyMatrix = function() {
  return g.Matrix(1, 0, 0, 1, 0, 0);
};

//----------------------------------------------
// deg/rad conversion

var PI2 = 2 * Math.PI;

/**
 * Converts degrees to radians.
 *
 * @func
 * @category Function
 * @param {Number}
 * @return {Number}
 */
g.deg2rad = function(rotation) {
  return rotation * PI2 / 360;
};

/**
 * Converts radians to degrees.
 *
 * @func
 * @category Function
 * @param {Number}
 * @return {Number}
 */
g.rad2deg = function(rotation) {
  return rotation * 360 / PI2;
};

//----------------------------------------------
// points/vectors

/**
 * Checks whether given value is point (contains x and y properties).
 *
 * @func
 * @category Function
 * @param {Object}
 * @return {Boolean}
 * @example
 * 
 * g.isPoint(g.Vector(1, 2))// -> true
 * g.isPoint(g.Point(1, 2))// -> true
 * g.isPoint({x: 1, y: 2})// -> true
 * g.isPoint('s')// -> false
 */
g.isPoint = R.and(R.has('x'), R.has('y'));

/**
 * Checks whether given value is vector (contains x and y properties).
 *
 * @func
 * @category Function
 * @param {Object}
 * @return {Boolean}
 * @example
 * 
 * g.isVector(g.Point(1, 2))// -> true
 * g.isVector(g.Vector(1, 2))// -> true
 * g.isVector({x: 1, y: 2})// -> true
 * g.isVector('s')// -> false
 */
g.isVector = g.isPoint;

/**
 * Adds the coordinates of a point|vector (an object that contains x and y properties)
 * to the coordinates of b point|vector (an object that contains x and y properties)
 * to create a new point.
 * 
 * @func
 * @category Function
 * @param {Point|Vector} a
 * @param {Point|Vector} b
 * @return {Point|Vector}
 */
g.add = R.op(function(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  };
});

/**
 * Subtracts the coordinates of b point|vector (an object that contains x and y properties)
 * from the coordinates of a point|vector (an object that contains x and y properties)
 * to create a new point.
 * 
 * @func
 * @category Function
 * @param {Point|Vector} a
 * @param {Point|Vector} b
 * @return {Point|Vector}
 */
g.subtract = R.op(function(a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  };
});

//----------------------------------------------
// point

/**
 * Rotates point around another point by given angle.
 *
 * @func
 * @category Function
 * @param {Point} point
 * @param {Point} around
 * @param {Number} angle in rads
 * @return {Point}
 */
g.rotatePoint = R.curry(function(point, around, angle) {
  return g.Point(
    (point.x - around.x) * Math.cos(angle) - (point.y - around.y) * Math.sin(angle) + around.x,
    (point.x - around.x) * Math.sin(angle) + (point.y - around.y) * Math.cos(angle) + around.y
  );
});

/**
 * Calculates the distance between two points.
 *
 * @func
 * @category Function
 * @param {Point} a
 * @param {Point} b
 * @return {Number}
 */
g.distance2 = R.op(function(a, b) {
  return g.vectorLength2(g.subtract(a, b));
});

/**
 * Calculates the distance between two points.
 *
 * @func
 * @category Function
 * @param {Point} a
 * @param {Point} b
 * @return {Number}
 */
g.distance = R.op(function(a, b) {
  return Math.sqrt(g.distance2(a, b));
});

//----------------------------------------------
// vectors

/**
 * Generates a normal vector.
 *
 * @func
 * @category Function
 * @param {Vector}
 * @return {Vector}
 */
g.normal = function(vector) {
  return g.Vector(vector.y, -vector.x);
};

/**
 * Caclulates the dot product of two vectors.
 *
 * @func
 * @category Function
 * @param {Vector} a
 * @param {Vector} b
 * @return {Number}
 */
g.dot = R.curry(function(a, b) {
  return a.x * b.x + a.y * b.y;
});

/**
 * Generates a unit vector.
 *
 * @func
 * @category Function
 * @param {Vector} vector
 * @return {Vector}
 */
g.unit = function(vector) {
  var t = g.vectorLength(vector);
  return g.Vector(vector.x / t, vector.y / t);
};

/**
 * Caclulates the length of a vector. This me
 *
 * @func
 * @category Function
 * @param {Vector}
 * @return {Number}
 */
g.vectorLength2 = function(vector) {
  return vector.x * vector.x + vector.y * vector.y;
};

/**
 * Caclulates the length of a vector.
 *
 * @func
 * @category Function
 * @param {Vector}
 * @return {Number}
 */
g.vectorLength = function(vector) {
  return Math.sqrt(g.vectorLength2(vector));
};

/**
 * Negates the components of a vector.
 *
 * @param {Vector} vector
 * @return {Vector}
 */
g.negate = function(vector) {
  return g.Vector(-vector.x, -vector.y);
};

/**
 * Multiplies the components of a vector by a scalar value or another vector.
 *
 * @func
 * @category Function
 * @param {Number|Vector}
 * @return {Vector}
 * @example
 *
 * g.scaleVector(2)(g.Vector(1, 2))// -> g.Vector(2, 4)
 * g.scaleVector(g.Vector(3, 1))(g.Vector(1, 2))// -> g.Vector(3, 2)
 */
g.scaleVector = R.op(function(by, vector) {
  if (g.isVector(by)) {
    return g.Vector(vector.x * by.x, vector.y * by.y);
  }

  return g.Vector(vector.x * by, vector.y * by);
});

//----------------------------------------------
// polygon

var minX = R.pipe(R.map(R.prop('x')), R.min);
var minY = R.pipe(R.map(R.prop('y')), R.min);
var maxX = R.pipe(R.map(R.prop('x')), R.max);
var maxY = R.pipe(R.map(R.prop('y')), R.max);

/**
 * Returns the top left vertex of polygon's bounding box.
 *
 * @func
 * @category Function
 * @param {Polygon}
 * @return {Point}
 */
g.polygonMinVertex = function(polygon) {
  return g.Point(
    minX(polygon.vertices),
    minY(polygon.vertices)
  );
};

/**
 * Returns the bottom right vertex of polygon's bounding box.
 *
 * @func
 * @category Function
 * @param {Polygon}
 * @return {Point}
 */
g.polygonMaxVertex = function(polygon) {
  return g.Point(
    maxX(polygon.vertices),
    maxY(polygon.vertices)
  );
};

/**
 * Returns bounding box.
 *
 * @func
 * @category Function
 * @param {Polygon}
 * @return {Rectangle}
 */
g.polygonBoundingBox = function(polygon) {
  var min = g.polygonMinVertex(polygon);
  var max = g.polygonMaxVertex(polygon);

  return g.Rectangle(
    min.x,
    min.y,
    max.x - min.x,
    max.y - min.y
  );
};

/**
 * Generates axes. It returns as many axes as a polygon has vertices.
 *
 * @func
 * @category Function
 * @param {Polygon}
 * @param {Array} List of vectors.
 */
g.polygonAxes = R.pipe(
  R.prop('vertices'),
  R.map.idx(function(vertex, i, vertices) {
    return g.normal(g.Vector(
      vertices[i],
      vertices[(i + 1) % vertices.length]
    ));
  })
);

//----------------------------------------------
// collision detections

/**
 * Projects vertex to axis.
 *
 * @func
 * @category Function
 * @param {Vector} axis
 * @param {Point} vertex
 * @param {Point}
 */
g.projectPointToAxis = R.op(function(axis, vertex) {
  var t = (vertex.x * axis.x + vertex.y * axis.y) / (axis.x * axis.x + axis.y * axis.y);
  return g.Point(t * axis.x, t * axis.y);
});

/**
 * Checks whether two projections overlap.
 *
 * @func
 * @category Function
 * @param {Array} a
 * @param {Array} b
 * @param {Boolean}
 */
g.projectionsOverlap = R.op(function(a, b) {
  return R.head(b) <= R.last(a) && R.last(b) >= R.head(a);
});

var projectPolygonToAxis = R.op(
  R.pipe(
    R.useWith(R.map, R.converge(R.pipe, g.projectPointToAxis, g.dot), R.prop('vertices')), 
    sortAsc
  )
);

/**
 * Checks whether point lies inside rectangle.
 *
 * @func
 * @category Function
 * @param {Point} point
 * @param {Rectangle} rectangle
 * @param {Boolean}
 */
g.testPointRectangle = R.op(function(point, rectangle) {
  return point.x >= rectangle.x && point.x <= rectangle.x + rectangle.width && point.y >= rectangle.y && point.y <= rectangle.y + rectangle.height;
});

/**
 * Checks whether point lies inside circle.
 *
 * @func
 * @category Function
 * @param {Point} point
 * @param {Circle} circle
 * @param {Boolean}
 */
g.testPointCircle = R.op(function(point, circle) {
  return g.distance(circle.position, point) <= circle.radius;
});

/**
 * Checks whether two circles overlap.
 *
 * @func
 * @category Function
 * @param {Circle} a
 * @param {Circle} b
 * @param {Boolean}
 */
g.testCircleCircle = R.curry(function(a, b) {
  return g.distance(a.position, b.position) <= a.radius + b.radius;
});

/**
 * Checks whether two polygons overlap.
 *
 * @func
 * @category Function
 * @param {Polygon} a
 * @param {Polygon} b
 * @param {Boolean}
 */
g.testPolygonPolygon = R.curry(function(a, b) {
  var axes = R.union(g.polygonAxes(a), g.polygonAxes(b));

  return !R.some(function(axis) {
    var project = projectPolygonToAxis(axis);

    return !g.projectionsOverlap(
      project(a),
      project(b)
    );
  })(axes);
});
