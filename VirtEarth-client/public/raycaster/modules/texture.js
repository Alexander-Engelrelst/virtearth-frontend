function Color(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
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
};

const ceilColor = new Color(128, 128, 128, 255);

function loadTextures () {
  for (let i = 0; i < textures.length; i++) { // wall textures
    if (textures[i].id) {
      textures[i].data = getTextureData(textures[i]);
    }
  }

  floorTexture.data = getTextureData(floorTexture)
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
    colorArray.push(new Color(imageData[i], imageData[i + 1], imageData[i + 2], 255));
  }

  return colorArray;
}

export {
  Color,
  textures,
  floorTexture,
  ceilColor,
};
