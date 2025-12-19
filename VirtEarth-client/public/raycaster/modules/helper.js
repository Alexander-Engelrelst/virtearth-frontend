import { canvasContext, GAME_OBJECT } from "../rayCaster.js";
import { projection } from "./screenConfig.js";

const halfCircle = 180;

function degreeToRadians(degree) {
  return (degree * Math.PI) / halfCircle;
}

function radiansToDegrees(radians) {
  return (radians / Math.PI) * halfCircle;
}

function clearScreen() {
  canvasContext.clearRect(0, 0, projection.width, projection.height);
}

function checkCollision(x, y) {
  const mapX = Math.floor(x / 2);
  const mapY = Math.floor(y / 2);

  return GAME_OBJECT["maze"][mapY][mapX] === 0; // y = main array (vertical), x = subarray (horizontal)
}

function getTextureIndex(x, y) {
  const mapX = Math.floor(x / 2);
  const mapY = Math.floor(y / 2);

  return GAME_OBJECT["maze"][mapY][mapX] - 1; // - 1 because wall textures start at 1 on the map (0 is floor/air)
}
/*
function checkCollision(x, y) {
  return map[Math.floor(y)][Math.floor(x)] === 0;   these are for regular, non-doubled rendering
}

function getTextureIndex(x, y) {
  return map[Math.floor(y)][Math.floor(x)] - 1;
}
*/

function correct (input, max) {
  input %= max;
  if (input < 0)  input += max;

  return input;
}

function fixCoord(coord) {
  return (coord + 0.5) * 2; // needed to fix coords for double rendering method
}

function revertCoord(coord) {
  return (coord / 2) - 0.5;
}

export { degreeToRadians, radiansToDegrees, clearScreen, checkCollision, getTextureIndex, correct, fixCoord, revertCoord };
