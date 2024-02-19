<svelte:head>
	<meta name="description" content="Learn more about the annual Kryptik Angryneering competition!" />
	<title>Kryptik | Mari Angryneers</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import Canvas from '$lib/components/kryptik/Canvas.svelte';
	import Carousel from '$lib/components/kryptik/Carousel.svelte';
	
	let winW, winH; // window width and height
	let landscape = false;

	function checkOrientation() {
		setTimeout(() => landscape = winW > winH ? true : false, 500); // need slight delay for width and height bindings to update to final/correct screen dimensions
	}

	onMount(checkOrientation); // load initial screen size (otherwise winW and winH will be 0 until resize :/)
</script>

<svelte:window bind:innerWidth={winW} bind:innerHeight={winH} on:resize={checkOrientation}></svelte:window>

<h1 class="px-2 py-5 display-1">Kryptik</h1>

<p class="pb-4 px-5">
	The Kryptik Angryneering competition is hosted each year to commemorate the victorious attack on the King Pig's castle, which allowed us to rightfully retrieve the
	eggs.
</p>
<p class="pb-4 px-5">
	 The game was designed to replicate the tactics used during the war, but we removed the original dangerous launching mechanism. In fact, they
	developed a mechanism to launch projectiles other than themselves! First, read the instructions before entering the arena.
</p>
<p class="pb-4 px-5">
	New to the Kryptik competition or unfamiliar with angryneering in general? We've prepared detailed instructions below for you to
	read before entering the arena!
</p>

<div>
	<Carousel isFr={false} />

	{#if landscape}
		<h2 class="text-center display-4 mb-3">Ready to play?</h2>
		<p class="pb-4 px-5">
			Click the simulation window to start. Press the [Esc] key to exit simulation. <br />
			Camera: Move mouse to adjust view, [I] key to zoom in, [O] key to zoom out. <br />
			Movement: [WASD] keys to move. <br />
			Shooting: [Q] key to increase power, [E] key to decrease power, [Space] bar to launch. <br />
			Multiplier: [M] key to place multiplier.
		</p>
		<Canvas />
	{:else}
		<p class="landscapeWarning position-relative text-danger pt-2 pb-4 px-5">Please use landscape mode to play the Kryptik simulation.</p>
	{/if}
</div>

<style>
	h1 {
		text-align: center;
	}

	p {
		font-size: 1.5rem;
	}

	.landscapeWarning::before {
		position: absolute;
		content: "";
		background: white;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0.2;
		z-index: -1;
	}
</style>
