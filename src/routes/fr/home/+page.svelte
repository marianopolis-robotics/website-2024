<script>
  import BirdCustomization from "$lib/components/home/BirdCustomization.svelte";
  import Intro from "$lib/components/home/Intro.svelte";
  import UserAttributes from "$lib/components/home/UserAttributes.svelte";

</script>

<svelte:head>
  <meta name="description" content="Bienvenue à la base des Angrynieurs Mari!">
  <title>Accueil | Mari Angrynieurs</title>
</svelte:head>

<!-- remove later! just a placeholder for testing background -->
<Intro isFr=true/>
<BirdCustomization isFr=true/>
<UserAttributes isFr=true/>
