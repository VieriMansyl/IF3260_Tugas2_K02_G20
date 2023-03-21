import { octahedron } from "./assets/models/octahedron.js";
import { getWebGLContext, setupWebGL } from "./utils/webgl_utils.js";

const canvas = document.querySelector("#canvas");
const gl = getWebGLContext(canvas);
// const gl = canvas.getContext("webgl");

// help handler
const helpbtn = document.querySelector("#help");
helpbtn.addEventListener("click", () => {
  document.querySelector("#help-container").style.display = "inline";
});

const closebtn = document.querySelector("#close");
closebtn.addEventListener("click", () => {
  document.querySelector("#help-container").style.display = "none";
});

/** 
 * Lokasi projection matrix di vertex shader
 * Di bikin global supaya bisa diakses main dan drawModel
 */
let projectionMatrixLocation;

function main() {
  /** 
   * Placeholder untuk warna 
   */
  const color = [];
  for (let i = 0; i < octahedron.length; i += 3) {
    color.push(1, 1, 1);
  }
  const program = setupWebGL(gl, octahedron, color);
  projectionMatrixLocation = gl.getUniformLocation(
    program,
    "matrix_projection",
  );
  /** Ini cuma contoh
    * Ganti Nanti
    */
  let projectionMatrixExample = new Float32Array([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ]);
  drawModel(gl, octahedron, projectionMatrixExample);
}

/** Ngegambar satu model. 
  * Masih belum selesai, perlu penyesuaian.
  * @param gl - WebGL Context
  * @param model - Array yang hanya berisi vertex model
  * @param projectionMatrix - Matrix proyeksi
  * @returns None
  * @beta
  */
function drawModel(gl, model, projectionMatrix) {
  gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
  for(let i = 0; i < model.length; i += 3){
    // Satu vertex itu tiga elemen
    // Ini ngambil 3 vertex
    // Jadi ngambil 9 elemen
    // Dan didisplay dengan cara Triangle Fan
    // Perlu disesuaikan dengan cara kita bikin model
    gl.drawArrays(gl.TRIANGLE_FAN, i, 3);
  }
}

main();
