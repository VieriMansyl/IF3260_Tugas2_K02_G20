/** Prism Generator
 * Ngebikin Prisma. Ada 5 jenis vertex
 *  - True Outer
 *  - True Inner
 *  - Inner CW
 *  - Inner CCW
 *  - Inner TB
 *  Agak susah ngejelasin via text, rencananya bakal aku bikin gambar.
 */

/** Kelas yang merupakan kumpulan vertex-vertex yang dapat membentuk Hollow Prism. */
export class HollowPrism {
  /** Jumlah sisi Alas atau Atas
   * @private
   * @defaultValue null
   */
  #nSide;
  /** Jarak Vertex terluar ke sumbu-y
   * @private
   * @defaultValue null
   */
  #radius;
  /** Tinggi prisma
   * @private
   * @defaultValue null
   */
  #height;
  /** Lebar rusuk */
  #a;
  /** Kumpulan Vertex
   * @public
   * @defaultValue null
   */
  vertices;
  /** Kumpulan Index
   * @public
   * @defaultValue null
   */
  indices;

  /** Tipe vertex */
  static #vertexType = {
    TRUE_OUTER: "TRUE_OUTER",
    TRUE_INNER: "TRUE_INNER",
    INNER_TB: "INNER_TB",
    INNER_CW: "INNER_CW",
    INNER_CCW: "INNER_CCW"
  }
  /** Ngebentuk kumpulan Vertex Hollow Prism
   * @param nSide - Jumlah sisi Alas dan Atas
   * @param radius - Jarak Vertex terluar ke sumbu-y
   * @param height - Tinggi prisma
   */
  constructor(nSide, radius, height, a){
    this.#nSide = nSide;
    this.#radius = radius;
    this.#height = height;
    this.#a = a;
    // this.vertices = new Array(2).fill(new Array(nSide).fill({}));
    this.vertices = Array.from({length: 2}, () => {
      return Array.from({length: nSide}, () => ({}))
    });
    this.#generateVertices();
    this.#generateIndices();
  }

  /** Print vertex ke console */
  log(){
    console.log(">>> Vertices");
    this.vertices.forEach(base => { console.log(base) });
    console.log("<<<");
    console.log(">>> Indices");
    console.log(this.indices);
    console.log("<<<");
  }
  /** Bikin vertices-nya */
  #generateVertices(){
    HollowPrism.#generateTrueOuter(this.#nSide, this.#radius, this.#height, this.vertices);
    HollowPrism.#generateInnerTB(this.#nSide, this.#radius, this.#height, this.#a, this.vertices);
    HollowPrism.#generateInnerCW(this.#nSide, this.#a, this.vertices);
    HollowPrism.#generateInnerCCW(this.#nSide, this.#a, this.vertices);
    HollowPrism.#generateTrueInner(this.#nSide, this.vertices);
  }

  /** Bikin vertex-vertex utama.
    * @param nSide - Jumlah sisi alas prisma 
    * @param radius - Jarak vertex ke sumbu-y 
    * @param height - Tinggi prisma 
    * @param verticesArray - Array yang berisi kumpulan vertex. Array ini akan dimutasi. 
    * @param verticesArrayKey - Nama komponen.
    * @returns None
    */
  static #generateTrueOuter(nSide, radius, height, verticesArray, verticesArrayKey = this.#vertexType.TRUE_OUTER){
    // Untuk alas dan atas
    for(let isPrismBottom = 0; isPrismBottom < 2; isPrismBottom++){
      // Untuk tiap vertex
      for(let i = 0; i < nSide; i++){
        let vertex = verticesArray[isPrismBottom][i];
        let theta = degToRad(360 / nSide * i);
        vertex[verticesArrayKey] = [
          radius * Math.cos(theta),
          height * (isPrismBottom * 2 - 1) / 2,
          radius * Math.sin(theta),
        ];
      }
    }
  }

  /** Bikin vertex-vertex dalam untuk atas dan alas.
    * @param nSide - Jumlah sisi alas prisma 
    * @param radius - Jarak vertex ke sumbu-y 
    * @param height - Tinggi prisma 
    * @param a - Width of non-hollow rusuk(?). Susah ngejelasinnya.
    * @param verticesArray - Array yang berisi kumpulan vertex. Array ini akan dimutasi. 
    * @returns None
    */
  static #generateInnerTB(nSide, radius, height, a, verticesArray){
    let alpha = degToRad(90 * (nSide - 2) / nSide);
    let newRadius = radius - a / Math.sin(alpha);
    HollowPrism.#generateTrueOuter(nSide, newRadius, height, verticesArray, this.#vertexType.INNER_TB);
  }

  /** Bikin vertex-vertex dalam untuk sisi dengan arah Clock Wise
    * @param nSide - Jumlah sisi alas prisma 
    * @param a - Width of non-hollow rusuk(?). Susah ngejelasinnya.
    * @param verticesArray - Array yang berisi kumpulan vertex. Array ini akan dimutasi. 
    * @returns None
    */
  static #generateInnerCW(nSide, a, verticesArray){
    this.#generateInnerSide(nSide, a, verticesArray, this.#vertexType.INNER_CW, 1);
  }

  /** Bikin vertex-vertex dalam untuk sisi dengan arah Counter Clock Wise
    * @param nSide - Jumlah sisi alas prisma 
    * @param a - Width of non-hollow rusuk(?). Susah ngejelasinnya.
    * @param verticesArray - Array yang berisi kumpulan vertex. Array ini akan dimutasi. 
    * @returns None
    */
  static #generateInnerCCW(nSide, a, verticesArray){
    this.#generateInnerSide(nSide, a, verticesArray, this.#vertexType.INNER_CCW, -1);
  }

  /** Bikin vertex-vertex dalam untuk sisi dengan arah berdasarkan parameter
    * @param nSide - Jumlah sisi alas prisma 
    * @param a - Width of non-hollow rusuk(?). Susah ngejelasinnya.
    * @param verticesArray - Array yang berisi kumpulan vertex. Array ini akan dimutasi. 
    * @param verticesArrayKey - Nama komponen.
    * @param sideOffset - +1 untuk CW, -1 untuk CCW;
    * @returns None
    */
  static #generateInnerSide(nSide, a, verticesArray, verticesArrayKey, sideOffset){
    // Untuk alas dan atas
    for(let isPrismBottom = 0; isPrismBottom < 2; isPrismBottom++){
      // Untuk tiap vertex
      for(let i = 0; i < nSide; i++){
        let vertex = verticesArray[isPrismBottom][i];
        let currSideVertex = vertex[this.#vertexType.TRUE_OUTER];
        let nextSideVertex = verticesArray[isPrismBottom][this.#remainder(i + sideOffset, nSide)][this.#vertexType.TRUE_OUTER];
        let nextTBVertex   = verticesArray[(isPrismBottom + 1) % 2][i][this.#vertexType.TRUE_OUTER];
        let relativeVector = this.#pointAddition(this.#partVector(this.#pointDifference(nextSideVertex, currSideVertex), a), 
          this.#partVector(this.#pointDifference(nextTBVertex, currSideVertex), a))
        vertex[verticesArrayKey] = this.#pointAddition(relativeVector, currSideVertex);
      }
    }
  }

  /** Bikin vertex-vertex dalam. Di dalam prisma.
    * @param nSide - Jumlah sisi alas prisma 
    * @param a - Width of non-hollow rusuk(?). Susah ngejelasinnya.
    * @param verticesArray - Array yang berisi kumpulan vertex. Array ini akan dimutasi. 
    * @param verticesArrayKey - Nama komponen.
    * @param sideOffset - +1 untuk CW, -1 untuk CCW;
    * @returns None
    */
  static #generateTrueInner(nSide, verticesArray){
    // Untuk alas dan atas
    for(let isPrismBottom = 0; isPrismBottom < 2; isPrismBottom++){
      // Untuk tiap vertex
      for(let i = 0; i < nSide; i++){
        let vertex = verticesArray[isPrismBottom][i];
        let vertexCW = vertex[this.#vertexType.INNER_CW];
        let vertexTB = vertex[this.#vertexType.INNER_TB];
        vertex[this.#vertexType.TRUE_INNER] = [
          vertexTB[0],
          vertexCW[1],
          vertexTB[2]
        ];
      }
    }
  }

  /** Bikin indices-nya 
   * Bisa di render dengan TRIANGLE_FAN dengan count 4
   */
  #generateIndices(){
    const baseIndices = HollowPrism.#generateBaseIndices(this.#nSide, this.vertices);
    // console.log(baseIndices);
    const sideIndices = HollowPrism.#generateSideIndices(this.#nSide, this.vertices);
    // console.log(sideIndices);
    this.indices = baseIndices.concat(sideIndices);
  }

  /** Bikin indices untuk rusuk di alas dan atas */
  static #generateBaseIndices(nSide, verticesArray){
    let indices = []
    // Untuk alas dan atas
    for(let isPrismBottom = 0; isPrismBottom < 2; isPrismBottom++){
      // Untuk tiap vertex
      for(let i = 0; i < nSide; i++){
        let currVertex = verticesArray[isPrismBottom][i];
        let nextVertex = verticesArray[isPrismBottom][this.#remainder(i + 1, nSide)];

        indices = indices.concat(
          currVertex[this.#vertexType.TRUE_OUTER],
          currVertex[this.#vertexType.INNER_TB],
          nextVertex[this.#vertexType.INNER_TB],
          nextVertex[this.#vertexType.TRUE_OUTER],
        )

        indices = indices.concat(
          currVertex[this.#vertexType.TRUE_OUTER],
          currVertex[this.#vertexType.INNER_CW],
          nextVertex[this.#vertexType.INNER_CCW],
          nextVertex[this.#vertexType.TRUE_OUTER],
        )

        indices = indices.concat(
          currVertex[this.#vertexType.TRUE_INNER],
          currVertex[this.#vertexType.INNER_TB],
          nextVertex[this.#vertexType.INNER_TB],
          nextVertex[this.#vertexType.TRUE_INNER],
        )

        indices = indices.concat(
          currVertex[this.#vertexType.TRUE_INNER],
          currVertex[this.#vertexType.INNER_CW],
          nextVertex[this.#vertexType.INNER_CCW],
          nextVertex[this.#vertexType.TRUE_INNER],
        )
      }
    }
    return indices;
  }

  /** Bikin indices untuk rusuk di alas dan atas */
  static #generateSideIndices(nSide, verticesArray){
    let indices = []
    let isPrismBottom = 0;
      // Untuk tiap vertex
    for(let i = 0; i < nSide; i++){
      let currVertex = verticesArray[isPrismBottom][i];
      let nextVertex = verticesArray[this.#remainder(isPrismBottom + 1, 2)][i];

      indices = indices.concat(
        currVertex[this.#vertexType.TRUE_OUTER],
        currVertex[this.#vertexType.INNER_CW],
        nextVertex[this.#vertexType.INNER_CW],
        nextVertex[this.#vertexType.TRUE_OUTER],
      )

      indices = indices.concat(
        currVertex[this.#vertexType.TRUE_OUTER],
        currVertex[this.#vertexType.INNER_CCW],
        nextVertex[this.#vertexType.INNER_CCW],
        nextVertex[this.#vertexType.TRUE_OUTER],
      )

      indices = indices.concat(
        currVertex[this.#vertexType.TRUE_INNER],
        currVertex[this.#vertexType.INNER_CW],
        nextVertex[this.#vertexType.INNER_CW],
        nextVertex[this.#vertexType.TRUE_INNER],
      )

      indices = indices.concat(
        currVertex[this.#vertexType.TRUE_INNER],
        currVertex[this.#vertexType.INNER_CCW],
        nextVertex[this.#vertexType.INNER_CCW],
        nextVertex[this.#vertexType.TRUE_INNER],
      )
    }
    return indices;
  }

  /** Modulo. Karena Javascript modulonya bisa dapet negative */
  static #remainder(a, b){
    return ((a % b) + b) % b;
  }

  /** Operasi terhadap tiap komponen point. */
  static #pointOperator(p1, p2, operator){
    return [...Array(Math.min(p1.length, p2.length)).keys()].map(num => {return operator(p1[num], p2[num])});
  }

  /** Operasi kurang terhadap tiap komponen point. */
  static #pointDifference(p1, p2){
    return this.#pointOperator(p1, p2, (num1, num2) => { return num1 - num2 })
  }

  /** Operasi tambah terhadap tiap komponen point. */
  static #pointAddition(p1, p2){
    return this.#pointOperator(p1, p2, (num1, num2) => { return num1 + num2 })
  }
  //
  // /** Operasi kali terhadap tiap komponen point. */
  // static #pointMultiplication(p1, p2){
  //   return this.#pointOperator(p1, p2, (num1, num2) => { return num1 * num2 })
  // }
  //
  // /** Operasi bagi terhadap tiap komponen point. */
  // static #pointDivision(p1, p2){
  //   return this.#pointOperator(p1, p2, (num1, num2) => { return num1 / num2 })
  // }
  /** Vektor dengan panjang partLength dan arah vector */
  static #partVector(vector, partLength){
    let vL = this.#vectorLength(vector);
    return vector.map(vectorComponent => {
        return vectorComponent / vL * partLength;
      })
  }

  /** Panjang vector */
  static #vectorLength(vector){
    return Math.sqrt(vector.reduce((totalLength, vectorComponent) => {
      return totalLength + vectorComponent * vectorComponent;
    }, 0));
  }
  
}

/** Mengonversi degree ke radian */
function degToRad(degree){
  return degree * (Math.PI / 180);
}
