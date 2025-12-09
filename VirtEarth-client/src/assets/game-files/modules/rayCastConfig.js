import { screen, projection } from "./screenConfig.js"
import { player } from "./player.js"

const rayCastingConfig = {
    incrementAngle: null,
    precision: 64
}

rayCastingConfig.incrementAngle = player.fov / projection.width;

export { rayCastingConfig }