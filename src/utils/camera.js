// Move to utils later
const rotateY = (angleRadians) => {
  let cos = Math.cos(angleRadians);
  let sin = Math.sin(angleRadians);

  return [cos, 0, -sin, 0, 0, 1, 0, 0, sin, 0, cos, 0, 0, 0, 0, 1];
};

const matrix4Translation = (tx, ty, tz) => {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1];
};

const matrix4Inverse = (mat) => {};

// Count rotation
const rotateCamera = (cameraAngleRadian, radius) => {
  let cameraMatrix = rotateY(cameraAngleRadians);
  cameraMatrix = matrix4Multiplication(
    cameraMatrix,
    matrix4Translation(0, 0, radius * 1.5)
  );

  let viewMatrix = inverse(cameraMatrix);
  let viewProjectionMatrix = matrix4Multiplication(
    projectionMatrix,
    viewMatrix
  );
};
