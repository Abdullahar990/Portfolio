'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Briefcase, Target, MapPin } from 'lucide-react';

const AboutSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-20 px-6 border-t border-surface-border">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <div className={`mb-8 ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}>
          <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-2">
            Background
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            About
          </h2>
        </div>

        <div
          className={`card-surface p-6 sm:p-8 space-y-4 text-ink-dim leading-relaxed text-base ${
            inView ? 'animate-fade-slide-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.1s' }}
        >
          <p>
            I am a Computer Science graduate from <span className="text-ink font-medium">FAST National University of Computer and Emerging Sciences (FAST-NUCES), Lahore</span> (2022–2026), focused on applied deep learning and modern web engineering.
          </p>

          <p>
            Currently, I work as a <span className="text-ink font-medium">Full Stack AI Developer at Seamry Solutions</span>, where I design and deploy intelligent features across both backend ML pipelines and user interfaces. Prior to this, I completed 3 industry internships delivering production computer vision models, NLP systems, and responsive web applications.
          </p>

          <p>
            I specialize in systems that bridge data inference with real-time operational response—evaluating sensor streams, anomaly detection, and low-latency edge deployment. I am looking for high-impact software and AI engineering roles building resilient, data-intensive products.
          </p>

          {/* Key Facts Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-surface-border mt-6">
            <div className="flex items-start gap-2">
              <GraduationCap className="w-4 h-4 text-signal mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-mono text-xs text-ink-dim block">Education</span>
                <span className="font-mono text-xs text-ink">FAST-NUCES &apos;26</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Briefcase className="w-4 h-4 text-signal mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-mono text-xs text-ink-dim block">Current Role</span>
                <span className="font-mono text-xs text-ink">Seamry Solutions</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 text-signal mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-mono text-xs text-ink-dim block">Focus</span>
                <span className="font-mono text-xs text-ink">AI/ML &amp; Systems</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-signal mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-mono text-xs text-ink-dim block">Location</span>
                <span className="font-mono text-xs text-ink">Lahore, PK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
