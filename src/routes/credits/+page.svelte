<script>
  import Credits from "$lib/components/credits/Credits.svelte";
  import Sponsors from "$lib/components/credits/Sponsors.svelte";
</script>

<svelte:head>
  <meta name="description" content="Credits and acknowledgements">
  <title>Credits | Mari Angryneers</title>
</svelte:head>

<h1 class="display-1 text-white text-center my-5 mt-lg-0 mb-lg-4">Credits</h1>
<div class="rounded-content-box mx-5 mt-5 p-5">
  <Credits />
  <Sponsors />
</div>