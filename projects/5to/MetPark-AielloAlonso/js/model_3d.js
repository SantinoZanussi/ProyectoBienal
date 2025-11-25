import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('stl-viewer');

  // Escena y cámara
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    5000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Luces
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 1.5);
  directional.position.set(200, 200, 200);
  scene.add(directional);

  // Controles
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = true;
  controls.panSpeed = 10.0;
  controls.zoomSpeed = 1.2;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Cargar STL
  const loader = new STLLoader();
  loader.load(
    './models/MetPark.stl',
    function (geometry) {
      const material = new THREE.MeshStandardMaterial({
        color: 0xcdcecf,
        metalness: 0.5,
        roughness: 0.5
      });
      const mesh = new THREE.Mesh(geometry, material);

      // Calcular bounding box original
      geometry.computeBoundingBox();
      const box = geometry.boundingBox;

      // Escalar automáticamente
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const desiredSize = 200;
      const scale = desiredSize / maxDim;
      mesh.scale.set(scale, scale, scale);

      // Recalcular bounding box escalado
      const scaledBox = {
        min: box.min.clone().multiplyScalar(scale),
        max: box.max.clone().multiplyScalar(scale)
      };

      // Centrar en X e Y
      const centerXY = new THREE.Vector3();
      centerXY.x = (scaledBox.min.x + scaledBox.max.x) / 2;
      centerXY.y = (scaledBox.min.y + scaledBox.max.y) / 2;
      mesh.position.x = -centerXY.x;
      mesh.position.y = -centerXY.y;

      // Girar 90° en X para ponerlo de pie
      mesh.rotation.x = -Math.PI / 2;

      // Ajustar altura manualmente después de la rotación
      mesh.position.y -= 45;

      // Mover la maqueta más atrás sobre el plano de trabajo
      mesh.position.z -= 45; // ← ajustá este valor según necesites (más grande = más atrás)

      // Agregar a la escena
      scene.add(mesh);

      // Reposicionar cámara
      const distance = maxDim * 1.5 / scale;
      camera.position.set(200, 200, 200);
      controls.target.set(0, 0, 0);
      controls.update();

      // Helpers visuales
      const axesHelper = new THREE.AxesHelper(100);
      scene.add(axesHelper);
      const gridHelper = new THREE.GridHelper(200, 20);
      scene.add(gridHelper);

      console.log('Modelo STL cargado, centrado, rotado y apoyado sobre el plano.');
    },
    undefined,
    function (error) {
      console.error('Error al cargar STL:', error);
    }
  );

  // Animación
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Ajuste responsive
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});
