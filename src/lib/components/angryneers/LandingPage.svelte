<script>
	import Popup from './Popup.svelte';

	let showPopup = false;
	let birds = [
		'poppy',
		'blue',
		'bomb',
		'bubbles',
		'chuck',
		'dahlia',
		'drill',
		'hal',
		'ice',
		'luca',
		'matilda',
		'melody',
		'red',
		'silver',
		'stella',
		'terence',
		'tony',
		'willow'
	];

	let currentBird = birds[0];

	function displayPopup(bird) {
		showPopup = true;
		currentBird = bird;
	}

	const randomRange = (min, max) => Math.random() * (max - min) + min;
</script>

<div>
	{#each birds as bird (bird)}
		<button
			class="angryneer m-5"
			on:click={() => displayPopup(bird)}
			style="--rotate-duration: {randomRange(0.5, 0.75)}s; --translate-duration: {randomRange(
				0.5,
				2
			)}s;"><img src="/birds/{bird}.svg" alt={bird} /></button
		>
	{/each}

	<p>{currentBird}</p>

	<Popup bind:showPopup bird={currentBird} />
</div>

<style>
	button {
		background: none;
		border: none;
	}

	img {
		height: 150px;
		width: 150px;
	}

	.angryneer {
		--final-rotate-duration: var(--rotate-duration);
		--final-translate-duration: 0s;
		animation:
			rotate var(--final-rotate-duration) infinite alternate-reverse,
			translate var(--final-translate-duration) infinite alternate-reverse;
		transform-origin: 50% 100%;
	}

	.angryneer:hover {
		--final-translate-duration: var(--translate-duration);
	}

	@keyframes rotate {
		0% {
			rotate: -15deg;
		}
		100% {
			rotate: 15deg;
		}
	}

	@keyframes translate {
		0% {
			translate: 0 0%;
		}
		100% {
			translate: 0 -10%;
		}
	}
</style>
