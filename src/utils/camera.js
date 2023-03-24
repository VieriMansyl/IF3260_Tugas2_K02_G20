/**
 * Rotate camera pos
 * @param {*} cameraAngle
 * @param {*} mat projection matrix
 * @returns
 */
const rotateCamera = (cameraAngle, mat) => {
  camera_mat = rotateY(degToRad(cameraAngle));
  return matrix4Multiplication(camera_mat, mat);
};

/**
 * Zoom in and out
 * @param {*} zoomValue params for zoom and out
 * @param {*} mat projection matrix
 * @returns
 */
const zoom = (zoomValue, mat) => {
  if (zoomValue >= 0.5) {
    return matrix4Multiplication(
      mat,
      [1.05, 0, 0, 0, 0, 1.05, 0, 0, 0, 0, 1.05, 0, 0, 0, 0, 1]
    );
  } else {
    return matrix4Multiplication(
      mat,
      [0.95, 0, 0, 0, 0, 0.95, 0, 0, 0, 0, 0.95, 0, 0, 0, 0, 1]
    );
  }
};
