'use client';

import React from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import WorkSection from './components/WorkSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-bg text-ink relative">
      {/* Subtle noise texture overlay for depth */}
      <div className="noise-overlay" aria-hidden="true" />
      
      <Navigation />
      <main>
        <HeroSection />
        <WorkSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;