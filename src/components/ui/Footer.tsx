import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-layout">
        <span>© {new Date().getFullYear()} Muhammad Abdullah</span>
        <span className="footer-note">Built with care. In Lahore.</span>
        <a href="#home">
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
