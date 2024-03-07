<script>
	export let message = 'tab';
	export let isSelected = false;
	export let large_width = false;
	export let reverseTilt = false;
</script>

<main>
	<button
		class="btn btn-lg button my-2 change_on_hover"
		class:selected={isSelected}
		class:reverse-tilt={reverseTilt}
		class:w-100={large_width}
		on:click|self>{message}</button
	>
</main>

<style>
	.button {
		background: url('/textures/wood.png') no-repeat scroll 0 0 transparent;
		background-size: cover;
		color: white;
		resize: both;
		font-family: 'Angry Birds';
		font: 40px;
		/* text-shadow: 0 0 3px #FF0000; */
	}

	.reverse-tilt:hover {
		transform: rotate(-5deg) !important;
	}
	.button:hover {
		transform: rotate(5deg);
		box-shadow: 5px 5px 5px rgb(87, 84, 84);
	}
	.selected {
		text-decoration: underline;
	}

	/* .change_on_hover:hover {
		color: black;
	} */
</style>
