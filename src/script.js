import { cube, pentagonalPrism, octahedron } from './assets/models.js';

// INITIALIZE
let canvas = document.querySelector('#canvas');
let gl = getWebGLContext(canvas);

/* model's data :
  @param type : "cube" | "pentagonalPrism" | "octahedron"
  @param vertices : model's vertices
  @param colors : model's colors
  @param normals : model's normals
  @param programInfo : model's program info
  @param bufferInfo : model's buffer info
*/
var model = {
  type: '',
  vertices: [],
  colors: [],
  normals: [],
  programInfo: {},
  bufferInfo: {},
};

// -----------------------------------
let normals_mat = [
  1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
  0.0,
];
let world_mat = [
  1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
  1.0,
];
let mv_mat = [
  1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
  1.0,
];
let projection_mat = [
  1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
  1.0,
];

let translate_mat = [
  1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
  1.0,
];

let rotate_mat = [
  1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
  1.0,
];

let scale_mat = [
  1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
  1.0,
];
// -----------------------------------

function setProgram(isShading) {
  var shaderProgram = createProgram(gl, isShading);
  model.programInfo = {
    program: shaderProgram,
    a_loc: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'a_position'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'a_color'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'a_normal'),
    },
    u_matrix: {
      normalMatrix: gl.getUniformLocation(shaderProgram, 'u_normal'),
      worldMatrix: gl.getUniformLocation(shaderProgram, 'u_world'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'u_modelview'),
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'u_projection'),
      directionalVector: gl.getUniformLocation(shaderProgram, 'vdirectional'),
    },
  };
}

function setModel(type) {
  model.vertices = [];
  if (type === 'cube') {
    model.type = 'cube';
    model.vertices = cube;
  } else if (type === 'prism') {
    model.type = 'prism';
    model.vertices = pentagonalPrism;
  } else if (type === 'octahedron') {
    model.type = 'octahedron';
    model.vertices = octahedron;
  }
  setModelColor();
  model.normals = setNormalFor(model.vertices);
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
    positionBuffer: initBuffer(
      gl,
      gl.ARRAY_BUFFER,
      new Float32Array(model.vertices)
    ),
    colorBuffer: initBuffer(
      gl,
      gl.ARRAY_BUFFER,
      new Float32Array(model.colors)
    ),
    normalBuffer: initBuffer(
      gl,
      gl.ARRAY_BUFFER,
      new Float32Array(model.normals)
    ),
  };
}

function setModelViewMatrix() {
  mv_mat = multiMatrix4Multiplication(translate_mat, scale_mat, rotate_mat);
  console.log(mv_mat);
}

const main = () => {
  // initiliaze program info
  // by default, shader is set to with shading
  setProgram(true);

  // set model shown by default
  setModel('octahedron');

  // --------------- MAIN LOOP ---------------
  eventHandler();
  window.requestAnimationFrame(render);
  // -----------------------------------------
};

function render() {
  // clear canvas
  clearCanvas();

  // set modelview matrix
  setModelViewMatrix();

  // set model's buffer
  setBufferInfo();

  {
    // set model's position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, model.bufferInfo.positionBuffer);
    gl.vertexAttribPointer(
      model.programInfo.a_loc.vertexPosition,
      3,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(model.programInfo.a_loc.vertexPosition);

    // set model's color buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, model.bufferInfo.colorBuffer);
    gl.vertexAttribPointer(
      model.programInfo.a_loc.vertexColor,
      4,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(model.programInfo.a_loc.vertexColor);

    // set model's normal buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, model.bufferInfo.normalBuffer);
    gl.vertexAttribPointer(
      model.programInfo.a_loc.vertexNormal,
      3,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(model.programInfo.a_loc.vertexNormal);
  }

  // use program
  gl.useProgram(model.programInfo.program);

  {
    // Set uniforms
    gl.uniformMatrix4fv(
      model.programInfo.u_matrix.normalMatrix,
      false,
      normals_mat
    );
    gl.uniformMatrix4fv(
      model.programInfo.u_matrix.worldMatrix,
      false,
      world_mat
    );
    gl.uniformMatrix4fv(
      model.programInfo.u_matrix.modelViewMatrix,
      false,
      mv_mat
    );
    gl.uniformMatrix4fv(
      model.programInfo.u_matrix.projectionMatrix,
      false,
      projection_mat
    );

    // set light direction
    gl.uniform3fv(model.programInfo.u_matrix.directionalVector, [1, 1, 1]);
  }

  drawModel(gl, model.vertices);
}

/** Ngegambar model.
 * Sebelum itu, perlu diketahui:
 *  - Berapa banyak titik? Ini dari length / 3
 *  - Berapa banyak permukaan? Kita ngegambarnya pakai segitiga, jadinya sekali ngegambar kita menggunakan
 *    3 titik (inilah variable vertexCount). Total permukaan adalah length / 3.
 * @param gl - WebGL Context
 * @param model - array yang isinya HANYA vertex model. Array ini HARUS 1D.
 */
function drawModel(gl, model) {
  // Setiap permukaan menggunakan sebanyak vertexCount titik
  let vertexCount = 3;
  // Ini menggambar setiap permukaan.
  // Oleh karena itu, digambar sampai model.length / 3 / vertexCount
  for (
    let idxPermukaan = 0;
    idxPermukaan < model.length / vertexCount / 3;
    idxPermukaan++
  ) {
    // Menggambar satu segitiga
    gl.drawArrays(gl.TRIANGLE_FAN, idxPermukaan * vertexCount, vertexCount);
  }
}

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

  gl.clearColor(0, 0, 0, 1); // clear to canvas default color (#3b3b3b)
  gl.clearDepth(1);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function resetCanvas() {
  // reset rotation slider
  mv_mat = setModelRotation(0, 0, 0);
  const rotate_x_slider = document.querySelector('#rotation-x');
  const rotate_y_slider = document.querySelector('#rotation-y');
  const rotate_z_slider = document.querySelector('#rotation-z');
  rotate_x_slider.value = 0;
  rotate_y_slider.value = 0;
  rotate_z_slider.value = 0;

  window.requestAnimationFrame(render);
}

function eventHandler() {
  // Shading checkbox
  const shadingbox = document.querySelector('#shading');
  shadingbox.addEventListener('change', () => {
    setProgram(shadingbox.checked);
    window.requestAnimationFrame(render);
  });

  // color picker
  const colorpicker = document.querySelector('#color-picker');
  colorpicker.addEventListener('change', () => {
    setModelColor();
    window.requestAnimationFrame(render);
  });

  // reset button
  const resetbtn = document.querySelector('#reset');
  resetbtn.addEventListener('click', () => {
    resetCanvas();
    window.requestAnimationFrame(render);
  });

  // help button
  const helpbtn = document.querySelector('#help');
  helpbtn.addEventListener('click', () => {
    document.querySelector('#help-container').style.display = 'inline';
  });

  const closebtn = document.querySelector('#close');
  closebtn.addEventListener('click', () => {
    document.querySelector('#help-container').style.display = 'none';
  });

  // ---- TRANSFORMATION ----
  // rotation
  const rotateX = document.querySelector('#rotation-x');
  const rotateY = document.querySelector('#rotation-y');
  const rotateZ = document.querySelector('#rotation-z');
  rotateX.addEventListener('input', () => {
    rotate_mat = setModelRotation(rotateX.value, rotateY.value, rotateZ.value);
    window.requestAnimationFrame(render);
  });

  rotateY.addEventListener('input', () => {
    rotate_mat = setModelRotation(rotateX.value, rotateY.value, rotateZ.value);
    window.requestAnimationFrame(render);
  });

  rotateZ.addEventListener('input', () => {
    rotate_mat = setModelRotation(rotateX.value, rotateY.value, rotateZ.value);
    window.requestAnimationFrame(render);
  });

  // scaling
  const scale = document.querySelector('#scaling');
  scale.addEventListener('input', () => {
    scale_mat = setModelScaling(scale.value);
    window.requestAnimationFrame(render);
  });

  // translation
  const translateX = document.querySelector('#translation-x');
  const translateY = document.querySelector('#translation-y');
  const translateZ = document.querySelector('#translation-z');

  translateX.addEventListener('input', () => {
    translate_mat = setModelTranslation(
      translateX.value,
      translateY.value,
      translateZ.value
    );
    window.requestAnimationFrame(render);
  });

  translateY.addEventListener('input', () => {
    translate_mat = setModelTranslation(
      translateX.value,
      translateY.value,
      translateZ.value
    );
    window.requestAnimationFrame(render);
  });

  translateZ.addEventListener('input', () => {
    translate_mat = setModelTranslation(
      translateX.value,
      translateY.value,
      translateZ.value
    );
    window.requestAnimationFrame(render);
  });

  // model picker
  const hollowObjectPicker = document.querySelector('#hollow-object');
  hollowObjectPicker.addEventListener('click', (e) => {
    if (contains(hollowObjectPicker, e.target)) {
      setModel(e.target.alt);
      console.log(e.target.alt);
    }
    window.requestAnimationFrame(render);
  });
}

function contains(parent, child) {
  return parent !== child && parent.contains(child);
}

window.onload = main;
