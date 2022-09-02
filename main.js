import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var torusGeo = new THREE.TorusGeometry(0.125, 5, 4, 10);
var cylinGeo = new THREE.CylinderGeometry(0.5, 0.5, 2);
var sphereGeo = new THREE.SphereGeometry(2, 5, 5);
var ringGeo = new THREE.RingGeometry(0.125, 0.5, 5);
var torusKnotGeo = new THREE.TorusKnotGeometry(0.125, 0.125, 25, 25, 80, 80);

const obj = new THREE.Object3D();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, 10);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new OrbitControls(camera, renderer.domElement);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var plane = new THREE.Plane();
var planeNormal = new THREE.Vector3();
var point = new THREE.Vector3();

document.addEventListener("mousedown", onMouseDown, false);
document.addEventListener("mousemove", onMouseMove, false);

function getPoint(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  planeNormal.copy(camera.position).normalize();
  plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, point);
}

let geo, mat, shape, selectedvalue;

function setPoint() {
  // var r = Math.floor(Math.random() * 256);
  // var g = Math.floor(Math.random() * 256);
  // var b = Math.floor(Math.random() * 256);

  selectedvalue = document.querySelector("#geoList").value;
  if (selectedvalue == "TorusGeometry") {
    geo = torusGeo;
  } else if (selectedvalue == "CylinderGeometry") {
    geo = cylinGeo;
  } else if (selectedvalue == "SphereGeometry") {
    geo = sphereGeo;
  } else if (selectedvalue == "RingGeometry") {
    geo = ringGeo;
  } else if (selectedvalue == "TorusKnotGeometry") {
    geo = torusKnotGeo;
  }

  mat = new THREE.MeshBasicMaterial({
    wireframe: true,
  });

  shape = new THREE.Mesh(geo, mat);
  let rdx = parseFloat(document.getElementById("rangex").value);
  let rdy = parseFloat(document.getElementById("rangey").value);
  let rdz = parseFloat(document.getElementById("rangez").value);
  let rdColor = document.getElementById("rangecolor").value;
  let wireframebool = document.getElementById("checkwireframe");
  shape.material.color.setHex("0x" + rdColor.slice(1));
  shape.scale.x = rdx;
  shape.scale.y = rdy;
  shape.scale.z = rdz;
  shape.material.wireframe = wireframebool.checked;
  shape.position.copy(point);
  obj.add(shape);
  scene.add(obj);
}

function onMouseDown(event) {
  getPoint(event);
  if (draw.checked) setPoint();
}

function onMouseMove(event) {
  getPoint(event);
  if (draw.checked) setPoint();
}

render();

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
