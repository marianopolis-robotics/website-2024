<script>
	import { onMount } from 'svelte';
	import { userStore } from "$lib/Store";
	import Intro from '$lib/components/kryptik/Intro.svelte';
	import ControlsGuide from '$lib/components/kryptik/ControlsGuide.svelte';
	import Canvas from '$lib/components/kryptik/Canvas.svelte';
	import Carousel from '$lib/components/kryptik/Carousel.svelte';
	
	let winW, winH; // window width and height
	let landscape = false;
	let mobile;
	
	function checkOrientation() {
		setTimeout(() => landscape = winW > winH ? true : false, 300); // need slight delay for width and height bindings to update to final/correct screen dimensions
	}
	
	onMount(() => {
		checkOrientation();
	}); // load initial screen size (otherwise winW and winH will be 0 until resize :/)
</script>

<svelte:head>
	<meta name="description" content="Learn more about the annual Kryptik Angryneering competition!" />
	<title>Kryptik | Mari Angryneers</title>
</svelte:head>

<svelte:window bind:innerWidth={winW} bind:innerHeight={winH} on:resize={checkOrientation} 
	on:pageshow={() => mobile = window.matchMedia("(pointer: coarse)").matches}></svelte:window>

<Intro name={$userStore.name} />

<Carousel isFr={false} />

<!-- only show 3D simulation if in landscape mode -->
{#if landscape}
	<ControlsGuide name={$userStore.name}>
		Click the simulation window to start a 5-minute Kryptik heat. Press <kbd>Esc</kbd> to exit the simulation.<br />
		<!-- mobile devices have different instructions (joystick, etc.) -->
		{#if mobile}
			Camera: drag right side of simulation screen (slightly shaded) to adjust view.<br />
			Movement: use the joystick in the bottom left corner of the simulation screen.<br />
			Shooting: use the slider in the bottom right to increase or decrease power, click slingshot button to launch a game piece.<br />
			Multiplier: multiplier button will appear when near multiplier, click to place.<br />
		{:else}
			Camera: move mouse to adjust view, <kbd>I</kbd> key to zoom in, <kbd>O</kbd> key to zoom out.<br />
			Movement: <kbd>WASD</kbd> keys to move.<br />
			Shooting: <kbd>Q</kbd> key to increase power, <kbd>E</kbd> key to decrease power, <kbd>Space</kbd> bar to launch a game piece.<br />
			Multiplier: <kbd>M</kbd> key to place on multiplier.<br />
		{/if}
	</ControlsGuide>
	<Canvas {mobile} {winH} />
{:else}
	<p class="landscapeWarning position-relative text-danger pt-2 pb-4 px-5 warning">Please use landscape mode to play the Kryptik simulation.</p>
{/if}

<style>
	p {
		font-size: 1.5rem;
		line-height: 2;
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
