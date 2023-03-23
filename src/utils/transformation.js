
/** Kelas yang memiliki implementasi fungsi Tranformasi. 
* @public getTranslationMatrix
* @public getRotationMatrix
* @public getScaleMatrix
*/
class TransformationMatrixm {
  /** Menghasilkan matrix translasi. 
    * @param x - Besar translasi komponen x
    * @param y - Besar translasi komponen y
    * @param z - Besar translasi komponen z
    * @returns Matrix Translasi berukuran 4x4
    */
  getTranslationMatrix(x, y, z){
    return [
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1
    ]
  }

  /** Menghasilkan matrix rotasi. 
    * Matrix ngambil dari https://en.wikipedia.org/wiki/Rotation_matrix#General_rotations
    * @param x_degree - Besar rotasi terhadap sumbu x dalam derajat
    * @param y_degree - Besar rotasi terhadap sumbu y dalam derajat
    * @param z_degree - Besar rotasi terhadap sumbu z dalam derajat
    * @returns Matrix Rotasi berukuran 4x4
    */
  getRotationMatrix(x_degree, y_degree, z_degree){
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
        1,
      0, 
        0, 
        0, 
        1
    ]
  }

  /** Menghasilkan matrix scale. 
    * @param x - Besar scale komponen x
    * @param y - Besar scale komponen y
    * @param z - Besar scale komponen z
    * @returns Matrix Scale berukuran 4x4
    */
  getScaleMatrix(x, y, z){
    return [
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1
    ]
  }


}
