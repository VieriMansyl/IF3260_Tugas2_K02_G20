import { octahedron } from "./assets/models/octahedron.js";
import { pentagonalPrism } from "./assets/models/pentagonalPrism.js"
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
  const model = pentagonalPrism;
  for (let i = 0; i < model.length; i += 3) {
    color.push(1, 1, 1);
  }
  const program = setupWebGL(gl, model, color);
  projectionMatrixLocation = gl.getUniformLocation(
    program,
    "matrix_projection",
  );
  /** Ini cuma contoh
    * Ganti Nanti
    */
  let projectionMatrixExample = new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
  drawModel(gl, model, projectionMatrixExample);
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
  let vertexCount = 4;
  for(let idxPermukaan = 0; idxPermukaan < model.length / vertexCount / 3; idxPermukaan++){
    gl.drawArrays(gl.TRIANGLE_FAN, idxPermukaan * vertexCount, vertexCount);
  }
}

main();
