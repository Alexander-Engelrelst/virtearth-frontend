import { player } from "./player.js";
import { projection } from "./screenConfig.js";

const rayCastingConfig = {
  incrementAngle: player.fov / projection.width,
  precision: 64,
};

export { rayCastingConfig };
