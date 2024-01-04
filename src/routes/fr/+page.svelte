<svelte:head>
  <meta name="description" content="Welcome to the base of the Mari Angryneers!">
  <title>Les Angryneers Mari</title>
</svelte:head>

<script>
  import Logo from "$lib/components/landing-pages/Logo.svelte";
  import LandingHero from "$lib/components/landing-pages/LandingHero.svelte";
  import PlayBtn from "$lib/components/landing-pages/PlayBtn.svelte";
  import SwitchLang from "$lib/components/landing-pages/SwitchLang.svelte";
</script>

<LandingHero>
  <h1>Les Angryneers Mari</h1>
  <PlayBtn lang="fr" />
  <SwitchLang switchLang="en" />
  <Logo />
</LandingHero>
