// Variables de seteado

let container;
let camera;
let renderer;
let scene;
let mailbox;

function init() {
  container = document.querySelector(".scene");

  // Crear escena
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  // Seteado de cámara 
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0.75, 14.7);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xfaaccd, 2);
  light.position.set(50, 50, 100);
  scene.add(light);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  // Cargar modelo
  let loader = new THREE.GLTFLoader();
  loader.load("./model/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    mailbox = gltf.scene.children[0];
    animate();
  });
}

// Animación
function animate() {
  requestAnimationFrame(animate);
  mailbox.rotation.z += 0.02;
  renderer.render(scene, camera);
}

init();

// Resize
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);