
/** Kelas yang memiliki implementasi fungsi Tranformasi. 
* @public getTranslationMatrix
* @public getRotationMatrix
* @public getScaleMatrix
*/
class TransformationMatrix {
  // matrix translasi.
  static getTranslationMatrix(x, y, z){
    return [
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1
    ]
  }

  // matrix rotasi
  static getRotationMatrix(x_degree, y_degree, z_degree){
    /** Besar rotasi terhadap sumbu x dalam radian */
    let x_rad = degToRad(x_degree);
    /** Besar rotasi terhadap sumbu y dalam radian */
    let y_rad = degToRad(y_degree);
    /** Besar rotasi terhadap sumbu z dalam radian */
    let z_rad = degToRad(z_degree);
    return [
      Math.cos(y_rad) * Math.cos(z_rad), 
        Math.sin(x_rad) * Math.sin(y_rad) * Math.cos(z_rad) - Math.cos(x_rad) * Math.sin(z_rad), 
        Math.cos(x_rad) * Math.sin(y_rad) * Math.cos(z_rad) + Math.sin(x_rad) * Math.sin(z_rad), 
        0,
      Math.cos(y_rad) * Math.sin(z_rad), 
        Math.sin(x_rad) * Math.sin(y_rad) * Math.sin(z_rad) + Math.cos(x_rad) * Math.cos(z_rad), 
        Math.cos(x_rad) * Math.sin(y_rad) * Math.sin(z_rad) - Math.sin(x_rad) * Math.cos(z_rad), 
        0,
      Math.sin(y_rad) * -1, 
        Math.sin(x_rad) * Math.cos(y_rad), 
        Math.cos(x_rad) * Math.cos(y_rad), 
        0,
      0, 
        0, 
        0, 
        1
    ]
  }

  // matrix scale
  static getScaleMatrix(x, y, z){
    return [
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1
    ]
  }

  // matrix uniform scale
  static getUniformScaleMatrix(scale){
    return [
      scale, 0, 0, 0,
      0, scale, 0, 0,
      0, 0, scale, 0,
      0, 0, 0, 1
    ]
  }

}

function setModelRotation(x, y, z) {
  const rotateXvalue = document.querySelector("#rotation-x-value");
  const rotateYvalue = document.querySelector("#rotation-y-value");
  const rotateZvalue = document.querySelector("#rotation-z-value");
  rotateXvalue.innerHTML = x;
  rotateYvalue.innerHTML = y;
  rotateZvalue.innerHTML = z;

  return TransformationMatrix.getRotationMatrix(x,y,z);
}

function setModelTranslation(x, y, z) {
  const translateXvalue = document.querySelector("#translation-x-value");
  const translateYvalue = document.querySelector("#translation-y-value");
  const translateZvalue = document.querySelector("#translation-z-value");
  translateXvalue.innerHTML = x;
  translateYvalue.innerHTML = y;
  translateZvalue.innerHTML = z;

  return TransformationMatrix.getTranslationMatrix(x,y,z);
}

function setModelScale(val) {
  const scaleValue = document.querySelector("#scaling-value");
  scaleValue.innerHTML = val;
  return TransformationMatrix.getUniformScaleMatrix(val);
}