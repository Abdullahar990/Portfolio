import { ArrowDown, ArrowUpRight } from 'lucide-react';
import HeroVisual from '@/components/three/HeroVisual';

export default function HeroSection() {
  return (
    <section id="home" className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow hero-role">
          <span className="status-dot" /> Full Stack AI Developer{' '}
          <span className="hero-location">Lahore, Pakistan</span>
        </p>
        <h1 aria-label="Muhammad Abdullah">
          Muhammad
          <br />
          Abdullah<span className="accent">.</span>
        </h1>
        <p className="hero-statement">
          Complex data.
          <br />
          <span>Useful, human products.</span>
        </p>
        <p className="hero-description">
          I work where machine learning meets software engineering. From on-device intelligence to
          the interfaces people use every day.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="button button-dark">
            Explore my work <ArrowDown size={17} aria-hidden="true" />
          </a>
          <a href="mailto:abdullahar990@gmail.com" className="text-link">
            Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
      <HeroVisual />
      <div className="hero-footnote">
        <span>
          Currently building at <strong>Seamry Solutions</strong>
        </span>
        <span className="eyebrow">
          01 — Scroll to discover <ArrowDown size={13} aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}
