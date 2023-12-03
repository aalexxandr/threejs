import '../styles/index.css';
import * as THREE from 'three';
import TWEEN from 'three/examples/jsm/libs/tween.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { renderer, scene, camera, canvas } from './init';
import { DEFAULT_MATERIAL_COLOR } from '../constants';

camera.position.z = 15;

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// init geometries
const group = new THREE.Group();
let activeItemIndex = -1;

const geometries = [
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.ConeGeometry(1, 2, 32, 1),
	new THREE.RingGeometry(0.5, 1, 16),
	new THREE.TorusGeometry(1, 0.5, 16, 100),
	new THREE.DodecahedronGeometry(1, 0),
	new THREE.SphereGeometry(1, 32, 16),
	new THREE.TorusKnotGeometry(1, 0.25, 100, 16, 1, 5),
	new THREE.OctahedronGeometry(1, 0),
	new THREE.CylinderGeometry(0.5, 1, 2, 16, 4),
];

let index = 0;
for (let i = -5; i <= 5; i += 5) {
	for (let j = -5; j <= 5; j += 5) {
		const material = new THREE.MeshBasicMaterial({
			color: DEFAULT_MATERIAL_COLOR,
			wireframe: true,
		});

		const mesh = new THREE.Mesh(geometries[index], material);
		mesh.position.set(i, j, 0);
		mesh.index = index;
		mesh.basePosition = new THREE.Vector3(i, j, 0);
		group.add(mesh);

		index++;
	}
}

scene.add(group);

const clock = new THREE.Clock();
const tick = () => {
	const delta = clock.getDelta();

	if (activeItemIndex !== -1) {
		group.children[activeItemIndex].rotation.y += delta * 0.5;
	}

	renderer.render(scene, camera);
	TWEEN.update();
	window.requestAnimationFrame(tick);
};

tick();

const resetActiveItem = () => {
	const activeItem = group.children[activeItemIndex];
	activeItem.material.color.set(DEFAULT_MATERIAL_COLOR);
	new TWEEN.Tween(activeItem.position)
		.to(
			{
				x: activeItem.basePosition.x,
				y: activeItem.basePosition.y,
				z: activeItem.basePosition.z,
			},
			Math.random() * 1000 + 1000
		)
		.easing(TWEEN.Easing.Exponential.InOut)
		.start();
	activeItemIndex = -1;
};

const raycaster = new THREE.Raycaster();
const handleClick = e => {
	const pointer = new THREE.Vector2();
	pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(pointer, camera);
	const intersection =
		raycaster.intersectObjects(group.children)?.[0] || undefined;

	if (activeItemIndex !== -1) {
		resetActiveItem();
	}
	if (intersection) {
		intersection.object.material.color.set('purple');
		activeItemIndex = intersection.object.index;

		new TWEEN.Tween(intersection.object.position)
			.to({ x: 0, y: 0, z: 5 }, Math.random() * 1000 + 1000)
			.easing(TWEEN.Easing.Exponential.InOut)
			.start();
	}
};

window.addEventListener('click', handleClick);
window.addEventListener('touch', handleClick);
