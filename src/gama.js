// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var R = require('ramda');

R.mapIndexed = R.curry(function(f, col) {
  return col.map(f);
});

/**
 * A practical math/geometry library for functional JavaScript, based on Ramda.
 *
 * @exports gama
 */
var gama = exports;

//----------------------------------------------
// internals

var asc = function(a, b) {
  return a - b;
};

var axesFromVertices = function(vertex, i, vertices) {
  return gama.subtract(// same as gama.Vector, but without any condition
    vertices[(i + 1) % vertices.length],
    vertex
  );
};

var dotsFromAxes = function(axis, i, axes) {
  return gama.dot(
    axis,
    axes[(i + 1) % axes.length]
  );
};

var dotsConcave = function(dots) {
  return R.any(R.lt(0), dots) && R.any(R.gt(0), dots);
};

var reduceTestPointPolygonResult = function(a, b) {
  return b ? !a : a;
};

/**
 * @param {Vector} axis
 * @param {Polygon} polygon
 * @return {Array} projection
 */
var projectPolygonToAxis = R.curryN(2, function(axis, polygon) {
  return R.compose(
    R.sort(asc),
    R.map(function(vertex) {
      return gama.dot(axis, gama.projectPointToAxis(axis, vertex));
    })
  )(polygon.vertices);
});

//----------------------------------------------
// factories

/**
 * Creates an object representing point.
 *
 * @func
 * @category factory
 * @param {Number} x
 * @param {Number} y
 * @return {Point}
 * @example
 *
 * gama.Point(1, 2)// -> {x: 1, y: 2}
 */
gama.Point = function(x, y) {
  return {
    x: x,
    y: y
  };
};

/**
 * Creates an object representing vector.
 *
 * @func
 * @category factory
 * @param {Number} x
 * @param {Number} y
 * @return {Vector}
 * @example
 *
 * gama.Vector(1, 2)// -> {x: 1, y: 2}
 * gama.Vector(gama.Vector(1, 2), gama.Vector(10, 9))// -> {x: 9, y: 7}
 */
gama.Vector = function(x, y) {
  return gama.isVector(x) && gama.isVector(y) ? gama.subtract(y, x) : gama.Point(x, y);
};

/**
 * Creates an object representing rectangle.
 *
 * @func
 * @category factory
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @return {Rectangle}
 * @example
 *
 * gama.Rectangle(1, 2, 3, 4)// -> {x: 1, y: 2, width: 3, height: 4}
 */
gama.Rectangle = function(x, y, width, height) {
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
 * @category factory
 * @param {Array} vertices List of vertices.
 * @return {Polygon}
 * @example
 *
 * // triangle
 * gama.Polygon([gama.Point(1, 2), gama.Point(2, 3), gama.Point(1, 3)])
 */
gama.Polygon = function(vertices) {
  return {
    vertices: vertices
  };
};

/**
 * Creates an object representing circle.
 *
 * @func
 * @category factory
 * @param {Point} position
 * @param {Number} radius
 * @return {Circle}
 * @example
 *
 * gama.Circle(gama.Point(1, 2), 2)
 */
gama.Circle = function(position, radius) {
  return {
    position: position,
    radius: radius
  };
};

/**
 * Creates a list representing 3x3 matrix.
 * @func
 * @category factory
 * @param {Number} a
 * @param {Number} b
 * @param {Number} tx
 * @param {Number} c
 * @param {Number} d
 * @param {Number} ty
 * @return {Matrix}
 * @example
 *
 * gama.Matrix(1, 2, 3, 4, 5, 6)// -> [1, 2, 3, 4, 5, 6, 0, 0, 1]
 *
 * // [a, b, tx,
 * //  c, d, ty,
 * //  u, v, w]
 */
gama.Matrix = function(a, b, tx, c, d, ty) {
  return [a, b, tx, c, d, ty, 0, 0, 1];
};

/**
 * Creates a list representing empty 3x3 matrix.
 *
 * @func
 * @category factory
 * @return {Matrix}
 * @example
 *
 * gama.EmptyMatrix()// -> [1, 0, 0, 0, 1, 0, 0, 0, 1]
 */
gama.EmptyMatrix = function() {
  return gama.Matrix(1, 0, 0, 0, 1, 0);
};

//----------------------------------------------
// deg/rad conversion

var PI2 = 2 * Math.PI;

/**
 * Converts degrees to radians.
 *
 * @func
 * @category conversion
 * @sig Number -> Number
 * @param {Number}
 * @return {Number}
 */
gama.deg2rad = function(rotation) {
  return rotation * PI2 / 360;
};

/**
 * Converts radians to degrees.
 *
 * @func
 * @category conversion
 * @sig Number -> Number
 * @param {Number}
 * @return {Number}
 */
gama.rad2deg = function(rotation) {
  return rotation * 360 / PI2;
};

//----------------------------------------------
// points/vectors

/**
 * Checks whether given value is point (contains x and y properties).
 *
 * @func
 * @category point
 * @sig * -> Boolean
 * @param {Object}
 * @return {Boolean}
 * @example
 *
 * gama.isPoint(gama.Vector(1, 2))// -> true
 * gama.isPoint(gama.Point(1, 2))// -> true
 * gama.isPoint({x: 1, y: 2})// -> true
 * gama.isPoint('s')// -> false
 */
gama.isPoint = function(input) {
  return !!(input && R.has('x', input) && R.has('y', input));
};

/**
 * Checks whether given value is vector (contains x and y properties).
 *
 * @func
 * @category vector
 * @sig * -> Boolean
 * @param {Object}
 * @return {Boolean}
 * @example
 *
 * gama.isVector(gama.Point(1, 2))// -> true
 * gama.isVector(gama.Vector(1, 2))// -> true
 * gama.isVector({x: 1, y: 2})// -> true
 * gama.isVector('s')// -> false
 */
gama.isVector = gama.isPoint;

/**
 * Adds the coordinates of a point|vector (an object that contains x and y properties)
 * to the coordinates of b point|vector (an object that contains x and y properties)
 * to create a new point.
 *
 * @func
 * @category vector
 * @sig Point|Vector -> Point|Vector -> Point|Vector
 * @param {Point|Vector} a
 * @param {Point|Vector} b
 * @return {Point|Vector}
 */
gama.add = R.curryN(2, function(a, b) {
  return gama.Point(a.x + b.x, a.y + b.y);
});

/**
 * Subtracts the coordinates of b point|vector (an object that contains x and y properties)
 * from the coordinates of a point|vector (an object that contains x and y properties)
 * to create a new point.
 *
 * @func
 * @category vector
 * @sig Point|Vector -> Point|Vector -> Point|Vector
 * @param {Point|Vector} a
 * @param {Point|Vector} b
 * @return {Point|Vector}
 */
gama.subtract = R.curryN(2, function(a, b) {
  return gama.Point(a.x - b.x, a.y - b.y);
});

/**
 * Caclulates the length of a vector.
 *
 * @func
 * @category vector
 * @sig Vector -> Number
 * @param {Vector}
 * @return {Number}
 */
gama.length2 = function(vector) {
  return vector.x * vector.x + vector.y * vector.y;
};

/**
 * Caclulates the length of a vector.
 *
 * @func
 * @category vector
 * @sig Vector -> Number
 * @param {Vector}
 * @return {Number}
 */
gama.length = function(vector) {
  return Math.sqrt(gama.length2(vector));
};

/**
 * Calculates the distance between two points.
 *
 * @func
 * @category point
 * @sig Point -> Point -> Number
 * @param {Point} a
 * @param {Point} b
 * @return {Number}
 */
gama.distance2 = R.curryN(2, function(a, b) {
  return gama.length2(gama.subtract(a, b));
});

/**
 * Calculates the distance between two points.
 *
 * @func
 * @category point
 * @sig Point -> Point -> Number
 * @param {Point} a
 * @param {Point} b
 * @return {Number}
 */
gama.distance = R.curryN(2, function(a, b) {
  return Math.sqrt(gama.distance2(a, b));
});

/**
 * Generates a normal vector.
 *
 * @func
 * @category vector
 * @sig Vector -> Vector
 * @param {Vector}
 * @return {Vector}
 */
gama.normal = function(vector) {
  return gama.Point(vector.y, -vector.x);// 'gama.Vector
};

/**
 * Caclulates the dot product of two vectors.
 *
 * @func
 * @category vector
 * @sig Vector -> Vector -> Number
 * @param {Vector} a
 * @param {Vector} b
 * @return {Number}
 */
gama.dot = R.curryN(2, function(a, b) {
  return a.x * b.x + a.y * b.y;
});

/**
 * Caclulates angle between two vectors.
 *
 * @func
 * @category vector
 * @sig Vector -> Vector -> Number
 * @param {Vector} a
 * @param {Vector} b
 * @return {Number} cos
 */
gama.angle = R.curryN(2, function(a, b) {
  return gama.dot(a, b) / (gama.length(a) * gama.length(b));
});

/**
 * Generates a unit vector.
 *
 * @func
 * @category vector
 * @sig Vector -> Vector
 * @param {Vector} vector
 * @return {Vector}
 */
gama.unit = function(vector) {
  var t = gama.length(vector);
  return gama.Point(vector.x / t, vector.y / t);// 'gama.Vector
};

/**
 * Negates the components of a vector.
 *
 * @func
 * @category vector
 * @sig Vector -> Vector
 * @param {Vector} vector
 * @return {Vector}
 */
gama.negate = function(vector) {
  return gama.Point(-vector.x, -vector.y);// 'gama.Vector
};

/**
 * Multiplies the components of a vector by a scalar value or another vector.
 *
 * @func
 * @category vector
 * @sig Number|Vector -> Vector -> Vector
 * @param {Object} Number or Vector
 * @return {Vector}
 * @example
 *
 * gama.scaleVector(2)(gama.Vector(1, 2))// -> gama.Vector(2, 4)
 * gama.scaleVector(gama.Vector(3, 1))(gama.Vector(1, 2))// -> gama.Vector(3, 2)
 */
gama.scaleVector = R.curryN(2, function(a, b) {
  return gama.isPoint(a) ? gama.Point(a.x * b.x, a.y * b.y) : gama.Point(a * b.x, a * b.y);// 'gama.Vector
});

/**
 * Applies transformation matrix on given point.
 *
 * @func
 * @category matrix
 * @sig Matrix -> Point -> Point
 * @param {Matrix} matrix
 * @param {Point} point
 * @return {Point}
 */
gama.transformPoint = R.curryN(2, function(matrix, point) {
  return gama.Point(
    matrix[0] * point.x + matrix[1] * point.y + matrix[2],
    matrix[3] * point.x + matrix[4] * point.y + matrix[5]
  );
});

//----------------------------------------------
// matrix

/**
 * Multiplies two matrices.
 *
 * @func
 * @category matrix
 * @sig Matrix -> Matrix -> Matrix
 * @param {Matrix} a
 * @param {Matrix} b
 * @return {Matrix}
 */
gama.multiplyMatrix = R.curryN(2, function(a, b) {
  return [
    a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
    a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
    a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
    a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
    a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
    a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
    a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
    a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
    a[6] * b[2] + a[7] * b[5] + a[8] * b[8]
  ];
});

/**
 * Translates the matrix.
 *
 * @func
 * @category matrix
 * @sig Vector -> Matrix -> Matrix
 * @param {Vector} vector
 * @param {Matrix} matrix
 * @return {Matrix}
 */
gama.translateMatrix = R.curryN(2, function(vector, matrix) {
  var transformation = gama.Matrix(1, 0, vector.x, 0, 1, vector.y);
  return gama.multiplyMatrix(transformation, matrix);
});

/**
 * Applies a scaling transformation to the matrix.
 *
 * @func
 * @category matrix
 * @sig Vector -> Matrix -> Matrix
 * @param {Vector} vector
 * @param {Matrix} matrix
 * @return {Matrix}
 */
gama.scaleMatrix = R.curryN(2, function(vector, matrix) {
  var transformation = gama.Matrix(vector.x, 0, 0, 0, vector.y, 0);
  return gama.multiplyMatrix(transformation, matrix);
});

/**
 * Applies a rotation transformation to the matrix.
 *
 * @func
 * @category matrix
 * @sig Number -> Matrix -> Matrix
 * @param {Number} angle
 * @param {Matrix} matrix
 * @return {Matrix}
 */
gama.rotateMatrix = R.curryN(2, function(angle, matrix) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var transformation = gama.Matrix(cos, -sin, 0, sin, cos, 0);
  return gama.multiplyMatrix(transformation, matrix);
});

/**
 * Inverts matrix.
 *
 * @func
 * @category matrix
 * @sig Matrix -> Matrix
 * @param {Matrix} matrix
 * @return {Matrix}
 */
gama.invertMatrix = function(matrix) {
  var det = matrix[0] * matrix[4] * matrix[8] +
            matrix[3] * matrix[7] * matrix[2] +
            matrix[6] * matrix[1] * matrix[5] -
            matrix[0] * matrix[7] * matrix[5] -
            matrix[3] * matrix[1] * matrix[8] -
            matrix[6] * matrix[4] * matrix[2];

  return [
    (matrix[4] * matrix[8] - matrix[7] * matrix[5]) / det,
    (matrix[7] * matrix[2] - matrix[1] * matrix[8]) / det,
    (matrix[1] * matrix[5] - matrix[4] * matrix[2]) / det,
    (matrix[6] * matrix[5] - matrix[3] * matrix[8]) / det,
    (matrix[0] * matrix[8] - matrix[6] * matrix[2]) / det,
    (matrix[3] * matrix[2] - matrix[0] * matrix[5]) / det,
    (matrix[3] * matrix[7] - matrix[6] * matrix[4]) / det,
    (matrix[6] * matrix[1] - matrix[0] * matrix[7]) / det,
    (matrix[0] * matrix[4] - matrix[3] * matrix[1]) / det
  ];
};

/**
 * Applies a rotation transformation to the matrix.
 *
 * @func
 * @category matrix
 * @sig Number -> Point -> Matrix -> Matrix
 * @param {Number} angle
 * @param {Point} point
 * @param {Matrix} matrix
 * @return {Matrix}
 */
gama.rotateAround = R.curryN(3, function(angle, point, matrix) {
  return R.compose(
    gama.translateMatrix(point),
    gama.rotateMatrix(angle),
    gama.translateMatrix(gama.negate(point))
  )(matrix);
});

//----------------------------------------------
// polygon

var minX = R.compose(R.apply(Math.min), R.map(R.prop('x')));
var minY = R.compose(R.apply(Math.min), R.map(R.prop('y')));
var maxX = R.compose(R.apply(Math.max), R.map(R.prop('x')));
var maxY = R.compose(R.apply(Math.max), R.map(R.prop('y')));

/**
 * Returns the top left vertex of polygon's bounding box.
 *
 * @func
 * @category polygon
 * @sig Polygon -> Point
 * @param {Polygon}
 * @return {Point}
 */
gama.minVertex = function(polygon) {
  return gama.Point(
    minX(polygon.vertices),
    minY(polygon.vertices)
  );
};

/**
 * Returns the bottom right vertex of polygon's bounding box.
 *
 * @func
 * @category polygon
 * @sig Polygon -> Point
 * @param {Polygon}
 * @return {Point}
 */
gama.maxVertex = function(polygon) {
  return gama.Point(
    maxX(polygon.vertices),
    maxY(polygon.vertices)
  );
};

/**
 * Returns bounding box.
 *
 * @func
 * @category polygon
 * @sig Polygon -> Rectangle
 * @param {Polygon}
 * @return {Rectangle}
 */
gama.boundingBox = function(polygon) {
  var min = gama.minVertex(polygon);
  var max = gama.maxVertex(polygon);

  return gama.Rectangle(
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
 * @category polygon
 * @sig Polygon -> [Vector]
 * @param {Polygon}
 * @return {Array} List of vectors.
 */
gama.axes = R.compose(
  R.mapIndexed(axesFromVertices),
  R.prop('vertices')
);

/**
 * Applies transformation matrix on given polygon.
 *
 * @func
 * @category matrix
 * @sig Matrix -> Polygon -> Point
 * @param {Matrix} matrix
 * @param {Polygon} polygon
 * @return {Point}
 */
gama.transformPolygon = R.curryN(2, function(matrix, polygon) {
  return R.compose(
    gama.Polygon,
    R.map(gama.transformPoint(matrix))
  )(polygon.vertices);
});

/**
 * Checks whether given polygon is concave.
 *
 * @func
 * @category polygon
 * @sig Polygon -> Boolean
 * @param {Polygon}
 * @return {Boolean}
 */
gama.isConcave = R.compose(
  dotsConcave,
  R.mapIndexed(dotsFromAxes),
  gama.axes
);

/**
 * Checks whether given polygon is convex.
 *
 * @func
 * @category polygon
 * @sig Polygon -> Boolean
 * @param {Polygon}
 * @return {Boolean}
 */
gama.isConvex = function(polygon) {
  return !gama.isConcave(polygon);
};

/**
 * Creates polygon from given rectangle.
 *
 * @func
 * @category polygon
 * @sig Rectangle -> Rectangle
 * @param {Rectangle}
 * @return {Polygon}
 */
gama.rectangle2polygon = function(rectangle) {
  return gama.Polygon([
    gama.Point(rectangle.x, rectangle.y),
    gama.Point(rectangle.x + rectangle.width, rectangle.y),
    gama.Point(rectangle.x + rectangle.width, rectangle.y + rectangle.height),
    gama.Point(rectangle.x, rectangle.y + rectangle.height)
  ]);
};

//----------------------------------------------
// collision detections

/**
 * Projects vertex to axis.
 *
 * @func
 * @category test
 * @sig Vector -> Point -> Point
 * @param {Vector} axis
 * @param {Point} vertex
 * @return {Point}
 */
gama.projectPointToAxis = R.curryN(2, function(axis, vertex) {
  var t = (vertex.x * axis.x + vertex.y * axis.y) / (axis.x * axis.x + axis.y * axis.y);
  return gama.Point(t * axis.x, t * axis.y);
});

/**
 * Checks whether two projections overlap.
 *
 * @func
 * @category test
 * @sig [a] -> [b] -> Boolean
 * @param {Array} a
 * @param {Array} b
 * @return {Boolean}
 */
gama.projectionsOverlap = R.curryN(2, function(a, b) {
  return R.head(b) <= R.last(a) && R.last(b) >= R.head(a);
});

/**
 * Checks whether point lies inside rectangle.
 *
 * @func
 * @category test
 * @sig Point -> Rectangle -> Boolean
 * @param {Point} point
 * @param {Rectangle} rectangle
 * @return {Boolean}
 */
gama.testPointRectangle = R.curryN(2, function(point, rectangle) {
  return point.x >= rectangle.x && point.x <= rectangle.x + rectangle.width && point.y >= rectangle.y && point.y <= rectangle.y + rectangle.height;
});

/**
 * Checks whether point lies inside circle.
 *
 * @func
 * @category test
 * @sig Point -> Circle -> Boolean
 * @param {Point} point
 * @param {Circle} circle
 * @return {Boolean}
 */
gama.testPointCircle = R.curryN(2, function(point, circle) {
  return gama.distance(circle.position, point) <= circle.radius;
});

/**
 * Checks whether point lies inside polygon.
 *
 * @func
 * @category test
 * @sig Point -> Polygon -> Boolean
 * @param {Point} point
 * @param {Polygon} polygon
 * @return {Boolean}
 */
gama.testPointPolygon = R.curryN(2, function(point, polygon) {
  return R.compose(
    R.reduce(reduceTestPointPolygonResult, false),
    R.mapIndexed(function(vertex, i, vertices) {
      var prevVertex = vertices[(vertices.length + i - 1) % vertices.length];

      return ((vertex.y > point.y) != (prevVertex.y > point.y)) &&
        (point.x <= (prevVertex.x - vertex.x) * (point.y - vertex.y) / (prevVertex.y - vertex.y) + vertex.x);
    })
  )(polygon.vertices);
});

/**
 * Checks whether two circles overlap.
 *
 * @func
 * @category test
 * @sig Circle -> Circle -> Boolean
 * @param {Circle} a
 * @param {Circle} b
 * @return {Boolean}
 */
gama.testCircleCircle = R.curryN(2, function(a, b) {
  return gama.distance(a.position, b.position) <= a.radius + b.radius;
});

/**
 * Checks whether two polygons overlap. Works only for two convex polygons.
 *
 * @func
 * @category test
 * @sig Polygon -> Polygon -> Boolean
 * @param {Polygon} a
 * @param {Polygon} b
 * @return {Boolean}
 */
gama.testPolygonPolygon = R.curryN(2, function(a, b) {
  var axes = R.union(gama.axes(a), gama.axes(b));

  return !R.any(function(axis) {
    var project = projectPolygonToAxis(gama.negate(axis));

    return !gama.projectionsOverlap(
      project(a),
      project(b)
    );
  })(axes);
});
