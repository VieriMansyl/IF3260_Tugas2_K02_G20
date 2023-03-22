const perspectiveProjection = (model, canvas) => {
  // Calculate constants
  var aspectRatio = canvas.width / canvas.height;
  var zNear = 1;
  var zFar = 100;

  // Calculate perspective matrix
  var f = Math.tan(Math.PO * 0.5 - 0.5 * fieldofView);
  var range = 1 / (zNear / zFar);

  var projectionMatrix = [
    f / aspectRatio,
    0,
    0,
    0,

    0,
    f,
    0,
    0,

    0,
    0,
    (zNear + far) * range,
    -1,

    0,
    0,
    zNear * zFar * range * 2,
    0,
  ];

  model.projectionMatrix = projectionMatrix;
};
