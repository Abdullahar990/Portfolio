'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

/* ── Animated Pulse Line SVG ── */
const PulseLine = () => (
  <svg
    className="w-full h-16 overflow-visible"
    viewBox="0 0 1000 64"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <line x1="0" y1="32" x2="1000" y2="32" stroke="var(--surface-border)" strokeWidth="0.5" />
    <path
      d="M0,32 L250,32 L280,32 L310,8 L340,56 L370,12 L400,48 L430,24 L460,36 L490,28 L520,34 L550,32 L1000,32"
      fill="none"
      stroke="url(#pulseGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-pulse-draw"
      style={{ filter: 'drop-shadow(0 0 8px var(--signal))' }}
    />
    <defs>
      <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="var(--gradient-3)" stopOpacity="0.4" />
        <stop offset="30%" stopColor="var(--signal)" stopOpacity="1" />
        <stop offset="70%" stopColor="var(--gradient-2)" stopOpacity="0.8" />
        <stop offset="100%" stopColor="var(--gradient-3)" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  </svg>
);

/* ── 3D Profile Picture ── */
const ProfilePicture = () => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    animFrameRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = ((e.clientX - centerX) / rect.width) * 15;
      const rotateX = -((e.clientY - centerY) / rect.height) * 15;
      setRotation({ x: rotateX, y: rotateY });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setRotation({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-36 h-36 sm:w-44 sm:h-44"
      style={{ perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow behind avatar */}
      <div
        className="absolute inset-0 rounded-full pulse-glow"
        style={{
          background: 'radial-gradient(circle, var(--signal-strong), transparent 70%)',
          filter: 'blur(20px)',
          transform: 'scale(1.3)',
        }}
      />

      {/* Animated gradient ring */}
      <div
        className="animated-border w-full h-full float"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="w-full h-full rounded-full bg-bg p-1">
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <Image
              src="/Abdullah_linkedIn pic.png"
              alt="Muhammad Abdullah — Full Stack AI Developer"
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>
        </div>
      </div>

      {/* Floating particles around avatar */}
      <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-signal/50 float" style={{ animationDelay: '-1s', animationDuration: '4s' }} />
      <div className="absolute -bottom-1 -left-3 w-2 h-2 rounded-full bg-gradient-2/40 float" style={{ animationDelay: '-3s', animationDuration: '5s' }} />
      <div className="absolute top-1/2 -right-4 w-1.5 h-1.5 rounded-full bg-gradient-3/40 float" style={{ animationDelay: '-2s', animationDuration: '3.5s' }} />
    </div>
  );
};

/* ── Hero Section ── */
const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-16 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="grid-bg absolute inset-0" />
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Pulse Line */}
        <div className="mb-10">
          <PulseLine />
        </div>

        {/* Status Bar */}
        <div className="flex items-center gap-3 mb-10 flex-wrap">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full bg-signal animate-status-dot"
              style={{ boxShadow: '0 0 10px var(--signal), 0 0 20px var(--signal-glow)' }}
            />
            <span className="font-mono text-xs tracking-widest text-ink-dim uppercase">
              System: Active
            </span>
          </div>
          <span className="text-surface-border hidden sm:inline">│</span>
          <span
            className="font-mono text-xs tracking-wider uppercase px-3 py-1 rounded-full border border-alert/30 text-alert bg-alert/5 animate-fade-in"
            style={{ animationDelay: '1.6s' }}
          >
            ● Open to Work
          </span>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16">
          {/* Text Block */}
          <div className="flex-1 stagger-children">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-ink leading-[1.05] tracking-tight mb-4">
              Muhammad{' '}
              <span className="text-shimmer">Abdullah</span>
            </h1>

            <p className="font-mono text-sm sm:text-base text-ink-dim mb-6">
              Full Stack AI Developer{' '}
              <span className="text-signal">⟐</span>{' '}
              Lahore, PK
            </p>

            <p className="text-base sm:text-lg text-ink-dim leading-relaxed max-w-xl mb-8">
              I build systems that turn raw sensor data into real-time decisions.
              Currently shipping AI features at Seamry Solutions; previously built
              an accident-detection system that runs inference on-device with{' '}
              <span className="font-mono text-signal font-medium text-glow">92%</span>{' '}
              detection accuracy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-signal/10 text-signal border border-signal/20 hover:bg-signal/20 hover:border-signal/40 hover:shadow-[0_0_30px_var(--signal-glow)] transition-all duration-300 font-medium text-sm"
              >
                View Projects
                <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface text-ink-dim border border-surface-border hover:text-ink hover:border-ink-dim/30 transition-all duration-300 font-medium text-sm"
              >
                Resume
                <span aria-hidden="true">↓</span>
              </a>
              <a
                href="https://github.com/Abdullahar990"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-ink-dim hover:text-signal transition-colors duration-200 text-sm font-medium"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/muhammadabdullah-cs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-ink-dim hover:text-signal transition-colors duration-200 text-sm font-medium"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="flex-shrink-0 self-center lg:self-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <ProfilePicture />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;