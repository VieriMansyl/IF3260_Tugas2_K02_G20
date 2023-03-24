
class Projection {
  static getOrthographic(left, right, bottom, top, near, far){
    return matrix4Multiplication(
      TransformationMatrix.getScaleMatrix(
        2 / (right - left), 
        2/(top - bottom), 
        2 / (near - far)
      ),
      TransformationMatrix.getTranslationMatrix(
        -(right + left) / 2, 
        - (top + bottom) / 2, 
        (far + near) / 2
      )
    );
  }

  static getOblique(theta, phi, left, right, bottom, top, near, far){
    return multiMatrix4Multiplication(
      [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, -1,0,
        0, 0, 0, 1
      ],
      this.getOrthographic(left, right, bottom, top, near, far),
      [
        1, 0, - 1 / Math.tan(degToRad(theta)), 0,
        0, 1,  -  1 / Math.tan(degToRad(phi)), 0,
        0, 0,                               1, 0,
        0, 0,                               0, 1
      ]
    )
  }
}
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
