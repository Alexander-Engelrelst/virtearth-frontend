import { getApiUrl } from "./config.js";
import { revertCoord } from "../modules/helper.js"
import {saveGameState} from "../modules/gameState.js";
import {player} from "../modules/player.js";

function getToken() {
    return localStorage.getItem("jwtToken");
}

const GAME_SAVED_SUCCESSFULLY_STATUSCODE = 204;
const HEARTBEAT_TIMEOUT = 5000;

async function sendHeartBeat(gameId) {
    const token = getToken();
    while (true) {
        const response = await fetch(getApiUrl(`/api/games/${gameId}/heartbeat`), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).catch(() => location.replace("/"));

        if (!response.ok) {
            location.replace("/dashboard?message=unexpected-error");
        }

        saveGameState();
        await new Promise(resolve => setTimeout(resolve, HEARTBEAT_TIMEOUT));
    }
}

async function pickupArtifact(gameId, artifactId) {
  const token = getToken();
  const response = await fetch(getApiUrl(`/api/games/${gameId}/artifacts/${artifactId}`),
    {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const data = await response.json();

    return data.maze;
  }

  return null;
}

async function saveGame() {
    const token = getToken();

    return fetch(getApiUrl(`/api/games/${sessionStorage.getItem("gameId")}/save`), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

export { sendHeartBeat, pickupArtifact, saveGame, GAME_SAVED_SUCCESSFULLY_STATUSCODE };
