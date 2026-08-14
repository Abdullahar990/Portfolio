'use client';

import React, { useState, useEffect } from 'react';

const navItems = [
  { name: 'Architecture', href: '#architecture' },
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-bg/95 backdrop-blur-md border-b border-surface-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <a
            href="#home"
            className="font-display font-bold text-ink hover:text-signal transition-colors duration-200 text-lg tracking-tight"
          >
            MA<span className="text-signal">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs font-mono text-ink-dim hover:text-signal transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-ink-dim hover:text-ink transition-colors duration-200"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`block w-full h-px bg-current transition-all duration-200 origin-center ${
                  isOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block w-full h-px bg-current transition-all duration-200 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-full h-px bg-current transition-all duration-200 origin-center ${
                  isOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-surface border-t border-surface-border px-6 py-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={handleNavClick}
              className="block py-2.5 text-sm font-mono text-ink-dim hover:text-signal border-b border-surface-border/40 last:border-none"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;