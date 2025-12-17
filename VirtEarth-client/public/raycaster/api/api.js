import { getApiUrl } from "../../../src/services/api/config.js";
import { getToken } from "../../../src/services/auth.js";
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
        }).catch(() => location.replace("/"));

        if (!response.ok) {
            // TODO (ab)use the added overlay for the artifacts to display an appropriate error
            // saying that something has failed
            location.replace("/");
        }

        await new Promise(resolve => setTimeout(resolve, timeOut));
    }
}

async function pickupArtifact(gameId, artifactId, player) {
  const token = getToken();
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
