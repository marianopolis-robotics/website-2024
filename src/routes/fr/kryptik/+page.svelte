<script>
	import { onMount } from 'svelte';
	import { userStore } from "$lib/Store";
	import Intro from '$lib/components/kryptik/Intro.svelte';
	import ControlsGuide from '$lib/components/kryptik/ControlsGuide.svelte';
	import Canvas from '$lib/components/kryptik/Canvas.svelte';
	import Carousel from '$lib/components/kryptik/Carousel.svelte';
	
	let winW, winH; // window width and height
	let landscape = false;
	let name = $userStore.name;

	let mobile;

	function checkOrientation() {
		setTimeout(() => landscape = winW > winH ? true : false, 500); // need slight delay for width and height bindings to update to final/correct screen dimensions
	}

	onMount(() => {
		checkOrientation();
	}); // load initial screen size (otherwise winW and winH will be 0 until resize :/)
</script>

<svelte:head>
	<meta name="description" content="En savoir plus sur Kryptik, la compétition d'angryneering annuelle!" />
	<title>Kryptik | Angrynieurs Mari</title>
</svelte:head>

<!-- mobile devices tend to have a coarse pointer instead of a fine/precise pointer -->
<svelte:window bind:innerWidth={winW} bind:innerHeight={winH} on:resize={checkOrientation} 
	on:pageshow={() => mobile = window.matchMedia("(pointer: coarse)").matches}></svelte:window>

<Intro {name} isFr={true} />

<Carousel isFr={true} />

<!-- only show 3D simulation if in landscape mode -->
{#if landscape}
	<ControlsGuide isFr={true} {name}>
		<!-- mobile devices have different instructions (joystick, etc.) -->
		{#if mobile}
			Caméra: drag right side of simulation screen (slightly shaded) to adjust view.<br />
			Mouvement: use the joystick in the bottom left corner of the simulation screen.<br />
			Projection: use the slider in the bottom right to increase or decrease power, click slingshot button to launch.<br />
			Multiplicateur: multiplier button will appear when near multiplier, click to place.<br />
		{:else}
			Cliquez sur la fenêtre de la simulation pour démarrer une joute Kryptik de 5 minutes. Appuyez sur <kbd>Esc</kbd> pour sortir de la simulation.<br />
			Caméra: déplacez votre curseur pour changer l'orientation de la vue, utilisez la touche <kbd>I</kbd> pour zoomer, <kbd>O</kbd> pour effectuer un zoom arrière.<br />
			Mouvement: les touches <kbd>WASD</kbd> pour déplacer le robot.<br />
			Projection: la touche <kbd>Q</kbd> pour augmenter la puissance, <kbd>E</kbd> pour diminuer la puissance, la barre <kbd>Espace</kbd> pour lancer.<br />
			Multiplicateur: la touche <kbd>M</kbd> pour activer un multiplicateur.<br />
		{/if}
	</ControlsGuide>
	<Canvas isFr={true} {mobile} {winH} />
{:else}
	<p class="landscapeWarning position-relative text-danger pt-2 pb-4 px-5">Veuillez utiliser votre appareil en mode paysage pour jouer la simulation Kryptik.</p>
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
