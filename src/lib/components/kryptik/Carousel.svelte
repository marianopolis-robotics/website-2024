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

	$: current_slide = $userStore.level;
	let indices = [1, 2, 3, 4, 5, 6, 7];

	const left = () => {
		if (current_slide > 1) {
			$userStore.level--; // since current_slide is reactive, it'll update automatically as $userStore.level changes
		}
	};
	const right = () => {
		if (current_slide < 7) {
			$userStore.level++;
		}
	};
</script>

<h2 class="text-center display-4 mt-5 mb-3 text-black">{isFr ? 'Entraînez-vous pour Kryptik' : 'Train for Kryptik'}</h2>
<hr class="w-50 mx-auto text-dark opacity-75" />
<div class="carousel pt-2 pb-3 mx-4 mx-sm-5 mb-5">
	<div class="top w-100 px-3">
		<table>
			<tr>
				{#each indices as index}
					<td>
						{#if current_slide === index && load}
							<img src="/birds/{bird}.svg" id="userPos" alt="Angry Birds icon" in:fade={{ duration: 100 }} />
						{:else}
							<button class="pagination" class:passed={index < current_slide} on:click={() => $userStore.level = index}></button>
						{/if}
					</td>
				{/each}
			</tr>
		</table>
	</div>
	<div class="slideControls d-flex pt-3 pb-4">
		<div class="left" class:disable={current_slide == 1}>
			<button class="px-3" on:click={left}><img src={current_slide == 1 ? ArrowDisabled : Arrow} alt="Left button" /></button>
		</div>
		<div class="middle px-3">
			{#key current_slide}
				<Slide {current_slide} {bird} {name} {isFr} />
			{/key}
		</div>
		<div class="right" class:disable={current_slide == 7}>
			<button class="right px-3" on:click={right}><img src={current_slide == 7 ? ArrowDisabled : Arrow} alt="Right button" /></button>
		</div>
	</div>
</div>

<style>
	div.carousel {
		background-color: #ffedc2;
		border-radius: 10px;
		margin: 2rem 1.5rem 3rem;
		height: 915px;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
		border: solid 0.5px #332400;
	}

	.pagination, table tr td {
		width: 15px;
	}

	#userPos {
		width: 20px;
	}

	.pagination {
		border-radius: 50%;
		aspect-ratio: 1;
		border: inset 2px black;
		background-color: #f5c03b;
		filter: opacity(1);
		transition: filter 0.15s ease-in-out;
	}

	.pagination.passed {
		background-color: #c48c00;
	}

	.pagination:hover {
		filter: opacity(0.8);
		border-width: 1px;
	}

	table tr td {
		aspect-ratio: 1;
		padding: 0.5rem;
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
		transform: rotate(180deg);
	}

	#userPos {
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

		.pagination, table tr td, #userPos {
			width: 30px;
		}
	}

	@media screen and (min-width: 768px) {
		div.left:not(.disable):hover, div.right:not(.disable):hover {
			background-color: #e5dbc2;
		}

		.pagination, table tr td, #userPos {
			width: 45px;
		}
	}
</style>
