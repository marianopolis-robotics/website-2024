<script>
  import FlipBook from '$lib/components/archives/FlipBook.svelte';
  import Tutorial from '$lib/components/archives/Tutorial.svelte';
</script>

<svelte:head>
  <meta name="description" content="Les archives officielles des Angrynieurs Mari!">
  <title>Archives | Angrynieurs Mari</title>
</svelte:head>

<h1 class="text-white text-center">Archives</h1>

<FlipBook isFr={true} />

<Tutorial isFr={true} />

<style>
	h1 {
		padding: 25px;
    font-size: 3.5rem;
	}

  @media screen and (min-width: 576px) {
		h1 {
			font-size: 5rem;
		}
	}
</style>
