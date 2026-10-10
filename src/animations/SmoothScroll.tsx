'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/** Opt-in per route. Never combine with ScrollTrigger.normalizeScroll(). */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', true);
  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ smoothWheel: true, syncTouch: false, anchors: true });
    const tick = (seconds: number) => lenis.raf(seconds * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
    };
  }, [reducedMotion]);
  return children;
}
