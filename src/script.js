import { octahedron } from './assets/models/octahedron.js';
import { cube } from './assets/models/cube.js';
import { getWebGLContext, setupWebGL } from './utils/webgl_utils.js';

/* ================= HTML Elements ================= */
const canvas = document.querySelector('#canvas');
const gl = getWebGLContext(canvas);
// const gl = canvas.getContext("webgl");

const helpbtn = document.querySelector('#help');
const closebtn = document.querySelector('#close');

var projection = 'orthographic';

/* ================= HTML Elements ================= */

let setProjection = (proj) => {
  projection = proj;
  console.log('Proj:', projection);
};

// help handler
helpbtn.addEventListener('click', () => {
  document.querySelector('#help-container').style.display = 'inline';
});

closebtn.addEventListener('click', () => {
  document.querySelector('#help-container').style.display = 'none';
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
    'matrix_projection'
  );
  /** Ini cuma contoh
   * Ganti Nanti
   */
  let projectionMatrixExample = new Float32Array([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]);
  drawModel(gl, cube, projectionMatrixExample);
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
  console.log(model);
  for (let i = 0; i < model.length; i += 3) {
    // Satu vertex itu tiga elemen
    // Ini ngambil 3 vertex
    // Jadi ngambil 9 elemen
    // Dan didisplay dengan cara Triangle Fan
    // Perlu disesuaikan dengan cara kita bikin model
    gl.drawArrays(gl.TRIANGLE_FAN, i, 3);
  }
}

main();
