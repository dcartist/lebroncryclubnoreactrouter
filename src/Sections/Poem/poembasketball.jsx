import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function Orb({ position }) {
  const meshRef = useRef();
  const speed = useMemo(() => Math.random() * 0.01 + 0.005, []);
  const initialRotation = useMemo(() => Math.PI * Math.random(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale = 0.2 + 0.05 * Math.sin((2 * Math.PI * t) / 8);
    meshRef.current.scale.set(scale, scale, scale);
    meshRef.current.rotation.x += speed;
    meshRef.current.rotation.y = initialRotation;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#FFA500" emissive="#FF8C00" emissiveIntensity={0.5} />
    </mesh>
  );
}

function Orbs() {
  const positions = useMemo(() => {
    return Array.from({ length: 40 }, () => [
      (Math.random() * 2 - 1) * 3,
      (Math.random() * 2 - 1) * 13,
      (Math.random() * 2 - 1) * 4
    ]);
  }, []);
  return positions.map((pos, i) => <Orb key={i} position={pos} />);
}

export default function ThreeExperience() {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      content: '#content',
      smooth: 1.2
    });

    document.querySelectorAll('span').forEach((span) => {
      ScrollTrigger.create({
        trigger: span,
        start: 'top 90%',
        end: 'bottom 10%',
        onUpdate: (self) => {
          const dist = Math.abs(self.progress - 0.5);
          const lightness = 80 + dist * 20;
          span.style.setProperty('--l', `${lightness}%`);
        }
      });
    });

    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div data-app-container className="is-ready">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.1} />
        <directionalLight intensity={0.4} position={[5, 3, 2]} />
        <Orbs />
      </Canvas>
    </div>
  );
}