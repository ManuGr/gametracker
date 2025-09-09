<script lang="ts">
    let gameName = '';
    let results = [];

    async function handleSearch() {
        if (!gameName) {
            results = [];
            return;
        }

        const res = await fetch(`api/search?q=${encodeURIComponent(gameName)}`);
        results = await res.json();
    }
</script>

<form on:submit|preventDefault={handleSearch} class="max-w-md mx-auto mb-4">
    <label for="search" class="mb-2 text-sm font-medium sr-only">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
        </div>
        <input
            type="search"
            id="search"
            bind:value={gameName}
            placeholder="Search for a game..."
            class="block w-full p-4 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
        >
        <button type="submit" class="absolute end-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 bg-[#2d7676]/75 hover:bg-[#2d7676]">Search</button>
    </div>
</form>

<ul class="grid grid-cols-2 md:flex md:flex-col gap-2">
    {#each results as game}
        <li>
            <div class="flex flex-col items-center border rounded-lg shadow-sm md:flex-row md:max-w-xl border-gray-700 bg-white/10 hover:bg-white/20 hover:scale-105 transition-transform duration-200">
                <img class="object-cover w-full rounged-t-lg h-48 md:h-auto md:w-36 md:rounded-none md:rounded-s-lg" src={game.image.thumb_url} alt={`${game.name} cover`}>
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h3 class="mb-2 text-2xl font-bold tracking-tight">{game.name}</h3>
                    <p class="mb-3 font-normal text-sm">Release Date: <span>{game.original_release_date}</span></p>
                    {#each game.platforms as p}
                        <ul class="flex">
                            <li class="font-normal text-xs">{p.name}</li>
                        </ul>
                    {/each}
                </div>
            </div>
        </li>
    {/each}
</ul>