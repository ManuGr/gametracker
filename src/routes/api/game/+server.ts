import { GB_API_KEY } from "$env/static/private";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, fetch }) => {
    const gameId = url.searchParams.get("id");

    if (!gameId) return new Response(JSON.stringify([]), { status: 400 });

    const apiUrl = `https://www.giantbomb.com/api/game/${gameId}/?api_key=${GB_API_KEY}&format=json`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    return new Response(JSON.stringify(data.results), { status: 200 });
}