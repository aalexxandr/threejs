import '../styles/index.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { renderer, scene, camera, canvas } from './init';

camera.position.z = 3;

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// init cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
	color: 'purple',
	wireframe: true,
});
const meshCube = new THREE.Mesh(geometry, material);
scene.add(meshCube);

const tick = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};

tick();
