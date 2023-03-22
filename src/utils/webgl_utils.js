// Vertex Shader script
const vertexShaderScript = `
  precision mediump float;

  attribute vec4 a_position;
  attribute vec4 a_color;
  attribute vec3 a_normal;

  uniform mat4 u_normal;
  uniform mat4 u_world;
  uniform mat4 u_modelview;
  uniform mat4 u_projection;

  varying lowp vec4 vColor;
  varying highp vec3 vLighting;
  uniform highp vec3 vDirectional;

  void main(void) {
    gl_Position = u_projection * u_modelview * u_world * a_position;
    vColor = a_color;

    highp vec4 transformedNormal = u_normal * vec4(a_normal, 1.0);    
    highp float directional = max(dot(transformedNormal.xyz, vdirectional), 0.0);

    highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    highp vec3 directionalLightColor = vec3(1, 1, 1);

    vLighting = ambientLight + (directionalLightColor * directional);
  }`;

// Fragment Shader script with shading
const fragmentShaderwithShadingScript = `
  precision mediump float;

  varying lowp vec4 vColor;
  varying highp vec3 vLighting;

  void main(void) {
    gl_FragColor = vec4(vColor.rgb * vLighting, vColor.a);
  }`;

// Fragment Shader script without shading
const fragmentShaderwithoutShadingScript = `
  precision mediump float;
  varying lowp vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }`;



// set gl on canvas
function getWebGLContext(canvas) {
  const gl = canvas.getContext("webgl");
  if (!gl) alert("WebGL isn't available on current browser.");

  return gl;
}

// init buffer
function initBuffer(gl, type, data) {
  const buffer = gl.createBuffer();

  gl.bindBuffer(type, buffer);
  gl.bufferData(type, data, gl.STATIC_DRAW);
  gl.bindBuffer(type, null);

  return buffer;
}

// create shader
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return -1;
  }

  return shader;
}

// create program
function createProgram(gl, isShading) {
  // set up vertex shader
  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderScript);

  // set up fragment shader
  var fragmentShader;
  if (isShading) {    // if user checked the shading checkbox
    fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderwithShadingScript);
  } else {
    fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderwithoutShadingScript);
  }

  // create program
  const program = gl.createProgram();

  // attach shader to program
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const msg = "Shader program failed to link.\nError log :" + gl.getProgramInfoLog(program);
    alert(msg);
    return -1;
  }

  return program;
}

export {getWebGLContext, createProgram};