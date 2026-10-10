import SectionHeading from '@/components/ui/SectionHeading';

const groups = [
  {
    number: '01',
    name: 'Applied intelligence',
    description: 'From raw data to a model that works outside a notebook.',
    skills: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Scikit-learn', 'Pandas', 'NumPy', 'ONNX'],
  },
  {
    number: '02',
    name: 'Product engineering',
    description: 'Interfaces, APIs and the systems that connect them.',
    skills: ['React', 'Next.js', 'Node.js', 'Express', 'Flask', 'MongoDB', 'MySQL', 'REST APIs'],
  },
  {
    number: '03',
    name: 'Engineering foundations',
    description: 'The tools and principles behind maintainable software.',
    skills: ['C++', 'C', 'SQL', 'Git', 'GitHub', 'Linux', 'OOP', 'SOLID', 'Docker (familiar)'],
  },
];
export default function SkillsSection() {
  return (
    <section id="skills" className="section shell">
      <SectionHeading
        number="04"
        label="Tools & capabilities"
        title="The right tool for the job."
      />
      <div className="skills-layout">
        {groups.map((group) => (
          <article key={group.number} className="skill-column">
            <span className="eyebrow skill-number">/{group.number}</span>
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <ul className="skill-list">
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
