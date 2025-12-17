import { checkCollision, degreeToRadians, getTextureIndex, correct } from "./helper.js";
import { player } from "./player.js";
import { rayCastingConfig } from "./rayCastConfig.js";
import { projection } from "./screenConfig.js";
import { canvasContext } from "../rayCaster.js";
import { enableSprites } from "./sprites.js";
import { Color, textures, floorTexture, ceilTexture } from "./texture.js";

const FOG_DISTANCE = 15; // Distance at which fog is at its maximum
const X_WALL_DARKEN_FACTOR = 0.70;

function darkenColor(color, factor) {
  if (!color) return { r: 0, g: 0, b: 0, a: 255 };

  const r = Math.max(0, color.r * factor);
  const g = Math.max(0, color.g * factor);
  const b = Math.max(0, color.b * factor);

  return { r: r, g: g, b: b, a: color.a };
}

function drawLine(x, y1, y2, color) {
  for (let y = y1; y < y2; y++) {
    drawPixel(x, y, color);
  }
}

function drawTexture(x, wallHeight, texturePositionX, texture, distance, side) {
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

    let finalColor = color;

    // Shade one side of the walls to give a better sense of depth
    if (side === 1) {
      finalColor = darkenColor(finalColor, X_WALL_DARKEN_FACTOR);
    }

    // Add fog effect, walls get darker in the distance
    const fogAmount = Math.min(1, (distance/1.5) / FOG_DISTANCE);
    const fogFactor = 1 - fogAmount;
    finalColor = darkenColor(finalColor, fogFactor);

    drawLine(x, y, Math.floor(y + (yIncrementer + 2)), finalColor);
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

    const prevX = ray.x - rayCos;
    const prevY = ray.y - raySin;
    const wallX = Math.floor(ray.x);
    const wallY = Math.floor(ray.y);
    const prevWallX = Math.floor(prevX);
    const prevWallY = Math.floor(prevY);

    let side = 0; // horizontal

    if (wallX !== prevWallX) {
        side = 1; // vertical
    }

    const wallHeight = Math.floor(projection.halfHeight / distance);
    const texture = textures[getTextureIndex(ray.x, ray.y)];
    const texturePositionX = Math.floor((texture.width * (ray.x + ray.y)) % texture.width);

    drawCeiling(rayCount, rayAngle);
    drawTexture(rayCount, wallHeight, texturePositionX, texture, distance, side); // draw walls
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

    if (ceilTexture && ceilTexture.data) {
      const ceilTextureX = correct(Math.floor(tileX * ceilTexture.width), ceilTexture.width);
      const ceilTextureY = correct(Math.floor(tileY * ceilTexture.height), ceilTexture.height);

      let color = ceilTexture.data[ceilTextureX + ceilTextureY * ceilTexture.width];

      if (color) {
        // Add fog effect to the ceiling
        const fogAmount = Math.min(1, distance / FOG_DISTANCE);
        const fogFactor = 1 - fogAmount;
        color = darkenColor(color, fogFactor);

        drawPixel(x, y, color);
      }
    }
  }
}

function drawFloor(x, wallHeight, rayAngle) {
  const directionCos = Math.cos(degreeToRadians(rayAngle));
  const directionSin = Math.sin(degreeToRadians(rayAngle));

  const start = projection.halfHeight + wallHeight + 1; // + 1 to prevent missing pixels between wall and floor
  const cosFishEyeFix = Math.cos(degreeToRadians(player.angle - rayAngle));

  for (let y = start; y < projection.height; y++) {
    let distance = projection.height / (2 * y - projection.height);
    distance = distance / cosFishEyeFix; // fisheye effect fix

    let tileX = distance * directionCos;
    let tileY = distance * directionSin;
    tileX += player.x; // get position relative to player
    tileY += player.y;

    if (!floorTexture) {
      continue;
    }

    const floorTextureX = Math.floor(tileX * floorTexture.width) % floorTexture.width;
    const floorTextureY = Math.floor(tileY * floorTexture.height) % floorTexture.height;

    let color = floorTexture.data[floorTextureX + floorTextureY * floorTexture.width];

    // Add fog effect to the floor
    const fogAmount = Math.min(1, distance / FOG_DISTANCE);
    const fogFactor = 1 - fogAmount;

    // Add a shadow effect to the floor near the walls
    const shadowProximity = y - start;
    // The shadow is stronger near the wall and fades out
    const shadowFactor = Math.min(1, shadowProximity / 35); // Shadow fades over 35 pixels
    const finalShadowFactor = shadowFactor * 0.5 + 0.5; // make it less dark, range 0.5 to 1

    color = darkenColor(color, fogFactor * finalShadowFactor);

    drawPixel(x, y, color);
  }
}

function renderBuffer() {
  const canvas = document.createElement("canvas");
  canvas.width = projection.width;
  canvas.height = projection.height;
  canvas.getContext("2d").putImageData(projection.imageData, 0, 0);
  canvasContext.drawImage(canvas, 0, 0);
}

async function renderSpriteInformationOverlay(sprite, exitGenerated){
  const $overlay = document.querySelector(".artifact-information-overlay");
  $overlay.classList.add("displayed");

  $overlay.querySelector(".artifact-name").innerText = sprite.name;
  $overlay.querySelector(".artifact-description").innerText = sprite.description;
  $overlay.querySelector(".continue-text").innerHTML =
    `${exitGenerated ? "<span class='gold'>You found all artifacts! The exit has been revealed around you.</span><br>" : ""}Press <span class="bold">enter</span> to continue`;

  setTimeout(() => {
    document.addEventListener("keydown", hideOverlay);
  }, 5000);
}

function hideOverlay(e) {
  if (e.key === "Enter") {
    document.removeEventListener("keydown", hideOverlay);
    player.movingEnabled = true;
    document.querySelector(".artifact-information-overlay").classList.remove("displayed");
  }
}

export { rayCast, Color, renderBuffer, drawLine, renderSpriteInformationOverlay };
