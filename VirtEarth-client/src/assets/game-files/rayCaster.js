// created following this tutorial: https://github.com/vinibiavatti1/RayCastingTutorial/wiki and partially rewrote to use modules and be more readable

import { clearScreen } from "./modules/helper.js"
import { key, movePlayer } from "./modules/input.js"
import { rayCast, renderBuffer } from "./modules/renderer.js"
import { screen, projection } from "./modules/screenConfig.js";
import { loadTextures } from "./modules/texture.js";

const canvas = document.getElementById("canvas")

const canvasContext = canvas.getContext("2d");
canvasContext.scale(screen.scale, screen.scale);
canvasContext.translate(0.5, 0.5);
canvasContext.imageSmoothingEnabled = false;

export { canvas, canvasContext };
// I have to initialize the canvas in this file for some reason

// Buffer
projection.imageData = canvasContext.createImageData(projection.width, projection.height);
projection.buffer = projection.imageData.data;

// Render buffer

const fps = 60; // refresh rate of the screen
const renderDelay = 1000 / fps;

window.onload = function() {
    loadTextures();
    renderLoop();
}

function renderLoop () {
    setInterval(() => {
        clearScreen();
        movePlayer();
        rayCast();
        renderBuffer();
    }, renderDelay)
}


document.addEventListener("keydown", (event) => {
    let keyCode = event.code;

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
    let keyCode = event.code;

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













