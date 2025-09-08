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
        console.log(results[0].image);
    }
</script>

<form on:submit|preventDefault={handleSearch}>
    <input type="text" bind:value={gameName} placeholder="Search for a game...">
    <button type="submit">Search</button>
</form>

<ul>
    {#each results as game}
        <li>
            <div class="flex gap-2">
                <img src={game.image.icon_url} alt={`${game.name} cover`}>
                <h1>{game.name}</h1>
            </div>
        </li>
    {/each}
</ul>