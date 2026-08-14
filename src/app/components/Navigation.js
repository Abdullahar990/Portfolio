'use client';

import React, { useState, useEffect } from 'react';

const navItems = ['Work', 'Projects', 'Skills', 'Contact'];

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

  // Close menu on navigation
  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-surface-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo / Name */}
          <a
            href="#home"
            className="font-display font-bold text-ink hover:text-signal transition-colors duration-200 text-lg"
          >
            MA<span className="text-signal">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-ink-dim hover:text-signal transition-colors duration-200 font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-t border-surface-border">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={handleNavClick}
                className="block py-3 text-ink-dim hover:text-signal transition-colors duration-200 font-medium text-sm border-b border-surface-border/50 last:border-b-0"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;