'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Cpu, Terminal, Layers } from 'lucide-react';

const skillGroups = [
  {
    label: 'Modeling & Inference',
    description: 'Deep learning pipelines, CV architectures & statistical analysis',
    icon: Cpu,
    skills: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Scikit-learn', 'Pandas', 'NumPy', 'ONNX'],
  },
  {
    label: 'Shipping & Web Engineering',
    description: 'Production full-stack web applications & backend APIs',
    icon: Layers,
    skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'Flask', 'MongoDB', 'MySQL', 'REST APIs', 'HTML5/CSS3'],
  },
  {
    label: 'Systems, Tooling & Foundations',
    description: 'Low-level programming, source control, containerization & OS',
    icon: Terminal,
    skills: ['C++', 'C', 'SQL', 'Git', 'GitHub', 'Docker (familiar)', 'Linux', 'OOP', 'SOLID Principles'],
  },
];

const SkillGroupCard = ({ group, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const Icon = group.icon;

  return (
    <div
      ref={ref}
      className={`card-surface p-6 ${
        inView ? 'animate-fade-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <Icon className="w-4 h-4 text-signal" />
        <h3 className="font-mono text-xs text-signal uppercase tracking-wider">
          {group.label}
        </h3>
      </div>

      <p className="text-sm text-ink-dim leading-relaxed mb-5">
        {group.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="font-mono text-xs px-2.5 py-1 rounded bg-bg text-ink border border-surface-border"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="skills" className="py-24 px-6 border-t border-surface-border">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className={`mb-12 ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}>
          <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-2">
            Technical Stack
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
            Skills &amp; Capabilities
          </h2>
          <p className="text-ink-dim text-sm sm:text-base max-w-xl">
            Grouped by functional role across the engineering lifecycle from algorithmic modeling to reliable deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, index) => (
            <SkillGroupCard key={group.label} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;