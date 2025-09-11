import { browser } from "$app/environment";
import { writable } from "svelte/store";

const stored = browser && localStorage.getItem('layout');
const initial = stored ? JSON.parse(stored) : 'grid';

export const layout = writable<string>(initial);

layout.subscribe(value => {
    if(browser !== false)
        localStorage.setItem('layout', JSON.stringify(value));
})