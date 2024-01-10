<script>
	import LeftButton from '$lib/assets/icons/arrow.png';
	import FieldImage from '$lib/assets/images/field.png';
	import GamePieceImage from '$lib/assets/images/game-piece.jpg';
	import SmallTargetImage from '$lib/assets/images/small-target.png';
	import BigTargetImage from '$lib/assets/images/big-target.png';
	import FloorScoreImage from '$lib/assets/images/floor-score.png';
	import MultiplierImage from '$lib/assets/images/multiplier.png';
	import MultFactorImage from '$lib/assets/images/mult-factor.png';
	import AngryBirdImage from '$lib/assets/images/angry-bird.png';
	import BlueCircle from '$lib/assets/images/blue-circle.png';

	let current_slide = 1;

	const left = function () {
		if (current_slide > 1) {
			current_slide--;
		}
	};
	const right = function () {
		if (current_slide < 6) {
			current_slide++;
		}
	};
</script>

<div>
	<div class="main">
		<div class="top">
			<table>
				<tr>
					<td>
						{#if current_slide === 1}
							<img class="angry-bird" src={AngryBirdImage} alt="Icône Angry Bird" />
						{:else}
							<img class="circle" src={BlueCircle} alt="Cercle bleu" />
						{/if}
					</td>
					<td>
						{#if current_slide === 2}
							<img class="angry-bird" src={AngryBirdImage} alt="Icône Angry Bird" />
						{:else}
							<img class="circle" src={BlueCircle} alt="Cercle bleu" />
						{/if}
					</td>
					<td>
						{#if current_slide === 3}
							<img class="angry-bird" src={AngryBirdImage} alt="Icône Angry Bird" />
						{:else}
							<img class="circle" src={BlueCircle} alt="Cercle bleu" />
						{/if}
					</td>
					<td>
						{#if current_slide === 4}
							<img class="angry-bird" src={AngryBirdImage} alt="Icône Angry Bird" />
						{:else}
							<img class="circle" src={BlueCircle} alt="Cercle bleu" />
						{/if}
					</td>
					<td>
						{#if current_slide === 5}
							<img class="angry-bird" src={AngryBirdImage} alt="Icône Angry Bird" />
						{:else}
							<img class="circle" src={BlueCircle} alt="Cercle bleu" />
						{/if}
					</td>
					<td>
						{#if current_slide === 6}
							<img class="angry-bird" src={AngryBirdImage} alt="Icône Angry Bird" />
						{:else}
							<img class="circle" src={BlueCircle} alt="Cercle bleu" />
						{/if}
					</td>
				</tr>
			</table>
		</div>
		<div class="left">
			<button class="left" on:click={left}><img src={LeftButton} alt="Bouton gauche" /></button>
		</div>
		<div class="middle">
			{#if current_slide === 1}
				<div class="content-1">
					<div class="img-wrapper"><img src={FieldImage} alt="Terrain de jeu" /></div>
					<div class="p-wrapper">
						<p>
							Ceci est le terrain de jeu. Une colline avec trois gouttières divise le terrain en deux parties égales. Le sommet rouge est une zone
							neutre. Les robots sont seulement permis d'opérer sur la partie du terrain où ils commencent. (Ne traversez pas de l'autre côté!) De
							plus, chaque partie est à son tour divisée en trois zones par des dos d'ânes rouges. Le terrain est entouré d'une barrière de 12.7 cm.
						</p>
					</div>
				</div>
			{/if}
			{#if current_slide === 2}
				<div class="content-2">
					<div class="img-wrapper"><img src={GamePieceImage} alt="Pièce de jeu" /></div>
					<div class="p-wrapper">
						<p>
							Ceci est une pièce de jeu. En tout, il y a 42 pièces de jeu disponibles au début du jeu. Chaque gouttière centrale contient dix pièces
							de jeu et chaque robot commence avec trois.<br /><br />
							Au cours du jeu, chaque robot peut transporter un maximum de dix pièces de jeu à tout moment. Aussi, une pièce de jeu ne peut être comprimé
							plus d'un pouce de diamètre et il est interdit de les abîmer ou de les lancer hors du terrain.
						</p>
					</div>
				</div>
			{/if}
			{#if current_slide === 3}
				<div class="content-3">
					<div class="end">
						<p class="end">Votre équipier et vous commencez dans vos zones de départ respectives.</p>
					</div>
				</div>
			{/if}
			{#if current_slide === 4}
				<div class="content-4">
					<div class="img-wrapper">
						<img src={SmallTargetImage} alt="Petite cible" />
						<img src={BigTargetImage} alt="Grande cible" />
						<img src={FloorScoreImage} alt="Points obtenus sur le plancher" />
					</div>
					<div class="p-wrapper">
						<p>
							Le but du jeu est marquer plus de points que les adversaires. Il existe trois moyens de marquer.<br /><br />
							1. Les petites cibles valent 60 points s'ils sortent par l'étage inférieure et 30 points pour l'étage supérieure.<br /><br />
							2. Les grandes cibles valent 120 points.<br /><br />
							3. De plus, à la fin de la partie, les pièces de jeux sur le terrain valent un nombre de points dépendant de la zone dans laquelle elles
							se retrouvent (délimités par les dos d'ânes).
						</p>
					</div>
				</div>
			{/if}
			{#if current_slide === 5}
				<div class="content-5">
					<div class="img-wrapper">
						<img src={MultiplierImage} alt="Multiplicateur" />
						<img src={MultFactorImage} alt="Facteur de multiplication" />
					</div>
					<div class="p-wrapper">
						<p>
							Attention ! Il existe trois multiplicateurs sur chaque moitié du terrain. Il suffit de placer une pièce de jeu sur ces multiplicateurs
							pour les activer. Pour être valide, ils doivent rester sur place sans l'aide d'un robot. Les points marqués sont multipliés par un
							facteur qui dépend de la différence entre le nombre de multiplicateurs activés des deux équipes. <br /><br />
							Voir le tableau ci-contre qui montre les facteurs en détail.
						</p>
					</div>
				</div>
			{/if}
			{#if current_slide === 6}
				<div class="content-6">
					<div class="end">
						<p class="end">
							Vous êtes prêt pour entrer dans l'arène, Angryneer ! N'oubliez pas, vous avez cinq minutes pour marquer un maximum de points. Bonne
							chance !
						</p>
					</div>
				</div>
			{/if}
		</div>
		<div class="right">
			<button class="right" on:click={right}><img src={LeftButton} alt="Bouton droite" /></button>
		</div>
	</div>
</div>

<style>
	div.top {
		display: block;
		height: 10%;
	}
	table {
		margin: auto;
	}
	td {
		width: 50px;
		vertical-align: middle;
		padding: 0px 10px 0px;
	}
	img.angry-bird {
		width: 100%;
	}
	img.circle {
		display: block;
		width: 50%;
		margin: auto;
	}
	div.main {
		display: block;
		position: relative;
		margin: auto;
		width: 75%;
		height: 600px;
		outline: 10px solid #ffedc2;
		border-radius: 5px;
		background-color: #ffedc2;
	}
	div.left {
		position: absolute;
		left: 0px;
		bottom: 0px;
		width: 10%;
		height: 90%;
		display: flex;
		justify-content: center;
		align-content: center;
		flex-direction: column;
	}
	div.middle {
		display: block;
		margin: auto;
		width: 80%;
		height: 90%;
	}
	div.right {
		position: absolute;
		bottom: 0px;
		right: 0px;
		width: 10%;
		height: 90%;
		display: flex;
		justify-content: center;
		align-content: center;
		flex-direction: column;
	}
	button {
		border: none;
		background-color: transparent;
		width: 100%;
		height: 100%;
	}
	button.left img {
		width: 25%;
		transform: rotate(180deg);
	}
	button.right img {
		width: 25%;
	}
	div.content-1,
	div.content-2,
	div.content-3,
	div.content-4,
	div.content-5,
	div.content-6 {
		height: 100%;
		display: flex;
	}

	div.img-wrapper {
		width: 50%;
		display: flex;
		justify-content: center;
		align-content: center;
		flex-direction: column;
	}
	.img-wrapper img {
		width: 100%;
	}
	.content-4 img {
		max-height: 30%;
	}
	div.p-wrapper {
		width: 50%;
		display: flex;
		justify-content: center;
		align-content: center;
		flex-direction: column;
		padding: 30px;
	}
	div.end {
		display: flex;
		justify-content: center;
		align-content: center;
		flex-direction: column;
	}
	p.end {
		text-align: center;
	}
</style>
