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

function loadWallTextureData(wallTextureData) {
  textures[0].data = wallTextureData;
}

function loadFloorTextureData(floorTextureData) {
  floorTextures[0].data = floorTextureData;
}

export { textures, floorTextures, loadWallTextureData, loadFloorTextureData };
