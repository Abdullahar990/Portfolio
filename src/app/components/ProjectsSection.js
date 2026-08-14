'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

const secondaryProjects = [
  {
    title: 'Check INN, Chill Out',
    description:
      'MERN stack hotel management system with JWT authentication, role-based access control, reservation management, and admin dashboard.',
    tech: ['Next.js', 'MongoDB', 'Node.js', 'JWT'],
    github: 'https://github.com/Abdullahar990/check-inn-chill-out',
    year: '2024',
    icon: '🏨',
  },
  {
    title: 'Disease Prediction System',
    description:
      'Trained 4 ML classifiers (RF, SVM, KNN, LR) on 5,000+ medical records. Applied SMOTE for class balancing. Best model: 88% accuracy.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
    github: 'https://github.com/Abdullahar990/Disease-Prediction-App',
    year: '2023',
    icon: '🧬',
  },
  {
    title: 'Spare Parts Management',
    description:
      'PHP/MySQL inventory system for warehouse operations. Optimized SQL queries for fast lookups across 1,000+ part records.',
    tech: ['PHP', 'MySQL', 'JavaScript'],
    github: 'https://github.com/Abdullahar990/Spare-Parts-Management-System',
    year: '2023',
    icon: '⚙️',
  },
];

const GuardianSenseCard = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`card-3d ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}
    >
      <div className="card-3d-inner animated-border-square">
        <div className="bg-surface rounded-[15px] overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Side */}
            <div className="relative w-full lg:w-1/2 h-72 sm:h-80 lg:h-auto lg:min-h-[420px] overflow-hidden">
              <Image
                src="/GS.jpg"
                alt="GuardianSense — AI emergency response system"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                quality={80}
                priority
              />
              {/* Scanline effect over image */}
              <div className="scanline absolute inset-0" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-surface" />
              {/* Featured badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-signal/10 text-signal border border-signal/30 backdrop-blur-sm inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal animate-[statusDotPulse_2s_ease-in-out_infinite]" />
                  Featured
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 sm:p-10 lg:w-1/2 flex flex-col justify-center">
              <span className="font-mono text-xs text-ink-dim mb-3 block">2024</span>

              <h3 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-2">
                Guardian Sense
              </h3>
              <p className="text-signal text-sm font-medium mb-5">
                AI Emergency Response System
              </p>

              <p className="text-ink-dim leading-relaxed mb-8 text-sm sm:text-base">
                Hybrid BiLSTM Autoencoder + Isolation Forest model for
                fall/accident detection. Deployed via ONNX for on-device inference
                in Flutter. Three web portals (Hospital, Police, Admin) built in
                Next.js with a RESTful Node.js backend.
              </p>

              {/* Metrics — the star of this card */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '92%', label: 'Accuracy' },
                  { value: '50+', label: 'Users' },
                  { value: '800ms', label: 'Latency' },
                ].map((m) => (
                  <div key={m.label} className="text-center p-3 rounded-xl bg-bg border border-surface-border">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-signal text-glow mb-1">
                      {m.value}
                    </div>
                    <div className="font-mono text-xs text-ink-dim uppercase tracking-wider">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['Next.js', 'Node.js', 'Flutter', 'MongoDB', 'TensorFlow', 'ONNX'].map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-2.5 py-1 rounded-lg bg-bg text-ink-dim border border-surface-border hover:border-signal/30 hover:text-signal transition-all duration-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="https://github.com/Abdullahar990/Disease-Prediction-App"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-signal hover:text-ink transition-colors duration-200 text-sm font-medium w-fit"
              >
                View on GitHub
                <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecondaryCard = ({ project, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`card-3d ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}
      style={{ animationDelay: `${(index + 1) * 0.12}s` }}
    >
      <div className="card-3d-inner gradient-border p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl">{project.icon}</span>
          <span className="font-mono text-xs text-ink-dim">{project.year}</span>
        </div>

        <h3 className="font-display text-lg font-semibold text-ink mb-3">
          {project.title}
        </h3>

        <p className="text-ink-dim text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-2 py-1 rounded-lg bg-bg text-ink-dim border border-surface-border hover:border-signal/30 hover:text-signal transition-all duration-200"
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-ink-dim hover:text-signal transition-colors duration-200 text-sm mt-auto"
        >
          GitHub
          <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="grid-bg absolute inset-0" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10" ref={ref}>
        <div className={`mb-14 ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}>
          <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-3">
            Portfolio
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
            Projects
          </h2>
        </div>
      </div>

      {/* GuardianSense — wider feature card */}
      <div className="max-w-5xl mx-auto mb-10 px-6 relative z-10">
        <GuardianSenseCard />
      </div>

      {/* Secondary projects */}
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {secondaryProjects.map((project, index) => (
            <SecondaryCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/Abdullahar990"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-ink-dim hover:text-signal transition-colors duration-200 text-sm font-medium"
          >
            View all projects on GitHub
            <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;