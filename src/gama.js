// -----------------------------------------------------------------------
//  gama
//  Copyright 2015 Jan Břečka. All Rights Reserved.
//
//  This program is free software. You can redistribute and/or modify it
//  in accordance with the terms of the accompanying license agreement.
// -----------------------------------------------------------------------

var R = require('ramda');
var g = exports;

var sortAsc = R.sort(function(a, b) {
  return a - b;
});

//----------------------------------------------
// factories

g.Point = function(x, y) {
  return {
    x: x,
    y: y
  };
};

g.Vector = R.op(function(x, y) {
  if (g.isPoint(x) && g.isPoint(y)) {
    return g.subtract(x, y);
  }

  return {
    x: x,
    y: y
  };
});

g.Rectangle = function(x, y, width, height) {
  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
};

g.Polygon = function(vertices) {
  return {
    vertices: vertices
  };
};

g.Circle = function(position, radius) {
  return {
    position: position,
    radius: radius
  };
};

g.Matrix = function(a, b, c, d, tx, ty) {
  return [a, b, c, d, tx, ty];
};

g.EmptyMatrix = function() {
  return g.Matrix(1, 0, 0, 1, 0, 0);
};

//----------------------------------------------
// deg/rad conversion

var PI2 = 2 * Math.PI;

g.deg2rad = function(rotation) {
  return rotation * PI2 / 360;
};

g.rad2deg = function(rotation) {
  return rotation * 360 / PI2;
};

//----------------------------------------------
// points/vectors

g.isPoint = R.and(R.has('x'), R.has('y'));

g.isVector = g.isPoint;

g.add = R.op(function(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  };
});

g.subtract = R.op(function(a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  };
});

//----------------------------------------------
// point

g.rotatePoint = R.curry(function(point, around, angle) {
  return g.Point(
    (point.x - around.x) * Math.cos(angle) - (point.y - around.y) * Math.sin(angle) + around.x,
    (point.x - around.x) * Math.sin(angle) + (point.y - around.y) * Math.cos(angle) + around.y
  );
});

g.distance2 = R.op(function(a, b) {
  return g.vectorLength2(g.subtract(a, b));
});

g.distance = R.op(function(a, b) {
  return Math.sqrt(g.distance2(a, b));
});

//----------------------------------------------
// vectors

g.normal = function(vector) {
  return g.Vector(vector.y, -vector.x);
};

g.dot = R.curry(function(a, b) {
  return a.x * b.x + a.y * b.y;
});

g.unit = function(vector) {
  var t = g.vectorLength(vector);
  return g.Vector(vector.x / t, vector.y / t);
};

g.vectorLength2 = function(vector) {
  return vector.x * vector.x + vector.y * vector.y;
};

g.vectorLength = function(vector) {
  return Math.sqrt(g.vectorLength2(vector));
};

g.negate = function(vector) {
  return g.Vector(-vector.x, -vector.y);
};

g.scaleVector = R.op(function(by, vector) {
  if (g.isVector(by)) {
    return g.Vector(vector.x * by.x, vector.y * by.y);
  }

  return g.Vector(vector.x * by, vector.y * by);
});

//----------------------------------------------
// polygon

g.polygonMinVertex = function(polygon) {
  return g.Point(
    R.pipe(R.map(R.prop('x')), R.min)(polygon.vertices),
    R.pipe(R.map(R.prop('y')), R.min)(polygon.vertices)
  );
};

g.polygonMaxVertex = function(polygon) {
  return g.Point(
    R.pipe(R.map(R.prop('x')), R.max)(polygon.vertices),
    R.pipe(R.map(R.prop('y')), R.max)(polygon.vertices)
  );
};

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

g.polygonAxes = function(polygon) {
  return R.map.idx(function(vertex, i, vertices) {
    return g.normal(g.Vector(
      vertices[i],
      vertices[(i + 1) % vertices.length]
    ));
  })(polygon.vertices);
};

//----------------------------------------------
// collision detections

g.projectPointToAxis = R.op(function(axis, vertex) {
  var t = (vertex.x * axis.x + vertex.y * axis.y) / (axis.x * axis.x + axis.y * axis.y);
  return g.Point(t * axis.x, t * axis.y);
});

g.projectionsOverlap = R.op(function(a, b) {
  return R.head(b) <= R.last(a) && R.last(b) >= R.head(a);
});

var projectPolygonToAxis = R.op(function(axis, polygon) {
  return R.pipe(
    R.map(R.pipe(g.projectPointToAxis(axis), g.dot(axis))),
    sortAsc
  )(polygon.vertices);
});

g.testPointRectangle = R.op(function(point, rectangle) {
  return point.x >= rectangle.x && point.x <= rectangle.x + rectangle.width && point.y >= rectangle.y && point.y <= rectangle.y + rectangle.height;
});

g.testPointCircle = R.op(function(point, circle) {
  return g.distance(circle.position, point) <= circle.radius;
});

g.testCircleCircle = R.curry(function(a, b) {
  return g.distance(a.position, b.position) <= a.radius + b.radius;
});

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