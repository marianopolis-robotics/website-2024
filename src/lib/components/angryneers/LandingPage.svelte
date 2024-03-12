<script>
	import UserBird from '../home/UserBird.svelte';
	import Popup from './Popup.svelte';
	import { userStore } from '$lib/Store';
	import { BirdStore } from '$lib/BirdStore';

	export let isFr = false;

	let showPopup = false;

	let currentBird = $BirdStore.birds[0];
	let bubbleTriangleHeight;
	let jumpingDuration = 0.5;
	let notDisplayBirds = ['stella', 'pig', 'terence', 'tony', 'user'];

	function displayPopup(bird) {
		currentBird = bird;
		showPopup = true;
	}

	const randomRange = (min, max) => Math.random() * (max - min) + min;
</script>

<div class="landing-container">
	<h1 class="mx-2 my-5 mb-lg-4 display-1 text-white text-center">Angryneers</h1>
	<div class="container">
		<div class="row align-items-center row-cols-1 row-cols-md-2 justify-content-center">
			<div
				class="col col-7 col-md-3 angryneer"
				style="--rotate-duration: {randomRange(0.5, 0.75)}s; --translate-duration: {jumpingDuration}s;"
				on:click={() => displayPopup('user')}
				role="button"
				on:keydown={(event) => event.key == 'Enter' && displayPopup('user')}
				tabindex="0"
				data-tooltip={$userStore.name == '' ? 'Angryneer' : $userStore.name}
			>
				<UserBird />
			</div>
			<div class="col rounded-content-box text-center col-md-9 col-12 p-5 h2">
				{isFr ? 'Bonjour, ' : 'Hi, '}{$userStore.name == '' ? (isFr ? 'Angrynieur' : 'Angryneer') : $userStore.name}!
				{isFr
					? 'Je suis votre superviseur. Cliquer sur chaque member pour en apprendre plus sur ceux-ci!'
					: 'Welcome to the team! Get to know your well teammates by clicking on each one!'}
			</div>
		</div>
	</div>

	<div class="container mb-5">
		<div class="row pt-5 justify-content-center">
			<div class="col justify-content-center stella-container col-6 col-md-3 col-lg-2">
				<button
					class="angryneer stella"
					on:click={() => displayPopup('stella')}
					style="--rotate-duration: {randomRange(0.5, 0.75)}s; --translate-duration: {jumpingDuration}s;"
					data-tooltip={$BirdStore['stella'].name}
				>
					<img src="/birds/stella.svg" alt="stella" class="w-100 h-100" />
				</button>
			</div>
			<div class="col character_column col-6 col-md-3 col-lg-2 text-center me-md-5 justify-content-center p-md-3 left-angryneers">
				<button
					class="angryneer angryneer-group"
					on:click={() => displayPopup('tony')}
					data-tooltip={$BirdStore['tony'].name}
					style="--rotate-duration: {randomRange(0.5, 0.75)}s;
						--translate-duration: {jumpingDuration}s; "
				>
					<img src="/birds/tony.svg" alt={'tony'} />
				</button>
			</div>
			<div class="col my-auto character_column col-6 col-md-3 col-lg-2 text-center justify-content-center p-md-3 right-angryneers">
				<button
					class="angryneer angryneer-group"
					on:click={() => displayPopup('terence')}
					data-tooltip={$BirdStore['terence'].name}
					style="--rotate-duration: {randomRange(0.5, 0.75)}s;
						--translate-duration: {jumpingDuration}s; "
				>
					<img src="/birds/terence.svg" alt={'terence'} />
				</button>
			</div>
		</div>
		<div class="row justify-content-center">
			{#each $BirdStore.birds as bird (bird)}
				{#if !notDisplayBirds.includes(bird)}
					<div
						class="col my-auto character_column col-6 col-md-3 col-lg-2 text-center justify-content-center p-md-3"
						class:left-angryneers={$BirdStore.birds.indexOf(bird) % 2 == 0}
						class:right-angryneers={$BirdStore.birds.indexOf(bird) % 2 != 0}
					>
						<button
							class="angryneer angryneer-group"
							on:click={() => displayPopup(bird)}
							data-tooltip={$BirdStore[bird].name}
							style="--rotate-duration: {randomRange(0.5, 0.75)}s;
						--translate-duration: {jumpingDuration}s; "
						>
							<img src="/birds/{bird}.svg" alt={bird} />
						</button>
					</div>
				{/if}
			{/each}
		</div>
	</div>

	{#if showPopup}
		<Popup bind:showPopup bird={currentBird} {isFr} />
	{/if}
</div>

<style>
	.stella-container {
		position: relative;
	}
	.stella {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	button {
		background: none;
		border: none;
	}

	img {
		height: 100%;
		width: 100%;
	}
	.landing-container {
		overflow-x: hidden;
	}

	.angryneer {
		--final-rotate-duration: var(--rotate-duration);
		--final-translate-duration: 0s;
		animation:
			rotate var(--final-rotate-duration) infinite alternate-reverse,
			translate var(--final-translate-duration) infinite alternate-reverse;
		transform-origin: 50% 100%;
		/* width: 100%; */
		z-index: 0 !important;
	}

	.angryneer:hover {
		--final-translate-duration: var(--translate-duration);
		--final-rotate-duration: 0s !important;
	}

	/* rotate and translate are new css functions and don't pass the validator */
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
	.left-angryneers {
		padding-right: 0px !important;
	}
	.right-angryneers {
		padding-left: 0px !important;
	}

	/* tooltip */
	[data-tooltip] {
		position: relative;
		z-index: 2;
		display: block;
	}

	[data-tooltip]:before,
	[data-tooltip]:after {
		visibility: hidden;
		opacity: 0;
		pointer-events: none;
		transition: 0.2s ease-out;
		transform: translate(-50%, 5px);
	}

	[data-tooltip]:before {
		position: absolute;
		bottom: 100%;
		left: 50%;
		margin-bottom: 5px;
		padding: 7px;
		width: 100%;
		min-width: 70px;
		max-width: 250px;
		-webkit-border-radius: 3px;
		-moz-border-radius: 3px;
		border-radius: 3px;
		background: url('/textures/wood.png') no-repeat scroll 0 0 transparent;
		background-size: cover;
		color: white;
		resize: both;
		font-family: 'Angry Birds';
		font: 40px;
		content: attr(data-tooltip);
		text-align: center;
		transition: 0.2s ease-out;
	}

	[data-tooltip]:after {
		position: absolute;
		bottom: 100%;
		left: 50%;
		width: 0;
		background: url('/textures/wood.png') no-repeat scroll 0 0 transparent;
		background-size: cover;
		border-top: 5px solid hsla(0, 0%, 20%, 0.9);
		border-right: 5px solid transparent;
		border-left: 5px solid transparent;
		content: ' ';
		font-size: 0;
		line-height: 0;
	}

	[data-tooltip]:hover:before,
	[data-tooltip]:hover:after {
		visibility: visible;
		opacity: 1;
		transform: translate(-50%, 0);
	}
	/* [data-tooltip=false]:hover:before,
[data-tooltip=false]:hover:after {
  visibility: hidden;
  opacity: 0;
} */
</style>
