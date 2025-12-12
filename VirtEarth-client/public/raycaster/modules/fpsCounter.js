import { canvasContext } from "../rayCaster.js";

let lastTime = performance.now();
let fpsCounter = 0;
let frameCount = 0;
let fpsTimer = 0;

function fpsCount() {
  const now = performance.now();
  const delta = now - lastTime;
  lastTime = now;
  frameCount++;
  fpsTimer += delta;
  if (fpsTimer >= 1000) {
    fpsCounter = frameCount;
    frameCount = 0;
    fpsTimer = 0;
  }
}

function drawFps() {
  canvasContext.fillStyle = "white";
  canvasContext.font = "16px monospace";
  canvasContext.fillText(`FPS: ${fpsCounter}`, 10, 20);
}

export { fpsCount, drawFps };
