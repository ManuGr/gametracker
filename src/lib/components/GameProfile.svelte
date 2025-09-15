<script lang="ts">
    import { Star, ChevronDown } from "@lucide/svelte";
    import { games } from "$lib/stores/games";

    export let game: any;

    const maxRating = 5;
    let hovered = -1;
    let openMenu = false;

    const status = [
        {
            status: "owned",
            color: "bg-[#2d7676]/25"
        },
        {
            status: "playing",
            color: "bg-[#2d7676]/50"
        },
        {
            status: "completed",
            color: "bg-[#2d7676]/75"
        }
    ]

    function setRating(r: number) {
        games.update(list => list.map(g => g.id === game.id ? {...g, rating: r } : g ));

        game.rating = r;
    }

    function setStatus(s: string) {
        games.update(list => list.map(g => g.id === game.id ? {...g, status: s} : g));

        game.status = s;

        openMenu = false;
    }
</script>

<h1 class="text-2xl font-semibold">{game.name}</h1>
<div class="flex gap-4">
    <img src={game.image.medium_url} alt={`${game.name} cover image`} class="w-full h-[20vh] object-cover">

    <div class="flex flex-col">
        <div class="flex gap-2 mt-4 mb-2">
            {#each Array(maxRating) as _, i}
                <button type="button"
                    class={`${(hovered >= 0 && i <= hovered) ? 'scale-125' : ''} hover:scale-125 transition-transform duration-200`}
                    on:click={() => setRating(i+1)}
                    on:mouseenter={() => hovered = i}
                    on:mouseleave={() => hovered = -1}
                    aria-label={`Set rating to ${i+1}`}
                >
                    <Star color={i < game.rating ? '#FFD700' : '#888'} fill={i < game.rating ? '#FFD700' : '#333'} />
                </button>
            {/each}
        </div>

        <button on:click={() => openMenu = !openMenu} class={`text-lg mb-2 py-1 px-2 ${status.find(s => game.status === s.status)?.color} rounded-lg flex justify-around items-center`}>
            {game.status.charAt(0).toUpperCase() + game.status.slice(1).toLowerCase()}
            <ChevronDown size="18"/>
        </button>
        <div class={`${openMenu ? "" : "hidden"} z-10 bg-white/20 divide-y divide-gray-100 rounded-lg shadow-sm`}>
            <ul class="py-2 text-sm">
                {#each status as s}
                    <li>
                        <button on:click={() => setStatus(s.status)} class="block w-full px-4 py-2 hover:bg-white/20">
                            {s.status}
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</div>