<script lang="ts">
    import { ListPlus } from "@lucide/svelte";
    import Search from "$lib/components/Search.svelte";

    let showModal = false;
</script>

<div class="max-w-screen-xl mx-auto border-b-2 border-gray-600 mx-auto p-1">
    <button on:click={() => showModal = true} class="flex items-center hover:bg-white/10 hover:scale-105 transition-transform duration-200 rounded-lg px-2 py-1">
        <ListPlus size="18" />
        Add game
    </button>
</div>

{#if showModal}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-[#36454f} rounded-lg shadow-lg p-6 min-w-[350px] relative max-h-[50vh] overflow-y-auto">
            <button class="absolute top-2 right-2 px-2 hover:bg-white/20 mt-2 rounded-md font-black" on:click={() => showModal = false}>
                x
            </button>
            <h2 class="text-lg font-bold mb-4">Search and Add game</h2>
            <Search />
        </div>
    </div>
{/if}