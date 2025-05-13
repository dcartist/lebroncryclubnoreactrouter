import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import WEBGL from "three/examples/jsm/capabilities/WebGL";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CubeAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
      if (!WEBGL.isWebGLAvailable()) {
        const warning = WEBGL.getWebGLErrorMessage();
        containerRef.current?.appendChild(warning);
        return;
      }
  
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.physicallyCorrectLights = true;
      renderer.setClearColor(0x000000, 0); // transparent background
      containerRef.current.appendChild(renderer.domElement);
  
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        65,
        window.innerWidth / window.innerHeight,
        0.1,
        200
      );
      camera.position.set(7, 5, 8);
  
      // Uncomment if you want orbit controls
      // const controls = new OrbitControls(camera, renderer.domElement);
  
      const lights = {};
  
      function createLights() {
        // Add a soft ambient light
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambient);
    
        const orbitingSpotLight = new THREE.SpotLight("white");
        orbitingSpotLight.intensity = 1.2; // was 4400
        orbitingSpotLight.angle = Math.PI / 4;
        orbitingSpotLight.position.set(2, -2, 12);
        orbitingSpotLight.penumbra = 0.7;
        orbitingSpotLight.decay = 1.1;
        scene.add(orbitingSpotLight);
        lights.orbiting = orbitingSpotLight;
    
        const spotLightYAxis = new THREE.SpotLight("white");
        spotLightYAxis.intensity = 1.2; // was 6500
        spotLightYAxis.angle = Math.PI / 3;
        spotLightYAxis.position.set(10, 0, -3);
        scene.add(spotLightYAxis);
        lights.yAxis = spotLightYAxis;
    
        const spotLightXAxis = new THREE.SpotLight("white");
        spotLightXAxis.intensity = 0.8; // was 3300
        spotLightXAxis.angle = Math.PI / 2;
        spotLightXAxis.position.set(0, 10, 0);
        scene.add(spotLightXAxis);
        lights.xAxis = spotLightXAxis;
    
        const frontIllumination = new THREE.SpotLight("white");
        frontIllumination.intensity = 1.0; // was 6300
        frontIllumination.angle = Math.PI / 4;
        frontIllumination.position.set(2, -1, 12);
        scene.add(frontIllumination);
        lights.front = frontIllumination;
    
        const backIllumination = new THREE.SpotLight("white");
        backIllumination.intensity = 0.8; // was 6300
        backIllumination.angle = Math.PI / 4;
        backIllumination.position.set(4, 5, -22);
        scene.add(backIllumination);
        lights.back = backIllumination;
      }
  
      function createExtrudeGeometry() {
        const width = 1;
        const height = 1;
  
        const shape = new THREE.Shape();
        const epsilon = 0.000025;
        const radius = 0.01 - epsilon;
  
        shape.absarc(epsilon, epsilon, epsilon, -Math.PI / 2, -Math.PI, true);
        shape.absarc(
          epsilon,
          height - radius * 2,
          epsilon,
          Math.PI,
          Math.PI / 2,
          true
        );
        shape.absarc(
          width - radius * 2,
          height - radius * 2,
          epsilon,
          Math.PI / 2,
          0,
          true
        );
        shape.absarc(width - radius * 2, epsilon, epsilon, 0, -Math.PI / 2, true);
  
        const extrudeSettings = {
          stepsilon: 24,
          depth: 0.8,
          bevelThickness: 0.2,
          bevelSize: 0.1,
          bevelOffset: 0,
          bevelSegments: 64,
          curveSegments: 32,
        };
  
        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
      }
  
      const layers = {
        bottom: new THREE.Group(),
        mid: new THREE.Group(),
        top: new THREE.Group(),
      };
  
      function createRubik() {
        const cubeDepth = 3;
        const cubeEdgeLength = 3;

        const cubeBlue = 0x3b82f6; // Medium blue (#3b82f6)
  
        for (let zIdx = 0; zIdx < cubeDepth; zIdx++) {
          for (let xIdx = 0; xIdx < cubeEdgeLength; xIdx++) {
            for (let yIdx = 0; yIdx < cubeEdgeLength; yIdx++) {
              const geometry = createExtrudeGeometry();
  
              // All cubes medium blue
              const color = cubeBlue;
  
              // Main colored cube
              const material = new THREE.MeshStandardMaterial({
                color,
                metalness: 0.31,
                roughness: 0.21,
                side: THREE.DoubleSide,
              });
              const elementCube = new THREE.Mesh(geometry, material);
  
              // Very thin white border: slightly larger cube, wireframe
              const borderGeometry = geometry.clone();
              borderGeometry.scale(1.015, 1.015, 1.015); // Slightly larger for a very thin border
              const borderMaterial = new THREE.MeshBasicMaterial({
                color: "white",
                wireframe: true,
                wireframeLinewidth: 0.5, // Very thin
              });
              const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
  
              const elementGap = 1.2;
              elementCube.position.x = xIdx * elementGap;
              elementCube.position.y = yIdx * elementGap;
              elementCube.position.z = zIdx * elementGap;
              borderMesh.position.copy(elementCube.position);
  
              if (yIdx === 0) {
                layers.bottom.add(elementCube);
                layers.bottom.add(borderMesh);
              } else if (yIdx === 1) {
                layers.mid.add(elementCube);
                layers.mid.add(borderMesh);
              } else if (yIdx === 2) {
                layers.top.add(elementCube);
                layers.top.add(borderMesh);
              }
            }
          }
        }
  
        Object.values(layers).forEach((group) => scene.add(group));
      }
  
      function getLayerCenter(group) {
        const box = new THREE.Box3().setFromObject(group);
        const center = new THREE.Vector3();
        box.getCenter(center);
        return center;
      }
  
      function setUpCubeAnimation() {
        const yAxisNormalized = new THREE.Vector3(0, 1, 0);
        const rotateByRadians = THREE.MathUtils.degToRad(180);
  
        function spinLayer(layer, prevYValue = 0) {
          const layerCenter = getLayerCenter(layer);
  
          gsap.to(layer.rotation, {
            y: prevYValue + rotateByRadians,
            duration: 2,
            ease: "power2.inOut",
            delay: Math.random() * (4.5 - 2.5) + 2.5,
            onComplete() {
              spinLayer(layer, this._targets[0]._y);
            },
            onUpdate() {
              const currentYValue = this._targets[0]._y;
              const yDelta = currentYValue - prevYValue;
              prevYValue = currentYValue;
  
              layer.position.sub(layerCenter);
              layer.position.applyAxisAngle(yAxisNormalized, yDelta);
              layer.position.add(layerCenter);
            },
          });
        }
  
        spinLayer(layers.top);
        spinLayer(layers.bottom);
      }
  
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
  
      window.addEventListener("resize", onWindowResize);
  
      const clock = new THREE.Clock();
  
      function render() {
        const elapsedTime = clock.getElapsedTime();
  
        if (lights.orbiting) {
          lights.orbiting.position.x += Math.cos(elapsedTime) * 0.3;
          lights.orbiting.position.z += Math.sin(elapsedTime) * 0.5;
        }
  
        if (lights.yAxis) {
          lights.yAxis.position.y += Math.cos(elapsedTime) * 0.3;
          lights.yAxis.position.z += Math.sin(elapsedTime) * 0.06;
        }
  
        if (lights.xAxis) {
          lights.xAxis.position.x += Math.sin(elapsedTime * 0.8) * 0.1;
        }
  
        renderer.render(scene, camera);
      }
  
      function animate() {
        requestAnimationFrame(animate);
        render();
      }
  
      createLights();
      createRubik();
      camera.lookAt(scene.position);
      setUpCubeAnimation();
      animate();
  
      return () => {
        window.removeEventListener("resize", onWindowResize);
        containerRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      };
    }, []);
  
    // The parent of this component should have position: relative!
    return (
      <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
        {/* Overlay text */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100%",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
          overflow: "hidden"
        }}>
          <span style={{
            fontSize: "min(16vw, 40vh)",
            fontWeight: "bold",
            color: "white",
            opacity: 1,
            fontFamily: "Anton, sans-serif",
            letterSpacing: "1vw",
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: 1,
            textShadow: "0 8px 48px #000, 0 4px 8px #000, 0 0px 4px #000, 0 0 0.5em #000",
            whiteSpace: "nowrap",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            CUBE ZONE
          </span>
        </div>
        {/* Cube canvas */}
        <div
          ref={containerRef}
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            pointerEvents: "none"
          }}
        />
      </div>
    );
};

export default CubeAnimation;