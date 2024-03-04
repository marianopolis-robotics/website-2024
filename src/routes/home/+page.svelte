<script>
	import BirdCustomization from '../../lib/components/home/BirdCustomization.svelte';
	import Intro from '../../lib/components/home/Intro.svelte';
	import UserAttributes from '../../lib/components/home/UserAttributes.svelte';
	import LandingHero from '../../lib/components/landingPages/LandingHero.svelte';
</script>

<svelte:head>
	<meta name="description" content="Welcome to the base of the Mari Angryneers!" />
	<title>Home | Mari Angryneers</title>
</svelte:head>

<main>
	<div
		class="w-100 landingHero text-center px-4 px-lg-5 d-flex justify-content-center mb-3 angryneers-title"
	>
		<h1>The Mari Angryneers</h1>
	</div>

	<Intro />
	<BirdCustomization />
	<UserAttributes />
</main>

<!-- <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> -->

<style>
	.angryneers-title {
		margin-top: 0px !important;
		padding-top: 0px !important;
	}
</style>
