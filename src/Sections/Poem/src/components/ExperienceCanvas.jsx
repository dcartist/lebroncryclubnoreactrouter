import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const ExperienceCanvas = () => {
  useEffect(() => {
    const container = document.querySelector('[data-app-container]');
    const clock = new THREE.Clock();
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 10000);
    const meshes = [];

    camera.position.set(0, 0, 5);
    renderer.setPixelRatio(1.5);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableKeys = false;
    controls.enableZoom = false;
    controls.enableDamping = false;

    window.addEventListener('resize', () => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.1));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(5, 3, 2);
    scene.add(directionalLight);

    const boxGeom = new THREE.BoxBufferGeometry(2, 2, 2);
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff });

    for (let i = 0; i < 40; i++) {
      const mesh = new THREE.Mesh(boxGeom, material);
      mesh.position.set(
        3 * (Math.random() * 2 - 1),
        13 * (Math.random() * 2 - 1),
        4 * (Math.random() * 2 - 1)
      );
      mesh.rotation.y = Math.PI * Math.random();
      mesh.rotationSpeed = Math.random() * 0.01 + 0.005;
      meshes.push(mesh);
      scene.add(mesh);
    }

    const smoother = ScrollSmoother.create({
      content: '#content',
      smooth: 1.2,
    });

    document.querySelectorAll('span').forEach((span) => {
      ScrollTrigger.create({
        trigger: span,
        start: 'top 90%',
        end: 'bottom 10%',
        onUpdate: (self) => {
          const dist = Math.abs(self.progress - 0.5);
          const lightness = 80 + (100 - 80) * (1 - dist / 0.5);
          span.style.setProperty('--l', `${lightness}%`);
        },
      });
    });

    container.classList.add('is-ready');

    const update = () => {
      const time = clock.getElapsedTime();
      const scale = 0.2 + 0.05 * Math.sin(Math.PI * 2 * (time / 8));

      meshes.forEach((mesh) => {
        mesh.scale.set(scale, scale, scale);
        mesh.rotation.x += mesh.rotationSpeed;
      });

      camera.position.y = 10 - 20 * smoother.progress;

      renderer.render(scene, camera);
      requestAnimationFrame(update);
    };

    update();
  }, []);

  return <div data-app-container></div>;
};

export default ExperienceCanvas;