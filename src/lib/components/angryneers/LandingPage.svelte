<script>
	import UserBird from '../home/UserBird.svelte';
	import Popup from './Popup.svelte';
	import { userStore } from '../../../Store';
	import { BirdStore } from '../../../BirdStore';

	export let isFr = false;

	let showPopup = false;

	let currentBird = $BirdStore.birds[0];
	let bubbleTriangleHeight;

	function displayPopup(bird) {
		currentBird = bird;
		showPopup = true;
	}

	const randomRange = (min, max) => Math.random() * (max - min) + min;
</script>

<div class="landing-container">
	<div class="container">
		<div class="row row-cols-2 row-cols-md-3 row-cols-lg-3 justify-content-end">
			<div class="col stella-container">
				<button
					class="angryneer stella"
					on:click={() => displayPopup('stella')}
					style="--rotate-duration: {randomRange(0.5, 0.75)}s; --translate-duration: 0.8s;"
				>
					<img src="/birds/stella.svg" alt="stella" class="w-100 h-100" />
				</button>
			</div>
			<div class="col">
				<!-- <blockquote class="speech bubble h2 speech-text"> -->
				<div class="bubble align-middle p-5 p-md-5 h2 speech-text text-center">
					{isFr ? 'Bonjour, ' : 'Hi, '}{$userStore.name == ''
						? isFr
							? 'Angrynieur'
							: 'Angryneer'
						: $userStore.name}!
					{isFr
						? 'Je suis votre superviseur. Cliquer sur chaque member pour en apprendre plus sur ceux-ci!'
						: 'I am your supervisor. Click on each member to get to know them better!'}

					<div
						class="arrow-border"
						bind:clientHeight={bubbleTriangleHeight}
						style="--triangle-height = {bubbleTriangleHeight}"
					>
						<div class="arrow"></div>
					</div>
				</div>

				<!-- </blockquote> -->
			</div>
			<div class="col pe-5">
				<div
					class="angryneer"
					style="--rotate-duration: {randomRange(0.5, 0.75)}s; --translate-duration: 0.8s;"
					on:click={() => displayPopup('user')}
					role="button"
					on:keydown={(event) => event.key == 'Enter' && displayPopup('user')}
					tabindex="0"
				>
					<UserBird mirrored="true" />
				</div>
			</div>
		</div>
	</div>

	<div class="container mb-5">
		<div class="row">
			{#each $BirdStore.birds as bird (bird)}
				{#if bird != 'user' && bird != 'stella'}
					<div
						class="col character_column col-6 col-md-3 col-lg-2 text-center pe-5 ps-5 pt-5 p-md-3"
						class:left-angryneers={$BirdStore.birds.indexOf(bird) % 2 == 0}
						class:right-angryneers={$BirdStore.birds.indexOf(bird) % 2 != 0}
					>
						<button
							class="angryneer angryneer-group"
							on:click={() => displayPopup(bird)}
							data-tooltip={$BirdStore[bird].name}
							style="--rotate-duration: {randomRange(0.5, 0.75)}s;
						--translate-duration: 0.8s; "
						>
							<img src="/birds/{bird.includes('blue') ? 'blue' : bird}.svg" alt={bird} />
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
		width: 100%;
		z-index: 0 !important;
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
			translate: 0 -30%;
		}
	}
	.left-angryneers {
		padding-right: 0px !important;
	}
	.right-angryneers {
		padding-left: 0px !important;
	}

	/* speech bubble */
	/* source: https://codepen.io/dudleystorey/pen/wMLBLK */

	@font-face {
		font-family: 'SequentialistBB';
		src:
			url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/306FA6_0_0.woff2') format('woff2'),
			url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/306FA6_0_0.woff') format('woff');
		font-style: italic;
		font-weight: 400;
	}

	/* .bubble {
		font-family: SequentialistBB, cursive;
		margin: 0;
	}

	blockquote.bubble {
		margin: 0 auto;
		text-align: center;
		height: 0;
		box-sizing: content-box;
		line-height: 1;
		margin-left: -7vw;
	}

	blockquote.speech {
		background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/speech-bubble.svg);
		background-repeat: no-repeat;
		height: auto;
		width: auto;
		padding-top: 10%;
		padding-bottom: 30%;
		padding-left: 10%;
		padding-right: 10%;
	} */

	.bubble {
		margin: 8px 0;
		background-color: white;
		padding: 10px;
		position: relative;
		/* Adjust these to taste */
		width: auto;
		border: 2px solid #000;
		border-radius: 50%; /* Opera and Chrome */
		position: relative;
	}
	.bubble .arrow {
		position: absolute;
		bottom: -9vh;
		left: 0;
		background-color: white;
		height: 50%;
		width: 20%;
		z-index: 1;
		clip-path: polygon(50% 0%, 0 46%, 100% 0);
		/* border: 2px solid #000; */
	}
	.arrow-border {
		position: absolute;
		bottom: -9vh;
		left: 0;
		background-color: black;
		z-index: -1;
		height: 60%;
		width: 30%;
		clip-path: polygon(50% 0%, 0 46%, 100% 0);
		/* border: 2px solid #000; */
	}

	/* .b {
		border: 0.5vmin solid black;
	}
	.r {
		border-radius: 100%;
	}

	.hb::before,
	.ha::after {
		content: '';
		display: block;
		position: absolute;
	}
	.bubble::before {
		width: 40%;
		height: 100%;
		bottom: -51%;
		border-radius: 50%;
		left: 10%;
		box-shadow:
			0.5vmin 0,
			2vmin -0.5vmin #ffd,
			2vmin -0.5vmin 0 0.5vmin;
		clip-path: polygon(0% 49%, 150% 48%, 150% 100%, 0% 100%);
	} */
	@media only screen and (max-width: 450px) {
		.speech-text {
			font-size: 2vh;
			/* padding-bottom: 50% !important; */
		}
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
