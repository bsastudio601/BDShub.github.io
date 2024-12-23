// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();

// Orthographic camera setup
const aspect = window.innerWidth / window.innerHeight;
const cameraSize = 300;
const camera = new THREE.OrthographicCamera(
  -cameraSize * aspect, // Left
  cameraSize * aspect,  // Right
  cameraSize,           // Top
  -cameraSize,          // Bottom
  0.1,                  // Near
  2000                  // Far
);
camera.position.set(0, 300, 500); // Slightly above and back
camera.lookAt(0, 50, 0); // Look at the center of the scene

// Renderer with shadow enabled
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use soft shadows
document.getElementById("container3D").appendChild(renderer.domElement);

// Load 3D object
const loader = new GLTFLoader();
let object;
loader.load(
  `models/eye/scene.gltf`,
  function (gltf) {
    object = gltf.scene;

    object.scale.set(70, 70, 70); // Adjusted for orthographic view
    object.position.y = 50;
    object.castShadow = true; // Enable shadows for the object
    scene.add(object);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Create a colorful floor with gradient material
const floorGeometry = new THREE.PlaneGeometry(2000, 2000);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xFB3748,
  roughness: 0.8,
  metalness: 0.1,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;
floor.receiveShadow = true; // Floor receives shadows
scene.add(floor);

// Add fog for blending the horizon
scene.fog = new THREE.Fog(0x3C3CFF, 0.5, 2000);

// Add colorful lights
const frontLight = new THREE.PointLight(0xff88cc, 1.5, 1000); // Pink front light
frontLight.position.set(200, 300, 300);
frontLight.castShadow = true;
frontLight.shadow.mapSize.width = 4096;
frontLight.shadow.mapSize.height = 4096;
scene.add(frontLight);

const backLight = new THREE.PointLight(0x88ccff, 0.5, 1500); // Blue back light
backLight.position.set(-200, 300, -300);
scene.add(backLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Add a white directional light
directionalLight.position.set(200, 300, -100);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xcccc88, 0.5); // Soft ambient light
scene.add(ambientLight);

// Event listeners for mouse and touch interaction
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let isDragging = false;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
document.addEventListener("mousedown", () => {
  isDragging = true;
});
document.addEventListener("mouseup", () => {
  isDragging = false;
});
document.addEventListener("touchstart", (e) => {
  isDragging = true;
  const touch = e.touches[0];
  mouseX = touch.clientX;q
});
document.addEventListener("touchmove", (e) => {
  if (isDragging) {
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
  }
});
document.addEventListener("touchend", () => {
  isDragging = false;
});

// Set the starting rotation value (in radians)
let startRotationY = Math.PI / 1; // You can adjust this value to set where it starts
let rotationSpeed = 0.001; // Slow rotation speed when idle
let rotationDirection = 1; // 1 for clockwise, -1 for counterclockwise

function animate() {
  requestAnimationFrame(animate);

  if (object) {
    // Set the initial rotation of the object
    if (!object.rotation.y) {
      object.rotation.y = startRotationY;
    }

    // Rotate automatically if not dragging
    if (!isDragging) {
      object.rotation.y += rotationSpeed * rotationDirection; // Slow automatic rotation
    }

    // Manually rotate based on mouse or touch input when dragging
    if (isDragging) {
      object.rotation.y = -3 + (mouseX / window.innerWidth) * 3; // Rotate object left-right
    }
  }

  renderer.render(scene, camera);
}

// Resize handling for the orthographic camera
window.addEventListener("resize", () => {
  const aspect = window.innerWidth / window.innerHeight;
  camera.left = -cameraSize * aspect;
  camera.right = cameraSize * aspect;
  camera.top = cameraSize;
  camera.bottom = -cameraSize;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();
