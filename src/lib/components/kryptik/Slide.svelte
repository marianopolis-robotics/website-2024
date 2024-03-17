<script>
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import FloorScore from '$lib/assets/kryptik/floor-score.png';
	import MultFactorEn from '$lib/assets/kryptik/mult-factor-en.png';
	import MultFactorFr from '$lib/assets/kryptik/mult-factor-fr.png';
	import { enSlides, frSlides } from '$lib/kryptik';
	import UserBird from '../home/UserBird.svelte';

	export let current_slide = 1;
	export let isFr = false;
	export let name = isFr ? 'Angrynieur' : 'Angryneer';

	let slides = isFr ? frSlides : enSlides;

	let slide_info = slides[current_slide];
	let { model, text } = slide_info;
</script>

<div class="content" in:fly={{ delay: 300, duration: 300, axis: 'x', easing: cubicOut }}>
	{#key current_slide}
		{#if current_slide === 7}
		<div class="bird mx-auto">
			<UserBird {isFr}/>
		</div>
		{:else if current_slide === 4}
		<img src={FloorScore} alt={isFr ? 'Pointage sur le plancher du terrain' : 'Field floor score'} />
		{:else if current_slide === 6}
		<img src={isFr ? MultFactorFr : MultFactorEn} alt={isFr ? 'Facteur multiplicateur pour l\'équipe bleu' : 'Multiplier factor for the blue team'} />
		{:else}
		<model-viewer src="/3d-objects/{model}.glb" ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="commerce" poster="/3d-objects/posters/{model}.webp" 
									shadow-intensity="1" environment-image="{current_slide === 2 ? '' : 'legacy'}" shadow-softness="1" exposure="2"></model-viewer>
		{/if}
		<div class="p-wrapper d-flex flex-column justify-content-center">
			{#if current_slide === 7}
				<p>{text[0]} {name ? name : (isFr ? 'Angrynieur' : 'Angryneer')}!</p>
				<p>{text[1]}</p>
				<p>{text[2]}</p>
			{:else}
				{#each text as line}
					<p>{line}</p>
				{/each}
			{/if}
		</div>
	{/key}
</div>

<style>
	model-viewer {
		width: 100%;
		height: 300px;
	}

	img {
		width: 100%;
		align-self: center;
	}

	.content {
		width: 100%;
		height: 750px;
		overflow-y: scroll;
		display: grid;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 2rem;
	}
	.bird {
		height: 70%;
	}
	.p-wrapper {
		width: 100%;
		height: 100%;
	}
	.p-wrapper p {
		font-size: 1.25rem;
	}

	@media screen and (min-width: 450px) {
		.content {
			height: 100%;
			overflow-y: auto;
		}
	}

	@media screen and (min-width: 700px) {
		.bird {
			height: 50%;
		}
		img {
			width: 70%;
			justify-self: center;
		}
	}

	@media screen and (min-width: 1024px) {
		.content {
			height: 500px;
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
		}
		.bird {
			height: 80%;
			width: 50%
		}
		model-viewer {
			height: 100%;
		}
		img {
			width: 400px;
		}
		.p-wrapper {
			height: 100%;
		}
		.p-wrapper p {
			font-size: 1.3rem;
		}
	}
</style>
