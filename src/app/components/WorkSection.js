'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    number: '01',
    title: 'Full Stack AI Developer',
    company: 'Seamry Solutions',
    period: 'Jun 2026 – Present',
    current: true,
    bullets: [
      'Develop and integrate AI/ML-powered features into full-stack web applications.',
      'Build and maintain production-grade systems spanning frontend, backend, and ML components.',
    ],
    tech: ['Python', 'React', 'Next.js', 'Node.js', 'TensorFlow'],
  },
  {
    number: '02',
    title: 'Computer Vision & Deep Learning Intern',
    company: 'ML-Bench',
    period: 'Jun 2025 – Aug 2025',
    current: false,
    bullets: [
      'Engineered DL pipelines for image analysis using CNNs, OpenCV, TensorFlow across 10,000+ images.',
      'Improved model accuracy by 15%, reduced inference latency by 20% via hyperparameter tuning.',
    ],
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
  },
  {
    number: '03',
    title: 'AI Intern',
    company: 'Datics AI',
    period: 'Jul 2024 – Sep 2024',
    current: false,
    bullets: [
      'Designed NLP ML models using Python, Pandas, Scikit-learn achieving 85%+ accuracy.',
      'Built chatbot prototypes handling 500+ daily queries to automate client responses.',
    ],
    tech: ['Python', 'Pandas', 'Scikit-learn', 'NLP'],
  },
  {
    number: '04',
    title: 'Web Developer Intern',
    company: 'Code Alpha',
    period: 'Jun 2024 – Jul 2024',
    current: false,
    bullets: [
      'Delivered 3 responsive web interfaces in React, HTML5, CSS3 serving 200+ users.',
      'Implemented WCAG-compliant accessible UI/UX patterns.',
    ],
    tech: ['React', 'HTML5', 'CSS3', 'JavaScript'],
  },
];

const WorkEntry = ({ entry, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`relative pl-20 sm:pl-24 pb-14 last:pb-0 ${
        inView ? 'animate-fade-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Timeline connector */}
      {index < experiences.length - 1 && (
        <div className="absolute left-[26px] sm:left-[30px] top-[56px] bottom-0 w-px bg-gradient-to-b from-surface-border to-transparent" />
      )}

      {/* Number marker */}
      <div
        className={`absolute left-0 top-0 w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-2xl flex items-center justify-center font-mono text-sm font-medium transition-all duration-300 ${
          entry.current
            ? 'bg-signal/10 text-signal border border-signal/30 shadow-[0_0_20px_var(--signal-glow)]'
            : 'bg-surface text-ink-dim border border-surface-border hover:border-signal/20'
        }`}
      >
        {entry.number}
      </div>

      {/* Card */}
      <div className="card-3d">
        <div
          className={`card-3d-inner gradient-border p-6 ${
            entry.current
              ? 'border-l-2 border-l-signal'
              : ''
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
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
                className="text-ink-dim text-sm leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-signal/50 before:text-xs"
              >
                {bullet}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {entry.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-2.5 py-1 rounded-lg bg-bg text-ink-dim border border-surface-border hover:border-signal/30 hover:text-signal transition-all duration-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="work" className="relative py-28 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="glow-orb glow-orb-3" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10" ref={ref}>
        <div className={`mb-14 ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}>
          <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-3">
            Experience
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
            Work
          </h2>
        </div>

        <div>
          {experiences.map((entry, index) => (
            <WorkEntry key={entry.number} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
