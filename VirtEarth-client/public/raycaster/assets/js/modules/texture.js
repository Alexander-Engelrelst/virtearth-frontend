class Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

const fullOpacity = 255;

const textures = [
  {
    width: 128,
    height: 128,
    id: "wallTexture",
    data: null,
  },
  {
    width: 64,
    height: 64,
    id: "exitTexture",
    data: null,
  }
];

const floorTexture = {
  width: 128,
  height: 128,
  id: "floorTexture",
  data: null,
};

const ceilTexture = {
  width: 128,
  height: 128,
  id: "ceilTexture",
  data: null,
}

function loadTextures () {
  for (const texture of textures) { // wall textures
    if (texture.id) {
      texture.data = getTextureData(texture);
    }
  }

  floorTexture.data = getTextureData(floorTexture);
  ceilTexture.data = getTextureData(ceilTexture);
}

function getTextureData(texture) {
  const image= document.getElementById(texture.id);
  const canvas = document.createElement("canvas");

  canvas.width = texture.width;
  canvas.height = texture.height;

  const canvasContext = canvas.getContext("2d");
  canvasContext.drawImage(image, 0, 0, texture.width, texture.height); // IDE gives an error but it doesn't matter
  const imageData = canvasContext.getImageData(0, 0, texture.width, texture.height).data;

  return parseImageData(imageData);
}

function parseImageData(imageData) {
  const colorArray = [];

  for (let i = 0; i < imageData.length; i+=4) {
    colorArray.push(new Color(imageData[i], imageData[i + 1], imageData[i + 2], fullOpacity));
  }

  return colorArray;
}

export {
  getTextureData,
  loadTextures,
  Color,
  textures,
  floorTexture,
  ceilTexture,
};
