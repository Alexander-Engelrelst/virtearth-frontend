
const player = {
  fov: 72, // any higher, and you get a fisheye lens effect at the edges of the screen
  x: 1.5,
  y: 1.5,
  angle: 0,
  radius: 5, // allows for smoother collision detection (sliding sideways when walking into a wall)
  moveSpeed: 0.1,
  turnSpeed: 4.5,
  movingEnabled: true,
};

export { player };
