<svelte:head>
  <meta name="description" content="Nous vous présentons les Angrynieurs Mari!">
  <title>Les Angrynieurs Mari</title>
</svelte:head>

<script>
  import Logo from "$lib/components/landingPages/Logo.svelte";
  import LandingHero from "$lib/components/landingPages/LandingHero.svelte";
  import PlayBtn from "$lib/components/landingPages/PlayBtn.svelte";
  import SwitchLang from "$lib/components/landingPages/SwitchLang.svelte";
</script>

<LandingHero>
  <h1>Les Angrynieurs Mari</h1>
  <PlayBtn lang="fr" />
  <SwitchLang switchLang="en" />
  <Logo alt="Logo des Angrynieurs Mari" />
</LandingHero>
