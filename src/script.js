import { octahedron } from "./assets/models/octahedron.js";
import { pentagonalPrism } from "./assets/models/pentagonalPrism.js"
import { getWebGLContext, setupWebGL } from "./utils/webgl_utils.js";

// INITIALIZE
const canvas = document.querySelector("#canvas");
const gl = getWebGLContext(canvas);

var model;


model = {
  jenismodel : "kubus",
  vertices: [],
  index : [],
  normal : [],
  vertexCount : Number.int,
  info : {},
}


const main = () => {
  clearCanvas();
  
  /* initiliaze program
   * by default, shader is set to with shading
   */
  var program = createProgram(gl, vertexShaderScript, isShading=true);

  // record attribute's location and uniform's location
  var info = {
    program: program,
    a_loc: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "a_position"),
      vertexColor: gl.getAttribLocation(shaderProgram, "a_color"),
      vertexNormal: gl.getAttribLocation(shaderProgram, "a_normal"),
    },
    u_matrix: {
      normalMatrix: gl.getUniformLocation(shaderProgram, "u_normal"),
      worldMatrix: gl.getUniformLocation(shaderProgram, "u_world"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "u_modelview"),
      projectionMatrix: gl.getUniformLocation(shaderProgram, "u_projection"),
      directionalVector: gl.getUniformLocation(shaderProgram, "vDirectional"),
    }
  };


  model.info = info;

  // const color = [];
  // const model = pentagonalPrism;
  // for (let i = 0; i < model.length; i += 3) {
  //   color.push(1, 1, 1);
  // }
  // const program = setupWebGL(gl, model, color);
  // projectionMatrixLocation = gl.getUniformLocation(
  //   program,
  //   "matrix_projection",
  // );
  // /** Ini cuma contoh
  //   * Ganti Nanti
  //   */
  // let projectionMatrixExample = new Float32Array([
  //   1, 0, 0, 0,
  //   0, 1, 0, 0,
  //   0, 0, 1, 0,
  //   0, 0, 0, 1
  // ]);
  // drawModel(gl, model, projectionMatrixExample);
}


function drawModel(gl, model, projectionMatrix) {

}

// clear canvas as well ass resize canvas to match screen size
function clearCanvas() {
  function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width = (canvas.clientWidth * multiplier) | 0;
    const height = (canvas.clientHeight * multiplier) | 0;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
    return false;
  }

  resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
  // let vertexCount = 4;
  // for(let idxPermukaan = 0; idxPermukaan < model.length / vertexCount / 3; idxPermukaan++){
  //   gl.drawArrays(gl.TRIANGLE_FAN, idxPermukaan * vertexCount, vertexCount);
  // }
}

// // help handler
// const helpbtn = document.querySelector("#help");
// helpbtn.addEventListener("click", () => {
//   document.querySelector("#help-container").style.display = "inline";
// });

// const closebtn = document.querySelector("#close");
// closebtn.addEventListener("click", () => {
//   document.querySelector("#help-container").style.display = "none";
// });

// const shadingbox = document.querySelector("#shading");
// shadingbox.addEventListener("change", () => {
//   if (shadingbox.checked) {
//     shading = true;
//   } else {
//     shading = false;
//   }
// });

window.onload = main;
