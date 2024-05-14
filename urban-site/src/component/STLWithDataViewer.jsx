import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const STLWithDataViewer = ({ stlFile }) => {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcce0ff); // Light blue background

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const stlLoader = new STLLoader();

    // Create a directional light to simulate sunlight
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1).normalize(); // Position the light to shine from top to bottom
    scene.add(light);

    // Add an ambient light
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft ambient light
    scene.add(ambientLight);

    // Enable shadows in the renderer
    renderer.shadowMap.enabled = true;

    stlLoader.load(stlFile, function (geometry) {
      geometry.computeBoundingBox();
      const boundingBox = geometry.boundingBox;
      const center = boundingBox.getCenter(new THREE.Vector3());
      const size = boundingBox.getSize(new THREE.Vector3());

      // Position camera to look at the center of the model
      camera.position.copy(center);
      camera.position.x += size.x;
      camera.position.y += size.y;
      camera.position.z += size.z;

      const material = new THREE.MeshStandardMaterial({ color: 0xd3d3d3 }); // Use a standard material for the building
      const mesh = new THREE.Mesh(geometry, material);

      // Enable shadows for the mesh
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Adjust these values as needed to correct the orientation of the mesh
      mesh.rotation.x = Math.PI * 0.45; // 180 degrees
      mesh.rotation.y = Math.PI * 1.15;
      mesh.rotation.z = Math.PI * 0.58;

      scene.add(mesh);

      // Make the camera look at the mesh
      camera.lookAt(mesh.position);

      // Set controls target to center of the model
      controls.target.copy(mesh.position);
    });

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      while (containerRef.current.firstChild) {
        containerRef.current.firstChild.remove();
      }
    };
  }, [stlFile]);

  return <div ref={containerRef} />;
};

export default STLWithDataViewer;
