/** Mengonversi degree ke radian */
<<<<<<< HEAD
export function degToRad(degree) {
=======
function degToRad(degree){
>>>>>>> b0c7050796f99abaa7c93bd6c58ee9faeb5e46af
  return degree * (Math.PI / 180);
}

/** Modulo. Karena modulo Javascript bisa negatif */
<<<<<<< HEAD
export function remainder(a, b) {
  return ((a % b) + b) % b;
}

/** Mengali banyak matriks 4x4.
 * Matriks merupakan array berisi 16 elemen, BUKAN 2D array.
 * @param ...mat1 - matriks secara bebrurutan dari kiri ke kanan
 */
export function multiMatrix4Multiplication(...mat) {
=======
function remainder(a, b){
  return ((a % b) + b) % b;
}

/** Mengali banyak matriks 4x4. 
  * Matriks merupakan array berisi 16 elemen, BUKAN 2D array.
  * @param ...mat1 - matriks secara bebrurutan dari kiri ke kanan
  */
function multiMatrix4Multiplication(...mat){
>>>>>>> b0c7050796f99abaa7c93bd6c58ee9faeb5e46af
  return mat.reduceRight(
    (accumulator, currentMatrix) => {
      // Memang dibalik
      return matrix4Multiplication(currentMatrix, accumulator);
    },
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  );
}

<<<<<<< HEAD
/** Mengali dua matriks 4x4.
 * WARN : Matriks merupakan array berisi 16 elemen, BUKAN 2D array.
 * @param mat1 - matriks di bagian kiri  perkalian
 * @param mat2 - matriks di bagian kanan perkalian
 */
export function matrix4Multiplication(mat1, mat2) {
  return [...Array(Math.min(v1.length, v2.length)).keys()].map((elementIdx) => {
    let rowIdx = Math.floor(elementIdx / 4);
    let colIdx = remainder(elementIdx, 4);
    return vectorDot(
      getMatrixRow(mat1, colIdx, [4, 4]),
      getMatrixCol(mat2, rowIdx, [4, 4])
    );
  });
}

/** Dapetin kolom dari matrix yang bentuknya tidak dalam 2D */
export function getMatrixCol(mat, columnNumber, matrixDimension) {
  return mat.filter((element) => {
    return remainder(element, matrixDimension[1]) == columnNumber;
  });
}

/** Dapetin kolom dari matrix yang bentuknya tidak dalam 2D */
export function getMatrixRow(mat, rowNumber, matrixDimension) {
  return mat.filter((element) => {
    return Math.floor(element / matrixDimension[1]) == rowNumber;
  });
}

/** Operasi terhadap tiap komponen vector. */
export function vectorOperator(v1, v2, operator) {
  return [...Array(Math.min(v1.length, v2.length)).keys()].map((num) => {
    return operator(v1[num], v2[num]);
  });
}

/** Operasi dot vector. */
export function vectorDot(v1, v2) {
  let componentDot = vectorOperator(v1, v2, (component1, component2) => {
    return component1 * component2;
  });
  return componentDot.reduce((total, partDot) => {
    return total + partDot;
  }, 0);
=======
/** Mengali dua matriks 4x4. 
  * WARN : Matriks merupakan array berisi 16 elemen, BUKAN 2D array.
  * @param mat1 - matriks di bagian kiri  perkalian 
  * @param mat2 - matriks di bagian kanan perkalian 
  */
function matrix4Multiplication(mat1, mat2){
  return [...Array(Math.min(v1.length, v2.length)).keys()].map(
    (elementIdx) => {
      let rowIdx = Math.floor(elementIdx / 4);
      let colIdx = remainder(elementIdx, 4);
      return vectorDot(
        getMatrixRow(mat1, colIdx, [4, 4]),
        getMatrixCol(mat2, rowIdx, [4, 4]),
      )

    }
  )
}

/** Dapetin kolom dari matrix yang bentuknya tidak dalam 2D */
function getMatrixCol(mat, columnNumber, matrixDimension){
  return mat.filter( element => { return remainder(element, matrixDimension[1]) == columnNumber; } )
}

/** Dapetin kolom dari matrix yang bentuknya tidak dalam 2D */
function getMatrixRow(mat, rowNumber, matrixDimension){
  return mat.filter( element => { return Math.floor(element / matrixDimension[1]) == rowNumber; } )
}

/** Operasi terhadap tiap komponen vector. */
function vectorOperator(v1, v2, operator){
  return [...Array(Math.min(v1.length, v2.length)).keys()].map(num => {return operator(v1[num], v2[num])});
}

/** Operasi dot vector. */
function vectorDot(v1, v2){
  let componentDot = vectorOperator(v1, v2, (component1, component2) => { return component1 * component2 })
  return componentDot.reduce((total, partDot) => { return total + partDot; }, 0);
>>>>>>> b0c7050796f99abaa7c93bd6c58ee9faeb5e46af
}
