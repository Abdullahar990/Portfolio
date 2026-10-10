'use client';

import { Component, useRef, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Edges } from '@react-three/drei';
import type { Group } from 'three';

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Layers() {
  const group = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.06;
    group.current.rotation.y = -0.35 + Math.sin(clock.elapsedTime * 0.15) * 0.1;
  });
  return (
    <group ref={group} rotation={[0.1, -0.35, 0.08]}>
      {[-1.2, -0.6, 0, 0.6, 1.2].map((y, index) => (
        <group key={y} position={[0, y, 0]}>
          <mesh>
            <boxGeometry args={[2.65, 0.08, 1.9]} />
            <meshStandardMaterial
              color={index === 2 ? '#bfcb99' : '#83956b'}
              metalness={0.45}
              roughness={0.4}
              transparent
              opacity={index === 2 ? 0.9 : 0.65}
            />
            <Edges color="#c7d1a9" threshold={15} />
          </mesh>
          {[-0.9, 0, 0.9].map((x) => (
            <mesh key={x} position={[x, 0.07, 0]}>
              <boxGeometry args={[0.22, 0.02, 0.95]} />
              <meshStandardMaterial color="#cdd6b5" metalness={0.4} roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, 0.3, 0]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#d37b52" metalness={0.65} roughness={0.23} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 3.4, 8]} />
        <meshBasicMaterial color="#b4bea1" transparent opacity={0.5} />
      </mesh>
      {[-1.6, 1.6].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#d37b52" />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroSculpture({ active, mobile }: { active: boolean; mobile: boolean }) {
  return (
    <SceneBoundary>
      <Canvas
        dpr={mobile ? 1 : [1, 1.5]}
        frameloop={active ? 'always' : 'demand'}
        camera={{ position: [4, 3.2, 5.3], fov: 40 }}
        gl={{ antialias: !mobile, alpha: false, powerPreference: 'low-power' }}
        fallback={null}
        onCreated={({ gl }) => gl.setClearColor('#293227')}
      >
        <color attach="background" args={['#293227']} />
        <ambientLight intensity={1.8} />
        <directionalLight position={[3, 6, 4]} intensity={3} color="#eef1d9" />
        <directionalLight position={[-4, -1, 1]} intensity={1.3} color="#c47b52" />
        <Layers />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={0.4}
          maxPolarAngle={2.1}
        />
      </Canvas>
    </SceneBoundary>
  );
}
