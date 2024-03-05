<script>
  import test from '$lib/assets/3d-objects/playingField.glb';
  import testPoster from '$lib/assets/3d-objects/posters/testPoster.webp';
	import Model from '$lib/components/robot/Model.svelte';
	import Caption from '$lib/components/robot/Caption.svelte';

	export let config = 'model'; // order "configuration": model first (on the left for larger screens) or caption first
</script>

<div class="row model-row px-1 px-sm-4 py-1 pt-md-5 px-lg-2 p-xl-5 justify-content-center row-gap-lg-0 column-gap-lg-2 column-gap-xl-3 column-gap-xxl-4 mb-md-5 my-lg-0">
	<div class="col-lg column">
		{#if config === 'model'}
			<Model src={test} poster={testPoster} />
		{:else}
			<Caption>
				<slot />
			</Caption>
		{/if}
	</div>
	<div class="col-lg column">
		{#if config === 'model'}
			<Caption>
				<slot />
			</Caption>
		{:else}
			<Model src={test} poster={testPoster} />
		{/if}
	</div>
	
</div>

<style>
	.model-row {
		row-gap: 20px;
	}

	.column {
		width: 100%;
	}
</style>