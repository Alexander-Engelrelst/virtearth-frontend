import { checkCollision, degreeToRadians, getTextureIndex, correct } from "./helper.js";
import { player } from "./player.js";
import { rayCastingConfig } from "./rayCastConfig.js";
import { projection } from "./screenConfig.js";
import { canvasContext } from "../rayCaster.js";
import { enableSprites } from "./sprites.js";
import { Color, textures, floorTexture, ceilTexture } from "./texture.js";

function drawLine(x, y1, y2, color) {
  for (let y = y1; y < y2; y++) {
    drawPixel(x, y, color);
  }
}

function drawTexture(x, wallHeight, texturePositionX, texture) {
  const yIncrementer = (wallHeight * 2) / texture.height;
  let y = projection.halfHeight - wallHeight;

  let color = null;

  for (let i = 0; i < texture.height; i++) {
    if (texture.id) {
      // check if texture is an image or a bitmap
      color = texture.data[texturePositionX + i * texture.width];
    } else {
      color = texture.colors[texture.bitmap[i][texturePositionX]];
    }

    drawLine(x, y, Math.floor(y + (yIncrementer + 2)), color);
    y += yIncrementer;
  }
}

function drawPixel(x, y, color) {
  const offset = 4 * (Math.floor(x) + Math.floor(y) * projection.width);
  const offsetArray = [1, 2, 3]; //to prevent sonar no magic number rule
  projection.buffer[offset] = color.r;
  projection.buffer[offset + offsetArray[0]] = color.g;
  projection.buffer[offset + offsetArray[1]] = color.b;
  projection.buffer[offset + offsetArray[2]] = color.a;
}

function rayCast() {
  let rayAngle = player.angle - player.fov / 2;

  for (let rayCount = 0; rayCount < projection.width; rayCount++) {
    // cast a ray for each pixel horizontally
    const ray = { x: player.x, y: player.y };

    const rayCos = Math.cos(degreeToRadians(rayAngle)) / rayCastingConfig.precision; // precision determines amount of collision checks for ray
    const raySin = Math.sin(degreeToRadians(rayAngle)) / rayCastingConfig.precision;

    let collided = false;
    while (!collided) {
      ray.x += rayCos;
      ray.y += raySin;
      collided = !checkCollision(ray.x, ray.y); // if ray is not on a 0 -> collision is true
      enableSprites(ray.x, ray.y);
    }

    let distance = Math.sqrt(Math.pow(player.x - ray.x, 2) + Math.pow(player.y - ray.y, 2)); // Pythagoras baby
    distance = distance * Math.cos(degreeToRadians(rayAngle - player.angle)); // fix fisheye lens effect
    const wallHeight = Math.floor(projection.halfHeight / distance);
    const texture = textures[getTextureIndex(ray.x, ray.y)];
    const texturePositionX = Math.floor((texture.width * (ray.x + ray.y)) % texture.width);

    drawCeiling(rayCount, rayAngle);
    drawTexture(rayCount, wallHeight, texturePositionX, texture); // draw walls
    drawFloor(rayCount, wallHeight, rayAngle);

    rayAngle += rayCastingConfig.incrementAngle;
  }
}

function drawCeiling(x, rayAngle) {
  const directionCos = Math.cos(degreeToRadians(rayAngle));
  const directionSin = Math.sin(degreeToRadians(rayAngle));

  for (let y = 0; y < projection.halfHeight; y++) {
    let distance = projection.height / (projection.height - 2 * y);
    distance = distance / Math.cos(degreeToRadians(player.angle) - degreeToRadians(rayAngle)); // fisheye effect fix

    const tileX = player.x + distance * directionCos;
    const tileY = player.y + distance * directionSin;

    if (ceilTexture) {
      const ceilTextureX = correct(Math.floor(tileX * ceilTexture.width), ceilTexture.width);
      const ceilTextureY = correct(Math.floor(tileY * ceilTexture.height), ceilTexture.height);

      const color = ceilTexture.data[ceilTextureX + ceilTextureY * floorTexture.width];
      drawPixel(x, y, color);
    }
  }
}

function drawFloor(x, wallHeight, rayAngle) {
  const directionCos = Math.cos(degreeToRadians(rayAngle));
  const directionSin = Math.sin(degreeToRadians(rayAngle));

  const start = projection.halfHeight + wallHeight + 1; // + 1 to prevent missing pixels between wall and floor

  for (let y = start; y < projection.height; y++) {
    let distance = projection.height / (2 * y - projection.height);
    distance = distance / Math.cos(degreeToRadians(player.angle) - degreeToRadians(rayAngle)); // fisheye effect fix

    const tileX = player.x + distance * directionCos;
    const tileY = player.y + distance * directionSin;

    if (floorTexture) {
      const floorTextureX = Math.floor(tileX * floorTexture.width) % floorTexture.width;
      const floorTextureY = Math.floor(tileY * floorTexture.height) % floorTexture.height;

      const color = floorTexture.data[floorTextureX + floorTextureY * floorTexture.width];
      drawPixel(x, y, color);
    }
  }
}

function renderBuffer() {
  const canvas = document.createElement("canvas");
  canvas.width = projection.width;
  canvas.height = projection.height;
  canvas.getContext("2d").putImageData(projection.imageData, 0, 0);
  canvasContext.drawImage(canvas, 0, 0);
}

export { rayCast, Color, renderBuffer, drawLine };
