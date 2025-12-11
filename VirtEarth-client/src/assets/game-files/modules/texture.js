function Color(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}

const textures = [
  {
    // image file texture
    width: 16,
    height: 16,
    id: "wallTexture",
    data: null,
  },
];

const floorTextures = [
  {
    width: 16,
    height: 16,
    id: "floorTexture",
    data: null,
  },
];

const ceilColor = new Color(128, 128, 128, 255);

function loadWallTextureData(wallTextureData) {
  textures[0].data = wallTextureData;
}

function loadFloorTextureData(floorTextureData) {
  floorTextures[0].data = floorTextureData;
}

export { Color, textures, floorTextures, loadWallTextureData, loadFloorTextureData, ceilColor };
