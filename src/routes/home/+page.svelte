<script>
  import BirdCustomization from "../../lib/components/home/BirdCustomization.svelte";
  import Intro from "../../lib/components/home/Intro.svelte";
  import UserAttributes from "../../lib/components/home/UserAttributes.svelte";

</script>

<svelte:head>
  <meta name="description" content="Welcome to the base of the Mari Angryneers!">
  <title>Home | Mari Angryneers</title>
</svelte:head>

<!-- remove later! just a placeholder for testing background -->
<main>
  <div class="my-5">
    <h1 class="text-center angry_birds_font">The Mari Angryneers</h1>
  </div>

  <Intro />
  <BirdCustomization />
  <UserAttributes />
  
 
</main>
<!-- <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> -->

<style>
     .angry_birds_font{
        font-family: "Angry Birds";
        color: white;
        font-size: 100px;
    }
</style>