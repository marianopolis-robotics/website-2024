<script>
  import Credits from "$lib/components/credits/Credits.svelte";
  import Sponsors from "$lib/components/credits/Sponsors.svelte";
</script>

<svelte:head>
  <meta name="description" content="Crédits et remerciements">
  <title>Crédits | Angrynieurs Mari</title>
</svelte:head>

<h1 class="display-1 text-white text-center my-5 mb-lg-4">Crédits</h1>
<div class="rounded-content-box mx-5 mt-5 p-5">
  <Credits isFr={true} />
  <Sponsors isFr={true} />
</div>