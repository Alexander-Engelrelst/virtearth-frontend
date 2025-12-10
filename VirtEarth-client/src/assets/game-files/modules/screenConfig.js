const screen = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    halfWidth: null,
    halfHeight: null,
    scale: 4
};

screen.halfWidth = screen.width / 2;
screen.halfHeight = screen.height / 2;

const projection = {
    width: null,
    height: null,
    halfWidth: null,
    halfHeight: null,
    imageData: null,
    buffer: null
} // projection is the scaled down screen (for performance)

projection.width = screen.width / screen.scale;
projection.height = screen.height / screen.scale;
projection.halfWidth = projection.width / 2;
projection.halfHeight = projection.height / 2;

export { screen, projection }