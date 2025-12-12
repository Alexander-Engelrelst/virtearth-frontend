import { canvasContext } from "../rayCaster.js";
import { map } from "./map.js";
import { projection } from "./screenConfig.js";

function degreeToRadians(degree) {
  return (degree * Math.PI) / 180;
}

function radiansToDegrees(radians) {
  return (radians / Math.PI) * 180;
}

function clearScreen() {
  canvasContext.clearRect(0, 0, projection.width, projection.height);
}

function checkCollision(x, y) {
  return map[Math.floor(y)][Math.floor(x)] === 0; // y = main array (vertical), x = subarray (horizontal)
}

function getTextureIndex(x, y) {
  return map[Math.floor(y)][Math.floor(x)] - 1;
}

function correct (input, max) {
  input = input % max;
  if (input < 0)  input += max;

  return input;
}

export { degreeToRadians, radiansToDegrees, clearScreen, checkCollision, getTextureIndex, correct };
