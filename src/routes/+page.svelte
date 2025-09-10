<script lang="ts">
    import { ListPlus } from "@lucide/svelte";
    import Search from "$lib/components/Search.svelte";
    import { games } from "$lib/stores/games";

    let showModal = false;
</script>

<div class="max-w-screen-xl mx-auto border-b-2 border-gray-600 mx-auto p-1 mb-4">
    <button on:click={() => showModal = true} class="flex items-center hover:bg-white/10 hover:scale-105 transition-transform duration-200 rounded-lg px-2 py-1">
        <ListPlus size="18" />
        Add game
    </button>
</div>

<div class="max-w-screen-xl mx-auto grid grid-cols-2 gap-4">
    {#each $games as game}
        <a href="/" class="flex flex-col border rounded-lg shadow-sm md:flex-row md:max-w-xl border-gray-700 bg-white/10 hover:bg-white/20 hover:scale-105 transition-transform duration-200">
            <img class="object-cover w-full h-36 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={game.image.thumb_url} alt={`${game.name} cover`}>
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
        </a>
    {/each}
</div>

{#if showModal}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-[#36454f] rounded-lg shadow-lg p-6 min-w-[350px] relative max-h-[50vh] max-w-[75vw] overflow-y-auto">
            <button class="absolute top-2 right-2 px-2 hover:bg-white/20 mt-2 rounded-md font-black" on:click={() => showModal = false}>
                x
            </button>
            <Search />
        </div>
    </div>
{/if}