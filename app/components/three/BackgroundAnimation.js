"use client"

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import styles from './BackgroundAnimation.module.css';

const ParticleSystem = ({ count = 800, color = "#0070f3" }) => {
  const mesh = useRef();
  const light = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  // Generate random particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = (Math.random() * 2 - 1) * 10;
      const y = (Math.random() * 2 - 1) * 10;
      const z = (Math.random() * 2 - 1) * 10;

      temp.push({ time, factor, speed, x, y, z, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  // Create geometry with random positions
  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = particles[i].x;
      positions[i * 3 + 1] = particles[i].y;
      positions[i * 3 + 2] = particles[i].z;
      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    return [positions, sizes];
  }, [count, particles]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Update light position for subtle lighting effects
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.1) * 3;
      light.current.position.y = Math.cos(time * 0.2) * 4;
    }

    // Update particles
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Get particle
      const particle = particles[i];
      
      // Update position based on time and create a gentle flow
      let { x, y, z, factor, speed, time: pTime } = particle;
      const travelDistance = 0.1;
      
      // Create a flowing motion pattern
      const newTime = pTime + speed * 5;
      const posX = x + Math.sin(newTime / 10) * travelDistance;
      const posY = y + Math.cos(newTime / 10) * travelDistance;
      const posZ = z + Math.sin(newTime / 10) * travelDistance;
      
      // Check if particle should wrap around (keep particles within a reasonable area)
      const maxDistance = 15;
      const dist = Math.sqrt(posX * posX + posY * posY + posZ * posZ);
      
      if (dist > maxDistance) {
        // Reset particle to a new random position near the center
        positions[i3] = (Math.random() * 2 - 1) * 5;
        positions[i3 + 1] = (Math.random() * 2 - 1) * 5;
        positions[i3 + 2] = (Math.random() * 2 - 1) * 5;
        
        // Reset particle parameters
        particle.time = 0;
      } else {
        // Update position
        positions[i3] = posX;
        positions[i3 + 1] = posY;
        positions[i3 + 2] = posZ;
        
        // Update particle time
        particle.time = newTime;
      }
    }
    
    // Update the geometry
    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate the entire system very slowly for added visual interest
    mesh.current.rotation.y = time * 0.03;
    mesh.current.rotation.z = time * 0.01;
  });

  return (
    <group>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} />
      
      {/* Point light to add dimension */}
      <pointLight ref={light} distance={20} intensity={1.5} color={color} />
      
      {/* Particle system */}
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={sizes.length}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
          transparent={true}
          opacity={0.6}
          color={color}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// Background controller component manages canvas and responsiveness
const BackgroundController = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  
  // Handle mounting to prevent SSR issues
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    return null;
  }
  
  return children;
};

// Main export component
const BackgroundAnimation = () => {
  return (
    <div className={styles.backgroundContainer}>
      <BackgroundController>
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          dpr={[1, 2]} // Optimize for different device pixel ratios
        >
          <ParticleSystem color="#0070f3" />
        </Canvas>
      </BackgroundController>
    </div>
  );
};

export default BackgroundAnimation;