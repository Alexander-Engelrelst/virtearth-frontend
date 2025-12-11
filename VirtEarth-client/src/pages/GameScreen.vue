<script setup>
import { onMounted, ref } from "vue";
import { screen } from "../assets/game-files/modules/screenConfig.js";
import { loadGame, initCanvas } from "../assets/game-files/rayCaster.js";
import { Color } from "../assets/game-files/modules/renderer.js";
import {
  textures,
  floorTextures,
  loadWallTextureData,
  loadFloorTextureData,
} from "../assets/game-files/modules/texture.js";

const gameCanvas = ref(null);
const wallCanvas = ref(null);
const floorCanvas = ref(null);

const wallImage = ref(null);
const floorImage = ref(null);

function configureScreen() {
  gameCanvas.value.width = screen.width;
  gameCanvas.value.height = screen.height;
}

function loadTextures() {
  loadWallTextureData(getWallTextureData());
  loadFloorTextureData(getFloorTextureData());
}

function waitForImageLoading() {
  const images = Array.from(document.querySelectorAll("img"));
  const promises = images.map(
    (img) =>
      new Promise((resolve, reject) => {
        if (img.complete && img.naturalWidth !== 0) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load image: ${img.src}`));
        }
      })
  );
  return Promise.all(promises);
}

function getWallTextureData() {
  return getTextureData(wallCanvas.value, wallImage.value, textures[0]);
}

function getFloorTextureData() {
  const canvas = floorCanvas.value;
  const image = floorImage.value;
  const texture = floorTextures[0];
  return getTextureData(canvas, image, texture);
}

function getTextureData(canvas, image, texture) {
  canvas.width = texture.width;
  canvas.height = texture.height;

  const canvasContext = canvas.getContext("2d");
  canvasContext.drawImage(image, 0, 0, texture.width, texture.height);
  const imageData = canvasContext.getImageData(0, 0, texture.width, texture.height).data;

  return parseImageData(imageData);
}

function parseImageData(imageData) {
  const colorArray = [];
  for (let i = 0; i < imageData.length; i += 4) {
    colorArray.push(new Color(imageData[i], imageData[i + 1], imageData[i + 2], 255));
  }
  return colorArray;
}

onMounted(async () => {
  configureScreen();
  initCanvas(gameCanvas.value);
  await waitForImageLoading();
  loadTextures();
  loadGame();
});
</script>

<template>
  <canvas ref="wallCanvas" class="hidden" />
  <canvas ref="floorCanvas" class="hidden" />

  <img ref="wallImage" src="../assets/game-files/mossy_wall.png" alt="wall" />
  <img ref="floorImage" src="../assets/game-files/floor.png" alt="floor" />

  <canvas ref="gameCanvas" />
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  overflow: clip;
  background: #808080;
}

canvas {
  display: block;
  margin: auto;
  border: 1px solid black;
}

img {
  display: none;
}

.hidden {
  display: none;
}
</style>
