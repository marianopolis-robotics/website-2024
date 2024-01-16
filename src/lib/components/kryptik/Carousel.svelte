<script>
	import { userStore } from '$lib/Store';
	import Slide from './Slide.svelte';

	import Arrow from '$lib/assets/icons/arrow.svg';

	export let isFr = false;

	const bird = $userStore.shape;

	let current_slide = 1;
	let indices = [1, 2, 3, 4, 5, 6];

	const left = function () {
		if (current_slide > 1) {
			current_slide--;
		}
	};
	const right = function () {
		if (current_slide < 6) {
			current_slide++;
		}
	};
</script>

<div>
	<div class="main">
		<div class="top">
			<table>
				<tr>
					{#each indices as index}
						<td>
							{#if current_slide === index}
									<img class="angry-bird" src='/birds/{bird}.svg' alt="Angry bird icon" />
							{:else}
								<svg height="10" width="10">
									<circle cx="5" cy="5" r="5" fill="#f5c03b" />
								</svg>
							{/if}
						</td>
					{/each}
				</tr>
			</table>
		</div>
		<div class="left">
			<button on:click={left}><img src={Arrow} alt="Left button" /></button>
		</div>
		<div class="middle">
			{#key current_slide}
				<Slide {current_slide} {bird} {isFr} />
			{/key}
		</div>
		<div class="right">
			<button on:click={right}><img src={Arrow} alt="Right button" /></button>
		</div>
	</div>
</div>

<style>
	div.top {
		display: block;
		height: 10%;
	}
	table {
		margin: auto;
	}
	td {
		width: 50px;
		vertical-align: middle;
		padding: 0px 10px 0px;
	}
	img.angry-bird {
		width: 100%;
	}
	svg {
		display: block;
		width: 50%;
		margin: auto;
	}

	div.left, div.right {
		transition: background-color 0.15s ease-in-out;
	}

	div.left:hover, div.right:hover {
		background-color: #e5dbc2;
	}

	@media screen and (min-device-width: 800px) {
		div.main {
			display: block;
			position: relative;
			margin: auto;
			width: 75%;
			aspect-ratio: 5/3;
			outline: 10px solid #ffedc2;
			border-radius: 5px;
			background-color: #ffedc2;
		}

		div.left {
			position: absolute;
			left: 0px;
			bottom: 0px;
			width: 10%;
			height: 90%;
			display: flex;
			justify-content: center;
			align-content: center;
			flex-direction: column;
		}
		div.middle {
			display: block;
			margin: auto;
			width: 80%;
			height: 90%;
		}
		div.right {
			position: absolute;
			bottom: 0px;
			right: 0px;
			width: 10%;
			height: 90%;
			display: flex;
			justify-content: center;
			align-content: center;
			flex-direction: column;
		}
		button {
			border: none;
			background-color: transparent;
			width: 100%;
			height: 100%;
		}
		div.left button img {
			width: 25%;
			transform: rotate(180deg);
		}
		div.right button img {
			width: 25%;
		}
	}
	@media screen and (max-device-width: 800px) {
		div.main {
			display: block;
			position: relative;
			margin: auto;
			width: 75%;
			aspect-ratio: 3/5;
			outline: 10px solid #ffedc2;
			border-radius: 5px;
			background-color: #ffedc2;
		}

		div.left {
			position: absolute;
			left: -15%;
			bottom: 50%;
			height: 10%;
			display: flex;
			justify-content: left;
			flex-direction: row;
		}
		div.middle {
			display: block;
			margin: auto;
			width: 100%;
			height: 90%;
		}
		div.right {
			position: absolute;
			right: -15%;
			bottom: 50%;
			height: 10%;
			display: flex;
			justify-content: right;
			flex-direction: row;
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
	}
</style>
