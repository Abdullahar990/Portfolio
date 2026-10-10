import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

export default function AboutSection() {
  return (
    <section id="about" className="section shell">
      <SectionHeading number="02" label="A little about me" title="A builder, by nature." />
      <div className="about-layout">
        <figure className="portrait">
          <Image
            src="/abdullah-profile.webp"
            alt="Muhammad Abdullah"
            fill
            sizes="(max-width: 600px) 100vw, 400px"
            className="portrait-image"
            quality={90}
          />
          <figcaption>
            Muhammad Abdullah <span>Lahore, Pakistan</span>
          </figcaption>
        </figure>
        <div className="about-copy">
          <p className="about-lead">
            I like figuring out how things work.
            <br />
            Then making them work better.
          </p>
          <p>
            I’m a Computer Science graduate from FAST-NUCES, Lahore, with a focus on applied deep
            learning and full-stack development. I’m most interested in the space between a working
            model and a product that someone can actually rely on.
          </p>
          <p>
            At Seamry Solutions, I build AI-powered features across model pipelines, backend
            services and user interfaces. Earlier internships gave me hands-on experience with
            computer vision, NLP and responsive web applications.
          </p>
          <p>
            My approach is straightforward: understand the problem, build the simplest useful
            solution, then make it reliable.
          </p>
          <dl className="about-details">
            <div>
              <dt>Education</dt>
              <dd>
                BS Computer Science
                <br />
                FAST-NUCES, 2022–2026
              </dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>
                Applied AI
                <br />
                Full-stack engineering
              </dd>
            </div>
          </dl>
          <a className="text-link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            The longer version, in my résumé <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
