<svelte:head>
  <meta name="description" content="Welcome to the base of the Mari Angryneers!">
  <title>The Mari Angryneers</title>
</svelte:head>

<script>
  import Logo from "$lib/components/landingPages/Logo.svelte";
  import SwitchLang from "$lib/components/landingPages/SwitchLang.svelte";
  import PlayBtn from "$lib/components/landingPages/PlayBtn.svelte";
  import LandingHero from "$lib/components/landingPages/LandingHero.svelte";
</script>

<LandingHero>
  <h1>The Mari Angryneers</h1>
  <PlayBtn lang="en" />
  <SwitchLang switchLang="fr" />
  <Logo />
</LandingHero>


