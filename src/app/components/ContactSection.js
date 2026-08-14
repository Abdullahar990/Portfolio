'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';

const contactLinks = [
  {
    label: 'Email',
    value: 'abdullahar990@gmail.com',
    href: 'mailto:abdullahar990@gmail.com',
    icon: '✉️',
  },
  {
    label: 'GitHub',
    value: 'Abdullahar990',
    href: 'https://github.com/Abdullahar990',
    icon: '⚡',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'muhammadabdullah-cs',
    href: 'https://linkedin.com/in/muhammadabdullah-cs',
    icon: '🔗',
    external: true,
  },
  {
    label: 'Location',
    value: 'Lahore, PK',
    href: null,
    icon: '📍',
  },
];

const ContactSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="grid-bg absolute inset-0" />
        <div className="glow-orb glow-orb-1" style={{ opacity: 0.5 }} />
      </div>

      <div className="max-w-3xl mx-auto relative z-10" ref={ref}>
        <div className={`mb-10 ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}>
          <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-3">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight mb-4">
            Contact
          </h2>
          <p className="text-ink-dim leading-relaxed max-w-lg">
            Available for full-time roles and contract work.
            Fastest response via email.
          </p>
        </div>

        <div
          className={`card-3d ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.15s' }}
        >
          <div className="card-3d-inner gradient-border p-8 sm:p-10">
            <div className="grid sm:grid-cols-2 gap-8">
              {contactLinks.map((link, i) => (
                <div key={link.label} className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">{link.icon}</span>
                    <span className="font-mono text-xs text-ink-dim uppercase tracking-widest">
                      {link.label}
                    </span>
                  </div>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-signal hover:text-ink transition-colors duration-200 break-all text-sm sm:text-base group-hover:underline underline-offset-4 decoration-signal/30"
                    >
                      {link.value}
                    </a>
                  ) : (
                    <span className="text-ink text-sm sm:text-base">{link.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Big CTA */}
            <div className="mt-10 pt-8 border-t border-surface-border">
              <a
                href="mailto:abdullahar990@gmail.com"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-signal/10 text-signal border border-signal/20 hover:bg-signal/20 hover:border-signal/40 hover:shadow-[0_0_40px_var(--signal-glow)] transition-all duration-300 font-display font-semibold"
              >
                Start a Conversation
                <span className="group-hover:translate-x-1 transition-transform duration-200 text-lg" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;