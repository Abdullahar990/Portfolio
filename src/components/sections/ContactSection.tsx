import { ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="shell">
        <div className="contact-top">
          <p className="eyebrow">05 / What’s next?</p>
          <span className="availability">
            <span className="status-dot" /> Open to opportunities
          </span>
        </div>
        <h2>
          Good work starts
          <br />
          with a conversation<span>.</span>
        </h2>
        <div className="contact-bottom">
          <div>
            <p>Have a challenging problem or a role in mind?</p>
            <a className="contact-email" href="mailto:abdullahar990@gmail.com">
              abdullahar990@gmail.com <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="contact-socials">
            <a href="https://github.com/Abdullahar990" target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com/in/muhammadabdullah-cs"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
