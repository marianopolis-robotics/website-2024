<script>
	import { userStore } from '$lib/Store';
	import { onMount } from 'svelte';
	import { fly, blur, fade } from 'svelte/transition';

	export let mirrored = false;
	// let birdImg;
	// let birdImageHeight;
	// onMount(() => {
	// 	if (birdImg) {
	// 		birdImageHeight = birdImg.height;
	// 	}
	// });
	let tallBirds = ['tony', 'terence', 'matilda'];
</script>

<div class="text-center bird_display" class:mirror={mirrored}>
	{#if $userStore.accessory !== 'none'}
		{#key $userStore.accessory}
			<img
				class="accessory"
				class:big_accessory={$userStore.accessory == 'laptop'}
				src='/accessories/{$userStore.accessory}.svg'
				alt={$userStore.hat}
				in:fade={{ duration: 200 }}
			/>
			{/key}
		{/if}
	
	{#if $userStore.hat !== 'none'}
		{#key $userStore.hat}
			<img
				class="hat"
				class:hat-big={tallBirds.includes($userStore.shape)}
				class:mirror={mirrored && $userStore.hat == 'director-hat'}
				src='/hats/{$userStore.hat}.svg'
				alt={$userStore.hat}
				transition:fly={{ duration: 200 }}
			/>
		{/key}
	{/if}

	{#key $userStore.shape}
		<img class="bird" src='/birds/{$userStore.shape}.svg' alt="" in:blur={{ duration: 200 }} />
	{/key}
</div>

<style>
	.hat {
		width: 50%;
		z-index: -1;
		position: absolute;
		top: 10%;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;

		/* position: relative; */
	}
	.mirror {
		-webkit-transform: scaleX(-1);
		transform: scaleX(-1);
	}

	.hat-big {
		width: 50%;
		position: absolute;
		top: -10%;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
	}

	.bird {
		z-index: -2;
		width: 100%;
		height: 100%;
	}

	.accessory {
		float: left;
		width: 50%;
		position: absolute;
		left: -5%;
		top: 45%;
	}

	.big_accessory {
		left: -3vw;
	}

	.bird_display {
		position: relative;
	}

	img {
		position: relative;
	}
</style>
