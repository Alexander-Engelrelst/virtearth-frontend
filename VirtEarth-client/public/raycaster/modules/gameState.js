import {GAME_OBJECT} from "../rayCaster.js";
import {player} from "./player.js";
import {revertCoord} from "./helper.js";

function saveGameState() {
    GAME_OBJECT.spawnLocation.x = revertCoord(player.y);
    GAME_OBJECT.spawnLocation.y = revertCoord(player.x);

    sessionStorage.setItem("gameObject", JSON.stringify(GAME_OBJECT));
}

export { saveGameState };