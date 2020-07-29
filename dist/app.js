"use strict";

var winHeight = window.innerHeight;
var winWidth = window.innerWidth;
var scene = new THREE.Scene(); // field of view, ratio of browser, near clipping plane, far clipping plane

var camera = new THREE.PerspectiveCamera(75, winWidth / winHeight, 1, 20000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(winWidth, winHeight);
document.body.appendChild(renderer.domElement); // Maintain Resize Aspect Ratio

window.addEventListener('resize', function () {
  var winHeight = window.innerHeight;
  var winWidth = window.innerWidth;
  renderer.setSize(winWidth, winHeight);
  camera.aspect = winWidth / winHeight;
  camera.updateProjectionMatrix();
});
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update(); // Create Geometry
//x,y,z

var geometry = new THREE.CubeGeometry(10000, 10000, 10000, 1, 1, 1); // Define Textures

var cubeMaterials = [new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('dist/assets/sor_sea/sea_ft.JPG'),
  side: THREE.DoubleSide
}), // Right Side
new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('dist/assets/sor_sea/sea_bk.JPG'),
  side: THREE.DoubleSide
}), // Left Side
new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('dist/assets/sor_sea/sea_up.JPG'),
  side: THREE.DoubleSide
}), // Top Side
new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('dist/assets/sor_sea/sea_dn.JPG'),
  side: THREE.DoubleSide
}), // Bottom Side
new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('dist/assets/sor_sea/sea_rt.JPG'),
  side: THREE.DoubleSide
}), // Front Side
new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('dist/assets/sor_sea/sea_lf.JPG'),
  side: THREE.DoubleSide
}) // Back Side
];
var boxMaterials = [new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('dist/assets/box/metal_box.png'),
  side: THREE.DoubleSide
}), // Right Side
new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('dist/assets/box/metal_box.png'),
  side: THREE.DoubleSide
}), // Right Side
new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('dist/assets/box/metal_box.png'),
  side: THREE.DoubleSide
}), // Right Side
new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('dist/assets/box/metal_box.png'),
  side: THREE.DoubleSide
}), // Right Side
new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('dist/assets/box/metal_box.png'),
  side: THREE.DoubleSide
}), // Right Side
new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('dist/assets/box/metal_box.png'),
  side: THREE.DoubleSide
})]; // Create Material, color or images

var cube = new THREE.Mesh(geometry, cubeMaterials);
scene.add(cube);
var cubeObj = new THREE.BoxGeometry(2, 2, 2);
var cubeGeo = new THREE.Mesh(cubeObj, boxMaterials);
var cubeGeo2 = new THREE.Mesh(cubeObj, boxMaterials);
var cubeGeo3 = new THREE.Mesh(cubeObj, boxMaterials);
scene.add(cubeGeo);
scene.add(cubeGeo2);
scene.add(cubeGeo3);
cubeGeo.position.set(1, 1, 1);
cubeGeo2.position.set(1, 1, 4);
cubeGeo3.position.set(1, 1, -5); // Bring Camera Closer

camera.position.z = 1; //Add Lights color, intensity

var ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight); // Logic

var update = function update() {
  cubeGeo.rotation.x += 0.01;
  cubeGeo.rotation.y += 0.005;
  cubeGeo2.rotation.y += 0.005;
  cubeGeo3.rotation.x += 0.01;
}; //Draw the Scene


var render = function render() {
  renderer.render(scene, camera);
}; //Run Loop (update, render, repeat)


var loop = function loop() {
  requestAnimationFrame(loop);
  update();
  render();
};

loop();