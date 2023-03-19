/**
 * Vertice coordinates to render a hollow cube
 * Because it is hollow, there will be an "Inner" and "Outer" cube
 *
 * Cube defined with the size of 6 and (0,0,0) as origin
 * The thickness of the cube is 1
 *
 * Format: X, Y, Z
 */
const cube_vertices = [
  // -------------<<<< Back Face >>>>-------------
  // ----- Bottom Edge -----
  // Out
  -3, -3, -3,
  // Out
  3, -3, -3,
  // In
  3, -2, -3,
  // In
  -3, -2, -3,

  // ----- Top Edge -----
  // In
  -3, 2, -3,
  // In
  3, 2, -3,
  // Out
  3, 3, -3,
  // Out
  -3, 3, -3,

  // ----- Left Edge -----
  // Out
  -3, -3, -3,
  // In
  -2, -3, -3,
  // In
  -2, 3, -3,
  // Out
  -3, 3, -3,

  // ----- Right Edge -----
  // In
  2, -3, -3,
  // Out
  3, -3, -3,
  // Out
  3, 3, -3,
  // In
  2, 3, -3,

  // -------------<<<< Front Face >>>>-------------
  // ----- Bottom Edge -----
  // Out
  -3, -3, 3,
  // Out
  3, -3, 3,
  // In
  3, -2, 3,
  // In
  -3, -2, 3,

  // ----- Top Edge -----
  // In
  -3, 2, 3,
  // In
  3, 2, 3,
  // Out
  3, 3, 3,
  // Out
  -3, 3, 3,

  // ----- Left Edge -----
  // Out
  -3, -3, 3,
  // In
  -2, -3, 3,
  // In
  -2, 3, 3,
  // Out
  -3, 3, 3,

  // ----- Right Edge -----
  // In
  2, -3, 3,
  // Out
  3, -3, 3,
  // Out
  3, 3, 3,
  // In
  2, 3, 3,

  // -------------<<<< Bottom Face >>>>-------------
  // ----- Left Edge -----
  // Out
  -3, -3, 3,
  // In
  -2, -3, 3,
  // In
  -2, 3, -3,
  // Out
  -3, 3, -3,

  // ----- Right Edge -----
  // In
  2, -3, 3,
  // Out
  3, -3, 3,
  // Out
  3, -3, -3,
  // In
  2, -3, -3,

  // ----- Bottom Edge -----
  // Out
  -3, -3, 3,
  // Out
  3, -3, 3,
  // In
  3, -3, 2,
  // In
  -3, -3, 2,

  // ----- Top Edge -----
  // Out
  -3, -3, -3,
  // Out
  3, -3, -3,
  // In
  3, -3, -2,
  // In
  -3, -3, -2,

  // -------------<<<< Top Face >>>>-------------
  // ----- Left Edge -----
  // Out
  -3, 3, 3,
  // In
  -2, 3, 3,
  // In
  -2, 3, -3,
  // Out
  -3, 3, -3,

  // ----- Right Edge -----
  // In
  2, 3, 3,
  // Out
  3, 3, 3,
  // Out
  3, 3, -3,
  // In
  2, 3, -3,

  // ----- Bottom Edge -----
  // Out
  -3, 3, 3,
  // Out
  3, 3, 3,
  // In
  3, 3, 2,
  // In
  -3, 3, 2,

  // ----- Top Edge -----
  // Out
  -3, 3, -3,
  // Out
  3, 3, -3,
  // In
  3, 3, -2,
  // In
  -3, 3, -2,

  // -------------<<<< Left Face >>>>-------------
  // ----- Left Edge -----
  // Out
  -3, -3, 3,
  // In
  -3, -3, 2,
  // In
  -3, 3, 2,
  // Out
  -3, 3, 3,

  // ----- Right Edge -----
  // Out
  -3, -3, -3,
  // In
  -3, -3, -2,
  // In
  -3, 3, -2,
  // Out
  -3, 3, -3,

  // ----- Bottom Edge -----
  // Out
  -3, -3, 3,
  // Out
  -3, -3, -3,
  // In
  -3, -2, -3,
  // In
  -3, -2, 3,

  // ----- Top Edge -----
  // Out
  -3, 3, 3,
  // In
  -3, 2, 3,
  // In
  -3, 2, -3,
  // Out
  -3, 3, -3,

  // -------------<<<< Right Face >>>>-------------
  // ----- Left Edge -----
  // Out
  3, -3, 3,
  // In
  3, -3, 2,
  // In
  3, 3, 2,
  // Out
  3, 3, 3,

  // ----- Right Edge -----
  // Out
  3, -3, -3,
  // In
  3, -3, -2,
  // In
  3, 3, -2,
  // Out
  3, 3, -3,

  // ----- Bottom Edge -----
  // Out
  3, -3, 3,
  // Out
  3, -3, -3,
  // In
  3, -2, -3,
  // In
  3, -2, 3,

  // ----- Top Edge -----
  // Out
  3, 3, 3,
  // In
  3, 2, 3,
  // In
  3, 2, -3,
  // Out
  3, 3, -3,
];

/**
 * Color of each vertice in the cube
 * Default Color: Cyan (#00FFFF) with RGB: <0,100,100>
 */
const cube_colors = [
  // -------------<<<< Back Face >>>>-------------
  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  // -------------<<<< Front Face >>>>-------------
  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  // -------------<<<< Bottom Face >>>>-------------
  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  // -------------<<<< Top Face >>>>-------------
  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  // -------------<<<< Left Face >>>>-------------
  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  // -------------<<<< Right Face >>>>-------------
  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,

  0, 100, 100, 0, 100, 100, 0, 100, 100, 0, 100, 100,
];