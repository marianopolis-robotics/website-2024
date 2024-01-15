import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import helvetiker_font from 'three/examples/fonts/helvetiker_regular.typeface.json';
import { Vector3 } from '$lib/3d/vector.js';

//repeated here, I didn't have a more intuitive way to include
const ratio_render_over_physics = 100;
const field_length = 10.6;
const field_width = 6.1;
const robot_radius = 0.3;
const ball_radius = field_width / 32 / 2;

let create_ceiling_lamp = function (x, y, z) {
	let point_light = new THREE.PointLight(0xffffff, 5 * ratio_render_over_physics, 9 * ratio_render_over_physics, 1);
	point_light.position.set(x * ratio_render_over_physics, y * ratio_render_over_physics, z * ratio_render_over_physics);
	point_light.castShadow = true;
	return point_light;
};
export let ceiling_lamp_1 = create_ceiling_lamp(4, 1, 1);
export let ceiling_lamp_2 = create_ceiling_lamp(-3, 1, 1);
export let ceiling_lamp_3 = create_ceiling_lamp(0.5, 4, -3);

export let ambient_light = new THREE.AmbientLight(0x404040, 10);

let ground = new THREE.Mesh(
	new THREE.BoxGeometry(20 * ratio_render_over_physics, 5, 10 * ratio_render_over_physics),
	new THREE.MeshPhongMaterial({ color: 0x818d9c })
);
ground.position.set(0, -2 * ratio_render_over_physics);
ground.receiveShadow = true;
export { ground };

let wall_left = new THREE.Mesh(
	new THREE.BoxGeometry(0.02 * ratio_render_over_physics, 10 * ratio_render_over_physics, 10 * ratio_render_over_physics),
	new THREE.MeshPhongMaterial({ color: 0x818d9c })
);
wall_left.position.set(-10 * ratio_render_over_physics, 2.5 * ratio_render_over_physics, 0);
export { wall_left };

let wall_right = new THREE.Mesh(
	new THREE.BoxGeometry(0.02 * ratio_render_over_physics, 10 * ratio_render_over_physics, 10 * ratio_render_over_physics),
	new THREE.MeshPhongMaterial({ color: 0x818d9c })
);
wall_right.position.set(10 * ratio_render_over_physics, 2.5 * ratio_render_over_physics, 0);
export { wall_right };

let wall_top = new THREE.Mesh(
	new THREE.BoxGeometry(20 * ratio_render_over_physics, 10 * ratio_render_over_physics, 0.02 * ratio_render_over_physics),
	new THREE.MeshPhongMaterial({ color: 0x818d9c })
);
wall_top.position.set(0, 2.5 * ratio_render_over_physics, -5 * ratio_render_over_physics);
export { wall_top };

let border_config = {
	height: 0.13,
	thickness: 0.02,
	color: 0xe02222
};

let border_north = new THREE.Mesh(
	new THREE.BoxGeometry(
		field_length * ratio_render_over_physics,
		border_config.height * ratio_render_over_physics,
		border_config.thickness * ratio_render_over_physics
	),
	new THREE.MeshPhongMaterial({ color: border_config.color })
);
border_north.position.set(0, (border_config.height / 2) * ratio_render_over_physics, (-field_width / 2) * ratio_render_over_physics);

let border_south = new THREE.Mesh(
	new THREE.BoxGeometry(
		field_length * ratio_render_over_physics,
		border_config.height * ratio_render_over_physics,
		border_config.thickness * ratio_render_over_physics
	),
	new THREE.MeshPhongMaterial({ color: border_config.color })
);
border_south.position.set(0, (border_config.height / 2) * ratio_render_over_physics, (field_width / 2) * ratio_render_over_physics);

let border_west = new THREE.Mesh(
	new THREE.BoxGeometry(
		border_config.thickness * ratio_render_over_physics,
		border_config.height * ratio_render_over_physics,
		field_width * ratio_render_over_physics
	),
	new THREE.MeshPhongMaterial({ color: border_config.color })
);
border_west.position.set((-field_length / 2) * ratio_render_over_physics, (border_config.height / 2) * ratio_render_over_physics);

let border_east = new THREE.Mesh(
	new THREE.BoxGeometry(
		border_config.thickness * ratio_render_over_physics,
		border_config.height * ratio_render_over_physics,
		field_width * ratio_render_over_physics
	),
	new THREE.MeshPhongMaterial({ color: border_config.color })
);
border_east.position.set((field_length / 2) * ratio_render_over_physics, (border_config.height / 2) * ratio_render_over_physics, 0);

export { border_north, border_south, border_west, border_east };

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

let twenty_text = new THREE.Mesh(new TextGeometry('20', font_config), new THREE.MeshPhongMaterial({ color: 0xffff00 }));
twenty_text.position.set(100, 15, 10);
twenty_text.rotation.set(-Math.PI / 2, 0.18, 0, 'XYZ');

let fourty_text = new THREE.Mesh(new TextGeometry('40', font_config), new THREE.MeshPhongMaterial({ color: 0xffff00 }));
fourty_text.position.set(300, -3, 10);
fourty_text.rotation.set(-Math.PI / 2, 0, 0, 'XYZ');

let ten_text = new THREE.Mesh(new TextGeometry('20', font_config), new THREE.MeshPhongMaterial({ color: 0xffff00 }));
ten_text.position.set(415, -3, 10);
ten_text.rotation.set(-Math.PI / 2, 0, 0, 'XYZ'); //rules changed to 20

let two_fifty_text = new THREE.Mesh(new TextGeometry('120', font_config), new THREE.MeshPhongMaterial({ color: 0xffff00 }));
two_fifty_text.position.set(500, 150, 0);
two_fifty_text.rotation.set(0, -Math.PI / 2, 0, 'YXZ'); //rules changed to 120

let fifty_text = new THREE.Mesh(new TextGeometry('60', font_config), new THREE.MeshPhongMaterial({ color: 0xffff00 }));
fifty_text.position.set(290, 15, -230); //rules changed to 60

let twenty_five_text = new THREE.Mesh(new TextGeometry('30', font_config), new THREE.MeshPhongMaterial({ color: 0xffff00 }));
twenty_five_text.position.set(170, 100, -230); //rules changed to 30

export { twenty_text, fourty_text, ten_text, two_fifty_text, fifty_text, twenty_five_text };

let self_mesh = new THREE.Mesh(
	new THREE.BoxGeometry(
		robot_radius * 2 * ratio_render_over_physics,
		robot_radius * 2 * ratio_render_over_physics,
		robot_radius * 2 * ratio_render_over_physics
	),
	new THREE.MeshPhongMaterial({ color: 0x0bb9db })
);
self_mesh.castShadow = true;
self_mesh.receiveShadow = true;
export { self_mesh };
