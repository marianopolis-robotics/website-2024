<script>
	import { onMount } from 'svelte';
	import { userStore } from "$lib/Store";
	import Canvas from '$lib/components/kryptik/Canvas.svelte';
	import Carousel from '$lib/components/kryptik/Carousel.svelte';
	
	let winW, winH; // window width and height
	let landscape = false;
	$: mobile = false;
	
	const checkMobile = () => window.matchMedia("(pointer: coarse)").matches;
	
	function checkOrientation() {
		setTimeout(() => landscape = winW > winH ? true : false, 300); // need slight delay for width and height bindings to update to final/correct screen dimensions
	}
	
	onMount(() => {
		mobile = checkMobile();
		checkOrientation();
	}); // load initial screen size (otherwise winW and winH will be 0 until resize :/)
</script>

<svelte:head>
	<meta name="description" content="Learn more about the annual Kryptik Angryneering competition!" />
	<title>Kryptik | Mari Angryneers</title>
</svelte:head>

<svelte:window bind:innerWidth={winW} bind:innerHeight={winH} on:resize={checkOrientation}></svelte:window>

<h1 class="mx-2 my-5 mt-lg-2 mb-lg-4 display-1 text-white">Kryptik</h1>

<p class="pb-4 px-5 lh-lg">
	We're very excited to see that you're interested in Kryptik, {$userStore.name ? $userStore.name : 'Angryneer'}! The Kryptik Angryneering competition is organized each year by the CRC to commemorate the victorious attack on the King Pig's castle, which allowed us to rightfully retrieve the
	eggs. This year, Kryptik 2024 will take place at École Curé-Antoine-Labelle (216 Blvd Marc-Aurèle-Fortin, Laval, QC) from April 11th to 13th! <br />
	The game was designed to replicate the tactics used during the war, but we removed the original dangerous launching mechanism. In fact, they
	developed a mechanism to launch projectiles other than themselves! First, read the instructions before entering the arena. <br />
	New to the Kryptik competition or unfamiliar with angryneering in general? We've prepared detailed instructions below for you to
	read before entering the arena! If you want to go the extra mile, you can train for Kryptik 2024 using our 3D simulation!
</p>

<div>
	<Carousel isFr={false} />

	{#if landscape}
		<h2 class="text-center display-4 mt-5 mb-3">Ready to play, {$userStore.name ? $userStore.name : 'Angryneer'}?</h2>
		<p class="py-4 px-5 text-center instructions m-5">
			Click the simulation window to start a 5-minute Kryptik heat. Press <kbd>Esc</kbd> to exit the simulation.<br />
			Camera: Move mouse to adjust view, <kbd>I</kbd> key to zoom in, <kbd>O</kbd> key to zoom out.<br />
			Movement: <kbd>WASD</kbd> keys to move.<br />
			Shooting: <kbd>Q</kbd> key to increase power, <kbd>E</kbd> key to decrease power, <kbd>Space</kbd> bar to launch.<br />
			Multiplier: <kbd>M</kbd> key to place multiplier.<br />
			<span class="warning mt-3 mb-0">Warning: if you restart, leave the page or close the tab before completing the heat, you will lose all progress in the simulation!</span>
		</p>
		<Canvas {mobile} />
	{:else}
		<p class="landscapeWarning position-relative text-danger pt-2 pb-4 px-5 warning">Please use landscape mode to play the Kryptik simulation.</p>
	{/if}
</div>

<style>
	h1 {
		text-align: center;
	}

	p {
		font-size: 1.5rem;
		line-height: 2;
	}

	.instructions {
		background-color: rgba(255, 237, 194, 0.6);
		border-radius: 10px;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
		border: solid 0.5px #332400;
	}

	.warning {
		color: #990000;
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
