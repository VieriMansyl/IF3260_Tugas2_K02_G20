<<<<<<< HEAD
import { octahedron, pentagonalPrism } from './assets/models.js';
import { getWebGLContext } from './utils/webgl_utils.js';

// INITIALIZE
const canvas = document.querySelector('#canvas');
const gl = getWebGLContext(canvas);

var model = {
  type,
  vertices,
  vertexCount,
  indices,
  normals,
  info,
};

const main = () => {
  clearCanvas();

  /* initiliaze program
   * by default, shader is set to with shading
   */
  var program = createProgram(gl, vertexShaderScript, (isShading = true));

  // record attribute's location and uniform's location
  var info = {
    program: program,
=======
import { octahedron , pentagonalPrism } from "./assets/models.js"

// INITIALIZE
let canvas = document.querySelector("#canvas");
let gl = getWebGLContext(canvas);

/* model's data :
  @type : "cube" | "pentagonalPrism" | "octahedron"
  @vertices : model's vertices
  @colors : model's colors
  @normals : model's normals
  @programInfo : model's program info
  @bufferInfo : model's buffer info
*/
var model = {
  type: "",
  vertices: [],
  colors: [],
  normals: [],
  programInfo: {},
  bufferInfo: {},
};

// ----------- DUMMY DATA ------------
const normals_mat = [
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
]
const world_mat =[
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
]
const mv_mat =[
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
]
const projection_mat =[
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
]
// -----------------------------------


function setProgram(isShading) {
  var shaderProgram = createProgram(gl, isShading);
  model.programInfo = {
    program: shaderProgram,
>>>>>>> b0c7050796f99abaa7c93bd6c58ee9faeb5e46af
    a_loc: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'a_position'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'a_color'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'a_normal'),
    },
    u_matrix: {
<<<<<<< HEAD
      normalMatrix: gl.getUniformLocation(shaderProgram, 'u_normal'),
      worldMatrix: gl.getUniformLocation(shaderProgram, 'u_world'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'u_modelview'),
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'u_projection'),
      directionalVector: gl.getUniformLocation(shaderProgram, 'vDirectional'),
    },
=======
      normalMatrix: gl.getUniformLocation(shaderProgram, "u_normal"),
      worldMatrix: gl.getUniformLocation(shaderProgram, "u_world"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "u_modelview"),
      projectionMatrix: gl.getUniformLocation(shaderProgram, "u_projection"),
      directionalVector: gl.getUniformLocation(shaderProgram, "vdirectional"),
    }
>>>>>>> b0c7050796f99abaa7c93bd6c58ee9faeb5e46af
  };
}

<<<<<<< HEAD
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
};

function drawModel(gl, model, projectionMatrix) {}
=======
function setModel(type) {
  model.vertices = [];
  if (type === "cube") {
    model.type = "cube";
    // model.vertices = cube.vertices;
  } else if (type === "prism") {
    model.type = "prism";
    model.vertices = pentagonalPrism.vertices;
  } else if (type === "octa") {
    model.type = "octahedron";
    model.vertices = octahedron;
  }
  setModelColor();
  model.normals = setNormalFor(model.vertices);
  setBufferInfo();
}

function setModelColor() {
  const pickedColor = getColor();
  const arr_colors = [];
  for (let i = 0; i < model.vertices.length / 3; i++) {
    arr_colors.push(...pickedColor);
  }
  model.colors = arr_colors;
}

function setBufferInfo() {
  model.bufferInfo = {
    positionBuffer : initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(model.vertices)),
    colorBuffer : initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(model.colors)),
    normalBuffer : initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(model.normals))
  }
}

const main = () => {  
  // initiliaze program info
  // by default, shader is set to with shading
  setProgram(true);

  // set model shown by default
  setModel("octa");

  // --------------- MAIN LOOP ---------------
  eventHandler();
  window.requestAnimationFrame(render);
  // -----------------------------------------
}


function render() {
  // clear canvas
  clearCanvas();
  {
    // set model's position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, model.bufferInfo.positionBuffer);
    gl.vertexAttribPointer(model.programInfo.a_loc.vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(model.programInfo.a_loc.vertexPosition);
  
    // set model's color buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, model.bufferInfo.colorBuffer);
    gl.vertexAttribPointer(model.programInfo.a_loc.vertexColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(model.programInfo.a_loc.vertexColor);
  
    // set model's normal buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, model.bufferInfo.normalBuffer);
    gl.vertexAttribPointer(model.programInfo.a_loc.vertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(model.programInfo.a_loc.vertexNormal);
  }

  // use program
  gl.useProgram(model.programInfo.program);

  {
    // Set uniforms
    gl.uniformMatrix4fv(model.programInfo.u_matrix.normalMatrix, false, normals_mat);
    gl.uniformMatrix4fv(model.programInfo.u_matrix.worldMatrix, false, world_mat);
    gl.uniformMatrix4fv(model.programInfo.u_matrix.modelViewMatrix, false, mv_mat);
    gl.uniformMatrix4fv(model.programInfo.u_matrix.projectionMatrix, false, projection_mat);
    
    // set light direction
    gl.uniform3fv(
      model.programInfo.u_matrix.directionalVector, [1, 1, 1]);
  }

  // draw
  const vertexCount = model.vertices.length / 3;
  gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
}
>>>>>>> b0c7050796f99abaa7c93bd6c58ee9faeb5e46af

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

  // resize canvas to match screen size
  resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, canvas.width, canvas.height);

  gl.clearColor(0.231, 0.231, 0.231, 1);  // clear to canvas default color (#3b3b3b)
  gl.clearDepth(1);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function eventHandler() {
  // Shading checkbox
  const shadingbox = document.querySelector("#shading");
  shadingbox.addEventListener("change", () => {
    model.shading = !model.shading;
    window.requestAnimationFrame(render);
  });

  // color picker
  const colorpicker = document.querySelector("#color-picker");
  colorpicker.addEventListener("change", () => {
    setModelColor();
    window.requestAnimationFrame(render);
  });

  // help button
  const helpbtn = document.querySelector("#help");
  helpbtn.addEventListener("click", () => {
    document.querySelector("#help-container").style.display = "inline";
  });
  
  const closebtn = document.querySelector("#close");
  closebtn.addEventListener("click", () => {
    document.querySelector("#help-container").style.display = "none";
  });
  
}

window.onload = main;
