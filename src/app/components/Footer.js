import React from 'react';

const Footer = () => {
  return (
    <footer className="py-10 px-6 border-t border-surface-border">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-ink text-sm tracking-tight">
            MA<span className="text-signal">.</span>
          </span>
          <span className="text-ink-dim text-xs font-mono">
            © 2026 Muhammad Abdullah. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <a
            href="https://github.com/Abdullahar990"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-dim hover:text-signal transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/muhammadabdullah-cs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-dim hover:text-signal transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="mailto:abdullahar990@gmail.com"
            className="text-ink-dim hover:text-signal transition-colors duration-200"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;