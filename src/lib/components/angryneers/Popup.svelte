<script>
	import { onMount } from 'svelte';
	import { userStore } from '../../../Store';
	import UserBird from '../home/UserBird.svelte';
	import WoodButton from '../home/WoodButton.svelte';
	export let showPopup;
	export let bird;

	// export let text = '';
	let birds = [
		'poppy',
		'blue1',
		'blue2',
		'blue3',
		'bomb',
		'bubbles',
		'chuck',
		'dahlia',
		'drill',
		'hal',
		'ice',
		'luca',
		'matilda',
		'melody',
		'red',
		'silver',
		'stella',
		'terence',
		'tony',
		'willow',
		'user'
	];

	let angryneer = {
		poppy: {
			bird: 'poppy',
			name: 'Adelina Badea',
			subteam: 'Website',
			power: 'Tornado spin',
			hobbies: '3D modelling, karate, and learning new skills through online courses',
			funFacts:
				'I was born prematurely and I have a little dog that has a very snobby personality.',
			learned:
				'I learned some web development to program this very page (the Angryneers page). I learned how to design, paint and build a thematic kiosk.I had to sacrifice many nights of sleep and relaxation during the winter break by learning to code from absolutely no experience in web development. Initially, I thought this path would be too difficult and boring, but I could not have been more wrong. I had so much fun learning to program and debug my code, that I actually plan on doing more web dev in the future.'
		},
		hal: {
			bird: 'hal',
			name: 'Aleksandr Kudashkin',
			subteam: 'Robot, programming',
			power: 'Boomerang',
			hobbies: 'Mathematics, programming, video game development, swimming',
			funFacts:
				"Sometimes I describe my dreams using mathematical formulas and functions. Also, when I'm reading, I become so immersed in the book that I don't hear the people addressing me.",
			learned:
				"I learned how to (and how not to) use electrical motors and motor controllers, as well as their different types. I also learned the principles behind the omni-wheels design and function. I acquired the skills to identify and eliminate the bottlenecks in the robot's development. I applied my knowledge of programming, and learned to utilize parsing, graph theory and design patterns in my code. Finally, I have completed an advanced Python course and a course on design patterns to prepare for the programming competition. To participate on the robotics team, I sacrificed participating in other clubs and meeting friends during Activity Periods, as well as the second half of my winter vacation."
		},
		matilda: {
			bird: 'matilda',
			name: 'Simona-Elena Lungoci',
			subteam: 'Website, Kiosk',
			power: 'Deploys destructive eggs',
			hobbies: 'Playing video games and board games, playing music, programming and 3D printing',
			funFacts: 'I play three musical instruments (piano, clarinet and saxophone)',
			learned:
				'While building the website, I learned how to use the Bootstrap framework to style and position elements. I also learned more about Svelte. While building the kiosk, I learned many things involved in kiosk building such as how to fill holes, sand, and paint walls. I had to sacrifice a lot of my winter break time, but overall I am happy that I used this time to learn new skills.'
		},
		willow: {
			bird: 'willow',
			name: 'Daniel Wei',
			subteam: 'Robot, website, video',
			power: 'Vortex spin',
			hobbies: 'Art, chess, piano, basketball',
			funFacts:
				'When I was 10, I made a 3D cardboard piñata of a Lamborghini Veneno just to smash it to pieces days later',
			learned:
				'Working alongside talented teammates, I honed problem-solving skills through the design, testing, debugging, and enhancement of our robot for specific goals. Through trial and error, we crafted a reliable flywheel system, ensuring precise ball launches.Balancing academics and other extracurricular activities with robotics was challenging, but it taught me effective time management and organizational skills.'
		},
		ice: {
			bird: 'ice',
			name: 'Guancheng He',
			subteam: 'Website, Kiosk',
			power: 'Freeze pigs and blocks',
			hobbies: 'Fencing, trombone, piano, gaming.',
			funFacts: 'I wear glasses (as you can probably see in my photo)',
			learned:
				' I learned HTML, CSS, JavaScript and different frameworks. In addition, I learned leadership skills from our highly competent captains.I sacrificed my participation in other clubs, and part of my vacation.'
		},
		silver: {
			bird: 'silver',
			name: 'Mingruifu Lin',
			subteam: 'Website, programming',
			power: 'Diving into blocks',
			hobbies: 'Math',
			funFacts: 'I have Alice in Wonderland syndrome (dw, it is harmless)',
			learned:
				'I learned how to use Rapier.js (physics library) and SvelteKit (web framework). I could not go to badminton during AP nor to the music club. And I have a week less to enjoy math and violin. I also cannot go to the gym more often.'
		},
		luca: {
			bird: 'luca',
			name: 'Yi Chen Liu',
			subteam: 'Robot',
			power: 'Soundwave shock',
			hobbies:
				'I like to play music, I love building gundams (model kits), and I love to play video games.',
			funFacts: 'I love bubble tea and I love classical music :)',
			learned:
				'One thing that I learned in robotics is that Not everything is as easy as it seems. even if our ideas were good but once we start building it become very hard, but I think me and the rest of the team has found our way around this problem. I sacrificed most of my APs, which are 2-hour periods on Tuesdays and Thursdays when no students have class, and I had to sacrifice a bit of study time as well.'
		},
		dahlia: {
			bird: 'dahlia',
			name: 'Prisha Kalpesh Manek',
			subteam: 'Robot',
			power: 'High intelligence, repel objects',
			hobbies: 'Reading, badminton, napping',
			funFacts: 'My 2024 resolution is to try as many different instant noodles as possible',
			learned:
				'This year on the robotics team, I learned how to add electrical components to the parts I build. I had to give up time from some personal projects and from time spent with friends to fulfill the robotics team commitments.'
		},
		chuck: {
			bird: 'chuck',
			name: 'Sivabalan Sandh Muthurajan',
			subteam: 'Robot, programming',
			power: 'Superhuman speed, chronokinesis, fighting skills',
			hobbies: 'Programming, reading and hobby electronics',
			funFacts: 'I like raspberry pies!',
			learned:
				'I learned more about building specific objects with functions using different materials and how a lot of the tools can be used. Coding the arduino and pulling the robot together has been a lot of learning and fun as well. I had to sacrifice my time spent studying, but I have learned so much that the sacrifices do not matter anymore. In fact, I gained good experience more than anything else.'
		},
		drill: {
			bird: 'drill',
			name: 'Thanh-Tri Nguyen',
			subteam: 'Robot',
			power: 'Drill into hard blocks',
			hobbies: 'Video games, programming and watching movies',
			funFacts: 'I just permed.',
			learned:
				'I learn a lot about how circuitry and robots work in general. I had come in with little to no knowledge on anything but programming, so i learned a lot about how to build a robot and how each part works. I also learned how to solder. I had to sacrifice a lot of my time and my ability to join other clubs which I would have also wanted to try.'
		},
		red: {
			bird: 'red',
			name: 'Yeonjae Oh',
			subteam: 'Robot',
			power: 'Mighty feathers, leadership',
			hobbies: 'Basketball, working out.',
			funFacts: "I'm a lazy ambitioner",
			learned:
				"I learned a lot about how to use pieces and tools to build a robot. I also learned that separating tasks is an important component for efficiency and teamwork. Also, discussing the design of the robot together as a team is my favourite part of robotics. In order to attend all robotics meetings, I couldn't go to other club activities."
		},
		terence: {
			bird: 'terence',
			name: 'Ruwa Qatmash',
			subteam: 'Kiosk, robot',
			power: 'Massive strength, charge, destruction',
			hobbies: 'Playing Hay Day',
			funFacts: 'I love playing Hay Day with Elisa',
			learned:
				"Since it was my first year building and decorating I learned how to organize and plan where everything needs to go and a timeline. I also learned how much I miss Hayday when I'm in robotics since I had to give up my designated Hayday time for robotics."
		},
		blue1: {
			bird: 'Jay',
			name: 'Junlin Song (Martin)',
			subteam: 'Robot',
			power: 'Duplication, high intelligence',
			hobbies: 'Watching soccer, buying Legos (Star Wars), and playing mobile games',
			funFacts: "I'm 6’3 but terrible at basketbal",
			learned:
				'I learned how to use different tools, and how to make designs come to reality starting from prototyping. I also realized the importance of organization and communication skills in a workplace with a team. I had to sacrifice my last week of winter break to be at robotics which meant I had less time to prepare for the new semester. Luckily, we were productive during thatweek and were able to get a lot of work done, which should help us gain more testing time.'
		},
		blue2: {
			bird: 'Jake',
			name: 'Theo Radhakrishna',
			subteam: 'Robot',
			power: 'Duplication, high intelligence',
			hobbies: 'Hockey, baseball, piano',
			funFacts: 'I am a quarter Indian and have visited family in India.',
			learned:
				'I learned how to cooperate with lots of other people to build the robot. I also learned about pretty much every part of the robot. I had to sacrifice time with friends, and study time during activity periods.'
		},
		blue3: {
			bird: 'blue',
			name: 'Tyler Hamel-Wong',
			subteam: 'Website, kiosk',
			power: 'Duplication, high intelligence',
			hobbies: 'Play the guitar',
			funFacts: 'I play the guitar',
			learned:
				'I learned how to build a couch for the kiosk and what fillings work the best to make it super comfy! I sacrificed some of my favourite clothes while painting the kiosk.'
		},
		bomb: {
			bird: 'bomb',
			name: 'Kyota Poëti',
			subteam: 'Robot',
			power: 'Detonation',
			hobbies: 'Programming, playing the violin, and reading',
			funFacts: 'I specialize in cooking eggs.',
			learned:
				'I learned how to build a flywheel shooting mechanism, how to solder, and that Daniel is always right.'
		},
		bubbles: {
			bird: 'bubbles',
			name: 'Yanran Elisa Xue',
			subteam: 'Kiosk, video',
			power: 'Inflate like a balloon',
			hobbies: 'Playing Hay Day with Ruwa',
			funFacts: 'I like plaster',
			learned:
				'I learned how to plaster the wooden walls and build awesome decorations like our wooden window frames.'
		},
		melody: {
			bird: 'melody',
			name: 'Ruo-Ling Wu (Carolyn)',
			subteam: 'Website, programming, kiosk',
			power: 'Gather objects like a vacuum and launch them',
			hobbies: 'Programming, web development, learning new languages',
			funFacts: 'One of the only commands I know in Vim is how to exit.',
			learned:
				'For the website, I learned a lot of advanced Svelte functionality and creative CSS solutions and animations. I also learned how to build a kiosk and how to use all the tools that come with building and decorating the kiosk. I did have to sacrifice free time and sleep but robotics is worth it.'
		},
		stella: {
			bird: 'stella',
			name: 'Dominique Paradis (mentor)',
			subteam: 'Supervisor',
			power: 'Bubble wand',
			hobbies: 'Astrophysics',
			funFacts: 'I am a hyperspheroid-earther',
			learned: '[description]'
		},
		tony: {
			bird: 'tony',
			name: 'Zi Heng Wang (captain)',
			subteam: 'Video, robot',
			power: 'Body slam, massive strength',
			hobbies: 'Play hockey with Ruwa',
			funFacts: 'I want to become a cat',
			learned: '[description]'
		}
	};

	$: currentBird = bird;
	let birdIndex = birds.indexOf(bird);
	onMount(() => {
		let birdIndex = birds.indexOf(bird);
	});
	

	function changeBird(number) {
		birdIndex += number;

		if (birdIndex <= -1) {
			birdIndex = birds.length - 1;
		}
		if (birdIndex >= birds.length) {
			birdIndex = 0;
		}

		currentBird = birds[birdIndex];
	}
</script>

{#if showPopup}
	<main class="background">
		<div class="container">
			<div class="row align-items-center">
				<div
					class="col d-flex flex-row-reverse top-spacing"
					class:close_button={document.documentElement.scrollTop <= 100}
				>
					<WoodButton on:click={() => (showPopup = false)} message="X" />
				</div>
			</div>

			<div class="row popup align-items-center">
				<div class="col col-1 arrows">
					<WoodButton
						message="<"
						on:click={() => {
							changeBird(-1);
						}}
					/>
				</div>
				<div class="col">
					<div class="row align-items-center row-cols-1 row-cols-md-2 row-cols-lg-2">
						<div class="col col-12 col-md-12 col-lg-4 bird_display">
							{#if currentBird == 'user'}
								<UserBird />
							{:else}
								<img
									src={`/birds/${currentBird.includes('blue') ? 'blue' : currentBird}.svg`}
									alt=""
								/>
							{/if}
						</div>
						<div class="col arrows_small">
							<div class="row arrows-small">
								<div class="col">
									<WoodButton
										large_width={true}
										message="<"
										on:click={() => {
											changeBird(-1);
										}}
									/>
								</div>
								<div class="col">
									<WoodButton message=">" on:click={() => changeBird(1)} large_width={true} />
								</div>
							</div>
						</div>
						<div class="col col-sm-12 col-md-12 col-lg-8" id="box_container">
							<img class="frame_left" src="/textures/wood_frame.svg" alt="wood frame left" />
							<img class="frame_right" src="/textures/wood_frame.svg" alt="" />

							<img class="frame_top" src="/textures/wood_frame_horizontal.svg" alt="" />
							<img class="frame_bottom" src="/textures/wood_frame_horizontal.svg" alt="" />

							<div class="rounded-content-box box m-4 p-4 pt-5">
								<div>
									<p class="stat p-2 mt-2">
										<strong>Name:</strong>
										{currentBird == 'user' ? $userStore.name : angryneer[currentBird].name}
									</p>
									<p class="stat p-2">
										<strong>Power:</strong>
										{currentBird == 'user' ? $userStore.superPower : angryneer[currentBird].power}
									</p>
									<p class="stat p-2">
										<strong>Hobbies:</strong>
										{currentBird == 'user' ? $userStore.hobbies : angryneer[currentBird].hobbies}
									</p>
									<p class="stat p-2">
										<strong>Fun Facts:</strong>
										{currentBird == 'user' ? $userStore.funFact : angryneer[currentBird].funFacts}
									</p>
									<p class="stat p-2 mb-5">
										<strong>Description:</strong>
										{currentBird == 'user' ? $userStore.name : angryneer[currentBird].learned}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col col-1 arrows">
					<WoodButton message=">" on:click={() => changeBird(1)} />
				</div>
			</div>
		</div>
	</main>
{/if}

<style>
	#box_container {
		position: relative;
	}
	.bird_display {
		min-width: 25%;
	}

	.box {
		height: 400px;
		overflow: scroll;
	}

	.frame_left {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
	}

	.frame_right {
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
	}
	.frame_top {
		position: absolute;

		right: 0;
		top: 0;
		width: 100%;

		/* width: 100%; */
	}
	.frame_bottom {
		position: absolute;

		right: 0;
		bottom: 0;
		width: 100%;
	}
	.stat {
		background-color: #85bce7;
		border-radius: 25px;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		border: 2px solid blue;
		/* color: white; */
	}

	.close_button {
		margin-top: 20%;
	}

	.background {
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		left: 0;
		top: 0;
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: auto; /* Enable scroll if needed */
		background-color: rgb(0, 0, 0); /* Fallback color */
		background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
		-webkit-animation-name: fadeIn; /* Fade in the background */
		-webkit-animation-duration: 0.4s;
		animation-name: fadeIn;
		animation-duration: 0.4s;
	}

	.popup {
		height: 20%;
	}

	@media only screen and (max-width: 600px) {
		.arrows {
			display: none;
		}
	}

	@media only screen and (min-width: 600px) {
		.arrows_small {
			display: none;
		}
	}
	@media only screen and (min-width: 992px) {
		.top-spacing {
			margin-top: 20vh;
		}
	}
</style>
