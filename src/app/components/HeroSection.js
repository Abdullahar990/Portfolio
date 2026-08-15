'use client';

import React from 'react';
import Image from 'next/image';

const PulseLine = () => (
  <svg
    className="w-full h-12 overflow-visible"
    viewBox="0 0 1000 48"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <line x1="0" y1="24" x2="1000" y2="24" stroke="var(--surface-border)" strokeWidth="1" />
    <path
      d="M0,24 L250,24 L280,24 L310,6 L340,42 L370,10 L400,38 L430,18 L460,28 L490,22 L520,26 L550,24 L1000,24"
      fill="none"
      stroke="url(#pulseGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-pulse-draw"
    />
    <defs>
      <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.1" />
        <stop offset="30%" stopColor="var(--signal)" stopOpacity="1" />
        <stop offset="70%" stopColor="var(--signal)" stopOpacity="1" />
        <stop offset="100%" stopColor="var(--signal)" stopOpacity="0.1" />
      </linearGradient>
    </defs>
  </svg>
);

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[90dvh] flex flex-col justify-center px-6 pt-24 pb-16"
    >
      {/* Background grid accent (static, subtle) */}
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Pulse Line */}
        <div className="mb-8">
          <PulseLine />
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full bg-signal animate-status-dot"
            />
            <span className="font-mono text-xs tracking-widest text-ink-dim uppercase">
              System: Active
            </span>
          </div>
          <span className="text-surface-border hidden sm:inline">—</span>
          <span
            className="font-mono text-xs tracking-wider uppercase px-2.5 py-0.5 rounded border border-alert/40 text-alert bg-alert/5 animate-fade-in"
            style={{ animationDelay: '1.2s' }}
          >
            ● Open to Work
          </span>
        </div>

        {/* Hero Grid */}
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-10">
          {/* Main Info */}
          <div className="flex-1">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-[1.08] tracking-tight mb-3">
              Muhammad Abdullah
            </h1>

            <p className="font-mono text-sm sm:text-base text-ink-dim mb-6">
              Full Stack AI Developer <span className="text-surface-border">—</span> Lahore, PK
            </p>

            <p className="text-base sm:text-lg text-ink-dim leading-relaxed max-w-xl mb-8">
              I build systems that turn raw sensor data into real-time decisions.
              Currently shipping AI features at Seamry Solutions; previously built
              an accident-detection system that runs inference on-device with{' '}
              <span className="font-mono text-signal font-medium">92%</span> detection accuracy.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-signal/40 text-signal hover:bg-surface-hover hover:border-signal transition-colors duration-200"
              >
                View Projects
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-surface-border text-ink-dim hover:text-ink hover:border-ink-dim/40 transition-colors duration-200"
              >
                Resume
                <span aria-hidden="true">↓</span>
              </a>
              <a
                href="https://github.com/Abdullahar990"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-ink-dim hover:text-signal transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/muhammadabdullah-cs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-ink-dim hover:text-signal transition-colors duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-surface-border overflow-hidden bg-surface flex-shrink-0">
            <Image
              src="/abdullah-profile.png"
              alt="Muhammad Abdullah"
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;