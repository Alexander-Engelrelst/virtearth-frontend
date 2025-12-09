import { checkCollision, degreeToRadians } from "./helper.js";
import { player } from "./player.js";

const key = {
    up: {code: "KeyW", active: false},
    down: {code: "KeyS", active: false},
    left: {code: "KeyA", active: false},
    right: {code: "KeyD", active: false}
}

function movePlayer () {
    if (key.up.active) {
        forward();
    }
    if (key.down.active) {
        backward();
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

function forward() {
    let cos = Math.cos(degreeToRadians(player.angle)) * player.moveSpeed;
    let sin = Math.sin(degreeToRadians(player.angle)) * player.moveSpeed;
    let newX = player.x + cos;
    let newY = player.y + sin;
    let checkX = Math.floor(newX + cos * player.radius);
    let checkY = Math.floor(newY + sin * player.radius);

    move(checkX, checkY, newX, newY);
}

function backward() {
    let cos = Math.cos(degreeToRadians(player.angle)) * player.moveSpeed;
    let sin = Math.sin(degreeToRadians(player.angle)) * player.moveSpeed;
    let newX = player.x - cos;
    let newY = player.y - sin;
    let checkX = Math.floor(newX - cos * player.radius);
    let checkY = Math.floor(newY - sin * player.radius);

    move(checkX, checkY, newX, newY);
}

function move (checkX, checkY, newX, newY) {
    if (checkCollision(checkX, player.y)) {
        player.x = newX;
    }
    if (checkCollision(player.x, checkY)) {
        player.y = newY;
    }
}

export { key, movePlayer }