<script>
	import Canvas from './Canvas.svelte';
</script>

<svelte:head>
	<meta name="description" content="The annual Kryptik angryneering competition!" />
	<title>Kryptik | Mari Angryneers</title>
</svelte:head>

<h1>Kryptik</h1>

<p>
	The winners of this year's Kryptik competition will be selected to lead the attack on the king pig's castle to take back the bird eggs. <br />

	However, the Angryneers plan to use attacks which would not put themselves at risk. As such, they developed a mechanism to launch projectiles other
	than themselves ! <br />

	Help them test it by running the following simulation.
</p>

<p>
	Click the simulation window to start. Press the [Esc] key to exit simulation. <br />
	Camera: Move mouse to adjust view, [I] key to zoom in, [O] key to zoom out. <br />
	Movement: [WASD] keys to move. <br />
	Shooting: [Q] key to increase power, [E] key to decrease power, [Space] bar to launch. <br />
	Multiplier: [M] key to place multiplier.
</p>

<div>
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
		padding: 0px 0px 200px;
	}
</style>
