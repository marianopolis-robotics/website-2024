<script>
	import LeftButton from '$lib/assets/icons/arrow.png';
	import FieldImage from '$lib/assets/images/field.png';
	import GamePieceImage from '$lib/assets/images/game-piece.jpg';
	import SmallTargetImage from '$lib/assets/images/small-target.png';
	import BigTargetImage from '$lib/assets/images/big-target.png';
	import FloorScoreImage from '$lib/assets/images/floor-score.png';
	import MultiplierImage from '$lib/assets/images/multiplier.png';
	import MultFactorImage from '$lib/assets/images/mult-factor.png';

	import { onMount } from 'svelte';

	let content_1;
	let content_2;
	let content_3;
	let content_4;
	let content_5;
	let content_6;

	let current_slide = 1;

	const set_slide = function () {
		content_1.style.display = 'none';
		content_2.style.display = 'none';
		content_3.style.display = 'none';
		content_4.style.display = 'none';
		content_5.style.display = 'none';
		content_6.style.display = 'none';
		if (current_slide === 1) {
			content_1.style.display = 'flex';
		}
		if (current_slide === 2) {
			content_2.style.display = 'flex';
		}
		if (current_slide === 3) {
			content_3.style.display = 'flex';
		}
		if (current_slide === 4) {
			content_4.style.display = 'flex';
		}
		if (current_slide === 5) {
			content_5.style.display = 'flex';
		}
		if (current_slide === 6) {
			content_6.style.display = 'flex';
		}
	};

	const left = function () {
		if (current_slide > 1) {
			current_slide--;
		}
		set_slide();
	};
	const right = function () {
		if (current_slide < 6) {
			current_slide++;
		}
		set_slide();
	};

	onMount(set_slide);
</script>

<div>
	<div class="main">
		<div class="top">
			<table>
				<tr>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
					<td>6</td>
				</tr>
			</table>
		</div>
		<div class="left">
			<button class="left" on:click={left}><img src={LeftButton} alt="Left button" /></button>
		</div>
		<div class="middle">
			<div class="content-1" bind:this={content_1}>
				<div class="img-wrapper"><img src={FieldImage} alt="Field" /></div>
				<div class="p-wrapper">
					<p>
						This is the playing field. A hill with 3 gutters in the middle divides the playing field in 2 halves. Each half is in turn divided into 3
						zones by red speed bumps. In the center, there is a neutral zone colored in red at the top of the hill. <br /><br />
						Your robot may only operate in the half of the terrain on which it started and the central neutral zone. Be careful to not cross to the other
						side! The perimeter of the playing field is also surrounded by a 12.7 cm-tall border.
					</p>
				</div>
			</div>
			<div class="content-2" bind:this={content_2}>
				<div class="img-wrapper"><img src={GamePieceImage} alt="Game piece" /></div>
				<div class="p-wrapper">
					<p>
						This is a game piece. A total of 42 game pieces are available at the start of the game. Each central gutter will hold 10 game pieces, for
						a total of 30. Each starting area will have 3 game pieces each, whether loaded on the robot or placed inside the starting area. <br /><br
						/>
						Each robot can hold a maximum of 10 game pieces at any given moment during the game. Moreover, game pieces can be compressed to a maximum of
						1 inch when handled by the robot. However, be careful not to damage them or launch them outside the playing field!
					</p>
				</div>
			</div>
			<div class="content-3" bind:this={content_3}>
				<div class="end">
					<p class="end">
						You and your teammate will each start the game in one of the designated starting areas of the color of your team, either blue or yellow.
					</p>
				</div>
			</div>
			<div class="content-4" bind:this={content_4}>
				<div class="img-wrapper">
					<img src={SmallTargetImage} alt="Small target" />
					<img src={BigTargetImage} alt="Big target" />
					<img src={FloorScoreImage} alt="Floor score" />
				</div>
				<div class="p-wrapper">
					<p>
						Now we’re getting to the fun part! The objective of the game is to score as many points as possible with your teammate.There are 3 ways to
						score points in the Kryptik game. <br /><br />
						Small targets are worth 50 points per game piece exiting through the lower floor. The small target is worth 25 points per game piece exiting
						from the upper floor. <br /><br />
						Each large target is worth 250 points per game piece entering it. <br /><br />
						At the end of the joust, game pieces on the ground are awarded points according to where they are after they stop moving. The following image
						shows the point values for each zone, delimited by the red speed bumps, the sides of the playing field and the neutral zone at the top of the
						hill.
					</p>
				</div>
			</div>
			<div class="content-5" bind:this={content_5}>
				<div class="img-wrapper">
					<img src={MultiplierImage} alt="Multiplier" />
					<img src={MultFactorImage} alt="Multiplication factors" />
				</div>
				<div class="p-wrapper">
					<p>
						But there is a catch: 3 multipliers are located on each side of the playing field! They allow a team to boost their score by a
						multiplication factor. To activate them, simply place a game piece on top. The game piece must remain in place without being transported
						by a robot to remain active! <br /><br />
						Here is the multiplier allocated to each team according to the number of active pillars on each side of the playing field at the end of the
						game.
					</p>
				</div>
			</div>
			<div class="content-6" bind:this={content_6}>
				<div class="end">
					<p class="end">
						You are now ready to enter the arena, angryneer! Remember, you only have 5 minutes to score the maximum number of points! <br /><br />
						Best of luck, fellow angryneer, take to the skies!
					</p>
				</div>
			</div>
		</div>
		<div class="right">
			<button class="right" on:click={right}><img src={LeftButton} alt="Left button" /></button>
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
		display: none;
	}

	div.img-wrapper {
		width: 50%;
		display: flex;
		justify-content: center;
		align-content: center;
		flex-direction: column;
	}
	img {
		width: 100%;
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
