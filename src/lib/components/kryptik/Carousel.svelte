<script>
	import { fade } from 'svelte/transition';

	import { userStore } from '$lib/Store';
	import Slide from './Slide.svelte';

	import Arrow from '$lib/assets/icons/arrow.svg';
	import ArrowDisabled from '$lib/assets/icons/arrow-disabled.svg';

	export let isFr = false;

	$: bird = $userStore.shape;
	$: name = $userStore.name;

	let load = false;
	setTimeout(() => load = true, 100);

	let current_slide = $userStore.level;
	let indices = [1, 2, 3, 4, 5, 6, 7];

	const left = () => {
		if (current_slide > 1) {
			current_slide--;
			$userStore.level = current_slide;
		}
	};
	const right = () => {
		if (current_slide < 7) {
			current_slide++;
			$userStore.level = current_slide;
		}
	};
</script>

<div class="carousel pt-2 pb-3 mx-4 mx-sm-5">
	<div class="top w-100 px-3">
		<table>
			<tr>
				{#each indices as index}
					<td>
						{#if current_slide === index && load}
								<img src="/birds/{bird}.svg" id="userPos" alt="Angry Birds icon" in:fade={{ duration: 100 }} />
						{:else if index < current_slide}
							<svg viewBox="0 0 50 50">
								<circle cx="25" cy="25" r="25" fill="#c48c00" />
							</svg>
						{:else if index > current_slide}
							<svg viewBox="0 0 50 50">
								<circle cx="25" cy="25" r="25" fill="#f5c03b" />
							</svg>
						{/if}
					</td>
				{/each}
			</tr>
		</table>
	</div>
	<div class="slideControls d-flex pt-3 pb-4">
		<div class="left px-3" class:disable={current_slide == 1}>
			<button on:click={left}><img src={current_slide == 1 ? ArrowDisabled : Arrow} alt="Left button" /></button>
		</div>
		<div class="middle px-3">
			{#key current_slide}
				<Slide {current_slide} {bird} {name} {isFr} />
			{/key}
		</div>
		<div class="right px-3" class:disable={current_slide == 7}>
			<button on:click={right}><img src={current_slide == 7 ? ArrowDisabled : Arrow} alt="Right button" /></button>
		</div>
	</div>
</div>

<style>
	div.carousel {
		background-color: #ffedc2;
		border-radius: 10px;
		margin: 1rem 1.5rem 3rem;
		height: 915px;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
		border: solid 0.5px #332400;
	}

	table tr td {
		width: 50px;
		aspect-ratio: 1;
		padding: 0.5rem;
	}

	svg {
		border: inset 0.5px black;
		border-radius: 50%;
	}

	div.top {
		display: flex;
		justify-content: center;
		border-bottom: solid 2px #ffba32;
	}

	div.left, div.right {
		position: absolute;
		transition: opacity 0.15s ease-in-out;
		bottom: 15px;
	}

	div.left {
		left: 0;
	}

	div.right {
		right: 0;
	}

	div.left button img, div.right button img {
		width: fit-content;
	}

	div.left:not(.disable):hover, div.right:not(.disable):hover {
		opacity: 0.8;
	}

	div.left.disable button, div.right.disable button {
		cursor: default;
	}

	div.middle {
		height: 100%;
	}

	button {
		border: none;
		background-color: transparent;
		width: 100%;
		height: 100%;
	}

	div.left button img {
		height: 100%;
		transform: rotate(180deg);
	}

	div.right button img {
		height: 100%;
	}

	#userPos {
		width: 45px;
		filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.8));
	}

	@media screen and (min-width: 450px) {
		div.carousel {
			height: auto;
		}
		
		div.left:not(.disable):hover, div.right:not(.disable):hover {
			background-color: #e5dbc2;
			opacity: 1;
		}

		div.left, div.right {
			position: relative;
			transition: background-color 0.15s ease-in-out;
		}
	}

	@media screen and (min-width: 768px) {
		div.left:not(.disable):hover, div.right:not(.disable):hover {
			background-color: #e5dbc2;
		}
	}
</style>
