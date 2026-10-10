'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const HeroSculpture = dynamic(() => import('@/scenes/HeroSculpture'), { ssr: false });

export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', true);
  const mobile = useMediaQuery('(max-width: 599px)', true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '100px',
    });
    observer.observe(element);
    const onVisibility = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="hero-visual"
      aria-label="An interactive layered sculpture representing data moving through an intelligent system"
    >
      <div className="visual-caption eyebrow">
        <span>Study 001 / Signal → System</span>
        <span>2026</span>
      </div>
      <div className="sculpture-fallback" aria-hidden="true">
        <div className="sculpture-stack">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      {!reducedMotion && !mobile && visible && (
        <div className="hero-canvas" aria-hidden="true">
          <HeroSculpture active={visible && pageVisible && !paused} mobile={mobile} />
        </div>
      )}
      {!reducedMotion && !mobile && visible && (
        <button
          className="visual-pause"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? 'Play sculpture animation' : 'Pause sculpture animation'}
          aria-pressed={paused}
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {paused ? 'Play' : 'Pause'}
        </button>
      )}
      <div className="visual-footer">
        <p>
          A little structure.
          <br />A lot of possibility.
        </p>
        <span className="eyebrow">
          {reducedMotion || mobile ? 'A study in layers' : 'Drag to explore'}
        </span>
      </div>
    </div>
  );
}
