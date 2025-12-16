import {getApiUrl} from "@/services/api/config.js";
import {getToken} from "@/services/auth.js";

const timeOut = 5000

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

export { sendHeartBeat };
