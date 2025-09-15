import { browser } from "$app/environment";
import { writable } from "svelte/store";

const stored = browser && localStorage.getItem('games');
const initial = stored ? JSON.parse(stored) : [];

export const games = writable<any[]>(initial);

games.subscribe(value => {
    if (browser !== false)
        localStorage.setItem('games', JSON.stringify(value));
});

export function downloadGames(gamesList: any[]) {
    const exportList = gamesList.map(game => ({
        id: game.id,
        notes: game.notes,
        status: game.status,
        rating: game.rating
    }));

    const blob = new Blob([JSON.stringify(exportList, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "games.json";
    a.click();
    URL.revokeObjectURL(url);
}

export async function uploadGames(file: File) {
    const text = await file.text();
    const imported = JSON.parse(text);

    const reconstructed = await Promise.all(imported.map(async (userGame: any) => {
        const res = await fetch(`/api/game?id=${userGame.id}`);
        const gameData = await res.json();
        return {...gameData, ...userGame};
    }));

    games.set(reconstructed);
}