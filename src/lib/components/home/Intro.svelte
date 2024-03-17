<script>
	import badWords from 'bad-words';
	import frenchWords from 'french-badwords-list';
	import { userStore } from '$lib/Store';
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';

	export let isFr = false;
	// setup profanity filters in English and French
	const inputFilter = new badWords();
	inputFilter.addWords(...frenchWords.array);

	let inputError = false;
	let userName = $userStore.name;
	let errorMessage;

	onMount(() => {
		if (typeof $userStore.submittedName != 'boolean') {
			userStore.update((currentElements) => ({
				...currentElements,
				submittedName: false
			}));
		}
	});

	function setSubmittedName(value) {
		if (userName == '') {
			userName = '';
			errorMessage = `${isFr ? 'Le nom ne peut pas être vide' : 'Name cannot be empty'}`;
			inputError = true;
		} else if (inputFilter.isProfane(userName)) {
			userName = '';
			errorMessage = `${isFr ? "Pas de mots inappropriés s'il vous plait" : 'No bad words please'}`;
			inputError = true;
			// profane = true;
		} else if (userName.length >= 15) {
			userName = '';
			errorMessage = `${isFr ? 'Nom trop long' : 'Name is too long'}`;
			inputError = true;
		} else {
			userStore.update((currentElemens) => ({
				...currentElemens,
				submittedName: value,
				name: userName
			}));

			inputError = false;
		}
	}
</script>

<h1 class="text-white text-center display-1 my-5">{isFr ? 'Les Angrynieurs Mari' : 'The Mari Angryneers'}</h1>

<div class="px-2 px-md-4 px-xl-5 my-5 description-text">
	<div class="row align-items-center row-cols-1 row-cols-md-2 mx-auto rounded-content-box">
		<div class="col text-center p-md-5 p-3 pt-5">
			{isFr
				? 'Bienvenue à la base principale des Angrynieurs Mari! Designez votre oiseau pour rejoindre la compétition annuelle d\'Angrynierie Kryptik!'
				: 'Welcome to the Mari Angryneers\' home base! Design your bird in order to join the annual Kryptik Angryneering competition!'}
		</div>
		<div class="col p-md-5 p-3 pt-5 pb-5 text-center">
			{#if !$userStore.submittedName}
				<div in:blur={{ duration: 400 }}>

					<p>{isFr ? 'Quel est votre nom, Angrynieur?' : 'What is your name, Angryneer?'}</p>
					<input
						type="text"
						id="user-name"
						bind:value={userName}
						placeholder={inputError ? errorMessage : isFr ? 'Entrez votre nom' : 'Enter your name'}
						class="form-control-lg w-75 m-0"
						class:input_error={inputError}
					/>
					<p class="character-limit h5 text-left">{isFr ? 'Maximum 15 caractères' : 'Maximum 15 characters'}</p>
	
					<button
						class="btn btn-outline-primary btn-lg m-0 px-2"
						on:click={() => {
							setSubmittedName(true);
						}}>{isFr ? 'Entrée' : 'Enter'}</button
					>
				</div>
			{:else}
				<div in:blur={{ duration: 400 }}>
					<p>
						{isFr
							? `C'est un plaisir de vous avoir parmi nous, ${$userStore.name}!`
							: `It is great to have you among us, ${$userStore.name}!`}
					</p>
					<p>
						{isFr
							? 'Personnalisez votre avatar pour nous en dire plus sur vous-même!'
							: 'Customize your avatar to tell us more about yourself!'}
					</p>
					<button
						class="btn btn-outline-primary"
						on:click={() => {
							setSubmittedName(false);
						}}>{isFr ? 'Changez le nom' : 'Edit name'}</button
					>
					
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.description-text {
		font-size: 1.5rem;
	}
	.character-limit {
		color: rgb(243, 90, 90);
	}
</style>
