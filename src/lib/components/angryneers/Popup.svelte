<script>
	import { onMount } from 'svelte';
	import { userStore } from '$lib/Store';
	import UserBird from '../home/UserBird.svelte';
	import WoodButton from '../home/WoodButton.svelte';
	import { BirdStore } from '$lib/BirdStore';
	import { cubicInOut } from 'svelte/easing';
	import fadeScale from './svelte-scale-transition';
	import { fly } from 'svelte/transition';
	export let showPopup;
	export let bird;

	export let isFr = false;

	$: currentBird = bird;
	let birdIndex = $BirdStore.birds.indexOf(bird);
	let showBird = true;
	let memberPic;

	onMount(() => {
		birdIndex = $BirdStore.birds.indexOf(bird);
		let navbarHeight = document.getElementById('main-navbar').offsetHeight;
		if (document.documentElement.scrollTop <= navbarHeight) {
			document.documentElement.scrollTop = navbarHeight; //set scrolling to navbar height to make sure navbar doesn't hide components
			console.log(navbarHeight);
		}
		document.body.classList.add('overflow-y-hidden'); //disable scrolling on the background page
		return () => document.body.classList.remove('overflow-y-hidden'); //reactivate scrolling on the page
	});

	function changeBird(number) {
		birdIndex += number;

		if (birdIndex <= -1) {
			birdIndex = $BirdStore.birds.length - 1;
		}
		if (birdIndex >= $BirdStore.birds.length) {
			birdIndex = 0;
		}
		if ($BirdStore.birds[birdIndex] == 'pig') {
			changeBird(number);
		}

		currentBird = $BirdStore.birds[birdIndex];
	}
	function changePic(element, bird, changeTo, fileExt) {
		element.src = `/${changeTo}/${bird}.${fileExt}`;
	}
</script>

<div class="background d-flex align-items-center">
	<div
		class="container popup-content my-auto align-middle"
		transition:fadeScale={{
			delay: 100,
			duration: 500,
			easing: cubicInOut,
			baseScale: 0.5
		}}
	>
		<div class="row align-items-center">
			<div class="col d-flex flex-row-reverse">
				<WoodButton on:click={() => (showPopup = false)} message="X" />
			</div>
		</div>

		<div class="row popup align-items-center">
			<div class="col col-1 arrows">
				<WoodButton
					message="<"
					reverseTilt={true}
					on:click={() => {
						changeBird(-1);
					}}
				/>
			</div>
			<div class="col">
				<div class="row align-items-center row-cols-1 row-cols-md-2 row-cols-lg-2">
					<div class="col col-12 col-md-12 col-lg-4 bird_display">
						{#key currentBird}
							<div in:fly={{ duration: 500 }}>
								{#if currentBird == 'user'}
									<UserBird />
								{:else}
									<img
										src="/birds/{currentBird}.svg"
										on:mouseenter={changePic(this, currentBird, 'members', 'png')}
										on:mouseleave={changePic(this, currentBird, 'birds', 'svg')}
										alt={currentBird}
										class="bird-picture computer-picture"
									/>
									<!-- add on click -->
								<button class="angryneer-button" on:click={changePic(memberPic, currentBird, memberPic.src.includes(`/birds/${currentBird}.svg`) ? "members" : "birds", memberPic.src.includes(`/birds/${currentBird}.svg`) ? "png" : "svg")}>
									<img src="/birds/{currentBird}.svg" alt={currentBird} class="bird-picture mobile-picture"  bind:this={memberPic}/>
								</button>
									
								{/if}
							</div>
						{/key}
					</div>
					<div class="col arrows_small">
						<div class="row arrows-small">
							<div class="col">
								<WoodButton
									large_width={true}
									message="<"
									reverseTilt={true}
									on:click={() => {
										changeBird(-1);
									}}
								/>
							</div>
							<div class="col">
								<WoodButton message=">" on:click={() => changeBird(1)} large_width={true} />
							</div>
						</div>
					</div>

					{#key currentBird}
					<div class="col col-sm-12 col-md-12 col-lg-8" id="box_container" in:fly={{ duration: 500 }}>
						
						<img class="frame_left" src="/textures/wood_frame.svg" alt="wood frame left" />
						<img class="frame_right" src="/textures/wood_frame.svg" alt="" />

						<img class="frame_top" src="/textures/wood_frame_horizontal.svg" alt="" />
						<img class="frame_bottom" src="/textures/wood_frame_horizontal.svg" alt="" />

						<div class="rounded-content-box box m-4 p-4 pt-5">
							<p class="stat p-2 mt-2">
								<strong>{isFr ? 'Nom:' : 'Name:'}</strong>
								{currentBird == 'user'
									? $userStore.name == ''
										? isFr
											? 'Angrynieur'
											: 'Angryneer'
										: $userStore.name
									: $BirdStore[currentBird].name}
							</p>
							{#if currentBird != 'user'}
								<p class="stat p-2">
									<strong>{isFr ? 'Sous-équipe' : 'Subteam'}:</strong>
									{isFr ? $BirdStore[currentBird].subteamFr : $BirdStore[currentBird].subteam}
								</p>
							{/if}
							<p class="stat p-2">
								<strong>{isFr ? 'Pouvoir:' : 'Power:'}</strong>

								{currentBird == 'user'
									? $userStore.superPower
									: isFr
										? $BirdStore[currentBird].powerFr
										: $BirdStore[currentBird].power}
								{#if currentBird == 'user' && $userStore.superPower == ''}
									{isFr ? 'Redirigez-vous vers la' : 'Head to the'}
									<a href="/home" class="main-page-link"
										>{isFr ? "page d'accueil" : 'home page'}</a
									>
									{isFr ? 'pour choisir votre super-pouvoir!' : 'to choose your super power!'}
								{/if}
							</p>
							<p class="stat p-2">
								<strong>{isFr ? 'Passe-temps:' : 'Hobbies:'}</strong>
								{currentBird == 'user'
									? $userStore.hobbies
									: isFr
										? $BirdStore[currentBird].hobbiesFr
										: $BirdStore[currentBird].hobbies}
								{#if currentBird == 'user' && $userStore.hobbies == ''}
									{isFr ? 'Redirigez-vous vers la' : 'Head to the'}
									<a href="/home" class="main-page-link"
										>{isFr ? "page d'accueil" : 'home page'}</a
									>
									{isFr
										? 'pour nous en dire plus sur vos passe-temps!'
										: 'to tell us more about your hobbies!'}
								{/if}
							</p>
							<p class="stat p-2">
								<strong>{isFr ? 'Faits divers:' : 'Fun Facts:'}</strong>
								{currentBird == 'user'
									? $userStore.funFact
									: isFr
										? $BirdStore[currentBird].funFactsFr
										: $BirdStore[currentBird].funFacts}
								{#if currentBird == 'user' && $userStore.hobbies == ''}
									{isFr ? 'Redirigez-vous vers la' : 'Head to the'}
									<a href="/home" class="main-page-link"
										>{isFr ? "page d'accueil" : 'home page'}</a
									>
									{isFr
										? 'pour partager un fait divers avec nous!'
										: 'to let us know a fun fact!'}
								{/if}
							</p>
							<p class="stat p-2" class:mb-5={currentBird != 'user'}>
								<strong>Description:</strong>
								{currentBird == 'user'
									? isFr
										? "Je suis un nouveau membre des Angrynieurs Mari. J'ai hâte de les rejoindre lors du prochain concours de la CRC."
										: 'I am a new recruit of the Mari Angryneers. I look forward to join them in the upcoming CRC competition!'
									: isFr
										? $BirdStore[currentBird].learnedFr
										: $BirdStore[currentBird].learned}
							</p>
							{#if currentBird == 'user'}
								<p class="stat p-2 mb-5">
									{isFr ? 'Retourner à la' : 'Head back to the'}
									<a class="main-page-link" href="/home"
										>{isFr ? "page d'accueil" : 'home page'}</a
									>
									{isFr
										? 'si vous voulez nous en dire plus sur vous-même'
										: 'if you want to tell us more about you,'}
									{$userStore.name == '' ? (isFr ? 'Angrynieur' : 'Angryneer') : $userStore.name}!
								</p>
							{/if}
						</div>
					</div>
					{/key}
				</div>
			</div>
			<div class="col col-1 arrows">
				<WoodButton message=">" on:click={() => changeBird(1)} />
			</div>
		</div>
	</div>
</div>

<style>
	#box_container {
		position: relative;
	}
	.bird-picture {
		height: 100%;
		width: 100%;
	}
	.angryneer-button {
		height: 100%;
		width: 100%;
		background: none;
		border: none;
		padding: 0;
	}
	.popup-content {
		z-index: 1000;
		margin-top: auto;
		margin-bottom: auto;
	}
	.bird_display {
		min-width: 25%;
		aspect-ratio: 1/1;
	}

	.box {
		height: 400px;
		overflow: scroll;
	}

	.frame_left {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
	}

	.frame_right {
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
	}
	.frame_top {
		position: absolute;

		right: 0;
		top: 0;
		width: 100%;
	}
	.frame_bottom {
		position: absolute;

		right: 0;
		bottom: 0;
		width: 100%;
	}
	.stat {
		background-color: #85bce7;
		border-radius: 25px;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		border: 2px solid blue;
		/* color: white; */
	}
	.main-page-link {
		/* text-decoration: none; */
		color: black;
		/* border: 1px black solid; */
	}

	.background {
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		left: 0;
		top: 0;
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: auto; /* Enable scroll if needed */
		background-color: rgb(0, 0, 0); /* Fallback color */
		background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
		-webkit-animation-name: fadeIn; /* Fade in the background */
		-webkit-animation-duration: 0.4s;
		animation-name: fadeIn;
		animation-duration: 0.4s;
	}

	.popup {
		height: 20%;
	}

	@media only screen and (max-width: 600px) {
		.arrows {
			display: none;
		}
	}

	@media only screen and (min-width: 600px) {
		.arrows_small {
			display: none;
		}
	}

	/* computer */
	@media (pointer: fine) {
		.mobile-picture {
			display: none;
		}
	}

	/* mobile */
	@media (pointer: coarse) {
		.computer-picture {
			display: none;
		}
	}
</style>
