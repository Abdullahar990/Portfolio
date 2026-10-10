import { ArrowUpRight } from 'lucide-react';
import { certifications } from '@/data/certifications';

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="certifications-section shell"
      aria-labelledby="certifications-title"
    >
      <div className="certifications-heading">
        <p className="eyebrow">Continuing to learn</p>
        <h2 id="certifications-title">Beyond the day job.</h2>
        <p>
          DeepLearning.AI courses
          <br />
          through Coursera.
        </p>
      </div>
      <div className="certification-list">
        {certifications.map((cert) => (
          <a
            key={cert.credentialId}
            href={cert.verifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="certification-link"
          >
            <div>
              <h3>{cert.title}</h3>
              <span>
                {cert.issuer} · {cert.date}
              </span>
            </div>
            <span className="certification-grade">
              <span className="sr-only">Course grade: </span>
              {cert.grade}
            </span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
