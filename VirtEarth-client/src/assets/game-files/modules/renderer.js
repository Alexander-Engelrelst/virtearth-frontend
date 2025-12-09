import { player } from "./player.js";
import { projection } from "./screenConfig.js";
import { rayCastingConfig } from "./rayCastConfig.js";
import { canvasContext } from "../rayCaster.js";
import { checkCollision, degreeToRadians } from "./helper.js";
import { textures, floorTextures } from "./texture.js"
import { map } from "./map.js";

function Color(r, g ,b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

function drawLine(x, y1, y2, color) {
    for (let y = y1; y < y2; y++) {
        drawPixel(x, y, color);
    }
}

function drawTexture(x, wallHeight, texturePositionX, texture) {
    let yIncrementer = (wallHeight * 2) / texture.height;
    let y = projection.halfHeight - wallHeight;

    let color = null;
    for (let i = 0; i < texture.height; i++) {
        if (texture.id) { // check if texture is in memory or not
            color = texture.data[texturePositionX + i * texture.width];
        } else {
            color = texture.colors[texture.bitmap[i][texturePositionX]];
        }
        drawLine(x, y, Math.floor(y + (yIncrementer + 2)), color);
        y += yIncrementer;
    }
}



function drawPixel(x, y, color) {
    let offset = 4 * (Math.floor(x) + Math.floor(y) * projection.width);
    projection.buffer[offset    ] = color.r;
    projection.buffer[offset + 1] = color.g;
    projection.buffer[offset + 2] = color.b;
    projection.buffer[offset + 3] = color.a;
}

function rayCast() {
    let rayAngle = player.angle - player.halfFov;

    for (let rayCount = 0; rayCount < projection.width; rayCount++) { // cast a ray for each pixel horizontally

        const ray = {x: player.x, y: player.y};

        let rayCos = Math.cos(degreeToRadians(rayAngle)) / rayCastingConfig.precision; // precision determines amount of collision checks for ray
        let raySin = Math.sin(degreeToRadians(rayAngle)) / rayCastingConfig.precision;

        let wall = 0;
        while (wall === 0) {
            ray.x += rayCos;
            ray.y += raySin;
            wall = checkCollision(ray.x, ray.y) ? 0 : 1;
        }

        let distance = Math.sqrt(Math.pow(player.x - ray.x, 2) + Math.pow(player.y - ray.y, 2)); // Pythagoras baby
        distance = distance * Math.cos(degreeToRadians(rayAngle - player.angle)); // fix fisheye lens effect
        let wallHeight = Math.floor(projection.halfHeight / distance);
        let texture = textures[wall - 1];
        let texturePositionX = Math.floor((texture.width * (ray.x + ray.y)) % texture.width);

        drawLine(rayCount, 0, projection.halfHeight - wallHeight, new Color(128, 128, 128, 255)) // draw ceiling/sky
        drawTexture(rayCount, wallHeight, texturePositionX, texture) // draw walls
        drawFloor(rayCount, wallHeight, rayAngle);

        rayAngle += rayCastingConfig.incrementAngle;
    }
}

function drawFloor(x, wallHeight, rayAngle) {
    const directionCos = Math.cos(degreeToRadians(rayAngle));
    const directionSin = Math.sin(degreeToRadians(rayAngle));

    let start = projection.halfHeight + wallHeight + 1;
    for (let y = start; y < projection.height; y++) {

        let distance = projection.height / (2 * y - projection.height);
        distance = distance / Math.cos(degreeToRadians(player.angle) - degreeToRadians(rayAngle)); // fisheye effect fix

        let tileX = distance * directionCos;
        let tileY = distance * directionSin;
        tileX += player.x; // get position relative to player
        tileY += player.y;

        const tile = map[Math.floor(tileY)][Math.floor(tileX)];

        let texture = floorTextures[tile];

        if (!texture) {
            continue
        }

        let textureX = (Math.floor(tileX * texture.width)) % texture.width;
        let textureY = (Math.floor(tileY * texture.height)) % texture.height;

        let color = texture.data[textureX + textureY * texture.width];
        drawPixel(x, y, color);
    }
}

function renderBuffer() {
    let canvas = document.createElement("canvas");
    canvas.width = projection.width;
    canvas.height = projection.height;
    canvas.getContext("2d").putImageData(projection.imageData, 0, 0);
    canvasContext.drawImage(canvas, 0, 0);
}

export { rayCast, Color, renderBuffer, drawLine }