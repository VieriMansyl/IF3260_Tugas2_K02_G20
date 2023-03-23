// substraction of two points
const minus = (p1, p2) => {
  return [p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2]];
}

// normalize vector 
const normalize = (normal) => {
  const n = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
  return [normal[0] / n, normal[1] / n, normal[2] / n];
}

// get normal vector from u v
const getNormal = (u, v) => {
  // cross product between u and v to get normal
  const normal = [
    u[1] * v[2] - u[2] * v[1], 
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0]
  ];
  
  return normalize(normal);
}

// set normal for model
const setNormalFor = (model) => {
  let normals = []
  for (let i = 0; i < model.length; i+=9){
      u = minus([model[i+3], model[i+4], model[i+5]], [model[i], model[i+1], model[i+2]]);
      v = minus([model[i+6], model[i+7], model[i+8]], [model[i], model[i+1], model[i+2]]);
      normals.push(...getNormal(u, v));
      normals.push(...getNormal(u, v));
      normals.push(...getNormal(u, v));
  }
  return normals
}
