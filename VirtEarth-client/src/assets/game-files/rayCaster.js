// created following this tutorial: https://github.com/vinibiavatti1/RayCastingTutorial/wiki and partially rewrote to use modules and be more readable

import { clearScreen } from "./modules/helper.js"
import { key, movePlayer } from "./modules/input.js"
import { rayCast, renderBuffer } from "./modules/renderer.js"
import { screen, projection } from "./modules/screenConfig.js";

let canvas = null;
let canvasContext = null;

function initCanvas (vueCanvas) {
    canvas = vueCanvas;
    canvasContext = canvas.getContext("2d");
    canvasContext.scale(screen.scale, screen.scale);
    canvasContext.translate(0.5, 0.5);
    canvasContext.imageSmoothingEnabled = false;

    projection.imageData = canvasContext.createImageData(projection.width, projection.height);
    projection.buffer = projection.imageData.data;
}

export { canvas, canvasContext };
// I have to initialize the canvas in this file for some reason

const fps = 60; // refresh rate of the screen
const renderDelay = 1000 / fps;

function loadGame() {
    renderLoop();
}

function renderLoop () {
    setInterval(() => {
        clearScreen();
        movePlayer();
        rayCast();
        renderBuffer();
        fpsCount();
        drawFps();
    }, renderDelay)
}

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

document.addEventListener("keydown", (event) => {
    const keyCode = event.code;

    if (keyCode === key.up.code) {
        key.up.active = true;
    }

    if (keyCode === key.down.code) {
        key.down.active = true;
    }

    if (keyCode === key.left.code) {
        key.left.active = true;
    }

    if (keyCode === key.right.code) {
        key.right.active = true;
    }
})

document.addEventListener("keyup", (event) => { // turn off movement if key is lifted
    const keyCode = event.code;

    if (keyCode === key.up.code) {
        key.up.active = false;
    }

    if (keyCode === key.down.code) {
        key.down.active = false;
    }

    if (keyCode === key.left.code) {
        key.left.active = false;
    }

    if (keyCode === key.right.code) {
        key.right.active = false;
    }
})

export { loadGame, initCanvas }