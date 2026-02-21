import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Change this variable to modify the speed of Conway's Game of Life (in seconds)
export const UPDATE_INTERVAL_S = 0.6;

const GRID_SIZE = 60;
const CELL_SIZE = 1.0;
const GAP = 0.0;
const TOTAL_SIZE = (CELL_SIZE + GAP) * GRID_SIZE;
const OFFSET = TOTAL_SIZE / 2;

// Seed Patterns
const PATTERNS: Record<string, number[][]> = {
    glider: [
        [0, 1], [1, 2], [-1, 0], [0, 0], [1, 0]
    ],
    lwss: [ // Lightweight spaceship
        [-2, -1], [-2, 1], [-1, -2], [0, -2], [1, -2], [2, -2], [2, -1], [2, 0], [1, 1]
    ],
    pulsar: [
        [-2, -4], [-3, -4], [-4, -4], [2, -4], [3, -4], [4, -4],
        [-2, 4], [-3, 4], [-4, 4], [2, 4], [3, 4], [4, 4],
        [-4, -2], [-4, -3], [-4, -4], [-4, 2], [-4, 3], [-4, 4],
        [4, -2], [4, -3], [4, -4], [4, 2], [4, 3], [4, 4],
        [-2, -2], [-3, -2], [-4, -2], [2, -2], [3, -2], [4, -2],
        [-2, 2], [-3, 2], [-4, 2], [2, 2], [3, 2], [4, 2],
        [-2, -4], [-2, -3], [-2, -2], [-2, 2], [-2, 3], [-2, 4],
        [2, -4], [2, -3], [2, -2], [2, 2], [2, 3], [2, 4]
    ]
};

function placePattern(grid: boolean[], startX: number, startY: number, patternName: keyof typeof PATTERNS) {
    const coords = PATTERNS[patternName];
    if (!coords) return;
    for (const [dx, dy] of coords) {
        const nx = (startX + dx + GRID_SIZE) % GRID_SIZE;
        const ny = (startY + dy + GRID_SIZE) % GRID_SIZE;
        const idx = getIndex(nx, ny);
        if (idx !== -1) grid[idx] = true;
    }
}

function getIndex(x: number, y: number) {
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return -1;
    return x * GRID_SIZE + y;
}

export default function GameOfLife() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const target = useMemo(() => new THREE.Object3D(), []);

    // State
    const gridRef = useRef<boolean[]>(new Array(GRID_SIZE * GRID_SIZE).fill(false));
    const nextGridRef = useRef<boolean[]>(new Array(GRID_SIZE * GRID_SIZE).fill(false));

    // Smooth transition states for scale
    const scalesRef = useRef<Float32Array>(new Float32Array(GRID_SIZE * GRID_SIZE).fill(0));

    // Colors
    const colors = useMemo(() => {
        const colorArray = new Float32Array(GRID_SIZE * GRID_SIZE * 3);
        const palette = [
            new THREE.Color("#d94676"), // Magenta
            new THREE.Color("#6d3580"), // Dark Purple
            new THREE.Color("#f58b44")  // Orange
        ];

        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            // Assign a random color from palette to each block
            const c = palette[Math.floor(Math.random() * palette.length)];
            c.toArray(colorArray, i * 3);
        }
        return colorArray;
    }, []);

    // Initialize grid with cool seeds instead of random noise
    useEffect(() => {
        // Clear grid first
        for (let i = 0; i < gridRef.current.length; i++) {
            gridRef.current[i] = false;
            scalesRef.current[i] = 0;
        }

        const grid = gridRef.current;
        const scales = scalesRef.current;

        // Place patterns - adjusted for 60x60 grid
        placePattern(grid, 12, 12, 'pulsar');
        placePattern(grid, 48, 48, 'pulsar');
        placePattern(grid, 12, 48, 'pulsar');
        placePattern(grid, 48, 12, 'pulsar');

        // Shoot some spaceships across the middle
        placePattern(grid, 6, 30, 'lwss');
        placePattern(grid, 15, 27, 'lwss');
        placePattern(grid, 24, 33, 'lwss');

        // Scatter some gliders
        for (let i = 0; i < 12; i++) {
            const rx = Math.floor(Math.random() * GRID_SIZE);
            const ry = Math.floor(Math.random() * GRID_SIZE);
            placePattern(grid, rx, ry, 'glider');
        }

        // Initialize scales
        for (let i = 0; i < grid.length; i++) {
            scales[i] = grid[i] ? 1 : 0;
        }
    }, []);

    const timeObj = useRef(0);
    const [isPointerDown, setIsPointerDown] = useState(false);

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        timeObj.current += delta;

        // Update game state
        if (timeObj.current > UPDATE_INTERVAL_S) {
            timeObj.current = 0;
            const grid = gridRef.current;
            const nextGrid = nextGridRef.current;

            for (let x = 0; x < GRID_SIZE; x++) {
                for (let y = 0; y < GRID_SIZE; y++) {
                    let neighbors = 0;
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            if (dx === 0 && dy === 0) continue;
                            const nx = (x + dx + GRID_SIZE) % GRID_SIZE; // Wrapping
                            const ny = (y + dy + GRID_SIZE) % GRID_SIZE; // Wrapping
                            if (grid[getIndex(nx, ny)]) neighbors++;
                        }
                    }

                    const idx = getIndex(x, y);
                    if (grid[idx]) {
                        nextGrid[idx] = neighbors === 2 || neighbors === 3;
                    } else {
                        nextGrid[idx] = neighbors === 3;
                    }
                }
            }

            // Swap grids
            for (let i = 0; i < grid.length; i++) {
                grid[i] = nextGrid[i];
            }
        }

        // Animate cubes
        const grid = gridRef.current;
        const scales = scalesRef.current;
        let instanceIdx = 0;

        for (let x = 0; x < GRID_SIZE; x++) {
            for (let y = 0; y < GRID_SIZE; y++) {
                const idx = getIndex(x, y);
                const targetScale = grid[idx] ? 1.0 : 0.0;

                // Snappy animation suited for cubes
                scales[idx] += (targetScale - scales[idx]) * delta * 20;

                const s = Math.max(0.0001, scales[idx]);

                target.position.set(
                    x * (CELL_SIZE + GAP) - OFFSET,
                    s / 2, // Grow upward from the floor
                    y * (CELL_SIZE + GAP) - OFFSET
                );

                target.scale.set(s, s, s);
                target.updateMatrix();
                meshRef.current.setMatrixAt(instanceIdx++, target.matrix);
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    const handlePointer = useCallback((e: any) => {
        const localPt = e.point.clone();
        const gridX = Math.floor((localPt.x + OFFSET) / (CELL_SIZE + GAP));
        const gridY = Math.floor((localPt.z + OFFSET) / (CELL_SIZE + GAP));

        if (gridX >= 0 && gridX < GRID_SIZE && gridY >= 0 && gridY < GRID_SIZE) {
            // Spawn an explicit glider exactly where clicked to guarantee movement and interaction
            placePattern(gridRef.current, gridX, gridY, 'glider');

            // Also explicitly turn on the exact clicked block for immediate feedback
            const centerIdx = getIndex(gridX, gridY);
            if (centerIdx !== -1) gridRef.current[centerIdx] = true;
        }
    }, []);

    return (
        <group>
            <instancedMesh ref={meshRef} args={[null as any, null as any, GRID_SIZE * GRID_SIZE]}>
                <boxGeometry args={[CELL_SIZE, CELL_SIZE, CELL_SIZE]}>
                    <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
                </boxGeometry>
                <meshLambertMaterial
                    vertexColors
                />
            </instancedMesh>

            <mesh
                visible={false}
                position={[0, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                onPointerDown={(e) => { setIsPointerDown(true); handlePointer(e); }}
                onPointerUp={() => setIsPointerDown(false)}
                onPointerLeave={() => setIsPointerDown(false)}
                onPointerMove={(e) => { if (isPointerDown) handlePointer(e); }}
            >
                <planeGeometry args={[TOTAL_SIZE * 2, TOTAL_SIZE * 2]} />
            </mesh>
        </group>
    );
}
