import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="not-found shell">
      <Link className="case-wordmark" href="/" aria-label="ma. — Muhammad Abdullah home">
        ma<span>.</span>
      </Link>
      <p className="eyebrow">404 / Page not found</p>
      <h1>This page took a different path.</h1>
      <p>
        The project or page you’re looking for isn’t here. You can find all my work on the homepage.
      </p>
      <div>
        <Link className="button button-dark" href="/">
          <ArrowLeft size={16} aria-hidden="true" /> Back to my portfolio
        </Link>
        <a className="text-link" href="mailto:abdullahar990@gmail.com">
          Get in touch <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </main>
  );
}
