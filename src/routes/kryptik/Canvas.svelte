<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import RAPIER from '@dimforge/rapier3d-compat';
	import { Vector3 } from './vector.js';

	import playingField from '$lib/assets/3d-objects/playingField.glb';

	//global variables
	let canvas;
	let game_info;
	let self_player = {
		position: new Vector3(-450, -50, -100),
		rotation: {
			y: 0
		},
		velocity: new Vector3(0, 0, 0),
		desired_displacement: new Vector3(0, 0, 0),
		touching_ground: false,
		power: 500,
		game_piece_number: 3
	};
	let game_pieces = [];
	const speed = 10;
	const offset = 0.01; //character collision margin
	const gravity = { x: 0, y: -500, z: 0 };
	const damping = 0.5;
	const launch_error_radians = 0.2;
	const default_camera = {
		position: {
			x: 0,
			y: 200,
			z: 400
		},
		rotation: {
			elevation: -0.5,
			y: 0
		}
	};
	const height_field = [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 12, 12, 12, 12, 12, 12, 12, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 12, 12, 12,
		12, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];
	let active_keys = {
		w: false,
		a: false,
		s: false,
		d: false,
		q: false,
		e: false,
		space: false,
		i: false,
		o: false
	};
	let mouse_position = {
		x: 0,
		y: 0
	};
	let zoom = 1;
	let camera; //setting camera and renderer as global to access when rescaling the window
	let renderer;
	let element_active = false; //canvas active/inactive to prevent using CPU when inactive

	//event handlers
	let on_key_down = function (e) {
		switch (e.key) {
			case 'w':
				active_keys.w = true;
				break;
			case 'a':
				active_keys.a = true;
				break;
			case 's':
				active_keys.s = true;
				break;
			case 'd':
				active_keys.d = true;
				break;
			case 'q':
				active_keys.q = true;
				break;
			case 'e':
				active_keys.e = true;
				break;
			case ' ':
				active_keys.space = true;
				break;
			case 'i':
				active_keys.i = true;
				break;
			case 'o':
				active_keys.o = true;
				break;
		}
	};
	let on_key_up = function (e) {
		switch (e.key) {
			case 'w':
				active_keys.w = false;
				break;
			case 'a':
				active_keys.a = false;
				break;
			case 's':
				active_keys.s = false;
				break;
			case 'd':
				active_keys.d = false;
				break;
			case 'q':
				active_keys.q = false;
				break;
			case 'e':
				active_keys.e = false;
				break;
			case ' ':
				active_keys.space = false;
				break;
			case 'i':
				active_keys.i = false;
				break;
			case 'o':
				active_keys.o = false;
				break;
		}
	};
	let on_mouse_move = function (e) {
		mouse_position.x += e.movementX;
		mouse_position.y += e.movementY;
	};
	let on_resize = function (e) {
		renderer.setSize(window.innerWidth / 1.5, window.innerHeight - 200);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	};
	let on_canvas_click = function (e) {
		canvas.requestPointerLock();
		setTimeout(function () {
			element_active = true;
		}, 100);
	};
	let on_pointlock_change = function (e) {
		element_active = !element_active;
		camera.rotation.set(default_camera.rotation.elevation, default_camera.rotation.y, 0, 'YXZ');
		zoom = 1;
		camera.updateProjectionMatrix();
	};
	let on_pointlock_error = function (e) {
		alert('Please slow down your actions : when exiting pointer lock, please wait a few seconds before entering pointer lock again.');
	};

	let start_perpetual_render_and_physics = async function () {
		//scene
		let scene = new THREE.Scene();
		scene.background = new THREE.Color(0x9dc5d1);

		//load all custom meshes here, NOT WORKING FOR THE MOMENT
		let loader = new GLTFLoader();

		loader.load(playingField, function (gltf) {
			let model = gltf.scene;
			model.position.set(-490, -100, 0);
			model.traverse(function (o) {
				if (o.isMesh) {
					o.material = new THREE.MeshPhongMaterial({ color: 0x404040 });
					o.receiveShadow = true;
				}
			});
			scene.add(model);
		});

		//camera from global variable
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
		camera.position.set(default_camera.position.x, default_camera.position.y, default_camera.position.z);
		camera.rotation.set(default_camera.rotation.elevation, default_camera.rotation.y, 0, 'YXZ');

		//three.js generated static objects
		{
			let dirLight = new THREE.DirectionalLight(0xffffff, 3);
			dirLight.color.setHSL(0.1, 1, 0.95);
			dirLight.position.set(-1, 1.75, 1);
			dirLight.position.multiplyScalar(100);
			dirLight.castShadow = true;
			scene.add(dirLight);
		}
		{
			let ground = new THREE.Mesh(new THREE.BoxGeometry(2000, 2, 1000), new THREE.MeshPhongMaterial({ color: 0x818d9c }));
			ground.position.set(0, -200, 0);
			scene.add(ground);
		}
		{
			let wall = new THREE.Mesh(new THREE.BoxGeometry(2, 500, 1000), new THREE.MeshPhongMaterial({ color: 0x818d9c }));
			wall.position.set(-1000, 0, 0);
			scene.add(wall);
		}
		{
			let wall = new THREE.Mesh(new THREE.BoxGeometry(2, 500, 1000), new THREE.MeshPhongMaterial({ color: 0x818d9c }));
			wall.position.set(1000, 0, 0);
			scene.add(wall);
		}
		{
			let wall = new THREE.Mesh(new THREE.BoxGeometry(2000, 500, 2), new THREE.MeshPhongMaterial({ color: 0x818d9c }));
			wall.position.set(0, 0, -500);
			scene.add(wall);
		}

		//three.js dynamic objects : robot
		let self_mesh = new THREE.Mesh(new THREE.BoxGeometry(25, 25, 25), new THREE.MeshPhongMaterial({ color: 0xff0505 }));
		self_mesh.position.set(self_player.position.x, self_player.position.y, self_player.position.z);
		self_mesh.castShadow = true;
		scene.add(self_mesh);

		//renderer from global variable
		renderer = new THREE.WebGLRenderer({
			canvas: canvas
		});
		renderer.shadowMap.enabled = true;
		renderer.setSize(window.innerWidth / 1.5, window.innerHeight - 200);

		//physics
		await RAPIER.init();

		let world = new RAPIER.World(gravity);

		//ground : length 1000, width 600, center : x 0, y -90, z -50
		let ground_rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
		let ground_rigid_body = world.createRigidBody(ground_rigid_body_desc);
		let ground_collider_desc = RAPIER.ColliderDesc.heightfield(6, 20, height_field, new RAPIER.Vector3(1200, 1, 700)).setTranslation(0, -90, -50); //offset the collider relative to the rigid body
		let ground_collider = world.createCollider(ground_collider_desc, ground_rigid_body);
		let floor_handle = ground_collider.handle; //unique ID associated with the floor collider

		//walls
		{
			let wall_rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let wall_rigid_body = world.createRigidBody(wall_rigid_body_desc);
			let left_wall_collider_desc = RAPIER.ColliderDesc.cuboid(100, 1000, 500).setTranslation(-575, 400, 0);
			let right_wall_collider_desc = RAPIER.ColliderDesc.cuboid(100, 1000, 500).setTranslation(575, 400, 0);
			let top_wall_collider_desc = RAPIER.ColliderDesc.cuboid(700, 1000, 100).setTranslation(0, 400, -450);
			let bottom_wall_collider_desc = RAPIER.ColliderDesc.cuboid(700, 1000, 100).setTranslation(0, 400, 350);
			world.createCollider(left_wall_collider_desc, wall_rigid_body);
			world.createCollider(right_wall_collider_desc, wall_rigid_body);
			world.createCollider(top_wall_collider_desc, wall_rigid_body);
			world.createCollider(bottom_wall_collider_desc, wall_rigid_body);
		}

		let player_rigid_body_desc = RAPIER.RigidBodyDesc.dynamic()
			.setTranslation(self_player.position.x, self_player.position.y, self_player.position.z)
			.setLinvel(0, 0, 0);
		let player_rigid_body = world.createRigidBody(player_rigid_body_desc);

		let player_collider_desc = RAPIER.ColliderDesc.ball(12);
		let player_collider = world.createCollider(player_collider_desc, player_rigid_body);

		let character_controller = world.createCharacterController(offset);
		//has a function which takes in the player collider to generate desired displacement

		let move_direction = function (angle) {
			self_player.desired_displacement = Vector3.polar_to_coord(angle + Math.PI / 2, 0, speed);
			//further modified later to account for vertical movement
			//only planar movements here
		};

		//game piece
		let Game_piece = class {
			constructor(position, velocity) {
				if (Math.random() > 0.5) {
					this.mesh = new THREE.Mesh(new THREE.SphereGeometry(6), new THREE.MeshPhongMaterial({ color: 0xffff00 }));
				} else {
					this.mesh = new THREE.Mesh(new THREE.SphereGeometry(6), new THREE.MeshPhongMaterial({ color: 0x800080 }));
				}
				this.mesh.castShadow = true;

				let rigid_body_desc = RAPIER.RigidBodyDesc.dynamic()
					.setTranslation(position.x, position.y, position.z)
					.setLinvel(velocity.x, velocity.y, velocity.z)
					.setLinearDamping(damping);
				this.rigid_body = world.createRigidBody(rigid_body_desc);

				let collider_desc = RAPIER.ColliderDesc.ball(6);
				this.collider = world.createCollider(collider_desc, this.rigid_body);
			}
			update_mesh() {
				this.mesh.position.set(this.rigid_body.translation().x, this.rigid_body.translation().y, this.rigid_body.translation().z);
			}
			add_to_scene(scene) {
				scene.add(this.mesh);
			}
			remove_everywhere() {
				scene.remove(this.mesh);
				world.removeRigidBody(this.rigid_body);
			}
		};

		//add initial game pieces
		for (let z = -15; z < 15; z++) {
			let game_piece = new Game_piece(new Vector3(0, 0, 20 * z - 50), new Vector3(0, 0, 0));
			game_piece.update_mesh();
			game_piece.add_to_scene(scene);
			game_pieces.push(game_piece);
		}

		//game loop
		let delay_seconds = 0.05; //how fast you want the simulation? smaller delay = faster animation
		let perpetual = function () {
			//canvas active?
			if (element_active) {
				//player movement
				if (active_keys.w === true) {
					move_direction(self_player.rotation.y);
				}
				if (active_keys.s === true) {
					move_direction(self_player.rotation.y + Math.PI);
				}
				if (active_keys.a === true) {
					self_player.rotation.y += 0.02;
				}
				if (active_keys.d === true) {
					self_player.rotation.y -= 0.02;
				}

				//game piece shooting controls
				if (active_keys.q === true && self_player.power < 1000) {
					self_player.power += 10;
				}
				if (active_keys.e === true && self_player.power > 0) {
					self_player.power -= 10;
				}
				if (active_keys.space === true && self_player.game_piece_number > 0) {
					active_keys.space = false;
					self_player.game_piece_number--;
					let direction_shot = Vector3.polar_to_coord(
						self_player.rotation.y + Math.PI / 2 + (Math.random() - 0.5) * launch_error_radians,
						Math.PI / 6,
						self_player.power
					);
					let game_piece = new Game_piece(new Vector3(self_player.position.x, self_player.position.y + 25, self_player.position.z), direction_shot);
					game_piece.update_mesh();
					game_piece.add_to_scene(scene);
					game_pieces.push(game_piece);
				}

				//camera zoom
				if (active_keys.o === true && zoom > 0.5) {
					zoom -= 0.03;
				}
				if (active_keys.i === true && zoom < 10) {
					zoom += 0.03;
				}

				self_player.velocity.add(new Vector3(0, delay_seconds * gravity.y, 0)); //honestly, there is only Y velocity, as you can see
				self_player.desired_displacement.y = delay_seconds * self_player.velocity.y; //vertical movement added here, x and z already set

				//character collisions
				character_controller.computeColliderMovement(player_collider, self_player.desired_displacement);
				let corrected_displacement = character_controller.computedMovement();
				player_rigid_body.setLinvel(
					{
						x: corrected_displacement.x / delay_seconds,
						y: corrected_displacement.y / delay_seconds,
						z: corrected_displacement.z / delay_seconds
					},
					true
				); //Linvel = linear velocity (rapier built-in)

				//check for touch ground
				self_player.touching_ground = false;
				for (let i = 0; i < character_controller.numComputedCollisions(); i++) {
					let collision = character_controller.computedCollision(i);
					//floor handle used here
					if (collision.collider.handle === floor_handle) {
						self_player.velocity.y = 0;
						self_player.touching_ground = true;
					}

					let found_game_piece_index = game_pieces.findIndex(function (e) {
						return e.collider.handle === collision.collider.handle;
					});
					if (found_game_piece_index >= 0) {
						game_pieces[found_game_piece_index].remove_everywhere();
						game_pieces.splice(found_game_piece_index, 1);
						self_player.game_piece_number++;
						break;
					}
				}

				//update player object
				self_player.position.x = player_rigid_body.translation().x;
				self_player.position.y = player_rigid_body.translation().y;
				self_player.position.z = player_rigid_body.translation().z;

				//run one tick of physics engine
				world.step();

				//update scene
				camera.rotation.set(-mouse_position.y / 500, (-mouse_position.x + canvas.width / 2) / 500, 0, 'YXZ');
				camera.zoom = zoom;
				camera.updateProjectionMatrix();

				self_mesh.position.set(self_player.position.x, self_player.position.y, self_player.position.z);
				self_mesh.rotation.set(0, self_player.rotation.y, 0);

				for (let i = 0; i < game_pieces.length; i++) {
					game_pieces[i].update_mesh();
				}

				//reset desired displacement, so that if keyboard is inactive, it will default to zero
				self_player.desired_displacement = new Vector3(0, 0, 0);

				//game info
				game_info.innerHTML =
					'Launch power (initial m/s) : ' + self_player.power / 50 + '<br/>' + 'Game pieces carried : ' + self_player.game_piece_number;
			}

			renderer.render(scene, camera);

			requestAnimationFrame(perpetual);
		};
		perpetual();
	};

	//start rendering when ready
	onMount(function () {
		start_perpetual_render_and_physics();
	});
</script>

<svelte:window on:resize={on_resize} on:keydown|preventDefault={on_key_down} on:keyup|preventDefault={on_key_up} />

<svelte:document on:pointerlockchange={on_pointlock_change} on:pointerlockerror={on_pointlock_error} />

<div>
	<div class="main">
		<canvas bind:this={canvas} on:mousemove={on_mouse_move} on:click={on_canvas_click}> </canvas>
		<div bind:this={game_info} class="game-info"></div>
	</div>
</div>

<style>
	div .main {
		display: block;
		margin: auto;
		position: relative;
		width: 75%;
	}
	div .game-info {
		position: absolute;
		top: 0px;
		left: 0px;
		color: white;
		padding: 10px 10px 0px;
	}
</style>
