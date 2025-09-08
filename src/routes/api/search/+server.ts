import { GB_API_KEY } from "$env/static/private";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, fetch }) => {
    const query = url.searchParams.get("q");
    
    if(!query) return new Response(JSON.stringify([]), { status: 400 });

    const apiUrl = `https://www.giantbomb.com/api/search/?api_key=${GB_API_KEY}&format=json&query=${encodeURIComponent(query)}&resources=game`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    return new Response(JSON.stringify(data.results), { status: 200 });
}