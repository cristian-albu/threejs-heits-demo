import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const cubeTexture = new THREE.TextureLoader().load("./cubeTexture.jpg");
const cubeNormalMap = new THREE.TextureLoader().load("./cubeNormalMap.png");
const geometry = new THREE.BoxGeometry(8, 8, 8);
const material = new THREE.MeshStandardMaterial({
  map: cubeTexture,
  normalMap: cubeNormalMap,
  roughness: 0.6,
  metalness: 1,
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const pointLight = new THREE.PointLight(0x0000ff, 777);
pointLight.position.x = 12;
pointLight.position.y = 12;

const pointLight2 = new THREE.PointLight(0xff0000, 333);
pointLight2.position.x = -12;
pointLight2.position.y = -18;

scene.add(pointLight, pointLight2);

const controls = new OrbitControls(camera, renderer.domElement);

function addCubes() {
  const randomSize = THREE.MathUtils.randFloatSpread(2);

  const geometry = new THREE.BoxGeometry(randomSize, randomSize, randomSize);
  const material = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 1, roughness: 0.5 });
  const cube = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  cube.position.set(x, y, z);
  scene.add(cube);
}

function buildCube() {
  const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const material = new THREE.MeshStandardMaterial({ map: cubeTexture, roughness: 0.4, metalness: 1 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = -10;
  return cube;
}

const spinningCube = buildCube();

scene.add(spinningCube);

Array(200).fill().forEach(addCubes);

const bgTexture = new THREE.TextureLoader().load("./bgTexture.jpg");
scene.background = bgTexture;

const spinningRadius = 10;
let spinningAngle = 0;
const speed = 0.02;

function animate() {
  requestAnimationFrame(animate);

  spinningCube.position.x = spinningRadius * Math.cos(spinningAngle);
  spinningCube.position.z = spinningRadius * Math.sin(spinningAngle);
  spinningAngle += speed;

  spinningCube.rotation.y += 0.01;
  spinningCube.rotation.x += 0.01;

  cube.rotation.y += 0.01;
  cube.rotation.x += 0.01;

  camera.position.x += 0.02;

  controls.update();
  renderer.render(scene, camera);
}

animate();
