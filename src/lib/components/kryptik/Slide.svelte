<script>
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	export let current_slide = 1;
	export let isFr = false;
 	export let bird;
	import { enSlides, frSlides } from '$lib/kryptik';

	let slides = isFr ? frSlides : enSlides;

	let slide_info = slides[current_slide];
	let { images, text } = slide_info;

</script>

<div class="content" in:fly={{ delay: 300, duration: 300, axis: 'x', easing: cubicOut }} out:fly={{ duration: 300, axis: 'x', easing: cubicOut }}>
	{#key current_slide}
	<div class="images-wrapper">
		{#if current_slide === 6}
			<div class="img-wrapper">
				<img src='/birds/{bird}.svg' alt={isFr ? 'L\'Angrynieur de l\'utilisateur' : 'The user\'s Angryneer'} />
			</div>
		{:else}
		{#each images as { url, alternate_text }}
			<div class="img-wrapper">
				<img src={url} alt={alternate_text} />
			</div>
		{/each}
		{/if}
	</div>
	<div class="p-wrapper">
		<div class="scroll-container">
			<p>
				{text}
			</p>
		</div>
	</div>
	{/key}
</div>

<style>
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.images-wrapper {
		width: 100%;
		max-height: 50%;
		display: flex;
		flex-direction: column;
	}
	.p-wrapper {
		padding: 5%;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	}
	.p-wrapper p {
		margin: 0px;
		text-align: justify;
	}

	@media screen and (min-width: 800px) {
		.content {
			width: 100%;
			height: 100%;
			flex-direction: row;
		}
		.images-wrapper {
			width: 50%;
			height: 100%;
			flex-direction: column;
		}
		.p-wrapper {
			width: 50%;
			height: 100%;
			overflow-y: scroll;
		}
		.p-wrapper p {
			margin: 0px;
			padding: 30px;
			text-align: justify;
			font-size: 2vh;
		}
	}
	.img-wrapper img {
		height: 100%;
		max-width: 100%;
		object-fit: contain;
		display: block;
		margin: auto;
	}
	.scroll-container {
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
