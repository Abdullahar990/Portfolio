'use client';

import { Clone, useGLTF } from '@react-three/drei';

/** Mount inside SceneCanvas. Assets load on mount and share Drei's resource cache. */
export function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <Clone object={scene} />;
}
