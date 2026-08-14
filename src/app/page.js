'use client';

import React from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ArchitectureSequence from './components/ArchitectureSequence';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import ProjectsSection from './components/ProjectsSection';
import CertificationsSection from './components/CertificationsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navigation />
      <main>
        <HeroSection />
        <ArchitectureSequence />
        <AboutSection />
        <WorkSection />
        <ProjectsSection />
        <CertificationsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;