'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';

// Lazy load components with loading states
const AboutSection = dynamic(() => import('./components/AboutSection'), {
  loading: () => <div className="h-32 animate-pulse bg-white/5 rounded-xl mx-6" />
});

const SkillsSection = dynamic(() => import('./components/SkillsSection'), {
  loading: () => <div className="h-40 animate-pulse bg-white/5 rounded-xl mx-6" />
});

const ExperienceSection = dynamic(() => import('./components/ExperienceSection'), {
  loading: () => <div className="h-48 animate-pulse bg-white/5 rounded-xl mx-6" />
});

const ProjectsSection = dynamic(() => import('./components/ProjectsSection'), {
  loading: () => <div className="h-64 animate-pulse bg-white/5 rounded-xl mx-6" />
});

const CertificationsSection = dynamic(() => import('./components/CertificationsSection'), {
  loading: () => <div className="h-48 animate-pulse bg-white/5 rounded-xl mx-6" />
});

const ContactSection = dynamic(() => import('./components/ContactSection'), {
  loading: () => <div className="h-32 animate-pulse bg-white/5 rounded-xl mx-6" />
});

const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => <div className="h-16 animate-pulse bg-white/5" />
});

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Throttled mouse move handler for better performance
  const throttledMouseMove = useCallback((e) => {
    // Use throttling instead of requestAnimationFrame for mouse tracking
    const now = Date.now();
    if (now - (throttledMouseMove.lastCall || 0) >= 16) { // ~60fps
      setMousePosition({ x: e.clientX, y: e.clientY });
      throttledMouseMove.lastCall = now;
    }
  }, []);

  useEffect(() => {
    // Faster initial load
    setIsLoaded(true);

    // Add passive listener for better performance
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
    };
  }, [throttledMouseMove]);

  // Memoize background styles to prevent unnecessary recalculations
  const backgroundStyles = useMemo(() => ({
    left: mousePosition.x - 192,
    top: mousePosition.y - 192,
  }), [mousePosition.x, mousePosition.y]);

  return (
    <>
      <Head>
        <title>Muhammad Abdullah | Portfolio</title>
        <meta name="description" content="AI/ML Engineer & Full Stack Developer specializing in Computer Vision, Deep Learning, and Next.js applications." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical images */}
        <link rel="preload" href="/profile_pic.jpeg" as="image" />
        <link rel="preload" href="/DPA.jpg" as="image" />
        <link rel="preload" href="/Traffic.jpg" as="image" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        {/* Optimized Background - reduced complexity */}
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl transition-all duration-500 ease-out will-change-transform"
            style={backgroundStyles}
          />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
        </div>

        <Navigation />
        <HeroSection isLoaded={isLoaded} />
        <AboutSection />
        <SkillsSection isLoaded={isLoaded} />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default Portfolio;