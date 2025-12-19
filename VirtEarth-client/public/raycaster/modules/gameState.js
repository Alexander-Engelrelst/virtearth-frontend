import {GAME_OBJECT} from "../rayCaster.js";
import {revertCoord} from "./helper.js";
import {player} from "./player.js";

function saveGameState() {
    GAME_OBJECT.spawnLocation.x = revertCoord(player.y);
    GAME_OBJECT.spawnLocation.y = revertCoord(player.x);
    GAME_OBJECT.spawnLocation.angle = player.angle;
    sessionStorage.setItem("gameObject", JSON.stringify(GAME_OBJECT));
}

function savePickedUpArtifact(artifactsId) {
    for (const artifact of GAME_OBJECT.artifacts) {
        if (artifact.id === artifactsId) {
            artifact.wasFound = true;
        }
    }

    saveGameState();
}
export { saveGameState, savePickedUpArtifact };