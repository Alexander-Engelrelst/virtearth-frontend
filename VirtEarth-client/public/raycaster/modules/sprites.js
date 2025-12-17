import { radiansToDegrees } from "./helper.js";
import { player } from "./player.js";
import {drawLine, renderSpriteInformationOverlay} from "./renderer.js";
import { projection } from "./screenConfig.js";
import { getTextureData } from "./texture.js";
import { pickupArtifact } from "../api/api.js";
import { GAME_ID, replaceMapReference } from "../rayCaster.js"

const maxAngle = 360;

const sprites = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    x: 0,
    y: 0,
    width: 10,
    height: 6,
    active: false,
    wasFound: false,
    data: null,
    description: "",
    name: "Thread of Ariadne",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    x: 0,
    y: 0,
    width: 10,
    height: 6,
    active: false,
    wasFound: false,
    data: null,
    description: "",
    name: "Torch of Daedalus",
  }
];

function enableSprites(x, y) {
  for (const sprite of sprites) {
    if (sprite.x === Math.floor(x) && sprite.y === Math.floor(y)) {
      sprite.active = true;
    }
  }
}

function disableSprites() {
  for (const sprite of sprites) {
    sprite.active = false;
  }
}

async function loadSprites() {
  for (const sprite of sprites) {
    if (sprite.id) {
      sprite.data = await getTextureData(sprite);
    }
  }
}

function drawSprites() {
  for (const sprite of sprites) {
    if (sprite.active && !sprite.wasFound) {

      // Get X and Y coords in relation of the player coords
      const spriteXRelative = sprite.x + 0.5 - player.x;
      const spriteYRelative = sprite.y + 0.5 - player.y;

      // Get angle of the sprite in relation of the player angle
      const spriteAngleRadians = Math.atan2(spriteYRelative, spriteXRelative);
      let spriteAngle =
        radiansToDegrees(spriteAngleRadians) - Math.floor(player.angle - (player.fov / 2));

      // Sprite angle checking
      if (spriteAngle > maxAngle) spriteAngle -= maxAngle;

      if (spriteAngle < 0) spriteAngle += maxAngle;

      // Three rule to discover the x position of the script
      let spriteX = Math.floor((spriteAngle * projection.width) / player.fov);

      // SpriteX right position fix
      if (spriteX > projection.width) {
        spriteX %= projection.width;
        spriteX -= projection.width;
      }

      // Get the distance of the sprite (Pythagoras theorem)
      const distance = Math.sqrt(
        Math.pow(player.x - sprite.x, 2) + Math.pow(player.y - sprite.y, 2)
      );

      // Calc sprite width and height
      const spriteHeight = Math.floor(projection.halfHeight / distance);
      const spriteWidth = Math.floor(projection.halfWidth / distance);

      // Draw the sprite
      drawSprite(spriteX, spriteWidth, spriteHeight, sprite);
    }
  }
}

function drawSprite(xProjection, spriteWidth, spriteHeight, sprite) {
  // Decrement halfwidth of the sprite to consider the middle of the sprite to draw
  xProjection = xProjection - sprite.width;

  // Define the projection increments for draw
  const xIncrementer = spriteWidth / sprite.width;
  const yIncrementer = (spriteHeight * 2) / sprite.height;

  // Iterate sprite width and height
  for (let spriteX = 0; spriteX < sprite.width; spriteX += 1) {
    // Define the Y cursor to draw
    let yProjection = projection.halfHeight - spriteHeight;

    for (let spriteY = 0; spriteY < sprite.height; spriteY++) {
      const color = sprite.data[spriteX + spriteY * sprite.width];
      drawRect(
        xProjection,
        xProjection + xIncrementer,
        yProjection,
        yProjection + yIncrementer,
        color
      );

      // Increment Y
      yProjection += yIncrementer;
    }

    // Increment X
    xProjection += xIncrementer;
  }
}

function drawRect(x1, x2, y1, y2, color) {
  for (let x = x1; x < x2; x++) {
    if (x >= 0 && x <= projection.width) {
      drawLine(x, y1, y2, color);
    }
  }
}

async function checkSpriteCollision() {
  for (const sprite of sprites) {
    if (!sprite.wasFound) {
      if ((sprite.x - 1) < player.x && player.x < (sprite.x + 1) && (sprite.y - 1) < player.y && player.y < (sprite.y + 1)) {
        sprite.wasFound = true;
        player.movingEnabled = false;
        const newMap = await pickupArtifact(GAME_ID, sprite.id, player);
        renderSpriteInformationOverlay(sprite, newMap !== null);

        if (newMap) replaceMapReference(newMap);

        break; // to prevent multiple api calls
      }
    }
  }
}

export { sprites, loadSprites, drawSprites, checkSpriteCollision, disableSprites, enableSprites };