import * as THREE from 'three';
import Stats from 'stats.js';
import * as dat from 'lil-gui';

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

// scene
const scene = new THREE.Scene();

// helpers

// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const gui = new dat.GUI();

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);

// render
const canvas = document.querySelector('.canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// events
window.addEventListener('resize', () => {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		canvas.requestFullscreen();
	}
});

export { sizes, scene, camera, renderer, canvas, stats, gui };
