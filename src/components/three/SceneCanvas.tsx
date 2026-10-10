'use client';

import { Canvas } from '@react-three/fiber';
import { Component, type ReactNode, Suspense } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

class CanvasBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Import through next/dynamic with ssr:false; give the parent an explicit height. */
export default function SceneCanvas({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', true);
  const mobile = useMediaQuery('(max-width: 767px)', true);
  if (reducedMotion) return fallback;
  return (
    <CanvasBoundary fallback={fallback}>
      <Canvas
        dpr={mobile ? 1 : [1, 1.5]}
        frameloop="demand"
        gl={{ antialias: !mobile, powerPreference: 'low-power' }}
        fallback={fallback}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </CanvasBoundary>
  );
}
