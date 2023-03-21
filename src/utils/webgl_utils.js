/**
 * Vertex Shader dihitung per vertex
 */
const vertexShader = `
// Variabel attribute diambil dari buffer
attribute vec3 vertex_position;
attribute vec3 vertex_color;

// Variable uniform artinya sama untuk seluruh vertex
// Matriks proyeksi
uniform mat4 matrix_projection;

// Variabel biasa, nanti dimasukin ke fragment shader
varying vec4 f_color;

void main(){
  // Nanti dikalikan aja dengan matrix-matrix transformasinya
  gl_Position = vec4(vertex_position, 1.0);
  f_color = vec4(vertex_color, 1.0);
}`;

/**
 * Fragment Shader dihitung per pixel
 */
const fragmentShader = `
// Presisi medium
precision mediump float;
// Dapat dari vertex shader
varying vec4 f_color;

void main(){
  gl_FragColor = f_color;
}`;

/** Ambil context WebGL
 * @param canvas - HTML Canvas element
 * @returns context WebGL
 */
export function getWebGLContext(canvas) {
  const gl = canvas.getContext("webgl");

  if (!gl) {
    alert("WebGL isn't available");
  }

  return gl;
}

/** Setup WebGL
 * @param gl - WebGL Context
 * @param vertex - Vertex array containing model vertices
 * @returns WebGL program yang memiliki shaders
 */
export function setupWebGL(gl, vertex, color) {
  const program = initShaders(gl, vertexShader, fragmentShader);

  // Karena objeknya konstan, kita bisa ngisi buffernya langsung dengan vertex
  // Semua perhitungan nanti akan dilakukan di vertex shader bersamaan dengan
  // matriks-matriks lain.
  const vertexBuffer = initBuffer(
    gl,
    gl.ARRAY_BUFFER,
    new Float32Array(vertex),
  );
  const colorBuffer = initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(color));

  enableAttribArray(gl, program, "vertex_position", 3, vertexBuffer);
  enableAttribArray(gl, program, "vertex_color", 3, colorBuffer);

  return program;
}

/** Bikin dan bind buffer
  * @param gl - WebGL Context
  * @param type - Tipe array. Contoh: gl.ARRAY_BUFFER
  * @param data - Float32Array yang berisi data yang akan dimasukkan ke buffer
  */
function initBuffer(gl, type, data) {
  const buffer = gl.createBuffer();

  gl.bindBuffer(type, buffer);
  gl.bufferData(type, data, gl.STATIC_DRAW);

  return buffer;
}

/** Meng-enable attrib array
  * Pada vertex shader, kan ada variable attribute, nah itu diambil dari buffer.
  * @param gl - WebGL Context
  * @param program - WebGL Program
  * @param attribName - Nama variable attrib yang ada di vertex shader
  * @param attribSize - Ukuran komponen/dimensi dari attribName
  * @param buffer - Dari buffer mana kita ngambil nilai untuk attribName
  */
function enableAttribArray(gl, program, attribName, attribSize, buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const location = gl.getAttribLocation(program, attribName);
  gl.vertexAttribPointer(location, attribSize, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(location);
}

/** 
  * Inisialisasi Shaders
  * @param gl - WebGL Context
  * @param vertexSource - Source code dari Vertex Shader
  * @param fragmentSource - Source code dari Fragment Shader
  */
function initShaders(gl, vertexSource, fragmentSource) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const msg = "Shader program failed to link.  The error log is:" +
      "<pre>" +
      gl.getProgramInfoLog(program) +
      "</pre>";
    alert(msg);
    return -1;
  }

  gl.useProgram(program);
  return program;
}

/**
  * Ngecompile Shader
  * @param gl - WebGL Context
  * @param type - Tipe Shader
  * @param source - Shader source code
  * @example Compile vertex shader
  * ```
  * compileShader(gl, gl.ARRAY_BUFFER, vertesShader);
  * ```
  */
function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader),
    );
    gl.deleteShader(shader);
    return -1;
  }

  return shader;
}
