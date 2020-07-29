let winHeight = window.innerHeight;
let winWidth = window.innerWidth;

let scene = new THREE.Scene();
// field of view, ratio of browser, near clipping plane, far clipping plane
let camera = new THREE.PerspectiveCamera(75, winWidth / winHeight , 1, 20000 );

let renderer = new THREE.WebGLRenderer();

renderer.setSize(winWidth, winHeight);
document.body.appendChild(renderer.domElement);

// Maintain Resize Aspect Ratio
window.addEventListener('resize', function(){
  let winHeight = window.innerHeight;
  let winWidth = window.innerWidth;

  renderer.setSize(winWidth, winHeight);
  camera.aspect = winWidth / winHeight;
  camera.updateProjectionMatrix();
})

  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.update();
// Create Geometry

//x,y,z
let geometry = new THREE.CubeGeometry(10000,10000,10000,1,1,1);
  // Define Textures
let cubeMaterials =
[
  new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader( ).load('dist/assets/sor_sea/sea_ft.JPG'), side: THREE.DoubleSide}), // Right Side
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader( ).load('dist/assets/sor_sea/sea_bk.JPG'), side: THREE.DoubleSide}), // Left Side
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader( ).load('dist/assets/sor_sea/sea_up.JPG'), side: THREE.DoubleSide}), // Top Side
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader( ).load('dist/assets/sor_sea/sea_dn.JPG'), side: THREE.DoubleSide}), // Bottom Side
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader( ).load('dist/assets/sor_sea/sea_rt.JPG'), side: THREE.DoubleSide}), // Front Side
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader( ).load('dist/assets/sor_sea/sea_lf.JPG'), side: THREE.DoubleSide}) // Back Side
];

let boxMaterials =
[
  new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader( ).load('dist/assets/box/metal_box.png'), side: THREE.DoubleSide}), // Right Side
  new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader( ).load('dist/assets/box/metal_box.png'), side: THREE.DoubleSide}), // Right Side
  new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader( ).load('dist/assets/box/metal_box.png'), side: THREE.DoubleSide}), // Right Side
  new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader( ).load('dist/assets/box/metal_box.png'), side: THREE.DoubleSide}), // Right Side
  new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader( ).load('dist/assets/box/metal_box.png'), side: THREE.DoubleSide}), // Right Side
  new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader( ).load('dist/assets/box/metal_box.png'), side: THREE.DoubleSide}), // Right Side
];

// Create Material, color or images


let cube = new THREE.Mesh(geometry, cubeMaterials);
scene.add(cube);

let cubeObj = new THREE.BoxGeometry(2,2,2);
let cubeGeo = new THREE.Mesh(cubeObj, boxMaterials);
let cubeGeo2 = new THREE.Mesh(cubeObj, boxMaterials);
let cubeGeo3 = new THREE.Mesh(cubeObj, boxMaterials);
scene.add(cubeGeo);
scene.add(cubeGeo2);
scene.add(cubeGeo3);
cubeGeo.position.set(1, 1, 1);
cubeGeo2.position.set(1, 1, 4);
cubeGeo3.position.set(1, 1, -5);


// Bring Camera Closer
camera.position.z = 1;

//Add Lights color, intensity

let ambientLight = new THREE.AmbientLight( 0xffffff, 1.0 );
scene.add(ambientLight);

// Logic
const update = () => {
  cubeGeo.rotation.x += 0.01;
  cubeGeo.rotation.y += 0.005;

  cubeGeo2.rotation.y += 0.005;

  cubeGeo3.rotation.x += 0.01;

}

//Draw the Scene
const render = () => {
  renderer.render(scene, camera);
}

//Run Loop (update, render, repeat)
const loop = () => {
  requestAnimationFrame(loop);

  update();
  render();
}

loop();
