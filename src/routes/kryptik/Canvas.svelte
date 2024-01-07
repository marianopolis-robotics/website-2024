<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import RAPIER from './rapier.es.js';
	import { Vector3 } from './vector.js';

	import playingField from '$lib/assets/3d-objects/playingField.glb';

	//global variables
	let canvas;
	let self_player = {
		position: new Vector3(0, 0, 0),
		rotation: {
			y: 0
		},
		velocity: new Vector3(0, 0, 0),
		desired_displacement: new Vector3(0, 0, 0),
		touching_ground: false,
		power: 0
	};
	const speed = 3;
	const offset = 0.01;
	const gravity = { x: 0, y: -20, z: 0 };
	const default_camera = {
		position: {
			x: 0,
			y: 100,
			z: 300
		},
		rotation: {
			elevation: -0.5,
			y: 0
		}
	};
	const height_field = [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 12, 12, 12, 12,
		12, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 12, 12,
		12, 12, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
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
		mouse_position.x = canvas.width / 2;
		mouse_position.y = canvas.height / 2;
	};
	let on_pointlock_error = function (e) {
		alert(
			'Please slow down your actions : when exiting pointer lock, please wait a few seconds before entering pointer lock again.'
		);
	};

	let start_perpetual_render_and_physics = async function () {
		//scene
		let scene = new THREE.Scene();
		scene.background = new THREE.Color(0x000000);

		//load all custom meshes here, NOT WORKING FOR THE MOMENT
		let loader = new GLTFLoader();

		loader.load(playingField, function (gltf) {
			let mesh = gltf.scene;
			mesh.position.set(-490, -100, 0);
			scene.add(gltf.scene);
		});

		//camera from global variable
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.set(
			default_camera.position.x,
			default_camera.position.y,
			default_camera.position.z
		);
		camera.rotation.set(default_camera.rotation.elevation, default_camera.rotation.y, 0, 'YXZ');

		//three.js generated static objects
		{
			let dirLight = new THREE.DirectionalLight(0xffffff, 1);
			dirLight.color.setHSL(0.1, 1, 0.95);
			dirLight.position.set(-1, 1.75, 1);
			dirLight.position.multiplyScalar(100);
			scene.add(dirLight);

			let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
			hemiLight.color.setHSL(0.6, 0.6, 0.6);
			hemiLight.groundColor.setHSL(0.1, 1, 0.4);
			hemiLight.position.set(0, 50, 0);
			scene.add(hemiLight);
		}

		//three.js dynamic objects : robot
		let self_mesh = new THREE.Mesh(
			new THREE.BoxGeometry(),
			new THREE.MeshPhongMaterial({ color: 0xff0505 })
		);
		self_mesh.scale.set(25, 25, 25);
		scene.add(self_mesh);

		//renderer from global variable
		renderer = new THREE.WebGLRenderer({
			canvas: canvas
		});
		renderer.setSize(window.innerWidth / 1.5, window.innerHeight - 200);

		//physics
		await RAPIER.init();

		let world = new RAPIER.World(gravity);

		//length 1000, width 600, center : x 0, y -90, z -50
		let ground_rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
		let ground_rigid_body = world.createRigidBody(ground_rigid_body_desc);
		let ground_collider_desc = RAPIER.ColliderDesc.heightfield(
			6,
			20,
			height_field,
			new RAPIER.Vector3(1000, 1, 600)
		).setTranslation(0, -100, -50);
		let ground_collider = world.createCollider(ground_collider_desc, ground_rigid_body);
		let floor_handle = ground_collider.handle; //unique ID associated with the floor collider

		let player_rigid_body_desc = RAPIER.RigidBodyDesc.dynamic()
			.setTranslation(0, 0, 0)
			.setLinvel(0, 0, 0);
		let player_rigid_body = world.createRigidBody(player_rigid_body_desc);

		let player_collider_desc = RAPIER.ColliderDesc.capsule(0.5, 0.2);
		let player_collider = world.createCollider(player_collider_desc, player_rigid_body);

		let character_controller = world.createCharacterController(offset);
		//has a function which takes in the player collider to generate desired displacement

		let move_direction = function (angle) {
			self_player.desired_displacement = Vector3.polar_to_coord(angle + Math.PI / 2, 0, speed);
			//further modified later to account for vertical movement
			//only planar movements here
		};

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

				//camera zoom
				if (active_keys.o === true && zoom > 0.5) {
					zoom -= 0.02;
				}
				if (active_keys.i === true && zoom < 4) {
					zoom += 0.02;
				}

				self_player.velocity.add(new Vector3(0, delay_seconds * -10, 0)); //honestly, there is only Y velocity, as you can see
				self_player.desired_displacement.y = delay_seconds * self_player.velocity.y; //vertical movement added here, x and z already set

				//character collisions
				character_controller.computeColliderMovement(
					player_collider,
					self_player.desired_displacement
				);
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
				}

				//update player object
				self_player.position.x = player_rigid_body.translation().x;
				self_player.position.y = player_rigid_body.translation().y;
				self_player.position.z = player_rigid_body.translation().z;

				//run one tick of physics engine
				world.step();

				//update scene
				camera.rotation.set(
					-mouse_position.y / 500,
					(-mouse_position.x + canvas.width / 2) / 500,
					0,
					'YXZ'
				);
				camera.zoom = zoom;
				camera.updateProjectionMatrix();

				self_mesh.position.set(
					self_player.position.x,
					self_player.position.y + 25,
					self_player.position.z
				);
				self_mesh.rotation.set(0, self_player.rotation.y, 0);

				//reset desired displacement, so that if keyboard is inactive, it will default to zero
				self_player.desired_displacement = new Vector3(0, 0, 0);
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

<svelte:window
	on:resize={on_resize}
	on:keydown|preventDefault={on_key_down}
	on:keyup|preventDefault={on_key_up}
/>

<svelte:document
	on:pointerlockchange={on_pointlock_change}
	on:pointerlockerror={on_pointlock_error}
/>

<canvas bind:this={canvas} on:mousemove={on_mouse_move} on:click={on_canvas_click}></canvas>

<style>
	canvas {
		display: block;
		margin: auto;
	}
</style>
