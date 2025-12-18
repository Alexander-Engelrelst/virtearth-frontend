import {checkCollision, degreeToRadians, getTextureIndex} from "./helper.js";
import { player } from "./player.js";
import { checkWinCondition } from "../rayCaster.js";

const key = Object.freeze({
  up: { code: "KeyW", active: false },
  down: { code: "KeyS", active: false },
  left: { code: "KeyA", active: false },
  right: { code: "KeyD", active: false },
});

async function movePlayer() {
  if (!player.movingEnabled) return;

  if (key.up.active) {
    await forward();
  }

  if (key.down.active) {
    await backward();
  }

  if (key.left.active) {
    player.angle -= player.turnSpeed;
    player.angle %= 360;
  }

  if (key.right.active) {
    player.angle += player.turnSpeed;
    player.angle %= 360;
  }
}

async function forward() {
  const cos = Math.cos(degreeToRadians(player.angle)) * player.moveSpeed;
  const sin = Math.sin(degreeToRadians(player.angle)) * player.moveSpeed;
  const newX = player.x + cos;
  const newY = player.y + sin;
  const checkX = Math.floor(newX + cos * player.radius);
  const checkY = Math.floor(newY + sin * player.radius);

  await move(checkX, checkY, newX, newY);
}

async function backward() {
  const cos = Math.cos(degreeToRadians(player.angle)) * player.moveSpeed;
  const sin = Math.sin(degreeToRadians(player.angle)) * player.moveSpeed;
  const newX = player.x - cos;
  const newY = player.y - sin;
  const checkX = Math.floor(newX - cos * player.radius);
  const checkY = Math.floor(newY - sin * player.radius);

  await move(checkX, checkY, newX, newY);
}

async function move(checkX, checkY, newX, newY) {

  if (!checkCollision(checkX, checkY)) {
    await checkWinCondition(getTextureIndex(checkX, checkY))
  }

  if (checkCollision(checkX, player.y)) {
    player.x = newX;
  }

  if (checkCollision(player.x, checkY)) {
    player.y = newY;
  }
}

export { key, movePlayer };
