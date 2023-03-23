/** Mengonversi degree ke radian */
function degToRad(degree){
  return degree * (Math.PI / 180);
}

/** Modulo. Karena modulo Javascript bisa negatif */
function remainder(a, b){
  return ((a % b) + b) % b;
}

/** Mengali banyak matriks 4x4. 
  * Matriks merupakan array berisi 16 elemen, BUKAN 2D array.
  * @param ...mat - matriks secara bebrurutan dari kiri ke kanan
  */
function multiMatrix4Multiplication(...mat){
  return mat.reduceRight(
    (accumulator, currentMatrix) => {
      // Memang dibalik
      return matrix4Multiplication(currentMatrix, accumulator);
    },
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
  )
}

/** Mengali dua matriks 4x4. 
  * WARN : Matriks merupakan array berisi 16 elemen, BUKAN 2D array.
  * @param mat1 - matriks di bagian kiri  perkalian 
  * @param mat2 - matriks di bagian kanan perkalian 
  */
function matrix4Multiplication(mat1, mat2){
  return [...Array(Math.min(mat1.length, mat2.length)).keys()].map(
    (elementIdx) => {
      let colIdx = Math.floor(elementIdx / 4);
      let rowIdx = remainder(elementIdx, 4);
      return vectorDot(
        getMatrixRow(mat1, rowIdx, [4, 4]),
        getMatrixCol(mat2, colIdx, [4, 4]),
      )

    }
  )
}

/** Dapetin kolom dari matrix yang bentuknya tidak dalam 2D */
function getMatrixCol(mat, columnNumber, matrixDimension){
  return mat.filter( (_, idx) => { return remainder(idx, matrixDimension[1]) === columnNumber; } )
}

/** Dapetin kolom dari matrix yang bentuknya tidak dalam 2D */
function getMatrixRow(mat, rowNumber, matrixDimension){
  return mat.filter( (_, idx) => { return Math.floor(idx / matrixDimension[1]) === rowNumber; } )
}

/** Operasi terhadap tiap komponen vector. */
function vectorOperator(v1, v2, operator){
  return [...Array(Math.min(v1.length, v2.length)).keys()].map(num => {return operator(v1[num], v2[num])});
}

/** Operasi dot vector. */
function vectorDot(v1, v2){
  let componentDot = vectorOperator(v1, v2, (component1, component2) => { return component1 * component2 })
  return componentDot.reduce((total, partDot) => { return total + partDot; }, 0);
}
