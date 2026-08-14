'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';

const secondaryProjects = [
  {
    title: 'Check INN, Chill Out',
    subtitle: 'Hotel Management System',
    description:
      'Full-stack hotel management platform featuring a complete booking engine, role-based access control (Admin/Guest), and JWT-secured API endpoints.',
    tech: ['Next.js', 'MongoDB', 'Node.js', 'Express.js', 'JWT', 'Bootstrap'],
    github: 'https://github.com/Abdullahar990/check-inn-chill-out',
    year: '2024',
  },
  {
    title: 'Disease Prediction System',
    subtitle: 'Machine Learning Diagnostics',
    description:
      'Trained and evaluated 4 classifiers (Random Forest, SVM, KNN, Logistic Regression) on 5,000+ patient records using SMOTE for class balancing; achieved 88% diagnostic accuracy.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Flask'],
    github: 'https://github.com/Abdullahar990/Disease-Prediction-App',
    year: '2023',
  },
  {
    title: 'Spare Parts Management',
    subtitle: 'Inventory Tracking & Logistics',
    description:
      'Web-based warehouse inventory system with real-time stock tracking and automated reorder alerts. Optimized indexed MySQL queries, reducing report generation latency by 40%.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'Bootstrap'],
    github: 'https://github.com/Abdullahar990/Spare-Parts-Management-System',
    year: '2023',
  },
];

const GuardianSenseCard = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`card-surface overflow-hidden ${
        inView ? 'animate-fade-slide-up' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image */}
        <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto lg:min-h-[380px] bg-bg">
          <Image
            src="/GS.jpg"
            alt="GuardianSense Interface"
            fill
            className="object-cover"
            quality={85}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-surface" />
          <div className="absolute top-4 left-4">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-bg/90 text-signal border border-signal/40 backdrop-blur-sm">
              Featured Case Study
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8 lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-xs text-signal">Safety-Critical AI</span>
              <span className="font-mono text-xs text-ink-dim">2024</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-2">
              Guardian Sense
            </h3>
            <p className="text-sm font-medium text-ink-dim mb-4">
              AI-Driven Emergency Accident Response System
            </p>

            <p className="text-sm text-ink-dim leading-relaxed mb-6">
              Architected a hybrid BiLSTM Autoencoder + Isolation Forest pipeline processing smartphone accelerometer and gyroscope streams. Achieved on-device emergency inference deployed via ONNX in Flutter, coupled with three dedicated Next.js portals (Hospital, Police, Admin) and a RESTful Node.js backend supporting 50+ concurrent users.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-lg bg-bg border border-surface-border text-center">
                <span className="font-mono text-lg font-bold text-signal block">92%</span>
                <span className="font-mono text-xs text-ink-dim">Accuracy</span>
              </div>
              <div className="p-3 rounded-lg bg-bg border border-surface-border text-center">
                <span className="font-mono text-lg font-bold text-signal block">50+</span>
                <span className="font-mono text-xs text-ink-dim">Active Users</span>
              </div>
              <div className="p-3 rounded-lg bg-bg border border-surface-border text-center">
                <span className="font-mono text-lg font-bold text-signal block">&lt;800ms</span>
                <span className="font-mono text-xs text-ink-dim">Latency</span>
              </div>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {['Next.js', 'Node.js', 'Flutter', 'MongoDB', 'TensorFlow', 'ONNX'].map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-2.5 py-1 rounded bg-bg text-ink-dim border border-surface-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <a
              href="https://github.com/Abdullahar990"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-signal hover:text-ink transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span>View Source on GitHub</span>
              <span aria-hidden="true">→</span>
            </a>
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
      className={`card-surface p-6 flex flex-col justify-between ${
        inView ? 'animate-fade-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${(index + 1) * 0.1}s` }}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs text-signal">{project.subtitle}</span>
          <span className="font-mono text-xs text-ink-dim">{project.year}</span>
        </div>

        <h3 className="font-display text-lg font-semibold text-ink mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-ink-dim leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-2 py-0.5 rounded bg-bg text-ink-dim border border-surface-border"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-dim hover:text-signal transition-colors duration-200 mt-auto"
      >
        <Github className="w-4 h-4" />
        <span>Repository</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};

const ProjectsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="py-24 px-6 border-t border-surface-border">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className={`mb-12 ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}>
          <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-2">
            Selected Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
            Featured Systems
          </h2>
          <p className="text-ink-dim text-sm sm:text-base max-w-xl">
            Real-world systems spanning on-device sensor intelligence, full-stack enterprise portals, and predictive data pipelines.
          </p>
        </div>

        {/* GuardianSense Feature */}
        <div className="mb-8">
          <GuardianSenseCard />
        </div>

        {/* Secondary Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {secondaryProjects.map((project, index) => (
            <SecondaryCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;