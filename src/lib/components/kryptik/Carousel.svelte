<script>
	import { fade } from 'svelte/transition';

	import { userStore } from '$lib/Store';
	import Slide from './Slide.svelte';

	import Arrow from '$lib/assets/icons/arrow.svg';
	import ArrowDisabled from '$lib/assets/icons/arrow-disabled.svg';

	export let isFr = false;

	const bird = $userStore.shape;
	let load = false;
	setTimeout(() => load = true, 100);

	let current_slide = 1;
	let indices = [1, 2, 3, 4, 5, 6];

	const left = () => {
		if (current_slide > 1) {
			current_slide--;
		}
	};
	const right = () => {
		if (current_slide < 6) {
			current_slide++;
		}
	};
</script>

<div class="carousel pt-2 pb-3">
	<div class="top w-100 px-3">
		<table>
			<tr>
				{#each indices as index}
					<td>
						{#if current_slide === index && load}
								<img src="/birds/{bird}.svg" id="userPos" alt="Angry Birds icon" in:fade={{ duration: 100 }} />
						{:else}
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
				<Slide {current_slide} {bird} {isFr} />
			{/key}
		</div>
		<div class="right px-3" class:disable={current_slide == 6}>
			<button on:click={right}><img src={current_slide == 6 ? ArrowDisabled : Arrow} alt="Right button" /></button>
		</div>
	</div>
</div>

<style>
	div.carousel {
		background-color: #ffedc2;
		border-radius: 10px;
		margin: 1rem 1.5rem 3rem;
	}

	table tr td {
		width: 40px;
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
	}

	div.left, div.right {
		transition: background-color 0.15s ease-in-out;
	}

	div.left button img, div.right button img {
		width: fit-content;
	}

	div.left:not(.disable):hover, div.right:not(.disable):hover {
		background-color: #e5dbc2;
	}

	div.left.disable button, div.left.disable button {
		cursor: auto;
	}

	div.middle {
		height: 400px;
		overflow-y: scroll;
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
		width: 35px;
	}

	@media screen and (min-width: 768px) {
		div.left:not(.disable):hover, div.right:not(.disable):hover {
			background-color: #e5dbc2;
		}
	}
</style>
