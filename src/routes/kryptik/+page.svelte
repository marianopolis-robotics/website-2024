<script>
	import Canvas from './Canvas.svelte';
	import Carousel from './Carousel.svelte';
</script>

<svelte:head>
	<meta name="description" content="The annual Kryptik angryneering competition!" />
	<title>Kryptik | Mari Angryneers</title>
</svelte:head>

<h1>Kryptik</h1>

<p>
	The [name] game is celebrated each year to remember the victorious attack on the King Pig's castle, which allowed us to rightfully retrieve the
	eggs. The game was designed to replicate the tactics used during the war, but we removed the original dangerous launching mechanism. In fact, they
	developed a mechanism to launch projectiles other than themselves! First, read the instructions before entering the arena.
</p>

<div>
	<div class="spacer"><Carousel /></div>

	<p>
		Click the simulation window to start. Press the [Esc] key to exit simulation. <br />
		Camera: Move mouse to adjust view, [I] key to zoom in, [O] key to zoom out. <br />
		Movement: [WASD] keys to move. <br />
		Shooting: [Q] key to increase power, [E] key to decrease power, [Space] bar to launch. <br />
		Multiplier: [M] key to place multiplier.
	</p>

	<div class="spacer"><Canvas /></div>
</div>

<style>
	h1 {
		display: block;
		text-align: center;
	}
	p {
		display: block;
		width: 50%;
		margin: auto;
		padding: 0px 0px 50px;
		text-align: center;
	}
	div .spacer {
		padding: 0px 0px 100px;
	}
</style>
