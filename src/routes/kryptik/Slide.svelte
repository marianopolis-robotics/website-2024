<script>
	export let images;
	export let text;
	export let img_num;

	let img_height = (1 / img_num) * 100;
</script>

<div class="content">
	<div class="images-wrapper">
		{#each images as { url, alternate_text }}
			<div class="img-wrapper" style="height: {img_height}%"><img src={url} alt={alternate_text} /></div>
		{/each}
	</div>
	<div class="p-wrapper">
		<div class="scroll-container">
			<p>
				{@html text}
			</p>
		</div>
	</div>
</div>

<style>
	@media screen and (min-device-width: 400px) {
		.content {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: row;
		}
		.images-wrapper {
			width: 50%;
			height: 100%;
			display: flex;
			flex-direction: column;
		}
		.p-wrapper {
			width: 50%;
			height: 100%;
			overflow-y: scroll;
		}
		.p-wrapper p {
			margin: 0px;
			padding: 30px;
			text-align: justify;
			font-size: 2vh;
		}
	}
	@media screen and (max-device-width: 400px) {
		.content {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
		}
		.images-wrapper {
			width: 100%;
			max-height: 50%;
			display: flex;
			flex-direction: column;
		}
		.p-wrapper {
			padding: 5%;
			width: 100%;
			height: 100%;
			overflow-y: scroll;
		}
		.p-wrapper p {
			margin: 0px;
			text-align: justify;
			font-size: 2vh;
		}
	}
	.img-wrapper img {
		height: 100%;
		max-width: 100%;
		object-fit: contain;
		display: block;
		margin: auto;
	}
	.scroll-container {
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
