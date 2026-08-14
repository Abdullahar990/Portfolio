'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    number: '01',
    title: 'Full Stack AI Developer',
    company: 'Seamry Solutions',
    period: 'Jun 2026 – Present',
    current: true,
    bullets: [
      'Develop and integrate AI/ML-powered features into full-stack web applications, connecting backend model endpoints with intuitive user interfaces.',
      'Build and maintain production-grade systems spanning frontend, backend, and machine learning components within an end-to-end development workflow.',
    ],
    tech: ['Python', 'React', 'Next.js', 'Node.js', 'TensorFlow', 'REST APIs'],
  },
  {
    number: '02',
    title: 'Computer Vision & Deep Learning Intern',
    company: 'ML-Bench',
    period: 'Jun 2025 – Aug 2025',
    current: false,
    bullets: [
      'Engineered deep learning pipelines for image analysis using CNNs, OpenCV, and TensorFlow across 10,000+ images.',
      'Improved model accuracy by 15% and reduced inference latency by 20% through hyperparameter tuning and architecture optimization.',
      'Collaborated with 5+ engineers to integrate and deploy ML models into production systems.',
    ],
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Scikit-learn'],
  },
  {
    number: '03',
    title: 'AI Intern',
    company: 'Datics AI',
    period: 'Jul 2024 – Sep 2024',
    current: false,
    bullets: [
      'Designed ML models for NLP applications using Python, Pandas, and Scikit-learn, achieving 85%+ classification accuracy.',
      'Built chatbot prototypes handling 500+ daily queries with automated response generation, reducing manual support load.',
    ],
    tech: ['Python', 'Pandas', 'Scikit-learn', 'NLP', 'Data Pipelines'],
  },
  {
    number: '04',
    title: 'Web Developer Intern',
    company: 'Code Alpha',
    period: 'Jun 2024 – Jul 2024',
    current: false,
    bullets: [
      'Delivered 3 responsive web interfaces in React, HTML5, and CSS3 serving 200+ users, cutting page load time by 30%.',
      'Implemented accessible, WCAG-compliant UI/UX designs following Agile sprint workflows.',
    ],
    tech: ['React', 'HTML5', 'CSS3', 'JavaScript'],
  },
];

const WorkEntry = ({ entry, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`relative pl-14 sm:pl-20 pb-12 last:pb-0 ${
        inView ? 'animate-fade-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Number marker */}
      <div
        className={`absolute left-0 top-0 w-10 h-10 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center font-mono text-xs sm:text-sm font-medium z-10 ${
          entry.current
            ? 'bg-signal/10 text-signal border border-signal/40'
            : 'bg-surface text-ink-dim border border-surface-border'
        }`}
      >
        {entry.number}
      </div>

      {/* Card */}
      <div
        className={`card-surface p-6 ${
          entry.current ? 'border-l-2 border-l-signal' : ''
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
          <h3 className="text-lg font-display font-semibold text-ink">
            {entry.title}
          </h3>
          <span className="font-mono text-xs text-ink-dim whitespace-nowrap">
            {entry.period}
          </span>
        </div>

        <p className="text-signal font-medium text-sm mb-4">{entry.company}</p>

        <ul className="space-y-2 mb-5">
          {entry.bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-ink-dim text-sm leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-signal/60 before:text-xs"
            >
              {bullet}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {entry.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-2.5 py-1 rounded bg-bg text-ink-dim border border-surface-border"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const WorkSection = () => {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const timelineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const visible = windowHeight - rect.top;
      const progress = Math.min(Math.max(visible / (totalHeight + windowHeight * 0.5), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="work" className="py-24 px-6 border-t border-surface-border">
      <div className="max-w-3xl mx-auto" ref={sectionRef}>
        <div className={`mb-12 ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-signal" />
            <span className="font-mono text-xs text-signal tracking-widest uppercase">
              Career Trajectory
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Work Experience
          </h2>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Base Background Track Line */}
          <div className="absolute left-5 sm:left-7 top-6 bottom-6 w-px bg-surface-border" />

          {/* Active Scroll Progress Fill Line */}
          <div
            className="absolute left-5 sm:left-7 top-6 w-px bg-signal transition-all duration-150 ease-out"
            style={{ height: `calc(${scrollProgress * 100}% - 24px)` }}
          />

          {experiences.map((entry, index) => (
            <WorkEntry key={entry.number} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
