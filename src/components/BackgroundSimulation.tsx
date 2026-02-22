import { Canvas } from '@react-three/fiber';
import GameOfLife from './GameOfLife';

interface BackgroundSimulationProps {
    isPaused: boolean;
}

export default function BackgroundSimulation({ isPaused }: BackgroundSimulationProps) {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'var(--background)' }}>
            <Canvas
                orthographic
                camera={{ position: [50, 50, 50], zoom: 35, near: -100, far: 500 }}
            >
                <color attach="background" args={['transparent']} />

                {/* Lighting tailored for clear isometric blocks */}
                <ambientLight intensity={0.9} />
                <directionalLight position={[10, 20, 5]} intensity={1.5} color="#ffffff" />

                {/* Thin isometric grid on the floor matching the portfolio theme */}
                <gridHelper args={[200, 200, '#e8c78a', '#e8c78a']} position={[0, -0.01, 0]} />

                <GameOfLife isPaused={isPaused} />
            </Canvas>
        </div>
    );
}
