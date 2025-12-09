<script setup>
import { onMounted } from "vue"
import { screen } from "../assets/game-files/modules/screenConfig.js"


function createGameScreen() {
  const canvas = document.createElement('canvas');
  canvas.id = 'gameScreen';
  canvas.width = screen.width;
  canvas.height = screen.height;
  document.body.appendChild(canvas);
}

onMounted( async () => {
  createGameScreen();
})
</script>

<template>
  <img id="wallTexture" src="../assets/game-files/mossy_wall.png" alt="wall">
  <img id="floorTexture" src="../assets/game-files/floor.png" alt="floor">

  <script src="../assets/game-files/rayCaster.js" type="module"></script>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
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
</style>