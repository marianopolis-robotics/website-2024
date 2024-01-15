const Vector3 = class {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
		this.z += vector.z;
	}
	scale(constant) {
		this.x *= constant;
		this.y *= constant;
		this.z *= constant;
	}
};
Vector3.polar_to_coord = function (angle_y, angle_elevation, magnitude) {
	return new Vector3(
		magnitude * Math.cos(angle_elevation) * Math.cos(angle_y),
		magnitude * Math.sin(angle_elevation),
		-magnitude * Math.cos(angle_elevation) * Math.sin(angle_y)
	);
};
Vector3.axis_angle_to_quaternion = function (theta, x, y, z) {
	return {
		w: Math.cos(theta / 2),
    x: x * Math.sin(theta / 2),
    y: y * Math.sin(theta / 2),
    z: z * Math.sin(theta / 2),
	};
};

export { Vector3 };
