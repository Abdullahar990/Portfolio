import React from 'react';

const Footer = () => {
  return (
    <footer className="relative py-10 px-6 border-t border-surface-border">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-ink text-lg">
            MA<span className="text-signal">.</span>
          </span>
          <span className="text-ink-dim text-sm">
            © 2026 Muhammad Abdullah
          </span>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="https://github.com/Abdullahar990"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-dim hover:text-signal transition-colors duration-200 text-sm font-medium"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/muhammadabdullah-cs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-dim hover:text-signal transition-colors duration-200 text-sm font-medium"
          >
            LinkedIn
          </a>
          <a
            href="mailto:abdullahar990@gmail.com"
            className="text-ink-dim hover:text-signal transition-colors duration-200 text-sm font-medium"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;