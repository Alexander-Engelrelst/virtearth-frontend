import { player } from "./player.js"
import { screen, projection } from "./screenConfig.js"

const rayCastingConfig = {
    incrementAngle: null,
    precision: 64
}

rayCastingConfig.incrementAngle = player.fov / projection.width;

export { rayCastingConfig }