<script>
	import { userStore } from '$lib/Store';
	import Slide from './Slide.svelte';

	import Arrow from '$lib/assets/kryptik/icons/arrow.svg';
	import ArrowDisabled from '$lib/assets/kryptik/icons/arrow-disabled.svg';
	import UserBird from '$lib/components/home/UserBird.svelte';

	export let isFr = false;

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

<h2 class="text-center display-4 mt-5 mb-3 text-black mx-3">{isFr ? 'Entraînez-vous pour Kryptik' : 'Train for Kryptik'}</h2>
<hr class="w-50 mx-auto text-dark opacity-75" />
<div class="carousel pt-2 pb-3 mx-4 mx-sm-5 mb-5">
	<div class="top w-100 px-3">
		<table>
			<tr>
				{#each indices as index}
					<td class:slide-indicator={current_slide==index &&load}>
						{#if current_slide === index && load}
							<div class="bird-container  text-center">
								<UserBird {isFr} displayAccessory={false}/>
							</div>
						{:else}
							<button class="pagination" class:passed={index < current_slide} on:click={() => $userStore.level = index}></button>
						{/if}
					</td>
				{/each}
			</tr>
		</table>
	</div>
	<div class="slideControls d-flex pt-3 pb-4 justify-content-between">
		<div class="left" class:disable={current_slide == 1}>
			<button class="px-3" on:click={left}><img src={current_slide == 1 ? ArrowDisabled : Arrow} alt="Left button" /></button>
		</div>
		<div class="middle px-3">
			{#key current_slide}
				<Slide {current_slide} {name} {isFr} />
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
	.bird-container{
		position: absolute;
		bottom: 5%;
		left: -10%;
		width: 120%;
		/* width: 200% !important; */
		aspect-ratio: 1/1;
	}

	.slide-indicator{
		position:relative;
		width: 25px !important;
	}

	.pagination {
		border-radius: 50%;
		aspect-ratio: 1/1;
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
		aspect-ratio: 1/1;
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

		.pagination, table tr td {
			width: 30px;
		}
		.slide-indicator{
			width: 40px !important;
		}
	}

	@media screen and (min-width: 768px) {
		div.left:not(.disable):hover, div.right:not(.disable):hover {
			background-color: #e5dbc2;
		}

		.pagination, table tr td {
			width: 45px;
		}
		.slide-indicator{
			width: 50px !important;
		}
	}

</style>
