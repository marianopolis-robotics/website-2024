<script>
	import UserBird from '../home/UserBird.svelte';
	import Popup from './Popup.svelte';
	import { userStore } from '../../../Store';

	let showPopup = false;
	let birds = [
		'poppy',
		'blue1',
		'blue2',
		'blue3',
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
		'terence',
		'tony',
		'willow',
	];

	let currentBird = birds[0];

	function displayPopup(bird) {
		showPopup = true;
		currentBird = bird;
	}

	const randomRange = (min, max) => Math.random() * (max - min) + min;
</script>

<div>
	<div class="container">
		<div class="row row-cols-2 row-cols-md-3 row-cols-lg-3 justify-content-end">
			<div class="col ">
				<button
			class="angryneer m-5"
			on:click={() => displayPopup("stella")}
			style="--rotate-duration: {randomRange(0.5, 0.75)}s; --translate-duration: 0.8s;">
			<img src="/birds/stella.svg" alt="stella" class="w-100 h-100"/>
			</button>
				
			</div>
			<div class="col ">
				<blockquote class="speech bubble">Meet your team, {$userStore.name}</blockquote>
			</div>
			<div class="col p-5">
				<div class="angryneer" style="--rotate-duration: {randomRange(0.5, 0.75)}s; --translate-duration: 0.8s;"
				on:click={() => displayPopup("user")}
				role="button"
				on:keydown={(event) => ((event.key == 'Enter') && displayPopup("user"))}
				tabindex="0"
				>
					<UserBird/>
				</div>
			</div>
		</div>
	</div>

	<div class="container mb-5">
		<div class="row ">
			{#each birds as bird (bird)}
				
				<div class="col  character_column col-6 col-md-3 col-lg-2 text-center p-5 p-md-3">
					<button
					class="angryneer angryneer-group "
					on:click={() => displayPopup(bird)}
					style="--rotate-duration: {randomRange(0.5, 0.75)}s;
					 --translate-duration: 0.8s; "
					 >
					<img src="/birds/{bird.includes("blue") ? "blue" : bird}.svg" alt={bird} data-bs-toggle="tooltip" title={bird}/>
					</button>
				</div>
			{/each}
		</div>
		
	</div>
	
			
		
	
	


	<Popup bind:showPopup bird={currentBird} />
	<br/> 
</div>

<style>

	
	button {
		background: none;
		border: none;
	}

	img {
		height: 100%;
		width: 100%;
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
			translate: 0 -30%;
		}
	}

	/* speech bubble */
	/* source: https://codepen.io/dudleystorey/pen/wMLBLK */
	
	@font-face {
		font-family: 'SequentialistBB';
		src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/306FA6_0_0.woff2') format('woff2'),
		url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/306FA6_0_0.woff') format('woff');
		font-style: italic;
		font-weight: 400;
		}
	
	.bubble { 
		font-family: SequentialistBB, cursive; 
		font-size: 2.5vw; 
		/* make size 3.5 on phone */
		margin: 0;
	}
	
	blockquote.bubble { 
		
		margin: 0 auto;
		text-align: center;
		height: 0;
		box-sizing: content-box;
		line-height: 1;
		margin-left: -7vw
	}
	
	blockquote.speech {
	background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/speech-bubble.svg); 
	height: 40%;
	padding-top: 20%;
		padding-bottom: 20%;
	}
</style>
