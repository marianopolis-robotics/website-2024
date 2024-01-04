<svelte:head>
  <meta name="description" content="Welcome to the base of the Mari Angryneers!">
  <title>The Mari Angryneers</title>
</svelte:head>

<script>
  import Logo from "../components/landing-pages/Logo.svelte";
  import SwitchLang from "../components/landing-pages/SwitchLang.svelte";
  import PlayBtn from "../components/landing-pages/PlayBtn.svelte";
  import LandingHero from "../components/landing-pages/LandingHero.svelte";
</script>

<LandingHero>
  <h1>The Mari Angryneers</h1>
  <PlayBtn lang="en" />
  <SwitchLang switchLang="fr" />
  <Logo />
</LandingHero>
