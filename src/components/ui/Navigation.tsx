'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) menu.current?.querySelector<HTMLAnchorElement>('a')?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 800) setOpen(false);
    };
    const outside = (event: PointerEvent) => {
      if (
        !menu.current?.contains(event.target as Node) &&
        !toggle.current?.contains(event.target as Node)
      )
        setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', resize);
    document.addEventListener('pointerdown', outside);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', resize);
      document.removeEventListener('pointerdown', outside);
    };
  }, [open]);

  return (
    <header className="site-header">
      <nav className="shell nav-layout" aria-label="Main navigation">
        <a className="wordmark" href="#home" aria-label="ma. — Muhammad Abdullah, home">
          ma<span>.</span>
        </a>
        <span className="nav-role">
          Independent thinking.
          <br />
          Thoughtful engineering.
        </span>
        <div className="desktop-navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Résumé <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <button
          ref={toggle}
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls={open ? 'mobile-navigation' : undefined}
          aria-expanded={open}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
        <noscript>
          <style>
            {
              '.menu-toggle { display: none !important; } @media (max-width: 799px) { .site-header { position: static; } .nav-layout { height: auto; min-height: 72px; flex-wrap: wrap; padding-block: 16px; } .nav-layout noscript { display: contents; } .no-js-navigation { position: static; flex-basis: 100%; order: 3; } }'
            }
          </style>
          <div className="no-js-navigation">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <a href="/resume.pdf">Résumé</a>
          </div>
        </noscript>
        {open && (
          <div ref={menu} id="mobile-navigation" className="mobile-navigation">
            {links.map((link, index) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                <span className="eyebrow">0{index + 1}</span>
                {link.label}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Download résumé <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
