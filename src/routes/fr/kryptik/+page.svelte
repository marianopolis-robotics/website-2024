<script>
	import { onMount } from 'svelte';
	import { userStore } from "$lib/Store";
	import Canvas from '$lib/components/kryptik/Canvas.svelte';
	import Carousel from '$lib/components/kryptik/Carousel.svelte';
	
	let winW, winH; // window width and height
	let landscape = false;

	function checkOrientation() {
		setTimeout(() => landscape = winW > winH ? true : false, 500); // need slight delay for width and height bindings to update to final/correct screen dimensions
	}

	onMount(checkOrientation); // load initial screen size (otherwise winW and winH will be 0 until resize :/)
</script>

<svelte:head>
	<meta name="description" content="En savoir plus sur Kryptik, la compétition d'angryneering annuelle!" />
	<title>Kryptik | Angrynieurs Mari</title>
</svelte:head>

<svelte:window bind:innerWidth={winW} bind:innerHeight={winH} on:resize={checkOrientation}></svelte:window>

<h1 class="mx-2 my-5 mt-lg-2 mb-lg-4 display-1 text-white">Kryptik</h1>

<p class="pb-4 px-5">
	Nous sommes ravis que vous vous intéressez à l'angryneering, {$userStore.name ? $userStore.name : 'Angrynieur'}! La compétition d'angryneering annuelle Kryptik est organisée chaque année par la CRC to commemorate the victorious attack on the King Pig's castle, which allowed us to rightfully retrieve the
	eggs. Cette année, Kryptik 2024 aura lieu à École Curé-Antoine-Labelle (216 Blvd Marc-Aurèle-Fortin, Laval, QC) les 11 à 13 avril!
</p>
<p class="pb-4 px-5">
	 The game was designed to replicate the tactics used during the war, but we removed the original dangerous launching mechanism. In fact, they
	developed a mechanism to launch projectiles other than themselves! First, read the instructions before entering the arena.
</p>
<p class="pb-4 px-5">
	New to the Kryptik competition or unfamiliar with angryneering in general? We've prepared detailed instructions below for you to
	read before entering the arena! If you want to go the extra mile, you can train for Kryptik 2024 using our 3D simulation!
</p>

<div>
	<Carousel isFr={true} />

	{#if landscape}
		<h2 class="text-center display-4 mt-5 mb-3">Prêt à jouer, {$userStore.name ? $userStore.name : 'Angrynieur'}?</h2>
		<p class="py-4 px-5 text-center instructions m-5">
			Cliquez sur la fenêtre de la simulation pour démarrer une joute Kryptik de 5 minutes. Press <kbd>Esc</kbd> to exit the simulation.<br />
			Camera: Move mouse to adjust view, <kbd>I</kbd> key to zoom in, <kbd>O</kbd> key to zoom out.<br />
			Movement: <kbd>WASD</kbd> keys to move.<br />
			Shooting: <kbd>Q</kbd> key to increase power, <kbd>E</kbd> key to decrease power, <kbd>Space</kbd> bar to launch.<br />
			Multiplier: <kbd>M</kbd> key to place multiplier.<br />
			<span class="warning mt-3 mb-0">Warning: if you restart, leave the page or close the tab before completing the heat, you will lose all progress in the simulation!</span>
		</p>
		<Canvas isFr={true} />
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
