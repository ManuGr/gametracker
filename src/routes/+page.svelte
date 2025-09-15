<script lang="ts">
    import { Download, LayoutGrid, List, ListPlus, Upload } from "@lucide/svelte";
    import { games, downloadGames, uploadGames } from "$lib/stores/games";
    import { layout } from "$lib/stores/config";
    import { dndzone } from "svelte-dnd-action";

    import Search from "$lib/components/Search.svelte";
    import GameProfile from "$lib/components/GameProfile.svelte";

    let fileInput: HTMLInputElement;

    let addGameModal = false;
    let gameInfoModal = false;
    let currentGame: any = null;

    function handleGameProfileOpen(game: any) {
        gameInfoModal = !gameInfoModal;
        currentGame = game;
    }

    function handleDownload() {
        downloadGames($games);
    }

    async function handleUpload(event: Event) {
        const files = fileInput.files;
        if (files && files[0]) {
            await uploadGames(files[0]);
        }
    }

    function handleDnd({ detail }) {
        games.set(detail.items);
    }
</script>

<div class="max-w-screen-xl mx-auto border-b-2 border-gray-600 mx-auto p-1 mb-4 flex justify-between">
    <button on:click={() => addGameModal = true} class="flex items-center hover:bg-white/10 hover:scale-105 transition-transform duration-200 rounded-lg px-2 py-1">
        <ListPlus size="18" />
        Add game
    </button>
    <div class="flex items-center gap-2">
        <button on:click={handleDownload} class="relative p-1 rounded-md hover:bg-white/10 group hover:scale-110 transition-transform duration-200">
            <Download size="18" />
            <span class="absolute whitespace-nowrap left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs rounded bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                Download Games List
            </span>
        </button>
        <label for="json-upload" class="relative p-1 rounded-md hover:bg-white/10 group hover:scale-110 transition-transform duration-200">
            <Upload size="18" />
            <span class="absolute whitespace-nowrap left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs rounded bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                Upload Games List
            </span>
        </label>
        <input
            id="json-upload"
            type="file"
            bind:this={fileInput}
            accept="application/json"
            on:change={handleUpload}
            class="hidden"
        />
        <button on:click={() => layout.set('list')} class="relative p-1 rounded-md hover:bg-white/10 group hover:scale-110 transition-transform duration-200">
            <List size="18" />
            <span class="absolute whitespace-nowrap left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs rounded bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                List Layout
            </span>
        </button>
        <button on:click={() => layout.set('grid')} class="relative p-1 rounded-md hover:bg-white/10 group hover:scale-110 transition-transform duration-200">
            <LayoutGrid size="18" />
            <span class="absolute whitespace-nowrap left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs rounded bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                Grid Layout
            </span>
        </button>
    </div>
</div>

{#if $layout === 'list'}
    <div
        use:dndzone={{ items: $games, flipDurationMs: 200 }}
        on:consider={handleDnd}
        on:finalize={handleDnd}
        class="flex flex-col gap-1 max-w-screen-xl mx-auto"
    >
        {#each $games as game (game.id)}
            <button
                on:click={() => handleGameProfileOpen(game)}
                class="flex flex-col items-start gap-2 md:flex-row md:justify-between w-full px-2 py-1 items-center rounded-lg bg-white/10 hover:bg-white/20 hover:scale-105 transition-transform duration-200"
            >
                <div class="flex gap-2 items-center">
                    <img 
                        src={game.image.icon_url} alt={`${game.name} cover`}
                        class="object-cover w-10 h-10"
                    >
                    <h3 class="text-xl font-semibold">{game.name}</h3>
                </div>
                <ul class="flex gap-2 items-center flex-wrap">
                    {#each game.platforms as p}
                            <li class="font-normal text-xs px-2 py-1 bg-[#2d7676]/50 rounded-lg">{p.name}</li>
                    {/each}
                </ul>
            </button>
        {/each}
    </div>
{:else}
    <div
        use:dndzone={{ items: $games, flipDurationMs: 200 }}
        on:consider={handleDnd}
        on:finalize={handleDnd}
        class="max-w-screen-xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-4 mb-4"
    >
        {#each $games as game (game.id)}
            <button on:click={() => handleGameProfileOpen(game)} class="flex flex-col border rounded-lg shadow-sm md:flex-row md:max-w-xl border-gray-700 bg-white/10 hover:bg-white/20 hover:scale-105 transition-transform duration-200">
                <img class="object-cover w-full h-36 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={game.image.medium_url} alt={`${game.name} cover`}>
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h3 class="mb-2 text-lg md:text-2xl font-bold tracking-tight">{game.name}</h3>
                    <p class="mb-2 font-normal text-xs">Release Date: <span>{game.original_release_date}</span></p>
                    <p class="mb-2 text-xs">{game.deck}</p>
                    <ul class="flex flex-wrap gap-2">
                        {#each game.platforms as p}
                                <li class="font-normal text-xs px-2 py-1 bg-[#2d7676]/50 rounded-lg">{p.name}</li>
                        {/each}
                    </ul>
                </div>
            </button>
        {/each}
    </div>
{/if}

{#if addGameModal}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-[#36454f] rounded-lg shadow-lg p-6 min-w-[350px] min-h-[200px] relative max-h-[50vh] max-w-[75vw] overflow-y-auto">
            <button class="absolute top-2 right-2 px-2 hover:bg-white/20 mt-2 rounded-md font-black" on:click={() => addGameModal = false}>
                x
            </button>
            <Search />
        </div>
    </div>
{/if}

{#if gameInfoModal}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-[#36454f] rounded-lg shadow-lg p-6 min-w-[350px] relative max-h-[50vh] max-w-[75vw] overflow-y-auto">
            <button class="absolute top-2 right-2 px-2 hover:bg-white/20 mt-2 rounded-md font-black" on:click={() => gameInfoModal = false}>x</button>
            <GameProfile game={currentGame} />
        </div>
    </div>
{/if}