<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	import Navbar from '$lib/components/Navbar.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />

<main class="pt-25">
	{@render children?.()}
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Ysabeau+SC:wght@1..1000&display=swap');

	:root {
		background-color: #36454f;
		color: #eff0f0;
		font-family: "Ysabeau SC", sans-serif;
	}
</style>