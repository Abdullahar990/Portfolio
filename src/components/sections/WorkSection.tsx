import { experiences } from '@/data/experiences';
import SectionHeading from '@/components/ui/SectionHeading';

export default function WorkSection() {
  return (
    <section id="work" className="section shell">
      <SectionHeading number="03" label="Experience" title="Learning by building.">
        <p>Different teams, different challenges. The same commitment to making the work useful.</p>
      </SectionHeading>
      <div className="experience-list">
        {experiences.map((entry) => (
          <article key={entry.number} className="experience-row">
            <div className="experience-meta">
              <p>{entry.period}</p>
              {entry.current && (
                <span className="current-label">
                  <span className="status-dot" /> Current role
                </span>
              )}
            </div>
            <div className="experience-title">
              <h3>{entry.title}</h3>
              <span>{entry.company}</span>
            </div>
            <div className="experience-description">
              <ul>
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="project-stack">{entry.tech.join(' · ')}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
