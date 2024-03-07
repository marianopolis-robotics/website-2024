<script>
	import { userStore } from "$lib/Store";
  import { onMount } from 'svelte';
	import WoodButton from './WoodButton.svelte';
	import UserBird from './UserBird.svelte';
	import { BirdStore } from '$lib/BirdStore';

	export let isFr = false;

	let attributes = {
		accessories: ['caliper', 'screwdriver', 'laptop', 'measuring-tape', "none"],
		hats: ['construction-hat', 'gear-hat', 'director-hat', 'hacker-hat', "none"],
		shapes: [
			'red',
			'bomb',
			'blue1',
			'bubbles',
			'chuck',
			'dahlia',
			'drill',
			'hal',
			'ice',
			'luca',
			'matilda',
			'melody',
			'pig',
			'poppy',
			'silver',
			'stella',
			'terence',
			'tony'
		]
	};

	onMount(() => {
		if (!$BirdStore.birds.includes($userStore.shape)) {
			userStore.update((currentElements) => ({
				...currentElements,
				shape: !$BirdStore.birds[0],
				shapeIndex: 0
			}));
			console.log('run');
		}
		if (!attributes.hats.includes($userStore.hat)) {
			userStore.update((currentElements) => ({
				...currentElements,
				hat: attributes.hats[0],
				hatIndex: 0
			}));
		}
		if (!attributes.accessories.includes($userStore.accessory)) {
			console.log($userStore.accessory);
			userStore.update((currentElements) => ({
				...currentElements,
				accessory: attributes.accessories[0],
				accessoryIndex: 0
			}));
		}
	});

	let tabs = [
		{ tab: 'Shape', tabFr: 'Forme', selected: true },
		{ tab: 'Hat', tabFr: 'Chapeau', selected: false },
		{ tab: 'Accessory', tabFr: 'Accessoire', selected: false }
	];

	let selectedTab = tabs[0]; //make reactive to tabs selected value

	let newIndex = 0;

	function nextAccessory(attribute) {
		newIndex = $userStore[`${attribute}Index`] + 1;

		if (newIndex >= attributes[attribute == 'accessory' ? 'accessories' : `${attribute}s`].length) {
			newIndex = 0;
		}
		updateAccessory(newIndex, attribute);
	}

	function prevAccessory(attribute) {
		newIndex = $userStore[`${attribute}Index`] - 1;
		if (newIndex <= -1) {
			newIndex = attributes[attribute == 'accessory' ? 'accessories' : `${attribute}s`].length - 1;
		}
		updateAccessory(newIndex, attribute);
	}

	function updateAccessory(index, accessoryType) {
		userStore.update((currentElements) => ({
			...currentElements,
			[`${accessoryType}Index`]: index,
			[accessoryType]:
				attributes[accessoryType == 'accessory' ? 'accessories' : `${accessoryType}s`][index]
		}));
	}

	// change selected value of each tab when a tab is clicked
	function toggleSelect(clickedTab) {
		for (let tab of tabs) {
			if (tab == clickedTab) {
				tab.selected = true;
				selectedTab = tab;
			} else {
				tab.selected = false;
			}
		}
		// in order for svelte to detect change in tabs
		tabs = tabs;
	}

	function setSubmitCostume(value) {
		userStore.update((currentElemens) => ({
			...currentElemens,
			submittedCostume: value
		}));
	}
</script>

<svelte:head>
	<meta name="description" content="Welcome to the base of the Mari Angryneers!" />
	<title>Home | Mari Angryneers</title>
</svelte:head>

<main>
	<div class="container my-5 description-text">
		{#if !$userStore.submittedCostume}
			<div class="row text-center">
				<div class="col description_text">
					{isFr
						? `Choisissez votre ${selectedTab.tabFr.toLocaleLowerCase()}!`
						: `Choose your ${selectedTab.tab.toLowerCase()}!`}
				</div>
			</div>
			<div class="row align-items-center small-screen mt-5 mb-3">
				{#each tabs as tab}
					<div class="col">
						<WoodButton
							message={isFr ? tab.tabFr : tab.tab}
							isSelected={tab.selected}
							large_width={true}
							on:click={() => {
								toggleSelect(tab);
							}}
						/>
					</div>
				{/each}
			</div>

			<div class="row align-items-center">
				<!-- Choose accessory type tabs -->
				<div class="col text-center big-screen">
					{#each tabs as tab}
						<div class="mt-4">
							<WoodButton
								message={isFr ? tab.tabFr : tab.tab}
								isSelected={tab.selected}
								large_width={true}
								on:click={() => {
									toggleSelect(tab);
								}}
							/>
						</div>
					{/each}
				</div>
				<!-- Switch between accessories -->
				<div class="col text-center col-sm-1 col-lg-3 big-screen">
					<WoodButton
						message="<"
						reverseTilt={true}
						on:click={() => {
							prevAccessory(selectedTab.tab.toLowerCase());
						}}
					/>
				</div>
				<div class="col mb-1">
					<UserBird />
				</div>
				<div class="col col-sm-1 text-center big-screen">
					<WoodButton
						message=">"
						on:click={() => {
							nextAccessory(selectedTab.tab.toLowerCase());
						}}
					/>
				</div>
			</div>
			<div class="row small-screen arrows_small">
				<div class="col text-center">
					<WoodButton
						large_width={true}
						message="<"
						reverseTilt={true}
						on:click={() => {
							nextAccessory(selectedTab.tab.toLowerCase());
						}}
					/>
				</div>
				<div class="col text-center">
					<WoodButton
						large_width={true}
						message=">"
						on:click={() => {
							nextAccessory(selectedTab.tab.toLowerCase());
						}}
					/>
				</div>
			</div>
			<div class="row">
				<div class="col text-center">
					<WoodButton
						message={isFr ? 'Sauvegarder' : 'Save'}
						on:click={() => {
							setSubmitCostume(true);
						}}
					/>
				</div>
			</div>
		{:else}
			<!-- Display after submit -->
			<div class="row">
				<div class="col text-center description-text">
					<div class="description_text">
						{isFr ? `Cela vous va bien` : `You look great`}{$userStore.name == ''
							? ''
							: `, ${$userStore.name}`}!
					</div>
				</div>
			</div>
			<div class="row text-center display-row justify-content-center mt-5">
				<div class="col col col-md-8 col-lg-4">
					<UserBird />
				</div>
			</div>
			<div class="row">
				<div class="col text-center">
					<WoodButton
						message={isFr ? 'Modifier votre costume' : 'Edit costume'}
						on:click={() => {
							setSubmitCostume(false);
						}}
					/>
				</div>
			</div>
		{/if}
	</div>
</main>

<style>
	.description_text {
		font-size: 40px;
	}

	@media only screen and (max-width: 768px) {
		.big-screen {
			display: none;
		}
	}

	@media only screen and (min-width: 768px) {
		.small-screen {
			display: none;
		}
	}
</style>
