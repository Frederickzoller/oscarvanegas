"use client"

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { MathUtils } from 'three';
import * as THREE from 'three';
import styles from './BackgroundAnimation.module.css';

// Wave component that uses simplex noise for a natural wave effect
const WavePlane = ({ color = "#0061FF", opacity = 0.15 }) => {
  const mesh = useRef();
  const { viewport } = useThree();

  // Optimize performance by using useMemo for geometry and material
  const geometry = useMemo(() => {
    const width = 15;
    const height = 10;
    const segmentsX = 50;
    const segmentsY = 50;
    return new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
  }, []);

  // Animate the wave
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.5;
    if (mesh.current) {
      const positionAttribute = mesh.current.geometry.attributes.position;
      
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        
        // Create a gentle wave effect
        const aX = 0.2;  // amplitude X
        const aY = 0.1;  // amplitude Y
        const fX = 0.5;  // frequency X
        const fY = 0.5;  // frequency Y
        
        const z = 
          aX * Math.sin(x * fX + time) +
          aY * Math.sin(y * fY + time * 0.7);
        
        positionAttribute.setZ(i, z);
      }
      
      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 4, 0, 0]} position={[0, -2, -5]}>
      <primitive object={geometry} attach="geometry" />
      <meshBasicMaterial color={color} transparent opacity={opacity} wireframe />
    </mesh>
  );
};

// Optimized background component with multiple wave layers
const BackgroundAnimation = () => {
  return (
    <div className={styles.backgroundContainer}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={["#ffffff"]} />
        <WavePlane color="#0061FF" opacity={0.05} />
        <WavePlane color="#0050CC" opacity={0.05} />
      </Canvas>
    </div>
  );
};

export default BackgroundAnimation;