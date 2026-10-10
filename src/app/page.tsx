import Navigation from '@/components/ui/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import WorkSection from '@/components/sections/WorkSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/ui/Footer';
import JsonLd from '@/components/ui/JsonLd';
import { homeStructuredData } from '@/lib/site';

export default function Portfolio() {
  return (
    <>
      <JsonLd data={homeStructuredData()} />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <WorkSection />
        <SkillsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
