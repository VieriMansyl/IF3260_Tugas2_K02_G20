
const setOrthographicProjection = () => {
  return [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
  ]
};

const setPerspectiveProjection = (canvas) => {
  // Calculate constants
  var aspectRatio = canvas.width / canvas.height;
  var zNear = 1;
  var zFar = 100;

  // Calculate perspective matrix
  var f = Math.tan(Math.PI * 0.5 - 0.5 * degToRad(70));
  var range = 1 / (zNear - zFar);

  return [
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
    (zNear + zFar) * range,
    -1,

    0,
    0,
    zNear * zFar * range * 0.25,
    1,
  ];
};
