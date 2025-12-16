import { getApiUrl } from "../../../src/services/api/config.js";
import { getToken } from "../../../src/services/auth.js";
import { apiFetch } from "../../../src/services/utils.js";
import { revertCoord } from "../modules/helper.js"

const timeOut = 5000;

async function sendHeartBeat(gameId) {
    const token = getToken();
    while (true) {
        const response = await fetch(getApiUrl(`/api/games/${gameId}/heartbeat`), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            location.href = "http://localhost/dashboard";
        }

        await new Promise(resolve => setTimeout(resolve, timeOut));
    }
}

async function pickupArtifact(gameId, artifactId, player) {
  const token = getToken();
  console.log(revertCoord(player.x), revertCoord(player.y));
  const response = await fetch(getApiUrl(`/api/games/${gameId}/artifacts/${artifactId}`),
    {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      xCord: revertCoord(player.y), // same issue as before
      yCord: revertCoord(player.x),
      angle: player.angle,
    }),
  });

  if (response.status === 200) {
    const data = await response.json();

    return data.maze;
  }

  return null;
}

export { sendHeartBeat, pickupArtifact };
