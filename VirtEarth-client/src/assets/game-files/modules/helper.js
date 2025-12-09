import { canvasContext } from "../rayCaster.js";
import { screen, projection } from "./screenConfig.js";
import { map } from "./map.js"

function degreeToRadians(degree) {
    return degree * Math.PI / 180;
}

function radiansToDegrees(radians) {
    return radians / Math.PI * 180;
}

function clearScreen() {
    canvasContext.clearRect(0, 0, projection.width, projection.height);
}

function checkCollision (x, y) {
    return map[Math.floor(y)][Math.floor(x)] === 0; // y = main array (vertical), x = subarray (horizontal)
}

export { degreeToRadians, radiansToDegrees, clearScreen, checkCollision };