import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('stl-viewer');
  
    // Escena y cámara
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
  
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
  
    // Luces
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(1, 1, 1);
    scene.add(dir);
  
    // Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    
    // Ajustr según el tamaño de la maqueta (.stl)
    camera.position.set(-189, 183, 246);  // x, y, z (posición cámara)
    controls.target.set(-186, 179, 240);  // x, y, z (vista)
    controls.update();

    controls.enablePan = true;
    // Ajustar la velocidad de movimiento
    controls.panSpeed = 10.0;
    controls.zoomSpeed = 1.2;
    // Amortiguación (movimiento más suave)
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Cargar STL local (ej: ../models/maqueta.stl )
    const loader = new STLLoader();
    loader.load('../models/ParkElite-Maqueta-3D.stl', function (geometry) {
      const material = new THREE.MeshStandardMaterial({ color: 0xCDCECF, metalness: 0.5, roughness: 0.5 });
      const mesh = new THREE.Mesh(geometry, material);
  
      geometry.computeBoundingBox();
      const center = geometry.boundingBox.getCenter(new THREE.Vector3());
      mesh.geometry.translate(-center.x, -center.y, -center.z);
  
      scene.add(mesh);
    });
  
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    //   console.log('Posición cámara:', {
    //     x: camera.position.x.toFixed(2),
    //     y: camera.position.y.toFixed(2),
    //     z: camera.position.z.toFixed(2)
    //   });
    //   console.log('Apuntando a:', {
    //     x: controls.target.x.toFixed(2),
    //     y: controls.target.y.toFixed(2),
    //     z: controls.target.z.toFixed(2)
    //   });
    }
    animate();
  
    // Responsive
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
});