import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const BOID_COUNT = 400;
const BOUNDARY = 20;
const MAX_SPEED = 0.2;
const MAX_FORCE = 0.01;

function boidAlgorithm(
    positions: Float32Array,
    velocities: Float32Array,
    count: number
) {
    for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const px = positions[idx];
        const py = positions[idx + 1];
        const pz = positions[idx + 2];

        let vx = velocities[idx];
        let vy = velocities[idx + 1];
        let vz = velocities[idx + 2];

        // Separation
        let sepX = 0, sepY = 0, sepZ = 0;
        // Alignment
        let aliX = 0, aliY = 0, aliZ = 0;
        // Cohesion
        let cohX = 0, cohY = 0, cohZ = 0;

        let sepCount = 0;
        let aliCount = 0;
        let cohCount = 0;

        const perceptionRadius = 2.0;
        const separationRadius = 0.8;

        for (let j = 0; j < count; j++) {
            if (i === j) continue;

            const jdx = j * 3;
            const dx = px - positions[jdx];
            const dy = py - positions[jdx + 1];
            const dz = pz - positions[jdx + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < perceptionRadius * perceptionRadius) {
                // Separation
                if (distSq < separationRadius * separationRadius) {
                    const dist = Math.sqrt(distSq);
                    sepX += dx / dist;
                    sepY += dy / dist;
                    sepZ += dz / dist;
                    sepCount++;
                }

                // Alignment
                aliX += velocities[jdx];
                aliY += velocities[jdx + 1];
                aliZ += velocities[jdx + 2];
                aliCount++;

                // Cohesion
                cohX += positions[jdx];
                cohY += positions[jdx + 1];
                cohZ += positions[jdx + 2];
                cohCount++;
            }
        }

        if (sepCount > 0) {
            sepX /= sepCount; sepY /= sepCount; sepZ /= sepCount;
        }
        if (aliCount > 0) {
            aliX /= aliCount; aliY /= aliCount; aliZ /= aliCount;
            aliX -= vx; aliY -= vy; aliZ -= vz;
        }
        if (cohCount > 0) {
            cohX /= cohCount; cohY /= cohCount; cohZ /= cohCount;
            cohX -= px; cohY -= py; cohZ -= pz;
            cohX -= vx; cohY -= vy; cohZ -= vz;
        }

        // Weights
        const wSep = 1.5;
        const wAli = 1.0;
        const wCoh = 1.0;

        vx += (sepX * wSep + aliX * wAli + cohX * wCoh) * MAX_FORCE;
        vy += (sepY * wSep + aliY * wAli + cohY * wCoh) * MAX_FORCE;
        vz += (sepZ * wSep + aliZ * wAli + cohZ * wCoh) * MAX_FORCE;

        // Bounds
        if (Math.abs(px) > BOUNDARY) vx -= Math.sign(px) * 0.05;
        if (Math.abs(py) > BOUNDARY) vy -= Math.sign(py) * 0.05;
        if (Math.abs(pz) > BOUNDARY) vz -= Math.sign(pz) * 0.05;

        // Limit speed
        const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
        if (speed > MAX_SPEED) {
            vx = (vx / speed) * MAX_SPEED;
            vy = (vy / speed) * MAX_SPEED;
            vz = (vz / speed) * MAX_SPEED;
        }

        velocities[idx] = vx;
        velocities[idx + 1] = vy;
        velocities[idx + 2] = vz;

        positions[idx] += vx;
        positions[idx + 1] += vy;
        positions[idx + 2] += vz;
    }
}

export default function Boids() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const targetRef = useRef<THREE.Object3D>(new THREE.Object3D());

    const { positions, velocities, colors } = useMemo(() => {
        const positions = new Float32Array(BOID_COUNT * 3);
        const velocities = new Float32Array(BOID_COUNT * 3);
        const colors = new Float32Array(BOID_COUNT * 3);
        const color = new THREE.Color();

        for (let i = 0; i < BOID_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * BOUNDARY;
            positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDARY;
            positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDARY;

            velocities[i * 3] = (Math.random() - 0.5) * MAX_SPEED;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * MAX_SPEED;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * MAX_SPEED;

            // Premium aesthetic colors: neon green, cyan, and deep purple mixing
            const palette = Math.random();
            if (palette < 0.33) {
                color.set("#6ee7b7"); // Mint glow
            } else if (palette < 0.66) {
                color.set("#0ea5e9"); // Neon blue
            } else {
                color.set("#c084fc"); // Purple
            }
            color.toArray(colors, i * 3);
        }
        return { positions, velocities, colors };
    }, []);

    useFrame(() => {
        if (!meshRef.current) return;

        boidAlgorithm(positions, velocities, BOID_COUNT);

        for (let i = 0; i < BOID_COUNT; i++) {
            targetRef.current.position.set(
                positions[i * 3],
                positions[i * 3 + 1],
                positions[i * 3 + 2]
            );

            const vx = velocities[i * 3];
            const vy = velocities[i * 3 + 1];
            const vz = velocities[i * 3 + 2];

            // Orient towards velocity
            const lookAtTarget = targetRef.current.position.clone().add(new THREE.Vector3(vx, vy, vz));
            targetRef.current.lookAt(lookAtTarget);

            targetRef.current.updateMatrix();
            meshRef.current.setMatrixAt(i, targetRef.current.matrix);
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null as any, null as any, BOID_COUNT]}>
            <coneGeometry args={[0.2, 0.8, 4]}>
                <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
            </coneGeometry>
            {/* We use MeshStandardMaterial with high roughness and specific emissive colors for a premium glowing feel */}
            <meshStandardMaterial
                roughness={0.2}
                metalness={0.8}
                emissive="#1a1a1a"
                emissiveIntensity={0.2}
                vertexColors
            />
        </instancedMesh>
    );
}
