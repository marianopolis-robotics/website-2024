<script>
  import Credits from "$lib/components/credits/Credits.svelte";
  import Sponsors from "$lib/components/credits/Sponsors.svelte";
</script>

<svelte:head>
  <meta name="description" content="Credits and acknowledgements">
  <title>Credits | Mari Angryneers</title>
</svelte:head>

<h1 class="display-1 text-white text-center my-5 mb-lg-4">Credits</h1>
<div class="rounded-content-box mt-3 mx-3 mx-sm-5 px-4 px-md-5 py-3 py-md-4">
  <Credits />
  <Sponsors />
</div>