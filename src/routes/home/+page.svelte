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
	<Intro />
	<BirdCustomization />
	<UserAttributes />
</main>

<style>
	
</style>
