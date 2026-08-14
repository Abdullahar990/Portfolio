'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Mail, Github, Linkedin, MapPin, ArrowRight } from 'lucide-react';

const contactLinks = [
  {
    label: 'Email',
    value: 'abdullahar990@gmail.com',
    href: 'mailto:abdullahar990@gmail.com',
    icon: Mail,
    external: false,
  },
  {
    label: 'GitHub',
    value: 'github.com/Abdullahar990',
    href: 'https://github.com/Abdullahar990',
    icon: Github,
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/muhammadabdullah-cs',
    href: 'https://linkedin.com/in/muhammadabdullah-cs',
    icon: Linkedin,
    external: true,
  },
  {
    label: 'Location',
    value: 'Lahore, Pakistan',
    href: null,
    icon: MapPin,
    external: false,
  },
];

const ContactSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="py-24 px-6 border-t border-surface-border">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <div className={`mb-10 ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}>
          <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-2">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
            Contact
          </h2>
          <p className="text-ink-dim text-sm sm:text-base max-w-lg">
            Available for full-time software engineering and AI/ML roles as well as select contract collaborations.
          </p>
        </div>

        <div
          className={`card-surface p-6 sm:p-8 ${
            inView ? 'animate-fade-slide-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="grid sm:grid-cols-2 gap-6">
            {contactLinks.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-signal" />
                    <span className="font-mono text-xs text-ink-dim uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="text-sm sm:text-base text-ink hover:text-signal transition-colors duration-200 break-all font-mono"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm sm:text-base text-ink font-mono">{item.value}</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-xs text-ink-dim font-mono">
              Fastest response via email.
            </span>
            <a
              href="mailto:abdullahar990@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-hover border border-signal/40 text-signal hover:border-signal text-sm font-medium transition-colors duration-200"
            >
              <span>Send an Email</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;