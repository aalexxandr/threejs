import * as THREE from 'three';
import '../styles/index.css';
import { COLORS, MIN_SCALE } from '../constants';
import { renderer, scene, camera, canvas, sizes } from './init';

camera.position.z = 3;

// init cubes
const geometry = new THREE.BoxGeometry(1, 1, 1);

const cubesGroup = new THREE.Group();
const meshes = [];
for (let x = -2; x <= 2; x += 2) {
	for (let y = -2; y <= 2; y += 2) {
		const randomColorIndex = (Math.random() * COLORS.length) | 0;
		const material = new THREE.MeshBasicMaterial({
			color: COLORS[randomColorIndex],
			wireframe: true,
		});

		const cube = new THREE.Mesh(geometry, material);
		cube.position.set(x, y, 0);
		meshes.push(cube);
	}
}
cubesGroup.scale.set(MIN_SCALE, MIN_SCALE, MIN_SCALE);
cubesGroup.add(...meshes);
scene.add(cubesGroup);

const clock = new THREE.Clock();

const animate = () => {
	const delta = clock.getDelta();
	meshes.forEach((mesh, index) => {
		const mult = index % 2 === 0 ? -1 : 1;

		mesh.rotation.x += mult * delta;
		mesh.rotation.y += mult * delta * 0.4;
	});

	const elapse = clock.getElapsedTime();

	camera.position.x = Math.sin(elapse) * 1.5;
	camera.position.y = Math.cos(elapse) * 1.5;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	renderer.render(scene, camera);

	window.requestAnimationFrame(animate);
};

animate();
