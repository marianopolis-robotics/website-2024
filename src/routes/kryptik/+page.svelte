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

	<p class="laptop-show">
		Click the simulation window to start. Press the [Esc] key to exit simulation. <br />
		Camera: Move mouse to adjust view, [I] key to zoom in, [O] key to zoom out. <br />
		Movement: [WASD] keys to move. <br />
		Shooting: [Q] key to increase power, [E] key to decrease power, [Space] bar to launch. <br />
		Multiplier: [M] key to place multiplier.
	</p>
	<div class="landscape-show">
		<p class="mobile-show">
			<span style="color: red">REFRESH PAGE</span> if you haven't already after changing to landscape mode. <br />
			Click the simulation window to start. Refresh the page to exit and restart simulation. <br />
			Camera: Drag screen to adjust view, pinch to zoom in and zoom out. <br />
			Movement: Joystick to move. <br />
			Shooting: Use the slider on your right to increase power and decrease power, [insert image of icon] to launch. <br />
			Multiplier: [insert image of icon] to place multiplier.
		</p>
		<div class="spacer"><Canvas /></div>
	</div>
	<div class="portrait-show">
		<p>Please use landscape mode. <span style="color: red">REFRESH PAGE AFTER THIS</span> to load appropriate scripts.</p>
	</div>
</div>

<style>
	h1 {
		display: block;
		text-align: center;
	}
	p {
		display: block;
		width: 75%;
		margin: auto;
		padding: 0px 0px 50px;
		text-align: center;
	}
	div .spacer {
		padding: 0px 0px 100px;
	}
	.portrait-show p {
		text-align: center;
	}
	@media screen and (min-device-width: 800px) {
		.laptop-show {
			display: block;
		}
		.mobile-show {
			display: none;
		}
	}
	@media screen and (max-device-width: 800px) {
		.laptop-show {
			display: none;
		}
		.mobile-show {
			display: block;
		}
	}
	@media screen and (min-device-width: 400px) {
		.landscape-show {
			display: block;
		}
		.portrait-show {
			display: none;
		}
	}
	@media screen and (max-device-width: 400px) {
		.landscape-show {
			display: none;
		}
		.portrait-show {
			display: block;
		}
	}
</style>
