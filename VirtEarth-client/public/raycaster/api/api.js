import { getApiUrl } from "../../../src/services/api/config.js";
import { getToken } from "../../../src/services/auth.js";
import { apiFetch } from "../../../src/services/utils.js";
import { map } from "../rayCaster.js";

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

async function pickupArtifact(gameId, artifact, player) {
  const token = getToken();
  const response = await fetch(getApiUrl(`/api/games/${gameId}/artifacts/${artifact}`),
    {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      xCord: player.y, // same issue as before
      yCord: player.x,
      angle: player.angle,
    }),
  });

  console.log(response);

  if (response.status === 200) {
    // eslint-disable-next-line no-import-assign
    map = JSON.parse(response.body.maze);
  }
}

export { sendHeartBeat, pickupArtifact };
