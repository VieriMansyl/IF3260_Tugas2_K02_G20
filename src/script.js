import { cube, pentagonalPrism, octahedron } from './assets/models.js';

const shadingbox = document.querySelector('#shading');
const colorpicker = document.querySelector('#color-picker');
const resetbtn = document.querySelector('#reset');
const helpbtn = document.querySelector('#help');
const closebtn = document.querySelector('#close');
const rotateX = document.querySelector('#rotation-x');
const rotateY = document.querySelector('#rotation-y');
const rotateZ = document.querySelector('#rotation-z');
const scale = document.querySelector('#scaling');
const translateX = document.querySelector('#translation-x');
const translateY = document.querySelector('#translation-y');
const translateZ = document.querySelector('#translation-z');
const cameraRotate = document.querySelector('#camera-rotate');
const cameraView = document.querySelector('#camera-view');
const hollowObjectPicker = document.querySelector('#hollow-object');

// INITIALIZE
let canvas = document.querySelector('#canvas');
let gl = getWebGLContext(canvas);

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

function setProjection(type) {
  if (type === 'orthographic') {
    projection_mat = setOrthographicProjection();
  } else if (type === 'oblique') {
  } else if (type === 'perspective') {
    projection_mat = setPerspectiveProjection(canvas);
  }
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
}

const main = () => {
  // initiliaze program info
  // by default, shader is set to with shading
  setProgram(true);

  // set model shown by default
  setModel('octahedron');

  // set projection shown by default
  setProjection('orthographic');

  // --------------- MAIN LOOP ---------------
  eventHandler();
  render();
  // -----------------------------------------
};

function render() {
  // clear canvas
  clearCanvas();

  // animation
  if (model.animate && model.timeoutIdle) {
    const deltaX = 0.1;
    const deltaY = 0.1;
    const deltaZ = 0.1;

    setRotationSlider(
      remainder(Number(rotateX.value) + 180, 360) - 180 + deltaX,
      remainder(Number(rotateY.value) + 180, 360) - 180 + deltaY,
      remainder(Number(rotateZ.value) + 180, 360) - 180 + deltaZ
    );
    rotate_mat = setModelRotation(rotateX.value, rotateY.value, rotateZ.value);
  }

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

  // DRAW MODEL
  drawModel(gl, model.vertices);

  window.requestAnimationFrame(render);
}

function drawModel(gl, model) {
  // Setiap permukaan menggunakan sebanyak vertexCount titik
  let vertexCount = 3;
  // Ini menggambar setiap permukaan.
  for (
    let idxPermukaan = 0;
    idxPermukaan < model.length / vertexCount / 3;
    idxPermukaan++
  ) {
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

function reset() {
  model.animate = false;
  document.querySelector('#animation').checked = false;

  // reset rotation slider
  rotate_mat = setModelRotation(0, 0, 0);
  setRotationSlider(0, 0, 0);

  // reset translation slider
  translate_mat = setModelTranslation(0, 0, 0);
  setTranslationSlider(0, 0, 0);

  // reset scale slider
  scale_mat = setModelScaling(0.5);
  setScaleSlider(0.5);

  // reset camera rotate
  document.querySelector('#camera-rotate').value = 0;
  // TODO : reset camera matrix

  // reset camera view
  document.querySelector('#camera-view').value = 0.5;
  // TODO : reset camera matrix

  render();
}

function setRotationSlider(x, y, z) {
  const rotate_x_slider = document.querySelector('#rotation-x');
  const rotate_y_slider = document.querySelector('#rotation-y');
  const rotate_z_slider = document.querySelector('#rotation-z');
  rotate_x_slider.value = x;
  rotate_y_slider.value = y;
  rotate_z_slider.value = z;
}

function setTranslationSlider(x, y, z) {
  const translate_x_slider = document.querySelector('#translation-x');
  const translate_y_slider = document.querySelector('#translation-y');
  const translate_z_slider = document.querySelector('#translation-z');
  translate_x_slider.value = x;
  translate_y_slider.value = y;
  translate_z_slider.value = z;
}

function setScaleSlider(s) {
  const scale_slider = document.querySelector('#scaling');
  scale_slider.value = s;
}

function eventHandler() {
  // Shading checkbox
  shadingbox.addEventListener('change', () => {
    setProgram(shadingbox.checked);
  });

  // color picker
  colorpicker.addEventListener('change', () => {
    setModelColor();
  });

  // reset button
  resetbtn.addEventListener('click', () => {
    reset();
  });

  // help button
  helpbtn.addEventListener('click', () => {
    document.querySelector('#help-container').style.display = 'inline';
  });

  closebtn.addEventListener('click', () => {
    document.querySelector('#help-container').style.display = 'none';
  });

  // ---- TRANSFORMATION ----
  // rotation
  rotateX.addEventListener('input', () => {
    rotate_mat = setModelRotation(rotateX.value, rotateY.value, rotateZ.value);
  });

  rotateY.addEventListener('input', () => {
    rotate_mat = setModelRotation(rotateX.value, rotateY.value, rotateZ.value);
  });

  rotateZ.addEventListener('input', () => {
    rotate_mat = setModelRotation(rotateX.value, rotateY.value, rotateZ.value);
  });

  // scaling
  scale.addEventListener('input', () => {
    scale_mat = setModelScaling(scale.value);
  });

  // translation
  translateX.addEventListener('input', () => {
    translate_mat = setModelTranslation(
      translateX.value,
      translateY.value,
      translateZ.value
    );
  });

  translateY.addEventListener('input', () => {
    translate_mat = setModelTranslation(
      translateX.value,
      translateY.value,
      translateZ.value
    );
  });

  translateZ.addEventListener('input', () => {
    translate_mat = setModelTranslation(
      translateX.value,
      translateY.value,
      translateZ.value
    );
  });

  // ---- CAMERA ----
  // camera rotate
  cameraRotate.addEventListener('input', () => {
    camera_mat = rotateCamera(cameraRotate.value, 200);
    console.log('cam', camera_mat);
    projection_mat = mult4(projection_mat, camera_mat);
    console.log('proj', projection_mat);
    // TODO
  });
  // camera view/ zoom in out
  cameraView.addEventListener('input', () => {
    // TODO
  });

  // model picker
  hollowObjectPicker.addEventListener('click', (e) => {
    if (contains(hollowObjectPicker, e.target)) {
      setModel(e.target.alt);
      console.log(e.target.alt);
    }
  });

  // animation box
  const animateBox = document.querySelector('#animation');
  animateBox.addEventListener('change', () => {
    model.animate = animateBox.checked;
  });

  // projection picker
  const projectionPicker = document.querySelector('#projection');
  projectionPicker.addEventListener(
    'change',
    () => {
      let projection = projectionPicker.value;
      setProjection(projection);
      window.requestAnimationFrame(render);
    },
    false
  );

  function callbackBodyTimer() {
    model.timeoutIdle = false;
    var timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      model.timeoutIdle = true;
    }, 0.5 * 1000);
  }
  document.body.addEventListener('mouseup', callbackBodyTimer, false);

  document.body.addEventListener(
    'mousedown',
    () => {
      model.timeoutIdle = false;
    },
    false
  );
}

function contains(parent, child) {
  return parent !== child && parent.contains(child);
}

window.onload = main;
