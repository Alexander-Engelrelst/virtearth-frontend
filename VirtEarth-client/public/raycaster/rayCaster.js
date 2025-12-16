// created following this tutorial: https://github.com/vinibiavatti1/RayCastingTutorial/wiki and partially rewrote to use modules and be more readable

import { sendHeartBeat } from "./api/api.js";
import { fpsCount, drawFps } from "./modules/fpsCounter.js";
import { clearScreen, fixCoord } from "./modules/helper.js";
import { key, movePlayer } from "./modules/input.js";
import { player } from "./modules/player.js"
import { rayCast, renderBuffer } from "./modules/renderer.js";
import { screen, projection } from "./modules/screenConfig.js";
import { checkSpriteCollision, drawSprites, loadSprites, disableSprites, sprites} from "./modules/sprites.js";
import { loadTextures, textures } from "./modules/texture.js";

const GAME_OBJECT = JSON.parse(sessionStorage.getItem("gameObject"));
const GAME_ID = sessionStorage.getItem("gameId");
let map = GAME_OBJECT.maze;

player.x = fixCoord(GAME_OBJECT.spawnLocation.y); // server works as arr[x][y], client works as arr[y][x]
player.y = fixCoord(GAME_OBJECT.spawnLocation.x);

const FPS = 60; // refresh rate of the screen
const RENDER_DELAY = 1000 / FPS;

const canvas = document.createElement('canvas');
canvas.width = screen.width;
canvas.height = screen.height;
canvas.style.margin = "auto";
document.body.appendChild(canvas);

const canvasContext = canvas.getContext("2d");
canvasContext.scale(screen.scale, screen.scale);
canvasContext.translate(0.5, 0.5);
canvasContext.imageSmoothingEnabled = false;

projection.imageData = canvasContext.createImageData(projection.width, projection.height);
projection.buffer = projection.imageData.data;

window.onload = function () {
  sendHeartBeat(GAME_ID); // doesn't need a .then
  loadArtifactSprites();
  loadTextures();
  loadSprites();
  renderLoop();
}

let loopCount = 0;

function renderLoop() {
  setInterval(() => {
    clearScreen();
    disableSprites()
    movePlayer();
    rayCast();
    drawSprites();
    renderBuffer();
    fpsCount();
    drawFps();
    loopCount++;
    if (loopCount % 10 === 0) checkSpriteCollision();
  }, RENDER_DELAY);
}

function checkWinCondition(collisionIndex) {
  if (textures[collisionIndex].id === "exitTexture") { // player touches exit
    window.location.replace("/win.html"); // TODO: update win screen
  }
}

function loadArtifactSprites() {
  for (const sprite of sprites) {
    for (const artifact of GAME_OBJECT.artifacts) {
      if (sprite.id === artifact.name) {
        sprite.x = fixCoord(artifact.y); // server works as arr[x][y], client works as arr[y][x]
        sprite.y = fixCoord(artifact.x);
        sprite.description = artifact.description;
        sprite.uuid = artifact.id;
      }
    }
  }
}

function replaceMapReference(newMap) {
  map = newMap;
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
});

document.addEventListener("keyup", (event) => {
  // turn off movement if key is lifted
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
});

export { GAME_OBJECT, GAME_ID, map, canvasContext, checkWinCondition, replaceMapReference };
