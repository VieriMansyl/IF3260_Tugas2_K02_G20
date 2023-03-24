class Camera {
  // Phi itu sudut di xy
  // Theta sudut dari z
  constructor(radius, theta){
    this.radius = radius;
    this.radius_default = radius;
    this.theta = theta;
    this.theta_default = theta;
  }

  setCameraLocation(radius, theta){
    this.radius = radius;
    this.theta = theta;
  }

  reset(){
    this.setCameraLocation(this.radius_default, this.theta_default);
  }

  getCameraMatrix(){
    return multiMatrix4Multiplication(
      TransformationMatrix.getTranslationMatrix(0, 0, this.radius),
      TransformationMatrix.getRotationMatrix(0, this.theta, 0)
    );
  }

  getViewMatrix(){
    return matrix4Inverse(this.getCameraMatrix());
  }
}
