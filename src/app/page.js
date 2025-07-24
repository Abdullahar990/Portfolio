'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import useHasMounted from './hooks/useHasMounted'; 
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';

const AboutSection = dynamic(() => import('./components/AboutSection'));
const SkillsSection = dynamic(() => import('./components/SkillsSection'));
const ProjectsSection = dynamic(() => import('./components/ProjectsSection'));
const ContactSection = dynamic(() => import('./components/ContactSection'));
const Footer = dynamic(() => import('./components/Footer'));

const Portfolio = () => {
  const hasMounted = useHasMounted();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);

    let animationFrameId;
    const handleMouseMove = (e) => {
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!hasMounted) {
    return null; // Or a static loading screen if you want
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <Head>
        <title>Muhammad Abdullah | Portfolio</title>
        <meta name="description" content="Showcasing my projects, skills, and contact information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <div
          className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <Navigation />
      <HeroSection isLoaded={isLoaded} />
      <AboutSection />
      <SkillsSection isLoaded={isLoaded} />
      <ProjectsSection />
      <ContactSection />
      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
