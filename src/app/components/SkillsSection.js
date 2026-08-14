'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Cpu, Terminal, Layers, Sparkles } from 'lucide-react';

const skillGroups = [
  {
    id: 'modeling',
    label: 'Modeling & Inference',
    description: 'Deep learning pipelines, CV architectures & statistical analysis',
    icon: Cpu,
    skills: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Scikit-learn', 'Pandas', 'NumPy', 'ONNX'],
  },
  {
    id: 'shipping',
    label: 'Shipping & Web Engineering',
    description: 'Production full-stack web applications & backend APIs',
    icon: Layers,
    skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'Flask', 'MongoDB', 'MySQL', 'REST APIs', 'HTML5/CSS3'],
  },
  {
    id: 'systems',
    label: 'Systems & Tooling',
    description: 'Low-level programming, source control, containerization & OS',
    icon: Terminal,
    skills: ['C++', 'C', 'SQL', 'Git', 'GitHub', 'Docker (familiar)', 'Linux', 'OOP', 'SOLID Principles'],
  },
];

const SkillsSection = () => {
  const [activeCluster, setActiveCluster] = useState('all');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="skills" className="py-24 px-6 border-t border-surface-border">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className={`mb-10 ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-signal" />
            <span className="font-mono text-xs text-signal tracking-widest uppercase">
              Technical Capabilities
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
            Skills &amp; Engineering Stack
          </h2>
          <p className="text-ink-dim text-sm sm:text-base max-w-xl">
            Interactive cluster view of tools and frameworks across the modeling, shipping, and systems lifecycle.
          </p>
        </div>

        {/* Cluster Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
          <button
            onClick={() => setActiveCluster('all')}
            className={`font-mono text-xs px-3.5 py-1.5 rounded-lg transition-colors duration-200 ${
              activeCluster === 'all'
                ? 'bg-signal/20 text-signal border border-signal/40 font-semibold'
                : 'bg-surface text-ink-dim border border-surface-border hover:text-ink'
            }`}
          >
            All Disciplines
          </button>
          {skillGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveCluster(group.id)}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                activeCluster === group.id
                  ? 'bg-signal/20 text-signal border border-signal/40 font-semibold'
                  : 'bg-surface text-ink-dim border border-surface-border hover:text-ink'
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>

        {/* Skill Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, index) => {
            const isGroupActive = activeCluster === 'all' || activeCluster === group.id;
            const Icon = group.icon;

            return (
              <div
                key={group.id}
                className={`card-surface p-6 transition-all duration-300 ${
                  isGroupActive ? 'opacity-100' : 'opacity-35 grayscale'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <Icon className="w-4 h-4 text-signal" />
                  <h3 className="font-mono text-xs text-signal uppercase tracking-wider font-semibold">
                    {group.label}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-ink-dim leading-relaxed mb-5">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`font-mono text-xs px-2.5 py-1 rounded transition-colors duration-200 ${
                        isGroupActive
                          ? 'bg-bg text-ink border border-surface-border hover:border-signal/40 hover:text-signal'
                          : 'bg-bg text-ink-dim/60 border border-surface-border/50'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;