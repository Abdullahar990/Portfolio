'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';

const skillGroups = [
  {
    label: 'Modeling',
    description: 'Building and training models',
    icon: '🧠',
    skills: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy'],
    accent: 'signal',
  },
  {
    label: 'Shipping',
    description: 'Delivering products to users',
    icon: '🚀',
    skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'Flask', 'MongoDB', 'MySQL'],
    accent: 'blue',
  },
  {
    label: 'Systems',
    description: 'Infrastructure and tooling',
    icon: '⚡',
    skills: ['C++', 'C', 'SQL', 'Git', 'Docker', 'Linux', 'REST APIs'],
    accent: 'purple',
  },
];

const SkillGroup = ({ group, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`card-3d ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className="card-3d-inner gradient-border p-6 h-full">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">{group.icon}</span>
          <div>
            <h3 className="font-mono text-xs text-signal uppercase tracking-widest mb-0.5">
              {group.label}
            </h3>
            <p className="text-ink-dim text-sm">{group.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 stagger-children">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="font-mono text-xs px-3 py-1.5 rounded-lg bg-bg text-ink border border-surface-border hover:border-signal/40 hover:text-signal hover:bg-signal/5 hover:shadow-[0_0_15px_var(--signal-glow)] transition-all duration-300 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="glow-orb glow-orb-2" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10" ref={ref}>
        <div className={`mb-14 ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}>
          <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-3">
            Tech Stack
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
            Skills
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, index) => (
            <SkillGroup key={group.label} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;