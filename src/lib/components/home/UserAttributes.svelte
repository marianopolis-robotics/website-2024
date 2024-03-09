<script>
	import badWords from 'bad-words';
	import frenchWords from 'french-badwords-list';
	import { blur } from 'svelte/transition';
	import { userStore } from "$lib/Store";

	export let isFr = false;
	const inputFilter = new badWords();
	inputFilter.addWords(...frenchWords.array);

	let inputError = false;

	let userHobbies = $userStore.hobbies;
	let userPower = $userStore.superPower;
	let userFunFact = $userStore.funFact;

	function setSubmitAttributes(value) {
		if (
			userHobbies == '' ||
			userPower == '' ||
			inputFilter.isProfane(userHobbies) ||
			inputFilter.isProfane(userPower) ||
			inputFilter.isProfane(userFunFact)
		) {
			inputError = true;
		} else {
			userStore.update((currentElemens) => ({
				...currentElemens,
				submittedAttributes: value,
				superPower: userPower,
				hobbies: userHobbies,
				funFact: userFunFact
			}));
			inputError = false;
		}
	}
</script>

<div class="rounded-content-box p-1 p-md-3 mx-2 mx-md-4 mx-xl-5">
	{#if !$userStore.submittedAttributes}
	<div in:blur={{ duration: 300 }}>
		<div class="text-center p-4 description-text">
			{isFr
				? `Pour que les autres Angrynieurs apprennent plus sur vous, dites-nous plus sur ce qui vous rend unique${
						$userStore.name == '' ? '' : `, ${$userStore.name}`
					}!`
				: `In order for the other Angryneers to get to know you better, tell us more about what makes you unique${
						$userStore.name == '' ? '' : `, ${$userStore.name}`
					}!`}
		</div>

		<div class="p-3 p-md-5">
			<div>
				<form action="" class="form-text">
					<label for="power" class="form-label"
						>{isFr ? 'Votre super pouvoir:' : 'Your super power:'}</label
					>
					<input
						type="text"
						id="power"
						class="form-control form-control-lg inputError"
						class:input_error={inputError}
						placeholder={inputError
							? isFr
								? 'Veuillez entrer un super pouvoir'
								: 'Please enter a super power'
							: isFr
								? 'Ex: teleportation, télékinésie, enlargement'
								: 'e.g. teleportation, telekinesis, enlargement'}
						bind:value={userPower}
					/>
					<label for="hobbies" class="form-label mt-4"
						>{isFr ? 'Vos passe-temps:' : 'Your hobbies:'}</label
					>
					<input
						type="text"
						id="hobbies"
						class="form-control form-control-lg"
						class:input_error={inputError}
						placeholder={inputError
							? isFr
								? 'Veuillez entrer un passe-temps'
								: 'Please enter a hobby'
							: isFr
								? 'Ex: ingénierie, piano, jeux video'
								: 'e.g. engineering,  play piano, video games'}
						bind:value={userHobbies}
					/>
					<label for="fun fact" class="form-label mt-4"
						>{isFr ? 'Un fait divers:' : 'Fun Fact:'}</label
					>
					<input
						type="text"
						id="fun fact"
						class="form-control form-control-lg"
						class:input_error={inputError}
						placeholder={inputError
							? isFr
								? 'Veuillez entrer un fait interessant'
								: 'Please enter a fun fact'
							: isFr
								? "Ex: J'aime les chiens"
								: 'e.g. I like dogs'}
						bind:value={userFunFact}
					/>
				</form>
				<div class="text-center m-3">
					<button
						class="btn btn-outline-primary"
						on:click={() => {
							setSubmitAttributes(true);
						}}>{isFr ? 'Soumettre' : 'Submit'}</button
					>
				</div>
			</div>
		</div>
	</div>
	{:else}
		<div in:blur={{ duration: 300 }}>
			<p class="description-text text-center">
				{isFr
					? `Il parait que vous êtes un maitre de ${$userStore.superPower} et que vous aimez ${$userStore.hobbies}!`
					: `It looks like you are a master of ${$userStore.superPower} and you enjoy ${$userStore.hobbies}!`}
			</p>
			<p class="description-text text-center">
				{isFr
					? `Fait interessant sur vous: ${$userStore.funFact}!`
					: `Fun fact about you: ${$userStore.funFact}!`}
			</p>
			<div class="text-center mb-4">
				<button
					class="btn btn-outline-primary mx"
					on:click={() => {
						setSubmitAttributes(false);
					}}>{isFr ? 'Modifiez les qualités' : 'Edit Qualitites'}</button
				>
			</div>
		</div>

		<!-- include where to go next to learn more about competition -->
	{/if}
</div>

<h2 class="text-center display-4 mt-5 mb-3 text-black">{isFr ? 'Notre histoire' : 'Our story'}</h2>
<hr class="w-50 mx-auto text-dark opacity-75" />

<div class="competition-description p-3 p-md-5 text-center rounded-content-box mx-2 mx-md-4 mx-xl-5 mt-4">
	<p>
		{isFr
			? 'En mémoire de la défaite du Chateau du Roi Cochon, les Angrynieurs reproduissent cet événement mémorial à chaque année et compétitionnent pour le meilleur lance-pierre! Les Angrynieurs de Mari sont divisés en cinq équipes afin de réaliser cet événement:'
			: "In memory of the defeat of the King Pig's Castle, the Angryneers reproduce this memorial event each year and compete in order to test who has the best slingshot! The Mari Angryneers are divided into five subteams to make this happen:"}
	</p>
	<ul class="px-3">
		<li>
			<strong>{isFr ? "L'équipe du lance-pierre" : 'The slingshot team'}</strong>
			{isFr
				? "composée d'excellents produceurs de lance-pierres."
				: 'composed of amazing slingshot makers.'}
		</li>
		<li>
			<strong>{isFr ? "L'équipe de recrutement" : 'The recruitment team'}</strong>
			{isFr
				? 'pour produire des vidéos qui attirent des nouveaux recrus.'
				: 'for producing videos that attract new recruits.'}
		</li>
		<li>
			<strong>{isFr ? "L'équipe du site web" : 'The website team'}</strong>
			{isFr
				? 'pour familiariser les nouveaux recrus avec la compétition.'
				: 'for familiarizing new recruits with the competition. '}
			<!-- <a href="https://github.com/marianopolis-robotics/website-2024"
				>{isFr ? 'Venez voir leur bon travail ici!' : 'Come see their amazing work here!'}</a
			> -->
		</li>
		<li>
			<strong>{isFr ? "L'équipe de design" : 'The design team'}</strong>
			{isFr
				? 'en charge de reconstruire le Chateau du Roi Cochon.'
				: "in charge of rebuilding the King Pig's Castle."}
		</li>
		<li>
			<strong>{isFr ? "L'équipe de programmation" : 'The programming team'}</strong>
			{isFr
				? "en charge de nous protéger des pirateurs informatiques."
				: 'in charge of keeping hackers away.'}
		</li>
	</ul>
	<p class="display-6 mt-4 mb-0 fw-bold">
		{isFr
			? `Apprenez à bien les connaitre, ${
					$userStore.name == '' ? 'Angrynieur' : $userStore.name
				}!`
			: `Get to know them well, ${$userStore.name == '' ? 'Angryneer' : $userStore.name}!`}
	</p>
</div>

<style>
	.rounded-content-box {
		background-color: #ffeab5;
		border-radius: 25px;
	}

	.description-text, .competition-description {
		font-size: 1.5rem;
	}
	.form-text {
		font-size: 1.4rem;
	}

	ul {
		list-style-type: none;
	}

	.competition-description {
		font-family: Rubik, sans-serif;
	}

	ul li {
		margin-bottom: 10px;
	}
</style>
