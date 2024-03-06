<script>
	export let mobile = false;
	export let isFr = false;
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import RAPIER from '@dimforge/rapier3d-compat';
	import { Vector3 } from '$lib/3d/vector.js';

	import playingFieldURL from '$lib/assets/3d-objects/playingField.glb';
	import { userStore } from "$lib/Store";
	import {
		ceiling_lamp_1,
		ceiling_lamp_2,
		ceiling_lamp_3,
		ambient_light,
		ground,
		wall_left,
		wall_right,
		wall_top,
		border_north,
		border_south,
		border_west,
		border_east,
		twenty_text,
		fourty_text,
		ten_text,
		two_fifty_text,
		fifty_text,
		twenty_five_text,
		self_mesh
	} from '$lib/3d/custom-objects.js';
	import __ from '$lib/3d/custom-physics.js';

	import SlingshotImage from '$lib/assets/icons/slingshot.png';

	//html elements
	let main_div;
	let canvas;
	let game_info_div;
	let start_mask_div;
	let start_mask_text;
	let add_multiplier_button;
	let joystick_start_div;
	let camera_drag_div;
	let joystick_start_svg;
	let joystick_current_svg;
	let power_input;
	let reset_ball_requested = false;
	// global three objects
	let camera;
	let renderer;
	// run or pause simulation
	let canvas_active = false;
	// everything is in meters, and scaled for render:
	const ratio_render_over_physics = 100;
	// game pieces
	let game_pieces = [];
	// game variables
	let self_player = {
		position: new Vector3(-4.5, 0.7, -1),
		rotation: {
			y: 0
		},
		velocity: new Vector3(0, 0, 0),
		desired_displacement: new Vector3(0, 0, 0),
		power: 5,
		game_piece_number: 3
	};
	let score = 0;
	let selected_multiplier;
	let multiplier_1_placed = false;
	let multiplier_2_placed = false;
	let multiplier_3_placed = false;
	let multiplier_count = 0;
	let multiply_factor = 1;
	let timer_seconds = 300; // set initial
	const field_width = 6.1;
	const speed = 1;
	const robot_radius = 0.3;
	const ball_radius = field_width / 32 / 2;
	const max_game_piece = 10;
	const max_launch_power = 15;
	const gravity = { x: 0, y: -10, z: 0 };
	const friction_damping = 0.9;
	const launch_angle_error = Math.PI / 6;
	const default_camera = {
		position: {
			x: 0,
			y: 5,
			z: 4
		},
		rotation: {
			elevation: -1,
			y: 0
		},
		zoom: 1
	};
	// controls
	const active_keys = {};
	const mouse_position = {
		x: 0,
		y: 0
	};
	const touch_position = {
		joystick_current: { x: 0, y: 0 },
		joystick_start: { x: 0, y: 0 },
		joystick_active: false,
		camera_current: { x: 0, y: 0 },
		camera_start: { x: 0, y: 0 },
		camera_active: false
	};
	let add_multiplier; // function

	const set_camera_default = function () {
		camera.rotation.set(default_camera.rotation.elevation, default_camera.rotation.y, 0, 'YXZ');
		camera.zoom = default_camera.zoom;
		camera.updateProjectionMatrix();
	};

	// event handlers
	const on_key_down = function (e) {
		active_keys[e.key] = true;
	};
	const on_key_up = function (e) {
		active_keys[e.key] = false;
	};
	const on_mouse_move = function (e) {
		if (!mobile) {
			mouse_position.x += e.movementX;
			mouse_position.y += e.movementY;
		}
	};
	const on_resize = function () {
		renderer.setSize(main_div.offsetWidth, window.innerHeight * 0.75);
		camera.aspect = main_div.offsetWidth / (window.innerHeight * 0.75);
		camera.updateProjectionMatrix();
	};
	const on_canvas_click = function () {
		if (timer_seconds > 0) {
			if (mobile) {
				start_mask_div.style.visibility = 'hidden';
				start_mask_text.textContent = `${isFr ? 'Continuer' : 'Continue'}`;
				canvas_active = true;
			} else {
				start_mask_text.textContent = `${isFr ? 'Continuer' : 'Continue'}`;
				canvas.requestPointerLock();
			}
		}
	};
	const on_pointlock_change = function () {
		if (start_mask_div.style.visibility === 'hidden') {
			start_mask_div.style.visibility = 'visible';
		} else {
			if (timer_seconds > 0) {
				start_mask_div.style.visibility = 'hidden';
			}
		}
		canvas_active = !canvas_active;
	};
	const on_pointlock_error = function() {
		alert(`${isFr ? 'Veuillez attendre quelques secondes avant de réactiver le verrouillage du pointeur.' : 'Please wait a few seconds before entering pointer lock again.'}`);
	};
	const on_joy_touch_start = function (e) {
		e.preventDefault();
		for (let touch of e.changedTouches) {
			if (touch_position.joystick_active === false) {
				let rect = joystick_start_div.getBoundingClientRect();
				touch_position.joystick_start = {
					x: touch.clientX - rect.left,
					y: touch.clientY - rect.top
				};
				touch_position.joystick_active = true;
			}
		}
	};
	const on_joy_touch_move = function (e) {
		e.preventDefault();
		for (let touch of e.touches) {
			if (touch_position.joystick_active === true) {
				let rect = joystick_start_div.getBoundingClientRect();
				touch_position.joystick_current = {
					x: touch.clientX - rect.left,
					y: touch.clientY - rect.top
				};
			}
		}
	};
	const on_joy_touch_end = function (e) {
		e.preventDefault();
		if (touch_position.joystick_active === true) {
			touch_position.joystick_active = false;
			touch_position.joystick_start = { x: joystick_start_div.offsetWidth / 2, y: joystick_start_div.offsetHeight / 2 };
			touch_position.joystick_current = { x: joystick_start_div.offsetWidth / 2, y: joystick_start_div.offsetHeight / 2 };
		}
	};
	const on_camera_touch_start = function (e) {
		e.preventDefault();
		for (let touch of e.changedTouches) {
			if (touch_position.camera_active === false) {
				let rect = camera_drag_div.getBoundingClientRect();
				touch_position.camera_start = {
					x: touch.clientX - rect.left,
					y: touch.clientY - rect.top
				};
				touch_position.camera_current = {
					x: touch.clientX - rect.left,
					y: touch.clientY - rect.top
				};
				touch_position.camera_active = true;
			}
		}
	};
	const on_camera_touch_move = function (e) {
		e.preventDefault();
		for (let touch of e.touches) {
			if (touch_position.camera_active === true) {
				let rect = camera_drag_div.getBoundingClientRect();
				touch_position.camera_current = {
					x: touch.clientX - rect.left,
					y: touch.clientY - rect.top
				};
			}
		}
	};
	const on_camera_touch_end = function (e) {
		e.preventDefault();
		if (touch_position.camera_active === true) {
			touch_position.camera_active = false;
			mouse_position.x -= touch_position.camera_current.x - touch_position.camera_start.x;
			mouse_position.y -= touch_position.camera_current.y - touch_position.camera_start.y;
			touch_position.camera_start = { x: 0, y: 0 };
			touch_position.camera_current = { x: 0, y: 0 };
		}
	};
	const fire = function () {
		active_keys[' '] = true;
	};
	const reset_balls = function() {
		active_keys.reset_ball = true;
		reset_ball_requested = true;
		setTimeout(() => {
			reset_ball_requested = false;
		}, 3000);
	};
	const restart_game = function () {
		window.location.reload();
	};

	// game initial setup
	const start_perpetual = async function () {
		let scene = new THREE.Scene();
		scene.background = new THREE.Color(0x9dc5d1);

		// load objects from blender/fusion/etc
		{
			let loader = new GLTFLoader();
			loader.load(playingFieldURL, function (gltf) {
				let model = gltf.scene;
				model.traverse(function (o) {
					if (o.isMesh) {
						o.material = new THREE.MeshPhongMaterial({ color: 0x404040 });
						o.castShadow = true;
						o.receiveShadow = true;
					}
				});
				model.rotation.set(0, Math.PI, 0, 'YXZ');
				model.position.set(530, -10, -55); // centers the object
				model.scale.set(1.09, 1, 1);
				scene.add(model);
			});
		}

		// add js generated custom objects
		scene.add(ceiling_lamp_1);
		scene.add(ceiling_lamp_2);
		scene.add(ceiling_lamp_3);
		scene.add(ambient_light);
		scene.add(ground);
		scene.add(wall_left);
		scene.add(wall_right);
		scene.add(wall_top);
		scene.add(border_north);
		scene.add(border_south);
		scene.add(border_west);
		scene.add(border_east);
		scene.add(twenty_text);
		scene.add(fourty_text);
		scene.add(ten_text);
		scene.add(two_fifty_text);
		scene.add(fifty_text);
		scene.add(twenty_five_text);

		// camera from global variable
		camera = new THREE.PerspectiveCamera(75, 1, 0.1, 20 * ratio_render_over_physics);
		camera.position.set(
			default_camera.position.x * ratio_render_over_physics,
			default_camera.position.y * ratio_render_over_physics,
			default_camera.position.z * ratio_render_over_physics
		);
		set_camera_default();

		// set robot mesh position after loading
		self_mesh.position.set(
			self_player.position.x * ratio_render_over_physics,
			self_player.position.y * ratio_render_over_physics,
			self_player.position.z * ratio_render_over_physics
		);
		scene.add(self_mesh);

		// renderer from global variable
		renderer = new THREE.WebGLRenderer({
			canvas: canvas
		});
		renderer.shadowMap.enabled = true;

		// physics using Rapier library
		await RAPIER.init();

		let world = new RAPIER.World(gravity);

		// load static custom physics
		let custom_physics = new __(RAPIER, world);

		let low_target_collider = custom_physics.low_target_collider;
		let lowest_target_collider = custom_physics.lowest_target_collider;
		let high_target_collider = custom_physics.high_target_collider;

		let player_rigid_body = custom_physics.player_rigid_body;
		player_rigid_body.setTranslation(self_player.position);
		let player_collider = custom_physics.player_collider;
		let character_controller = custom_physics.character_controller;

		let ally_multiplier_top = custom_physics.ally_multiplier_top;
		let ally_multiplier_middle = custom_physics.ally_multiplier_middle;
		let ally_multiplier_bottom = custom_physics.ally_multiplier_bottom;

		// game piece
		let Game_piece = class {
			constructor(position, velocity) {
				let material;
				if (Math.random() > 0.5) {
					material = new THREE.MeshPhongMaterial({ color: 0xffff00 }); // yellow
				} else {
					material = new THREE.MeshPhongMaterial({ color: 0x800080 }); // purple
				}
				this.mesh = new THREE.Mesh(new THREE.SphereGeometry(ball_radius * ratio_render_over_physics), material);
				this.mesh.castShadow = true;

				let rigid_body_desc = RAPIER.RigidBodyDesc.dynamic()
					.setTranslation(position.x, position.y, position.z)
					.setLinvel(velocity.x, velocity.y, velocity.z)
					.setLinearDamping(friction_damping);
				this.rigid_body = world.createRigidBody(rigid_body_desc);

				let collider_desc = RAPIER.ColliderDesc.ball(ball_radius);
				this.collider = world.createCollider(collider_desc, this.rigid_body);
			}
			update_mesh() {
				this.mesh.position.set(
					this.rigid_body.translation().x * ratio_render_over_physics,
					this.rigid_body.translation().y * ratio_render_over_physics,
					this.rigid_body.translation().z * ratio_render_over_physics
				);
			}
			remove_everywhere() {
				scene.remove(this.mesh);
				world.removeRigidBody(this.rigid_body);
			}
			touch_target(collider) {
				return world.intersectionPair(this.collider, collider);
			}
		};
		Game_piece.fast_spawn = function (position, velocity) {
			let game_piece = new Game_piece(position, velocity);
			game_piece.update_mesh();
			game_pieces.push(game_piece);
			scene.add(game_piece.mesh);
		};

		// add initial game pieces
		let setup_ball = function () {
			for (let z = -15.5; z <= 15.5; z++) {
				if (z === -5.5 || z === 5.5) {
					z++;
				}
				Game_piece.fast_spawn(new Vector3(0, 0.5, (field_width / 32) * z), new Vector3(0, 0, 0));
			}
			Game_piece.fast_spawn(new Vector3(4.4, 0.5, 1), new Vector3(0, 0, 0));
			Game_piece.fast_spawn(new Vector3(4.4, 0.5, 1.5), new Vector3(0, 0, 0));
			Game_piece.fast_spawn(new Vector3(4.7, 0.5, 1.25), new Vector3(0, 0, 0));
			Game_piece.fast_spawn(new Vector3(4.4, 0.5, -1), new Vector3(0, 0, 0));
			Game_piece.fast_spawn(new Vector3(4.4, 0.5, -1.5), new Vector3(0, 0, 0));
			Game_piece.fast_spawn(new Vector3(4.7, 0.5, -1.25), new Vector3(0, 0, 0));
			Game_piece.fast_spawn(new Vector3(-4.4, 0.5, 1), new Vector3(0, 0, 0));
			Game_piece.fast_spawn(new Vector3(-4.4, 0.5, 1.5), new Vector3(0, 0, 0));
			Game_piece.fast_spawn(new Vector3(-4.7, 0.5, 1.25), new Vector3(0, 0, 0));
		};
		setup_ball();

		// initial render
		renderer.render(scene, camera);

		let update_game_info = function () {
			game_info_div.innerHTML =
				`${isFr ? 'Temps restant: ' : 'Time remaining: '}` +
				Math.round(timer_seconds) +
				' s' +
				'<br/>' +
				`${isFr ? 'Pouvoir du lancement: ' : 'Launch power: '}` +
				self_player.power +
				' m/s' +
				'<br/>' +
				`${isFr ? 'Pièces de jeu portées: ' : 'Game pieces carried: '}` +
				self_player.game_piece_number +
				'<br/>' +
				`${isFr ? 'Facteur multiplicateur: ' : 'Multiplier factor: '}` +
				multiply_factor +
				'<br/>' +
				'Score: ' +
				score +
				' pts';
		};

		add_multiplier = function () {
			if (selected_multiplier === 1 && multiplier_1_placed === false) {
				Game_piece.fast_spawn(new Vector3(-3.39, 1, -1.83), new Vector3(0, 0, 0));
				self_player.game_piece_number--;
				multiplier_1_placed = true;
				multiplier_count++;
			}
			if (selected_multiplier === 2 && multiplier_2_placed === false) {
				Game_piece.fast_spawn(new Vector3(-4.95, 1, 0.35), new Vector3(0, 0, 0));
				self_player.game_piece_number--;
				multiplier_2_placed = true;
				multiplier_count++;
			}
			if (selected_multiplier === 3 && multiplier_3_placed === false) {
				Game_piece.fast_spawn(new Vector3(-2.35, 1, 1.28), new Vector3(0, 0, 0));
				self_player.game_piece_number--;
				multiplier_3_placed = true;
				multiplier_count++;
			}
		};

		// game loop
		let start = 0;
		let now = performance.now();
		let delay_seconds;
		let perpetual = function () {
			if (canvas_active) {
				// time management
				start = now;
				now = performance.now();
				if (now - start > 50) {
					start = now - 50;
				}
				delay_seconds = (now - start) / 1000;
				timer_seconds -= delay_seconds;

				// camera zoom
				if (active_keys.o === true && default_camera.zoom > 0.5) {
					default_camera.zoom -= 0.05;
					camera.zoom = default_camera.zoom;
					camera.updateProjectionMatrix();
				}
				if (active_keys.i === true && default_camera.zoom < 10) {
					default_camera.zoom += 0.05;
					camera.zoom = default_camera.zoom;
					camera.updateProjectionMatrix();
				}

				// player movement
				if (active_keys.a === true) {
					self_player.rotation.y += (speed * delay_seconds) / robot_radius / 2;
				}
				if (active_keys.d === true) {
					self_player.rotation.y -= (speed * delay_seconds) / robot_radius / 2;
				}
				if (active_keys.w === true) {
					self_player.desired_displacement = Vector3.polar_to_coord(self_player.rotation.y, 0, speed * delay_seconds);
				}
				if (active_keys.s === true) {
					self_player.desired_displacement = Vector3.polar_to_coord(self_player.rotation.y, 0, -speed * delay_seconds);
				}
				if (mobile) {
					let deltaX = touch_position.joystick_current.x - touch_position.joystick_start.x;
					let deltaY = -(touch_position.joystick_current.y - touch_position.joystick_start.y);
					if (deltaY !== 0) {
						self_player.rotation.y = Math.atan(deltaY / deltaX);
						if (deltaX < 0) {
							self_player.rotation.y += Math.PI;
						}
						self_player.desired_displacement = Vector3.polar_to_coord(self_player.rotation.y, 0, speed * delay_seconds);
					}
				}

				// game piece shooting controls
				if (active_keys.q === true && self_player.power < max_launch_power) {
					self_player.power += 0.1;
					self_player.power = Math.round(self_player.power * 10) / 10;
				}
				if (active_keys.e === true && self_player.power > 0) {
					self_player.power -= 0.1;
					self_player.power = Math.round(self_player.power * 10) / 10;
				}
				// for this case, mobile directly changes the space active_key to true
				if (active_keys[' '] === true && self_player.game_piece_number > 0) {
					active_keys[' '] = false;
					self_player.game_piece_number--;

					let game_piece = new Game_piece(
						new Vector3(self_player.position.x, self_player.position.y + (robot_radius + ball_radius) * 1.2, self_player.position.z),
						Vector3.polar_to_coord(self_player.rotation.y + (Math.random() - 0.5) * launch_angle_error, Math.PI / 4, self_player.power)
					);
					game_piece.update_mesh();
					game_pieces.push(game_piece);
					scene.add(game_piece.mesh);
				}

				if (active_keys.reset_ball === true) {
					active_keys.reset_ball = false;
					setup_ball();
				}

				if (mobile) {
					self_player.power = power_input.value;
				}

				if (active_keys.m === true && self_player.game_piece_number > 0) {
					add_multiplier();
				}

				// compute multiplier
				if (multiplier_count === 0) {
					multiply_factor = 1;
				}
				if (multiplier_count === 1) {
					multiply_factor = 1.5;
				}
				if (multiplier_count === 2) {
					multiply_factor = 2;
				}
				if (multiplier_count === 3) {
					multiply_factor = 2.5;
				}

				// set y velocity (x and z desired displacement already set in player movement)
				self_player.velocity.add(new Vector3(0, delay_seconds * gravity.y, 0));
				self_player.desired_displacement.y = delay_seconds * self_player.velocity.y;

				// robot collision
				character_controller.computeColliderMovement(player_collider, self_player.desired_displacement, undefined, undefined, function (collider) {
					return collider.isSensor() === false;
				});
				let corrected_displacement = character_controller.computedMovement();

				if (character_controller.computedGrounded()) {
					self_player.velocity.y = 0;
				}

				if (player_rigid_body.translation().x > 0) {
					corrected_displacement.x = -speed * delay_seconds;
				}
				player_rigid_body.setLinvel(
					{
						x: corrected_displacement.x / delay_seconds,
						y: corrected_displacement.y / delay_seconds,
						z: corrected_displacement.z / delay_seconds
					},
					true
				); // Linvel = linear velocity (rapier built-in)

				// go through the collisions
				for (let i = 0; i < character_controller.numComputedCollisions(); i++) {
					let collision = character_controller.computedCollision(i);

					// check for touch game piece
					let found_game_piece_index = game_pieces.findIndex(function (game_piece) {
						return game_piece.collider.handle === collision.collider.handle;
					});
					if (found_game_piece_index >= 0 && self_player.game_piece_number < max_game_piece) {
						game_pieces[found_game_piece_index].remove_everywhere();
						game_pieces.splice(found_game_piece_index, 1);
						self_player.game_piece_number++;
						break; // this resolves a weird bug, don't touch, the floor collision is still fine
					}
				}

				for (let game_piece of game_pieces) {
					if (game_piece.touch_target(high_target_collider) === true) {
						game_piece.rigid_body.setTranslation({ x: 4.5, y: 1, z: 0.5 });
						game_piece.rigid_body.setLinvel({ x: 0, y: 0, z: 0 });
						score += 120 * multiply_factor;
					}
					if (game_piece.touch_target(low_target_collider) === true) {
						game_piece.rigid_body.setTranslation({ x: 3.3, y: 0.85, z: -2 });
						game_piece.rigid_body.setLinvel({ x: 0, y: 0, z: 0 });
						score += 30 * multiply_factor;
					}
					if (game_piece.touch_target(lowest_target_collider) === true) {
						game_piece.rigid_body.setTranslation({ x: 2.8, y: 1.2, z: -2 });
						game_piece.rigid_body.setLinvel({ x: 0, y: 0, z: 0 });
						score += 60 * multiply_factor;
					}
				}

				// update player object position
				self_player.position.x = player_rigid_body.translation().x;
				self_player.position.y = player_rigid_body.translation().y;
				self_player.position.z = player_rigid_body.translation().z;

				// run one tick of physics engine
				world.step();

				// update scene
				camera.rotation.set(
					-(mouse_position.y - (touch_position.camera_current.y - touch_position.camera_start.y)) / 500,
					(-mouse_position.x + (touch_position.camera_current.x - touch_position.camera_start.x) + canvas.width / 2) / 500,
					0,
					'YXZ'
				);

				self_mesh.position.set(
					self_player.position.x * ratio_render_over_physics,
					self_player.position.y * ratio_render_over_physics,
					self_player.position.z * ratio_render_over_physics
				);
				self_mesh.rotation.set(0, self_player.rotation.y, 0);

				for (let game_piece of game_pieces) {
					game_piece.update_mesh();
				}

				// reset desired displacement to default
				self_player.desired_displacement = new Vector3(0, 0, 0);

				// game info update
				update_game_info();
			}

			{
				let position = new THREE.Vector3(0, 0, 0);
				let visible = true;
				if (world.intersectionPair(player_collider, ally_multiplier_top)) {
					position = new THREE.Vector3(ally_multiplier_top.translation().x, ally_multiplier_top.translation().y, ally_multiplier_top.translation().z);
					selected_multiplier = 1;
				} else if (world.intersectionPair(player_collider, ally_multiplier_middle)) {
					position = new THREE.Vector3(
						ally_multiplier_middle.translation().x,
						ally_multiplier_middle.translation().y,
						ally_multiplier_middle.translation().z
					);
					selected_multiplier = 2;
				} else if (world.intersectionPair(player_collider, ally_multiplier_bottom)) {
					position = new THREE.Vector3(
						ally_multiplier_bottom.translation().x,
						ally_multiplier_bottom.translation().y,
						ally_multiplier_bottom.translation().z
					);
					selected_multiplier = 3;
				} else {
					visible = false;
					selected_multiplier = undefined;
				}
				if (visible) {
					position.multiplyScalar(ratio_render_over_physics);
					let position_view = position.project(camera);
					position_view.add(new THREE.Vector3(1, -1, 0));
					position_view.multiply(new THREE.Vector3(canvas.width / 2, -canvas.height / 2, 1));
					add_multiplier_button.style.left = position_view.x + 'px';
					add_multiplier_button.style.top = position_view.y + 'px';
					add_multiplier_button.style.visibility = 'visible';
				} else {
					add_multiplier_button.style.visibility = 'hidden';
				}
			}

			if (mobile) {
				joystick_start_svg.style.left = touch_position.joystick_start.x;
				joystick_start_svg.style.top = touch_position.joystick_start.y;

				joystick_current_svg.style.left = touch_position.joystick_current.x;
				joystick_current_svg.style.top = touch_position.joystick_current.y;
			}

			if (timer_seconds > 0) {
				renderer.render(scene, camera);

				requestAnimationFrame(perpetual);
			} else {
				// end score calculation
				start_mask_div.style.visibility = 'visible';
				start_mask_text.innerHTML = `${isFr ? 'Fin de la joute: calcul de votre pointage en cours...' : 'Heat ended: calculating your score...'}`;
				setTimeout(function () {
					for (let game_piece of game_pieces) {
						let positionX = game_piece.rigid_body.translation().x;
						if (positionX > 0.5 && positionX <= 2.5) {
							score += 20 * multiply_factor;
						} else if (positionX > 2.5 && positionX <= 3.75) {
							score += 40 * multiply_factor;
						} else if (positionX > 3.75 && positionX <= 5) {
							score += 20 * multiply_factor;
						}
						update_game_info();
					}
					let highscore = $userStore.highscore;
					if (highscore != null) {
						if (score > highscore) {
							// inner HTML may not be the best practice, but it is the most efficient solution for our purposes
							start_mask_text.innerHTML =
								`${isFr ? 'Fin de la joute' : 'Heat ended'}` +
								'<br/>' +
								`${isFr ? 'Pointage: ' : 'Score: '}` +
								score +
								'<br/>' +
								`${isFr ? 'Vous avez battu votre pointage record de ' : 'You beat your previous highscore of '}` +
								highscore +
								'<br/>' +
								`${isFr ? 'Votre nouveau pointage record est: ' : 'Your new highscore is: '}` +
								score;
							$userStore.highscore = score;
						} else {
							start_mask_text.innerHTML =
								`${isFr ? 'Fin de la joute' : 'Heat ended'}` + '<br/>' + 'Score: ' + score + '<br/>' + `${isFr ? 'Votre pointage record précédent était ' : 'Your previous highscore was '}` + highscore;
						}
					} else {
						start_mask_text.innerHTML = `${isFr ? 'Fin de la joute' : 'Heat ended'}` + '<br/>' + 'Score: ' + score + '<br/>' + `${isFr ? 'Votre nouveau pointage record est: ' : 'Your new highscore is: '}` + score;
						$userStore.highscore = score;
					}
				}, 5000);
			}

			on_resize();
		};
		perpetual();
	};

	onMount(start_perpetual);
</script>

<svelte:window on:resize={on_resize} on:keydown|preventDefault={on_key_down} on:keyup|preventDefault={on_key_up} />

<svelte:document on:pointerlockchange={on_pointlock_change} on:pointerlockerror={on_pointlock_error} />

<div class="canvas-container">
	<div class="main" bind:this={main_div}>
		<canvas bind:this={canvas} on:mousemove={on_mouse_move}></canvas>
		{#if mobile === true}
			<div
				class="joystick-start"
				bind:this={joystick_start_div}
				on:touchstart={on_joy_touch_start}
				on:touchmove={on_joy_touch_move}
				on:touchend={on_joy_touch_end}
			>
				<svg class="joystick-start" bind:this={joystick_start_svg} height="10" width="10">
					<circle cx="5" cy="5" r="5" fill="grey" />
				</svg>
				<svg class="joystick-current" bind:this={joystick_current_svg} height="20" width="20">
					<circle cx="10" cy="10" r="10" stroke="white" stroke-width="1" fill="grey" />
				</svg>
			</div>
			<div
				class="camera-drag"
				bind:this={camera_drag_div}
				on:touchstart={on_camera_touch_start}
				on:touchmove={on_camera_touch_move}
				on:touchend={on_camera_touch_end}
			></div>
			<button class="fire" on:click={fire}><img src={SlingshotImage} alt={isFr ? 'Lancer' : "Launch"} /></button>
			<div class="input-wrapper">
				<input bind:this={power_input} type="range" min="0" max="15" value="5" />
			</div>
		{/if}
		<button class="multiplier" bind:this={add_multiplier_button} on:click={add_multiplier}>{isFr ? 'Activer le multiplicateur? [M]' : 'Put on multiplier? [M]'}</button>
		<div bind:this={game_info_div} class="game-info"></div>
		<!-- more efficient to overwrite some rules for this simulation -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div bind:this={start_mask_div} on:click={on_canvas_click} class="start-mask">
			<p bind:this={start_mask_text}>{isFr ? 'Jouer' : 'Play'}</p>
		</div>
	</div>
	<div class="options p-4 mt-5">
		<p class="mb-4 fs-4">{isFr ? 'Votre pointage record est' : 'Your high score is'}: {$userStore.highscore} points</p>
		<div class="buttons d-grid">
			<button class="reset" on:click={reset_balls}>{reset_ball_requested ? (isFr ? 'Pièces de jeu ajoutées!' : 'Game pieces spawned!') : (isFr ? 'Ajouter plus de pièces de jeu' : 'Spawn more game pieces')}</button>
			<button class="reset" on:click={restart_game}>{isFr ? 'Recommencer le jeu' : 'Restart game'}</button>
		</div>
	</div>
</div>

<style>
	div.main {
		display: block;
		margin: auto;
		position: relative;
		width: 75%;
		outline: solid 15px rgba(255, 237, 194, 0.8);
		border-radius: 10px;
	}
	div.game-info {
		position: absolute;
		top: 0px;
		left: 0px;
		color: white;
		padding: 10px 10px 0px;
	}
	div.start-mask {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		opacity: 0.7;
		background-color: black;
		cursor: grab;
	}
	div.start-mask > p {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: block;
		text-align: center;
		color: white;
		font-size: 50px;
	}
	button.multiplier {
		position: absolute;
		z-index: 150;
	}
	button.fire {
		position: absolute;
		right: 5%;
		bottom: 5%;
		width: 25%;
		height: 40%;
		z-index: 200;
		background-color: transparent;
		border: none;
	}
	button.fire img {
		width: 100%;
		opacity: 0.5;
		border-radius: 100px;
	}
	div.joystick-start {
		position: absolute;
		left: 0px;
		bottom: 0px;
		width: 25%;
		height: 50%;
		z-index: 100;
		background-color: black;
		opacity: 0.2;
	}
	div.camera-drag {
		position: absolute;
		right: 0px;
		bottom: 0px;
		width: 50%;
		height: 100%;
		z-index: 100;
		background-color: black;
		opacity: 0.2;
	}
	.joystick-start {
		position: absolute;
	}
	.joystick-current {
		position: absolute;
	}
	div.input-wrapper {
		position: absolute;
		right: 20px;
		bottom: 0px;
		z-index: 250;
		opacity: 0.5;
	}
	div.options {
		margin: 2rem auto 0px;
		width: calc(100% - 6rem); /* to "imitate" 3rem margin on both sides */
		background-color: rgba(255, 237, 194, 0.6);
		border-radius: 10px;
		text-align: center;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
		border: solid 0.5px #332400;
	}

	.buttons {
		gap: 1rem;
	}

	.reset {
    font-family: 'Angry Birds', sans-serif;
    border-radius: 20px;
		background-color: #ffba32;
    font-size: 1.2rem;
    transition: 0.15s ease-in-out;
    z-index: 0;
    overflow: hidden;
    top: 50%;
		color: #fff;
		padding: 0.5rem 1rem;

    /* generated using https://owumaro.github.io/text-stroke-generator/
      long (text-)shadow values can be costly for load time, so we use these very, very sparingly in this website!
    */
    text-shadow: #CC6600 3px 0px 0px, #CC6600 2.83487px 0.981584px 0px, #CC6600 2.35766px 1.85511px 0px, #CC6600 1.62091px 2.52441px 0px, #CC6600 0.705713px 2.91581px 0px, #CC6600 -0.287171px 2.98622px 0px, #CC6600 -1.24844px 2.72789px 0px, #CC6600 -2.07227px 2.16926px 0px, #CC6600 -2.66798px 1.37182px 0px, #CC6600 -2.96998px 0.42336px 0px, #CC6600 -2.94502px -0.571704px 0px, #CC6600 -2.59586px -1.50383px 0px, #CC6600 -1.96093px -2.27041px 0px, #CC6600 -1.11013px -2.78704px 0px, #CC6600 -0.137119px -2.99686px 0px, #CC6600 0.850987px -2.87677px 0px, #CC6600 1.74541px -2.43999px 0px, #CC6600 2.44769px -1.73459px 0px, #CC6600 2.88051px -0.838247px 0px;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
    border: solid 2px #b38c09;
		transition: text-shadow 0.15s;
  }

	.reset:hover {
    text-shadow: #000 3px 0px 0px, #000 2.83487px 0.981584px 0px, #000 2.35766px 1.85511px 0px, #000 1.62091px 2.52441px 0px, #000 0.705713px 2.91581px 0px, #000 -0.287171px 2.98622px 0px, #000 -1.24844px 2.72789px 0px, #000 -2.07227px 2.16926px 0px, #000 -2.66798px 1.37182px 0px, #000 -2.96998px 0.42336px 0px, #000 -2.94502px -0.571704px 0px, #000 -2.59586px -1.50383px 0px, #000 -1.96093px -2.27041px 0px, #000 -1.11013px -2.78704px 0px, #000 -0.137119px -2.99686px 0px, #000 0.850987px -2.87677px 0px, #000 1.74541px -2.43999px 0px, #000 2.44769px -1.73459px 0px, #000 2.88051px -0.838247px 0px;
	}

  @media screen and (min-width: 768px) {
    .reset {
      font-size: 1.75rem;
    }
  }
	
	@media screen and (min-width: 1200px) {
		.buttons {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
		}
	}
</style>
