'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, CheckCircle2, Award } from 'lucide-react';

const certifications = [
  {
    title: 'Neural Networks and Deep Learning',
    issuer: 'DeepLearning.AI',
    platform: 'Coursera',
    date: 'June 2025',
    credentialId: 'IPV24OTKOOJD',
    image: '/Deep_learning_AI.png',
    description:
      'Fundamentals of deep learning architectures, forward and backward propagation, vectorization, and neural network training in Python and TensorFlow.',
    skills: ['Neural Networks', 'Deep Learning', 'TensorFlow', 'Vectorization'],
    hours: '24 hours',
    grade: '98%',
    projects: '3 Projects',
    verifyLink: 'https://www.coursera.org/account/accomplishments/verify/IPV24OTKOOJD',
  },
  {
    title: 'Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization',
    issuer: 'DeepLearning.AI',
    platform: 'Coursera',
    date: 'June 2025',
    credentialId: 'YTQ2KN22J7EB',
    image: '/Deep_learning_AI.png',
    description:
      'Practical optimization techniques including L2 regularization, Dropout, Xavier initialization, Batch Normalization, and Adam/RMSprop optimizers.',
    skills: ['Hyperparameter Tuning', 'Regularization', 'Optimization', 'Dropout', 'Batch Norm'],
    hours: '23 hours',
    grade: '98%',
    projects: '3 Projects',
    verifyLink: 'https://www.coursera.org/account/accomplishments/verify/YTQ2KN22J7EB',
  },
  {
    title: 'Structuring Machine Learning Projects',
    issuer: 'DeepLearning.AI',
    platform: 'Coursera',
    date: 'July 2025',
    credentialId: 'BUXF8C3JNKTG',
    image: '/Deep_learning_AI.png',
    description:
      'Strategies for ML project execution: error analysis, orthogonalization, bias/variance management, transfer learning, and multi-task learning.',
    skills: ['ML Strategy', 'Error Analysis', 'Bias-Variance Tradeoff', 'ML System Design'],
    hours: '6 hours',
    grade: '96%',
    projects: '2 Projects',
    verifyLink: 'https://www.coursera.org/account/accomplishments/verify/BUXF8C3JNKTG',
  },
];

const CertCard = ({ cert, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`card-surface p-6 flex flex-col justify-between ${
        inView ? 'animate-fade-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-bg border border-surface-border p-1.5 flex items-center justify-center flex-shrink-0">
              <Image
                src={cert.image}
                alt={cert.issuer}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-mono text-xs text-signal block">{cert.issuer}</span>
              <span className="font-mono text-xs text-ink-dim">{cert.platform} • {cert.date}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 font-mono text-xs text-signal bg-signal/10 px-2 py-1 rounded border border-signal/30 flex-shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{cert.grade}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-ink mb-3 leading-snug">
          {cert.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-ink-dim leading-relaxed mb-4">
          {cert.description}
        </p>

        {/* Credential Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-ink-dim mb-4 pb-4 border-b border-surface-border">
          <span>{cert.hours}</span>
          <span>•</span>
          <span>{cert.projects}</span>
          <span>•</span>
          <span className="truncate">ID: <span className="text-ink">{cert.credentialId}</span></span>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {cert.skills.map((skill) => (
            <span
              key={skill}
              className="font-mono text-xs px-2 py-0.5 rounded bg-bg text-ink-dim border border-surface-border"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Verify Link */}
      <a
        href={cert.verifyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-bg border border-surface-border text-sm font-medium text-ink hover:text-signal hover:border-signal/40 transition-colors duration-200"
      >
        <span>Verify Credential</span>
        <ExternalLink className="w-4 h-4 text-signal" />
      </a>
    </div>
  );
};

const CertificationsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className={`mb-12 ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-signal" />
            <span className="font-mono text-xs text-signal tracking-widest uppercase">
              Verified Credentials
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
            Certifications
          </h2>
          <p className="text-ink-dim text-sm sm:text-base max-w-xl">
            Deep learning and ML systems specializations completed via DeepLearning.AI, focusing on production neural architectures and optimization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, index) => (
            <CertCard key={cert.credentialId} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
