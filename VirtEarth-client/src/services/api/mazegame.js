import { getToken } from "../auth.js";
import { getApiUrl } from "./config.js";

async function getMazeGame(gameId) {
  const token = getToken();

  const response = await fetch(getApiUrl(`api/games/${gameId}`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`game creation failed: ${response.statusText}`);
  }

  return response.json();
}

export { getMazeGame };
