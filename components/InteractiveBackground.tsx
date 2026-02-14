import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- Particle Logic ---
// Efficiently generates points for a sphere volume
const generateParticles = (count: number, radius: number) => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);     // x
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
        positions[i * 3 + 2] = r * Math.cos(phi);                   // z
    }
    return positions;
};

const StarField = (props: any) => {
    const ref = useRef<THREE.Points>(null!);
    const groupRef = useRef<THREE.Group>(null!);

    // Memoize geometry to prevent regeneration on every render
    const sphere = useMemo(() => generateParticles(6000, 1.5), []);

    useFrame((state, delta) => {
        // 1. Consistent slow rotation
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;
        }

        // 2. Interactive user response (Parallax / Tilt)
        if (groupRef.current) {
            const { pointer } = state;
            // Smooth tilt
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.2, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.2, 0.05);
        }
    });

    return (
        <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#38bdf8" // Sky 400
                    size={0.003}     // Tiny, high-tech dots
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
};

const InteractiveBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 w-full h-full bg-black">
            {/* The Gradient Background Layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/50 to-slate-950 z-[-1]" />

            <Canvas camera={{ position: [0, 0, 1] }}>
                <StarField />
            </Canvas>
        </div>
    );
};

export default InteractiveBackground;
