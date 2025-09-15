<script lang="ts">
    import { Star } from "@lucide/svelte";
    import { games } from "$lib/stores/games";

    export let game: any;
    const maxRating = 5;
    let hovered = -1;

    function setRating(r: number) {
        games.update(list => list.map(g => g.id === game.id ? {...g, rating: r }: g ));

        game.rating = r;
    }
</script>

<h1 class="text-2xl font-semibold">{game.name}</h1>

<div class="flex gap-2 mt-4">
    {#each Array(maxRating) as _, i}
        <button type="button"
            class={`${(hovered >= 0 && i <= hovered) ? 'scale-125' : ''} hover:scale-125 transition-transform duration-200`}
            on:click={() => setRating(i+1)}
            on:mouseenter={() => hovered = i}
            on:mouseleave={() => hovered = -1}
            aria-label={`Set rating to ${i+1}`}
        >
            <Star color={i < game.rating ? '#FFD700' : '#888'} fill={i < game.rating ? '#FFD700' : ''} />
        </button>
    {/each}
</div>