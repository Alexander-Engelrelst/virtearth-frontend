const player = {
  fov: 72, // any higher, and you get a fisheye lens effect at the edges of the screen
  halfFov: null,
  x: 2,
  y: 2,
  angle: 90,
  radius: 5, // allows for smoother collision detection (sliding sideways when walking into a wall)
  moveSpeed: 0.1,
  turnSpeed: 2.5,
};

player.halfFov = player.fov / 2;

export { player };
