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
  <div class="w-100 landingHero text-center px-4 px-lg-5 d-flex justify-content-center mb-5">
    <h1>Les Angrynieurs de Mari</h1>
  </div>

  <Intro isFr=true/>
  <BirdCustomization isFr=true/>
  <UserAttributes isFr=true/>
  
 
</main>
<!-- <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> -->
