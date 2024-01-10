<script>
	import Canvas from './Canvas.svelte';
	import Carousel from './Carousel.svelte';
</script>

<svelte:head>
	<meta name="description" content="The annual Kryptik angryneering competition!" />
	<title>Kryptik | Angryneers Mari</title>
</svelte:head>

<h1>Kryptik</h1>

<p>
	Chaque année, pour célébrer la victoire des Angryneers lors de l'assaut du château du Roi Cochon, le jeu du [name] est organisé qui essaie de
	répliquer les tactiques utilisées durant la guerre. Cependant, pour éviter de se mettre en danger, ils développés un mécanisme pour lancer des
	projectiles autres qu'eux-même ! Veuillez lire les instructions qui suivent avant d'entrer dans l'arène.
</p>

<div>
	<div class="spacer"><Carousel /></div>

	<p>
		Cliquer sur la fenêtre de simulation pour commencer. Appuyer sur la touche [Esc] pour quitter.<br />
		Caméra: Bouger la sourie pour ajuster la caméra. Touche [I] pour se rapprocher, [O] pour s'éloigner.<br />
		Mouvement du robot: Touches [WASD] pour bouger.<br />
		Lancer: Touche [Q] pour augmenter la puissance, [E] pour diminuer, [Espace] pour lancer.<br />
		Multiplicateurs: Touche [M] pour placer une pièce de jeu sur un multiplicateur.
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
