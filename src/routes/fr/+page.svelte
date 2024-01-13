<svelte:head>
  <meta name="description" content="Welcome to the base of the Mari Angryneers!">
  <title>Les Angryneers Mari</title>
</svelte:head>

<script>
  import Logo from "$lib/components/landingPages/Logo.svelte";
  import LandingHero from "$lib/components/landingPages/LandingHero.svelte";
  import PlayBtn from "$lib/components/landingPages/PlayBtn.svelte";
  import SwitchLang from "$lib/components/landingPages/SwitchLang.svelte";
</script>

<LandingHero>
  <h1>Les Angryneers Mari</h1>
  <PlayBtn lang="fr" />
  <SwitchLang switchLang="en" />
  <Logo />
</LandingHero>
