import { Color } from "./renderer.js"

const textures = [
    { // image file texture
        width: 16,
        height: 16,
        id: "wallTexture",
        data: null
    },
    { // bitmap texture
    width: 8,
    height: 8,
    bitmap: [
        [1,1,1,1,1,1,1,1],
        [0,0,0,1,0,0,0,1],
        [1,1,1,1,1,1,1,1],
        [0,1,0,0,0,1,0,0],
        [1,1,1,1,1,1,1,1],
        [0,0,0,1,0,0,0,1],
        [1,1,1,1,1,1,1,1],
        [0,1,0,0,0,1,0,0]
    ],
    colors: [
        "rgb(255, 241, 232)",
        "rgb(194, 195, 199)",
    ]
    }
]

const floorTextures= [
    {
        width: 16,
        height: 16,
        id: "floorTexture",
        data: null
    }
]

function loadTextures () {
    for (let i = 0; i < textures.length; i++) { // wall textures
        if (textures[i].id) {
            textures[i].data = getTextureData(textures[i]);
        }
    }

    for (let i = 0; i < floorTextures.length; i++) { // floor textures
        if (floorTextures[i].id) {
            floorTextures[i].data = getTextureData(floorTextures[i]);
        }
    }
}

function getTextureData(texture) {
    const image= document.getElementById(texture.id);
    let canvas = document.createElement("canvas");

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

export { textures, floorTextures, loadTextures, getTextureData }