import * as THREE from 'three';

const field_length = 10.6;
const field_width = 6.1;
const robot_radius = 0.3;
const character_collision_offset = 0.05;
const row_subdiv = 1;
const col_subdiv = 20;
const height_field = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, 0.1, 0.2, 0.2, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.2, 0.2, 0.1, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0
];

export function test(scale, position, rotation) {
	let test = new THREE.Mesh(
		new THREE.BoxGeometry(scale.x * 2 * ratio_render_over_physics, scale.y * 2 * ratio_render_over_physics, scale.z * 2 * ratio_render_over_physics),
		new THREE.MeshPhongMaterial({ color: 0xff0000 })
	);
	test.position.set(position.x * ratio_render_over_physics, position.y * ratio_render_over_physics, position.z * ratio_render_over_physics);
	test.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order);
	scene.add(test);
}

let __ = class {
	constructor(RAPIER, world) {
		{
			let collider_desc = RAPIER.ColliderDesc.heightfield(row_subdiv, col_subdiv, height_field, new RAPIER.Vector3(field_length, 1, field_width));
			let collider = world.createCollider(collider_desc);
			this.floor_handle = collider.handle;
		}
		//west barrier
		{
			let barrier_config = {
				widthX: 0.5,
				widthZ: field_width / 2,
				height: 10
			};
			let collider_desc = RAPIER.ColliderDesc.cuboid(barrier_config.widthX, barrier_config.height, barrier_config.widthZ).setTranslation(
				-(field_length / 2 + barrier_config.widthX),
				barrier_config.height / 2 - 1,
				0
			);
			world.createCollider(collider_desc);
		}
		//east barrier
		{
			let barrier_config = {
				widthX: 0.5,
				widthZ: field_width / 2,
				height: 10
			};
			let collider_desc = RAPIER.ColliderDesc.cuboid(barrier_config.widthX, barrier_config.height, barrier_config.widthZ).setTranslation(
				field_length / 2 + barrier_config.widthX,
				barrier_config.height / 2 - 1,
				0
			);
			world.createCollider(collider_desc);
		}
		//north barrier
		{
			let barrier_config = {
				widthX: field_length / 2,
				widthZ: 0.5,
				height: 10
			};
			let collider_desc = RAPIER.ColliderDesc.cuboid(barrier_config.widthX, barrier_config.height, barrier_config.widthZ).setTranslation(
				0,
				barrier_config.height / 2 - 1,
				field_width / 2 + barrier_config.widthZ
			);
			world.createCollider(collider_desc);
		}
		//south barrier
		{
			let barrier_config = {
				widthX: field_length / 2,
				widthZ: 0.5,
				height: 10
			};
			let collider_desc = RAPIER.ColliderDesc.cuboid(barrier_config.widthX, barrier_config.height, barrier_config.widthZ).setTranslation(
				0,
				barrier_config.height / 2 - 1,
				-(field_width / 2 + barrier_config.widthZ)
			);
			world.createCollider(collider_desc);
		}
		//target sensors
		//lowest target
		{
			let collider_desc = RAPIER.ColliderDesc.cuboid(0.15, 0.15, 0.05).setTranslation(3.3, 0.85, -2.5).setSensor(true);
			this.low_target_collider = world.createCollider(collider_desc);
		}
		//low target
		{
			let collider_desc = RAPIER.ColliderDesc.cuboid(0.15, 0.15, 0.05).setTranslation(2.8, 1.2, -2.5).setSensor(true);
			this.lowest_target_collider = world.createCollider(collider_desc);
		}
		//high target
		{
			let collider_desc = RAPIER.ColliderDesc.cuboid(0.05, 0.35, 0.2).setTranslation(4.8, 2.5, 0.5).setSensor(true);
			this.high_target_collider = world.createCollider(collider_desc);
		}
		//low target collider
		//top
		{
			let quaternion = new THREE.Quaternion();
			quaternion.setFromEuler(new THREE.Euler(0, 0, -1.25, 'XYZ'));
			let collider_desc = RAPIER.ColliderDesc.cuboid(0.25, 0.25, 0.25).setTranslation(3.1, 1.05, -2.8).setRotation(quaternion);
			world.createCollider(collider_desc);
		}
		//bottom front
		{
			let quaternion = new THREE.Quaternion();
			quaternion.setFromEuler(new THREE.Euler(0, -0.5, 0.3, 'ZYX'));
			let collider_desc = RAPIER.ColliderDesc.cuboid(0.05, 0.2, 0.25).setTranslation(3.1, 0.85, -2.7).setRotation(quaternion);
			world.createCollider(collider_desc);
		}
		//bottom
		{
			let quaternion = new THREE.Quaternion();
			quaternion.setFromEuler(new THREE.Euler(0, 0, -1.3, 'XYZ'));
			let collider_desc = RAPIER.ColliderDesc.cuboid(0.05, 0.4, 0.25).setTranslation(3.5, 0.7, -2.7).setRotation(quaternion);
			world.createCollider(collider_desc);
		}
		//small side
		{
			let quaternion = new THREE.Quaternion();
			quaternion.setFromEuler(new THREE.Euler(-0.3, Math.PI / 2, 0, 'YXZ'));
			let collider_desc = RAPIER.ColliderDesc.cuboid(0.05, 0.2, 0.25).setTranslation(3.2, 1.35, -2.4).setRotation(quaternion);
			world.createCollider(collider_desc);
		}
		//big side
		{
			let quaternion = new THREE.Quaternion();
			quaternion.setFromEuler(new THREE.Euler(-0.3, Math.PI / 2, 0, 'YXZ'));
			let collider_desc = RAPIER.ColliderDesc.cuboid(0.05, 0.4, 0.35).setTranslation(3.7, 1.25, -2.4).setRotation(quaternion);
			world.createCollider(collider_desc);
		}
		//back
		{
			let collider_desc = RAPIER.ColliderDesc.cuboid(0.05, 0.9, 0.3).setTranslation(3.9, 0.9, -2.75);
			world.createCollider(collider_desc);
		}
		//front
		{
			let quaternion = new THREE.Quaternion();
			quaternion.setFromEuler(new THREE.Euler(0, -0.6, 0, 'XYZ'));
			let collider_desc = RAPIER.ColliderDesc.cuboid(0.05, 0.7, 0.3).setTranslation(2.8, 0.6, -2.75).setRotation(quaternion);
			world.createCollider(collider_desc);
		}
		//multipliers
		{
			let scale = {
				y: 0.45,
				radius: 0.05
			};
			//multiplier collider
			{
				let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius).setTranslation(-3.39, scale.y / 2, -1.83);
				world.createCollider(collider_desc);
			}
			{
				let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius).setTranslation(-4.95, scale.y / 2, 0.35);
				world.createCollider(collider_desc);
			}
			{
				let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius).setTranslation(-2.35, scale.y / 2, 1.28);
				world.createCollider(collider_desc);
			}
			{
				let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius).setTranslation(3.33, scale.y / 2, 1.83);
				world.createCollider(collider_desc);
			}
			{
				let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius).setTranslation(4.89, scale.y / 2, -0.35);
				world.createCollider(collider_desc);
			}
			{
				let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius).setTranslation(2.29, scale.y / 2, -1.28);
				world.createCollider(collider_desc);
			}
			//multiplier sensors
			{
				let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius * 10)
					.setTranslation(-3.39, scale.y / 2, -1.83)
					.setSensor(true);
				this.ally_multiplier_top = world.createCollider(collider_desc);
			}
			{
				let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius * 10)
					.setTranslation(-4.95, scale.y / 2, 0.35)
					.setSensor(true);
				this.ally_multiplier_middle = world.createCollider(collider_desc);
			}
			{
				let collider_desc = RAPIER.ColliderDesc.cylinder(scale.y, scale.radius * 10)
					.setTranslation(-2.35, scale.y / 2, 1.28)
					.setSensor(true);
				this.ally_multiplier_bottom = world.createCollider(collider_desc);
			}
		}
		{
			let player_rigid_body_desc = RAPIER.RigidBodyDesc.dynamic().setLinvel(0, 0, 0);
			this.player_rigid_body = world.createRigidBody(player_rigid_body_desc);

			let player_collider_desc = RAPIER.ColliderDesc.ball(robot_radius);
			this.player_collider = world.createCollider(player_collider_desc, this.player_rigid_body);

			this.character_controller = world.createCharacterController(character_collision_offset);
		}
	}
};

export default __;
