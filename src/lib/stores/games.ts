import { browser } from "$app/environment";
import { writable } from "svelte/store";

const stored = browser && localStorage.getItem('games');
const initial = stored ? JSON.parse(stored) : [];

export const games = writable<any[]>(initial);

games.subscribe(value => {
    if (browser !== false)
        localStorage.setItem('games', JSON.stringify(value));
})