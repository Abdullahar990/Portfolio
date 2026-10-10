'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Check, Cpu, Layers, Radio, ScanLine } from 'lucide-react';
import type { PipelineProps } from '@/lib/types';

const symbols = [Radio, Layers, Cpu, Check];

/** A readable system diagram: all stages render before JavaScript runs. */
export default function ArchitectureFlow({ stages = [] }: PipelineProps) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const articles = root.current?.querySelectorAll('[data-flow-stage]');
    if (!articles) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(Number(visible[0].target.getAttribute('data-flow-stage')));
      },
      { rootMargin: '-20% 0px -45% 0px', threshold: 0 },
    );
    articles.forEach((article) => observer.observe(article));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={root} className="case-flow shell" aria-labelledby="flow-title">
      <div className="case-section-heading">
        <p className="eyebrow">02 / System architecture</p>
        <h2 id="flow-title">How it works.</h2>
        <p>One connected flow. Four deliberate steps.</p>
      </div>
      <div className="case-flow-layout">
        <figure className="case-flow-figure">
          <figcaption>
            <ScanLine size={16} aria-hidden="true" />
            <span>Architecture / logical flow</span>
          </figcaption>
          <div className="case-flow-nodes">
            {stages.map((stage, index) => {
              const Icon = symbols[index % symbols.length];
              return (
                <div className="case-flow-node-wrap" key={stage.step}>
                  <a
                    href={`#stage-${stage.step}`}
                    className="case-flow-node"
                    data-active={index === active}
                    aria-current={index === active ? 'step' : undefined}
                  >
                    <span className="case-flow-number">{stage.step}</span>
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    <span className="case-flow-node-copy">
                      <small>{stage.tag}</small>
                      <strong>{stage.title}</strong>
                    </span>
                  </a>
                  {index < stages.length - 1 && (
                    <span className="case-flow-connector" aria-hidden="true">
                      <ArrowDown size={14} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="case-figure-note">Select a step to read its implementation.</p>
        </figure>
        <div className="case-flow-story">
          {stages.map((stage, index) => (
            <article
              id={`stage-${stage.step}`}
              data-flow-stage={index}
              key={stage.step}
              className="case-flow-stage"
            >
              <span className="case-flow-stage-number">{stage.step}</span>
              <div>
                <p className="eyebrow">{stage.tag}</p>
                <h3>{stage.title}</h3>
                <p>{stage.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
