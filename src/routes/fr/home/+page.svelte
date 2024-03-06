<script>
  import BirdCustomization from "../../../lib/components/home/BirdCustomization.svelte";
  import Intro from "../../../lib/components/home/Intro.svelte";
  import UserAttributes from "../../../lib/components/home/UserAttributes.svelte";

</script>

<svelte:head>
  <meta name="description" content="Welcome to the base of the Mari Angryneers!">
  <title>Accueil | Mari Angrynieurs</title>
</svelte:head>

<!-- remove later! just a placeholder for testing background -->
<main>

  <Intro isFr=true/>
  <BirdCustomization isFr=true/>
  <UserAttributes isFr=true/>
  
 
</main>
