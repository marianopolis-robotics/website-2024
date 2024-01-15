<script>
	import { userStore } from '$lib/Store';
	import Slide from './Slide.svelte';

	import LeftButton from '$lib/assets/icons/arrow.png';
	import FieldImage from '$lib/assets/images/field.png';
	import GamePieceImage from '$lib/assets/images/game-piece.jpg';
	import SmallTargetImage from '$lib/assets/images/small-target.png';
	import BigTargetImage from '$lib/assets/images/big-target.png';
	import FloorScoreImage from '$lib/assets/images/floor-score.png';
	import MultiplierImage from '$lib/assets/images/multiplier.png';
	import MultFactorImage from '$lib/assets/images/mult-factor.png';
	import BlueCircle from '$lib/assets/images/blue-circle.png';

	const bird = $userStore.shape.replace('Shape', '');

	let current_slide = 1;
	let indices = [1, 2, 3, 4, 5, 6];

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
					{#each indices as index}
						<td>
							{#if current_slide === index}
								<img class="angry-bird" src='/birds/{bird}.svg' alt="Angry bird icon" />
							{:else}
								<svg height="10" width="10">
									<circle cx="5" cy="5" r="5" fill="#f5c03b" />
								</svg>
							{/if}
						</td>
					{/each}
				</tr>
			</table>
		</div>
		<div class="left">
			<button class="left" on:click={left}><img src={LeftButton} alt="Left button" /></button>
		</div>
		<div class="middle">
			{#if current_slide === 1}
				<Slide
					images={[{ url: FieldImage, alternate_text: 'Field' }]}
					img_num={1}
					text={'This is the playing field. A hill with 3 gutters in the middle divides the playing field in 2 halves. Each half is in turn divided into 3 zones by red speed bumps. In the center, there is a neutral zone colored in red at the top of the hill. <br /><br /> Your robot may only operate in the half of the terrain on which it started and the central neutral zone. Be careful to not cross to the other side! The perimeter of the playing field is also surrounded by a 12.7 cm-tall border.'}
				/>
			{/if}
			{#if current_slide === 2}
				<Slide
					images={[{ url: GamePieceImage, alternate_text: 'Game piece' }]}
					img_num={1}
					text={'This is a game piece. A total of 42 game pieces are available at the start of the game. Each central gutter will hold 10 game pieces,for a total of 30. Each starting area will have 3 game pieces each, whether loaded on the robot or placed inside the starting area. <br/><br /> Each robot can hold a maximum of 10 game pieces at any given moment during the game. Moreover, game pieces can be compressed to a maximum of 1 inch when handled by the robot. However, be careful not to damage them or launch them outside the playing field!'}
				/>
			{/if}
			{#if current_slide === 3}
				<Slide
					images={[]}
					img_num={0}
					text={'You and your teammate will each start the game in one of the designated starting areas of the color of your team, either blue or yellow.'}
				/>
			{/if}
			{#if current_slide === 4}
				<Slide
					images={[
						{ url: SmallTargetImage, alternate_text: 'Small target' },
						{ url: BigTargetImage, alternate_text: 'Big target' },
						{ url: FloorScoreImage, alternate_text: 'Floor score' }
					]}
					img_num={3}
					text={'Now we’re getting to the fun part! The objective of the game is to score as many points as possible with your teammate.There are 3 ways to score points in the Kryptik game. <br /><br /> 1. Small targets are worth 50 points per game piece exiting through the lower floor. The small target is worth 25 points per game piece exiting from the upper floor. <br /><br /> 2. Each large target is worth 250 points per game piece entering it. <br /><br /> 3. At the end of the joust, game pieces on the ground are awarded points according to where they are after they stop moving. The following image shows the point values for each zone, delimited by the red speed bumps, the sides of the playing field and the neutral zone at the top of the hill.'}
				/>
			{/if}
			{#if current_slide === 5}
				<Slide
					images={[
						{ url: MultiplierImage, alternate_text: 'Multiplier' },
						{ url: MultFactorImage, alternate_text: 'Multiplication factors' }
					]}
					img_num={2}
					text={'But there is a catch: 3 multipliers are located on each side of the playing field! They allow a team to boost their score by a multiplication factor. To activate them, simply place a game piece on top. The game piece must remain in place without being transported by a robot to remain active! <br /><br /> Here is the multiplier allocated to each team according to the number of active pillars on each side of the playing field at the end of the game.'}
				/>
			{/if}
			{#if current_slide === 6}
				<Slide
					images={[]}
					img_num={0}
					text={'You are now ready to enter the arena, angryneer! Remember, you only have 5 minutes to score the maximum number of points! <br /><br /> Best of luck, fellow angryneer, take to the skies!'}
				/>
			{/if}
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
		vertical-align: middle;
		padding: 0px 10px 0px;
	}
	img.angry-bird {
		width: 100%;
	}
	svg {
		display: block;
		width: 50%;
		margin: auto;
	}

	@media screen and (min-device-width: 800px) {
		div.main {
			display: block;
			position: relative;
			margin: auto;
			width: 75%;
			aspect-ratio: 5/3;
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
	}
	@media screen and (max-device-width: 800px) {
		div.main {
			display: block;
			position: relative;
			margin: auto;
			width: 75%;
			aspect-ratio: 3/5;
			outline: 10px solid #ffedc2;
			border-radius: 5px;
			background-color: #ffedc2;
		}

		div.left {
			position: absolute;
			left: -15%;
			bottom: 50%;
			height: 10%;
			display: flex;
			justify-content: left;
			flex-direction: row;
		}
		div.middle {
			display: block;
			margin: auto;
			width: 100%;
			height: 90%;
		}
		div.right {
			position: absolute;
			right: -15%;
			bottom: 50%;
			height: 10%;
			display: flex;
			justify-content: right;
			flex-direction: row;
		}
		button {
			border: none;
			background-color: transparent;
			width: 100%;
			height: 100%;
		}
		button.left img {
			height: 100%;
			transform: rotate(180deg);
		}
		button.right img {
			height: 100%;
		}
	}
</style>
