<script>
	import FlipBook from "$lib/components/archives/FlipBook.svelte";
</script>

<svelte:head>
	<meta name="description" content="Official archives of the Mari Angryneers!" />
	<title>Archives | Mari Angryneers</title>
</svelte:head>

<h1 class="text-white text-center">Archives</h1>

<FlipBook isFr={false} />

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
