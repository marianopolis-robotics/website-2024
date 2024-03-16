<script>
	import { userStore } from '$lib/Store';
	import { onMount } from 'svelte';
	import { fly, blur, fade } from 'svelte/transition';

	export let mirrored = false;
	export let isFr;
	export let displayAccessory=true;
	// let birdImg;
	// let birdImageHeight;
	// onMount(() => {
	// 	if (birdImg) {
	// 		birdImageHeight = birdImg.height;
	// 	}
	// });
	let tallBirds = ['tony', 'terence', 'matilda'];

	let hatPositions = {
		construction: 25,
		gear: 15,
		hacker: 20,
		director: 20
	};
	let accesorySizes = {
		measuringTape: 25,
		caliper: 25,
		laptop: 35,
		screwdriver: 30
	};
	let hatElement;
	$: hatElement && hatElement.style.setProperty('--position-top', `${hatPositions[$userStore.hat.substring(0, $userStore.hat.length - 4)]}%`);
	let accessoryElement;
	$: accessoryElement && accessoryElement.style.setProperty('--accessory-size', `${accesorySizes[$userStore.accessory]}%`);
</script>

<div class="text-center bird_display" bind:this={accessoryElement} class:mirror={mirrored}>
	{#if $userStore.accessory !== 'none' && displayAccessory}
		{#key $userStore.accessory}
			<img
				class="accessory"
				class:big_accessory={$userStore.accessory == 'laptop'}
				src="/accessories/{$userStore.accessory}.svg"
				alt={isFr ? 'L\'accessoire de l\'utilisateur' : 'The user\'s accessory'}
				in:fade={{ duration: 400 }}
			/>
		{/key}
	{/if}

	{#if $userStore.hat !== 'none'}
		{#key $userStore.hat}
			<img
				class="hat"
				class:hat-big={tallBirds.includes($userStore.shape)}
				class:mirror={mirrored && $userStore.hat == 'director-hat'}
				bind:this={hatElement}
				src="/hats/{$userStore.hat}.svg"
				alt={isFr ? 'Le chapeau de l\'utilisateur' : 'The user\'s hat'}
				transition:fly={{ duration: 400 }}
			/>
		{/key}
	{/if}
	{#key $userStore.shape}
		<img class="bird" src="/birds/{$userStore.shape}.svg" alt={isFr ? 'L\'Angrynieur de l\'utilisateur' : 'The user\'s Angryneer'} in:blur={{ duration: 400 }} />
	{/key}
</div>

<style>
	:root {
		--position-top: inherit;
		--accessory-size: inherit;
	}
	.hat {
		width: 50%;
		z-index: 2;
		position: absolute;
		top: var(--position-top);
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
		top: calc(var(--position-top) -25%);
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
	}

	.bird {
		z-index: 1;
		width: 100%;
		height: 100%;
	}

	.accessory {
		float: left;
		width: var(--accessory-size);
		position: absolute;
		/* left: -5%; */
		bottom: 10%;
		z-index: 2;
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
