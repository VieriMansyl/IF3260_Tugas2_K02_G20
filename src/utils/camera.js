const rotateCamera = (cameraAngleRadians, radius, cameraMatrix) => {
  var cameraMatrix = m4.yRotation(cameraAngleRadians);
  cameraMatrix = m4.translate(cameraMatrix, 0, 0, radius * 1.5);
};
