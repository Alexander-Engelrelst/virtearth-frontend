function Color(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}

const textureIndices = {
  mossWall: 0
}

const textures = [
  {
    width: 16,
    height: 16,
    id: "wallTexture",
    data: null,
  },
];

const floorTexture = {
    width: 16,
    height: 16,
    id: "floorTexture",
    data: null,
}

const ceilColor = new Color(128, 128, 128, 255);

function loadWallTextureData(wallTextureData) {
  textures[0].data = wallTextureData; // TODO: FIX THIS MAGIC NUMBER
}

function loadFloorTextureData(floorTextureData) {
  floorTexture.data = floorTextureData;
}

export { Color, textureIndices, textures, floorTexture, loadWallTextureData, loadFloorTextureData, ceilColor };
