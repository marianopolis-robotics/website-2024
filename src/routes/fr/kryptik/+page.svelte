<svelte:head>
	<meta name="description" content="En apprendre plus sur la compétition annuelle Kryptik!" />
	<title>Kryptik | Angrynieurs Mari</title>
</svelte:head>


<script>
	import Canvas from '$lib/components/kryptik/Canvas.svelte';
	import Carousel from '$lib/components/kryptik/Carousel.svelte';
	import { onMount } from 'svelte';

	let winW, winH; // window width and height
	let landscape = false;

	function checkOrientation() {
		setTimeout(() => landscape = winW > winH ? true : false, 500); // need slight delay for width and height bindings to update to final/correct screen dimensions
	}

	onMount(checkOrientation); // load initial screen size (otherwise winW and winH will be 0 until resize :/)
</script>

<svelte:window bind:innerWidth={winW} bind:innerHeight={winH} on:resize={checkOrientation}></svelte:window>

<h1>Kryptik</h1>

<p>
	The Kryptik Angryneering competition is hosted each year to commemorate the victorious attack on the King Pig's castle, which allowed us to rightfully retrieve the
	eggs. The game was designed to replicate the tactics used during the war, but we removed the original dangerous launching mechanism. In fact, they
	developed a mechanism to launch projectiles other than themselves! First, read the instructions before entering the arena.
</p>

<div>
	<div class="spacer"><Carousel isFr={false} /></div>

	{#if landscape}
		<p>
			Click the simulation window to start. Press the [Esc] key to exit simulation. <br />
			Camera: Move mouse to adjust view, [I] key to zoom in, [O] key to zoom out. <br />
			Movement: [WASD] keys to move. <br />
			Shooting: [Q] key to increase power, [E] key to decrease power, [Space] bar to launch. <br />
			Multiplier: [M] key to place multiplier.
		</p>
		<div class="spacer"><Canvas /></div>
	{:else}
		<p class="landscapeWarning">Please use landscape mode to play the Kryptik simulation.</p>
	{/if}
</div>

<style>
	h1 {
		text-align: center;
	}

	p {
		font-size: 1.5rem;
		width: 75%;
		margin: auto;
		padding: 0px 0px 50px;
	}

	div .spacer {
		padding: 0px 0px 100px;
	}

	.landscapeWarning {
		color: red;
	}
</style>