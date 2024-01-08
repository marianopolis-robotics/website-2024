<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
	import RAPIER from '@dimforge/rapier3d-compat';
	import { Vector3 } from './vector.js';

	import playingFieldURL from '$lib/assets/3d-objects/playingField.glb';
	import helvetiker_font from 'three/examples/fonts/helvetiker_regular.typeface.json';
	import { sineIn } from 'svelte/easing';

	//html elements
	let main_div;
	let canvas;
	let game_info_div;
	let start_mask_div;
	let start_mask_text;
	//global three objects
	let camera;
	let renderer;
	//run or pause simulation
	let canvas_active = false;
	//everything is in meters, and scaled for render :
	const ratio_render_over_physics = 100;
	//game variables
	let self_player = {
		position: new Vector3(-4.5, 0.7, -1),
		rotation: {
			y: 0
		},
		velocity: new Vector3(0, 0, 0),
		desired_displacement: new Vector3(0, 0, 0),
		touching_ground: false,
		power: 5,
		game_piece_number: 3
	};
	let game_pieces = [];
	let score = 0;
	let timer_seconds = 300; //set initial
	const field_length = 10.6;
	const field_width = 6.1;
	const speed = 1;
	const robot_radius = 0.3;
	const ball_radius = field_width / 32 / 2;
	const max_game_piece = 10;
	const max_launch_power = 15;
	const character_collision_offset = 0.05;
	const gravity = { x: 0, y: -10, z: 0 };
	const friction_damping = 0.8;
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
	const row_subdiv = 1;
	const col_subdiv = 20;
	const height_field = [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, 0.1, 0.2, 0.2, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.2, 0.2, 0.1, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0
	];
	//controls
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

	let set_camera_default = function () {
		camera.rotation.set(default_camera.rotation.elevation, default_camera.rotation.y, 0, 'YXZ');
		camera.zoom = default_camera.zoom;
		camera.updateProjectionMatrix();
	};

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
		renderer.setSize(main_div.offsetWidth, window.innerHeight * 0.75);
		camera.aspect = main_div.offsetWidth / (window.innerHeight * 0.75);
		camera.updateProjectionMatrix();
	};
	let on_canvas_click = function (e) {
		if (timer_seconds > 0) {
			start_mask_text.innerHTML = 'Continue';
			canvas.requestPointerLock();
		}
	};
	let on_pointlock_change = function (e) {
		if (start_mask_div.style.visibility === 'hidden') {
			start_mask_div.style.visibility = 'visible';
		} else if (timer_seconds > 0) {
			start_mask_div.style.visibility = 'hidden';
		}
		canvas_active = !canvas_active;
	};
	let on_pointlock_error = function (e) {
		alert('Please slow down your actions : when exiting pointer lock, please wait a few seconds before entering pointer lock again.');
	};

	//game initial setup
	let start_perpetual = async function () {
		let scene = new THREE.Scene();
		scene.background = new THREE.Color(0x9dc5d1);

		//load all custom meshes here
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
				model.position.set(530, -10, -55); //centers it
				model.scale.set(1.09, 1, 1);
				scene.add(model);
			});
		}

		//camera from global variable
		camera = new THREE.PerspectiveCamera(75, 1, 0.1, 20 * ratio_render_over_physics);
		camera.position.set(
			default_camera.position.x * ratio_render_over_physics,
			default_camera.position.y * ratio_render_over_physics,
			default_camera.position.z * ratio_render_over_physics
		);
		set_camera_default();

		//three.js generated static objects
		{
			let ceiling_lamp_config = {
				color: 0xffffff,
				intensity: 5,
				distance: 9,
				decay: 1
			};
			let create_ceiling_lamp = function (x, y, z) {
				let point_light = new THREE.PointLight(
					ceiling_lamp_config.color,
					ceiling_lamp_config.intensity * ratio_render_over_physics,
					ceiling_lamp_config * ratio_render_over_physics,
					ceiling_lamp_config.decay
				);
				point_light.position.set(x * ratio_render_over_physics, y * ratio_render_over_physics, z * ratio_render_over_physics);
				point_light.castShadow = true;
				scene.add(point_light);
			};
			create_ceiling_lamp(4, 1, 1);
			create_ceiling_lamp(-3, 1, 1);
			create_ceiling_lamp(0.5, 4, -3);
		}
		{
			let ambient_light_config = {
				intensity: 10
			};
			let ambient_light = new THREE.AmbientLight(0x404040, ambient_light_config.intensity);
			scene.add(ambient_light);
		}
		{
			let ground_config = {
				length: 20,
				width: 10
			};
			let position = {
				x: 0,
				y: -2,
				z: 0
			};
			let ground = new THREE.Mesh(
				new THREE.BoxGeometry(ground_config.length * ratio_render_over_physics, 5, ground_config.width * ratio_render_over_physics),
				new THREE.MeshPhongMaterial({ color: 0x818d9c })
			);
			ground.position.set(position.x * ratio_render_over_physics, position.y * ratio_render_over_physics, position.z * ratio_render_over_physics);
			ground.receiveShadow = true;
			scene.add(ground);
		}
		{
			let wall_config = {
				widthX: 0.02,
				widthZ: 10,
				height: 10
			};
			let position = {
				x: -10,
				y: 2.5,
				z: 0
			};
			let wall = new THREE.Mesh(
				new THREE.BoxGeometry(
					wall_config.widthX * ratio_render_over_physics,
					wall_config.height * ratio_render_over_physics,
					wall_config.widthZ * ratio_render_over_physics
				),
				new THREE.MeshPhongMaterial({ color: 0x818d9c })
			);
			wall.position.set(position.x * ratio_render_over_physics, position.y * ratio_render_over_physics, position.z * ratio_render_over_physics);
			scene.add(wall);
		}
		{
			let wall_config = {
				widthX: 0.02,
				widthZ: 10,
				height: 10
			};
			let position = {
				x: 10,
				y: 2.5,
				z: 0
			};
			let wall = new THREE.Mesh(
				new THREE.BoxGeometry(
					wall_config.widthX * ratio_render_over_physics,
					wall_config.height * ratio_render_over_physics,
					wall_config.widthZ * ratio_render_over_physics
				),
				new THREE.MeshPhongMaterial({ color: 0x818d9c })
			);
			wall.position.set(position.x * ratio_render_over_physics, position.y * ratio_render_over_physics, position.z * ratio_render_over_physics);
			scene.add(wall);
		}
		{
			let wall_config = {
				widthX: 20,
				widthZ: 0.02,
				height: 10
			};
			let position = {
				x: 0,
				y: 2.5,
				z: -5
			};
			let wall = new THREE.Mesh(
				new THREE.BoxGeometry(
					wall_config.widthX * ratio_render_over_physics,
					wall_config.height * ratio_render_over_physics,
					wall_config.widthZ * ratio_render_over_physics
				),
				new THREE.MeshPhongMaterial({ color: 0x818d9c })
			);
			wall.position.set(position.x * ratio_render_over_physics, position.y * ratio_render_over_physics, position.z * ratio_render_over_physics);
			scene.add(wall);
		}
		{
			let border_config = {
				height: 0.13,
				thickness: 0.02,
				color: 0xe02222
			};

			let north_position = {
				x: 0,
				y: border_config.height / 2,
				z: -field_width / 2
			};
			let border_north = new THREE.Mesh(
				new THREE.BoxGeometry(
					field_length * ratio_render_over_physics,
					border_config.height * ratio_render_over_physics,
					border_config.thickness * ratio_render_over_physics
				),
				new THREE.MeshPhongMaterial({ color: border_config.color })
			);
			border_north.position.set(
				north_position.x * ratio_render_over_physics,
				north_position.y * ratio_render_over_physics,
				north_position.z * ratio_render_over_physics
			);

			let south_position = {
				x: 0,
				y: border_config.height / 2,
				z: field_width / 2
			};
			let border_south = new THREE.Mesh(
				new THREE.BoxGeometry(
					field_length * ratio_render_over_physics,
					border_config.height * ratio_render_over_physics,
					border_config.thickness * ratio_render_over_physics
				),
				new THREE.MeshPhongMaterial({ color: border_config.color })
			);
			border_south.position.set(
				south_position.x * ratio_render_over_physics,
				south_position.y * ratio_render_over_physics,
				south_position.z * ratio_render_over_physics
			);

			let west_position = {
				x: -field_length / 2,
				y: border_config.height / 2,
				z: 0
			};
			let border_west = new THREE.Mesh(
				new THREE.BoxGeometry(
					border_config.thickness * ratio_render_over_physics,
					border_config.height * ratio_render_over_physics,
					field_width * ratio_render_over_physics
				),
				new THREE.MeshPhongMaterial({ color: border_config.color })
			);
			border_west.position.set(
				west_position.x * ratio_render_over_physics,
				west_position.y * ratio_render_over_physics,
				west_position.z * ratio_render_over_physics
			);

			let east_position = {
				x: field_length / 2,
				y: border_config.height / 2,
				z: 0
			};
			let border_east = new THREE.Mesh(
				new THREE.BoxGeometry(
					border_config.thickness * ratio_render_over_physics,
					border_config.height * ratio_render_over_physics,
					field_width * ratio_render_over_physics
				),
				new THREE.MeshPhongMaterial({ color: border_config.color })
			);
			border_east.position.set(
				east_position.x * ratio_render_over_physics,
				east_position.y * ratio_render_over_physics,
				east_position.z * ratio_render_over_physics
			);

			scene.add(border_north);
			scene.add(border_south);
			scene.add(border_west);
			scene.add(border_east);
		}

		//floor score numbers
		{
			let loader = new FontLoader();
			let font = loader.parse(helvetiker_font);
			let font_config = {
				font: font,
				size: 40,
				height: 5,
				curveSegments: 12,
				bevelEnabled: true,
				bevelThickness: 1,
				bevelSize: 3,
				bevelOffset: 0,
				bevelSegments: 1
			};
			{
				let geometry = new TextGeometry('20', font_config);
				let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xffff00 }));
				mesh.position.set(100, 15, 10);
				mesh.rotation.set(-Math.PI / 2, 0.18, 0, 'XYZ');
				scene.add(mesh);
			}
			{
				let geometry = new TextGeometry('40', font_config);
				let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xffff00 }));
				mesh.position.set(300, -3, 10);
				mesh.rotation.set(-Math.PI / 2, 0, 0, 'XYZ');
				scene.add(mesh);
			}
			{
				let geometry = new TextGeometry('10', font_config);
				let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xffff00 }));
				mesh.position.set(415, -3, 10);
				mesh.rotation.set(-Math.PI / 2, 0, 0, 'XYZ');
				scene.add(mesh);
			}
			{
				let geometry = new TextGeometry('250', font_config);
				let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xffff00 }));
				mesh.position.set(500, 150, 0);
				mesh.rotation.set(0, -Math.PI / 2, 0, 'YXZ');
				scene.add(mesh);
			}
			{
				let geometry = new TextGeometry('50', font_config);
				let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xffff00 }));
				mesh.position.set(290, 15, -230);
				scene.add(mesh);
			}
			{
				let geometry = new TextGeometry('25', font_config);
				let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xffff00 }));
				mesh.position.set(170, 100, -230);
				scene.add(mesh);
			}
		}

		//three.js dynamic objects : robot
		let self_mesh = new THREE.Mesh(
			new THREE.BoxGeometry(
				robot_radius * 2 * ratio_render_over_physics,
				robot_radius * 2 * ratio_render_over_physics,
				robot_radius * 2 * ratio_render_over_physics
			),
			new THREE.MeshPhongMaterial({ color: 0x0bb9db })
		);
		self_mesh.position.set(
			self_player.position.x * ratio_render_over_physics,
			self_player.position.y * ratio_render_over_physics,
			self_player.position.z * ratio_render_over_physics
		);
		self_mesh.castShadow = true;
		self_mesh.receiveShadow = true;
		scene.add(self_mesh);

		//renderer from global variable
		renderer = new THREE.WebGLRenderer({
			canvas: canvas
		});
		renderer.shadowMap.enabled = true;
		on_resize(); //call event handler for initial size

		//physics
		await RAPIER.init();

		let world = new RAPIER.World(gravity);

		//floor
		let floor_handle; //unique ID associated with the floor collider
		{
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.heightfield(row_subdiv, col_subdiv, height_field, new RAPIER.Vector3(field_length, 1, field_width));
			let collider = world.createCollider(collider_desc, rigid_body);
			floor_handle = collider.handle;
		}

		//west barrier
		{
			let barrier_config = {
				widthX: 0.5,
				widthZ: field_width / 2,
				height: 10
			};
			let position = {
				x: -(field_length / 2 + barrier_config.widthX),
				y: barrier_config.height / 2 - 1,
				z: 0
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(barrier_config.widthX, barrier_config.height, barrier_config.widthZ).setTranslation(
				position.x,
				position.y,
				position.z
			);
			world.createCollider(collider_desc, rigid_body);
		}
		//east barrier
		{
			let barrier_config = {
				widthX: 0.5,
				widthZ: field_width / 2,
				height: 10
			};
			let position = {
				x: field_length / 2 + barrier_config.widthX,
				y: barrier_config.height / 2 - 1,
				z: 0
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(barrier_config.widthX, barrier_config.height, barrier_config.widthZ).setTranslation(
				position.x,
				position.y,
				position.z
			);
			world.createCollider(collider_desc, rigid_body);
		}
		//north barrier
		{
			let barrier_config = {
				widthX: field_length / 2,
				widthZ: 0.5,
				height: 10
			};
			let position = {
				x: 0,
				y: barrier_config.height / 2 - 1,
				z: field_width / 2 + barrier_config.widthZ
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(barrier_config.widthX, barrier_config.height, barrier_config.widthZ).setTranslation(
				position.x,
				position.y,
				position.z
			);
			world.createCollider(collider_desc, rigid_body);
		}
		//south barrier
		{
			let barrier_config = {
				widthX: field_length / 2,
				widthZ: 0.5,
				height: 10
			};
			let position = {
				x: 0,
				y: barrier_config.height / 2 - 1,
				z: -(field_width / 2 + barrier_config.widthZ)
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(barrier_config.widthX, barrier_config.height, barrier_config.widthZ).setTranslation(
				position.x,
				position.y,
				position.z
			);
			world.createCollider(collider_desc, rigid_body);
		}

		//use this to see placement of cube collider on scene
		function test(scale, position, rotation) {
			let test = new THREE.Mesh(
				new THREE.BoxGeometry(
					scale.x * 2 * ratio_render_over_physics,
					scale.y * 2 * ratio_render_over_physics,
					scale.z * 2 * ratio_render_over_physics
				),
				new THREE.MeshPhongMaterial({ color: 0xff0000 })
			);
			test.position.set(position.x * ratio_render_over_physics, position.y * ratio_render_over_physics, position.z * ratio_render_over_physics);
			test.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order);
			scene.add(test);
		}

		//targets scoring sensor
		let low_target_collider;
		{
			let scale = {
				x: 0.15,
				y: 0.15,
				z: 0.05
			};
			let position = {
				x: 3.3,
				y: 0.85,
				z: -2.5
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(scale.x, scale.y, scale.z).setTranslation(position.x, position.y, position.z).setSensor(true);
			low_target_collider = world.createCollider(collider_desc, rigid_body);
		}
		let lowest_target_collider;
		{
			let scale = {
				x: 0.15,
				y: 0.15,
				z: 0.05
			};
			let position = {
				x: 2.8,
				y: 1.2,
				z: -2.5
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(scale.x, scale.y, scale.z).setTranslation(position.x, position.y, position.z).setSensor(true);
			lowest_target_collider = world.createCollider(collider_desc, rigid_body);
		}
		let high_target_collider;
		{
			let scale = {
				x: 0.05,
				y: 0.35,
				z: 0.2
			};
			let position = {
				x: 4.8,
				y: 2.5,
				z: 0.5
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(scale.x, scale.y, scale.z).setTranslation(position.x, position.y, position.z).setSensor(true);
			high_target_collider = world.createCollider(collider_desc, rigid_body);
		}

		//low target collider
		//top
		{
			let scale = {
				x: 0.05,
				y: 0.25,
				z: 0.25
			};
			let position = {
				x: 3.1,
				y: 1.05,
				z: -2.8
			};
			let quaternion = new THREE.Quaternion();
			quaternion.setFromEuler(new THREE.Euler(0, 0, -1.25, 'XYZ'));
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(scale.x, scale.y, scale.z)
				.setTranslation(position.x, position.y, position.z)
				.setRotation(quaternion);
			world.createCollider(collider_desc, rigid_body);
		}
		//bottom front
		{
			let scale = {
				x: 0.05,
				y: 0.2,
				z: 0.25
			};
			let position = {
				x: 3.1,
				y: 0.85,
				z: -2.7
			};
			let quaternion = new THREE.Quaternion();
			quaternion.setFromEuler(new THREE.Euler(0, -0.5, 0.3, 'ZYX'));
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(scale.x, scale.y, scale.z)
				.setTranslation(position.x, position.y, position.z)
				.setRotation(quaternion);
			world.createCollider(collider_desc, rigid_body);
		}
		//bottom
		{
			let scale = {
				x: 0.05,
				y: 0.4,
				z: 0.25
			};
			let position = {
				x: 3.5,
				y: 0.7,
				z: -2.7
			};
			let quaternion = new THREE.Quaternion();
			quaternion.setFromEuler(new THREE.Euler(0, 0, -1.3, 'XYZ'));
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(scale.x, scale.y, scale.z)
				.setTranslation(position.x, position.y, position.z)
				.setRotation(quaternion);
			world.createCollider(collider_desc, rigid_body);
		}
		//small side
		{
			let scale = {
				x: 0.05,
				y: 0.2,
				z: 0.25
			};
			let position = {
				x: 3.2,
				y: 1.35,
				z: -2.4
			};
			let quaternion = new THREE.Quaternion();
			quaternion.setFromEuler(new THREE.Euler(-0.3, Math.PI / 2, 0, 'YXZ'));
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(scale.x, scale.y, scale.z)
				.setTranslation(position.x, position.y, position.z)
				.setRotation(quaternion);
			world.createCollider(collider_desc, rigid_body);
		}
		//big side
		{
			let scale = {
				x: 0.05,
				y: 0.4,
				z: 0.35
			};
			let position = {
				x: 3.7,
				y: 1.25,
				z: -2.4
			};
			let quaternion = new THREE.Quaternion();
			quaternion.setFromEuler(new THREE.Euler(-0.3, Math.PI / 2, 0, 'YXZ'));
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(scale.x, scale.y, scale.z)
				.setTranslation(position.x, position.y, position.z)
				.setRotation(quaternion);
			world.createCollider(collider_desc, rigid_body);
		}
		//back
		{
			let scale = {
				x: 0.05,
				y: 0.9,
				z: 0.3
			};
			let position = {
				x: 3.9,
				y: 0.9,
				z: -2.75
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(scale.x, scale.y, scale.z).setTranslation(position.x, position.y, position.z);
			world.createCollider(collider_desc, rigid_body);
		}
		//front
		{
			let scale = {
				x: 0.05,
				y: 0.7,
				z: 0.3
			};
			let position = {
				x: 2.8,
				y: 0.6,
				z: -2.75
			};
			let quaternion = new THREE.Quaternion();
			quaternion.setFromEuler(new THREE.Euler(0, -0.6, 0, 'XYZ'));
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cuboid(scale.x, scale.y, scale.z)
				.setTranslation(position.x, position.y, position.z)
				.setRotation(quaternion);
			world.createCollider(collider_desc, rigid_body);
		}

		//multipliers
		{
			let scale = {
				y: 0.45,
				radius: 0.05
			};
			let position = {
				x: -3.39,
				y: scale.y / 2,
				z: -1.83
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius).setTranslation(position.x, position.y, position.z);
			world.createCollider(collider_desc, rigid_body);
		}
		{
			let scale = {
				y: 0.45,
				radius: 0.05
			};
			let position = {
				x: -4.95,
				y: scale.y / 2,
				z: 0.35
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius).setTranslation(position.x, position.y, position.z);
			world.createCollider(collider_desc, rigid_body);
		}
		{
			let scale = {
				y: 0.45,
				radius: 0.05
			};
			let position = {
				x: -2.35,
				y: scale.y / 2,
				z: 1.28
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius).setTranslation(position.x, position.y, position.z);
			world.createCollider(collider_desc, rigid_body);
		}
		{
			let scale = {
				y: 0.45,
				radius: 0.05
			};
			let position = {
				x: 3.33,
				y: scale.y / 2,
				z: 1.83
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius).setTranslation(position.x, position.y, position.z);
			world.createCollider(collider_desc, rigid_body);
		}
		{
			let scale = {
				y: 0.45,
				radius: 0.05
			};
			let position = {
				x: 4.89,
				y: scale.y / 2,
				z: -0.35
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius).setTranslation(position.x, position.y, position.z);
			world.createCollider(collider_desc, rigid_body);
		}
		{
			let scale = {
				y: 0.45,
				radius: 0.05
			};
			let position = {
				x: 2.29,
				y: scale.y / 2,
				z: -1.28
			};
			let rigid_body_desc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
			let rigid_body = world.createRigidBody(rigid_body_desc);
			let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius).setTranslation(position.x, position.y, position.z);
			world.createCollider(collider_desc, rigid_body);
		}

		//player
		let player_rigid_body_desc = RAPIER.RigidBodyDesc.dynamic()
			.setTranslation(self_player.position.x, self_player.position.y, self_player.position.z)
			.setLinvel(0, 0, 0);
		let player_rigid_body = world.createRigidBody(player_rigid_body_desc);

		let player_collider_desc = RAPIER.ColliderDesc.ball(robot_radius);
		let player_collider = world.createCollider(player_collider_desc, player_rigid_body);

		let character_controller = world.createCharacterController(character_collision_offset);

		//game piece
		let Game_piece = class {
			constructor(position, velocity) {
				let material;
				if (Math.random() > 0.5) {
					material = new THREE.MeshPhongMaterial({ color: 0xffff00 }); //yellow
				} else {
					material = new THREE.MeshPhongMaterial({ color: 0x800080 }); //purple
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

		//add initial game pieces
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

		//initial render
		renderer.render(scene, camera);

		let update_game_info = function () {
			game_info_div.innerHTML =
				'Timer : ' +
				Math.round(timer_seconds) +
				' s' +
				'<br/>' +
				'Launch power : ' +
				self_player.power +
				' m/s' +
				'<br/>' +
				'Game pieces carried : ' +
				self_player.game_piece_number +
				'<br/>' +
				'Score : ' +
				score +
				' pts';
		};

		//game loop
		let start = 0;
		let now = performance.now();
		let delay_seconds;
		let perpetual = function () {
			if (canvas_active) {
				//time management
				start = now;
				now = performance.now();
				if (now - start > 50) {
					start = now - 50;
				}
				delay_seconds = (now - start) / 1000;
				timer_seconds -= delay_seconds;

				//camera zoom
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

				//player movement
				if (active_keys.a === true) {
					self_player.rotation.y += (speed * delay_seconds) / robot_radius;
				}
				if (active_keys.d === true) {
					self_player.rotation.y -= (speed * delay_seconds) / robot_radius;
				}
				if (active_keys.w === true) {
					self_player.desired_displacement = Vector3.polar_to_coord(self_player.rotation.y, 0, speed * delay_seconds);
				}
				if (active_keys.s === true) {
					self_player.desired_displacement = Vector3.polar_to_coord(self_player.rotation.y, 0, -speed * delay_seconds);
				}

				//game piece shooting controls
				if (active_keys.q === true && self_player.power < max_launch_power) {
					self_player.power += 0.1;
					self_player.power = Math.round(self_player.power * 10) / 10;
				}
				if (active_keys.e === true && self_player.power > 0) {
					self_player.power -= 0.1;
					self_player.power = Math.round(self_player.power * 10) / 10;
				}
				if (active_keys.space === true && self_player.game_piece_number > 0) {
					active_keys.space = false;
					self_player.game_piece_number--;

					let game_piece = new Game_piece(
						new Vector3(self_player.position.x, self_player.position.y + (robot_radius + ball_radius) * 1.2, self_player.position.z),
						Vector3.polar_to_coord(self_player.rotation.y + (Math.random() - 0.5) * launch_angle_error, Math.PI / 4, self_player.power)
					);
					game_piece.update_mesh();
					game_pieces.push(game_piece);
					scene.add(game_piece.mesh);
				}

				//set y velocity (x and z desired displacement already set in player movement)
				self_player.velocity.add(new Vector3(0, delay_seconds * gravity.y, 0));
				self_player.desired_displacement.y = delay_seconds * self_player.velocity.y;

				//robot collision
				character_controller.computeColliderMovement(player_collider, self_player.desired_displacement);
				let corrected_displacement = character_controller.computedMovement();

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
				); //Linvel = linear velocity (rapier built-in)

				//go through the collisions
				self_player.touching_ground = false;
				for (let i = 0; i < character_controller.numComputedCollisions(); i++) {
					let collision = character_controller.computedCollision(i);

					//check for touch ground
					if (collision.collider.handle === floor_handle) {
						self_player.velocity.y = 0;
						self_player.touching_ground = true;
					}

					//check for touch game piece
					let found_game_piece_index = game_pieces.findIndex(function (game_piece) {
						return game_piece.collider.handle === collision.collider.handle;
					});
					if (found_game_piece_index >= 0 && self_player.game_piece_number < max_game_piece) {
						game_pieces[found_game_piece_index].remove_everywhere();
						game_pieces.splice(found_game_piece_index, 1);
						self_player.game_piece_number++;
						break; //this resolves a weird bug, don't touch, the floor collision is still fine
					}
				}

				for (let game_piece of game_pieces) {
					if (game_piece.touch_target(high_target_collider) === true) {
						game_piece.rigid_body.setTranslation({ x: 4.5, y: 1, z: 0.5 });
						game_piece.rigid_body.setLinvel({ x: 0, y: 0, z: 0 });
						score += 250;
					}
					if (game_piece.touch_target(low_target_collider) === true) {
						game_piece.rigid_body.setTranslation({ x: 3.3, y: 0.85, z: -2 });
						game_piece.rigid_body.setLinvel({ x: 0, y: 0, z: 0 });
						score += 25;
					}
					if (game_piece.touch_target(lowest_target_collider) === true) {
						game_piece.rigid_body.setTranslation({ x: 2.8, y: 1.2, z: -2 });
						game_piece.rigid_body.setLinvel({ x: 0, y: 0, z: 0 });
						score += 50;
					}
				}

				//update player object position
				self_player.position.x = player_rigid_body.translation().x;
				self_player.position.y = player_rigid_body.translation().y;
				self_player.position.z = player_rigid_body.translation().z;

				//run one tick of physics engine
				world.step();

				//update scene
				camera.rotation.set(-mouse_position.y / 500, (-mouse_position.x + canvas.width / 2) / 500, 0, 'YXZ');

				self_mesh.position.set(
					self_player.position.x * ratio_render_over_physics,
					self_player.position.y * ratio_render_over_physics,
					self_player.position.z * ratio_render_over_physics
				);
				self_mesh.rotation.set(0, self_player.rotation.y, 0);

				for (let game_piece of game_pieces) {
					game_piece.update_mesh();
				}

				//reset desired displacement to default
				self_player.desired_displacement = new Vector3(0, 0, 0);

				//game info update
				update_game_info();
			}

			renderer.render(scene, camera);

			if (timer_seconds > 0) {
				requestAnimationFrame(perpetual);
			} else {
				//end score calculation
				start_mask_div.style.visibility = 'visible';
				start_mask_text.innerHTML = 'Heat ended : Waiting for game pieces to immobilize...';
				setTimeout(function () {
					for (let game_piece of game_pieces) {
						let positionX = game_piece.rigid_body.translation().x;
						if (positionX > 0.5 && positionX <= 2.5) {
							score += 20;
						} else if (positionX > 2.5 && positionX <= 3.75) {
							score += 40;
						} else if (positionX > 3.75 && positionX <= 5) {
							score += 10;
						}
						update_game_info();
						start_mask_text.innerHTML = 'Heat ended' + '<br/>' + 'Score : ' + score;
					}
				}, 5000);
			}
		};
		perpetual();
	};

	onMount(function () {
		start_perpetual();
	});
</script>

<svelte:window on:resize={on_resize} on:keydown|preventDefault={on_key_down} on:keyup|preventDefault={on_key_up} />

<svelte:document on:pointerlockchange={on_pointlock_change} on:pointerlockerror={on_pointlock_error} />

<div>
	<div class="main" bind:this={main_div}>
		<canvas bind:this={canvas} on:mousemove={on_mouse_move}> </canvas>
		<div bind:this={game_info_div} class="game-info"></div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div bind:this={start_mask_div} on:click={on_canvas_click} class="start-mask">
			<p bind:this={start_mask_text}>Play</p>
		</div>
	</div>
</div>

<style>
	div .main {
		display: block;
		margin: auto;
		position: relative;
		width: 75%;
		outline: 10px solid white;
		border-radius: 5px;
	}
	canvas {
		width: 100%;
		height: 100%;
		display: block;
	}
	div .game-info {
		position: absolute;
		top: 0px;
		left: 0px;
		color: white;
		padding: 10px 10px 0px;
	}
	div .start-mask {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		opacity: 0.7;
		background-color: black;
		cursor: grab;
	}
	div .start-mask > p {
		display: block;
		margin-top: 25%;
		text-align: center;
		color: white;
		font-size: 50px;
	}
</style>
