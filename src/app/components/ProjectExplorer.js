'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, ExternalLink, Layers, Sparkles } from 'lucide-react';
import { projectsData } from '../data/projects';
import PipelineSequence from './sequences/PipelineSequence';

const ProjectExplorer = () => {
  const [selectedSlug, setSelectedSlug] = useState('guardiansense');
  const tabsRef = useRef([]);
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const activeProject = projectsData.find((p) => p.slug === selectedSlug) || projectsData[0];

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      const next = (index + 1) % projectsData.length;
      setSelectedSlug(projectsData[next].slug);
      tabsRef.current[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      const prev = (index - 1 + projectsData.length) % projectsData.length;
      setSelectedSlug(projectsData[prev].slug);
      tabsRef.current[prev]?.focus();
    }
  };

  return (
    <section id="architecture" className="py-24 px-6 border-t border-surface-border">
      <div className="max-w-4xl mx-auto" ref={sectionRef}>
        {/* Section Header */}
        <div className={`mb-10 ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-signal" />
            <span className="font-mono text-xs text-signal tracking-widest uppercase">
              System Exploration
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
            Interactive Architecture Explorer
          </h2>
          <p className="text-ink-dim text-sm sm:text-base max-w-xl">
            Select any system below to deconstruct its internal pipeline layers, algorithmic workflows, and operational state transitions.
          </p>
        </div>

        {/* Tab Bar with ARIA Accessibility */}
        <div
          role="tablist"
          aria-label="Project architecture pipelines"
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-surface-border"
        >
          {projectsData.map((project, idx) => {
            const isSelected = project.slug === selectedSlug;
            return (
              <button
                key={project.slug}
                ref={(el) => (tabsRef.current[idx] = el)}
                role="tab"
                id={`tab-${project.slug}`}
                aria-controls={`panel-${project.slug}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedSlug(project.slug)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`font-mono text-xs px-3.5 py-2 rounded-lg transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-surface text-signal border border-signal/40 shadow-sm font-semibold'
                    : 'text-ink-dim hover:text-ink hover:bg-surface/50 border border-transparent'
                }`}
              >
                <span>{project.title}</span>
                {project.featured && (
                  <span className="w-1.5 h-1.5 rounded-full bg-signal inline-block" />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive 3D Pipeline Display */}
        <div
          id={`panel-${activeProject.slug}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeProject.slug}`}
          className="space-y-6"
        >
          <div className="transition-opacity duration-300">
            <PipelineSequence
              key={activeProject.slug}
              projectSlug={activeProject.slug}
              stages={activeProject.stages}
              mode="click"
              title={activeProject.title}
              subtitle={activeProject.subtitle}
            />
          </div>

          {/* Quick Context & Deep-Dive Link Bar */}
          <div className="card-surface p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-signal font-semibold">
                  {activeProject.category}
                </span>
                <span className="text-ink-dim text-xs">&bull;</span>
                <span className="font-mono text-xs text-ink-dim">{activeProject.year}</span>
              </div>
              <p className="text-sm text-ink-dim max-w-xl">
                {activeProject.summary}
              </p>
            </div>

            <Link
              href={`/projects/${activeProject.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-signal/10 text-signal border border-signal/30 hover:bg-signal/20 hover:border-signal/50 transition-colors duration-200 text-sm font-medium whitespace-nowrap"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectExplorer;
