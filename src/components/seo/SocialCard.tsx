import type { Project } from '@/lib/types';
import { site } from '@/lib/site';

export default function SocialCard({ project }: { project?: Project }) {
  const title = project?.title ?? site.name;
  const category = project?.category ?? site.role;
  const technologies =
    project?.tech.slice(0, 4).join(' / ') ?? 'Machine learning / Web engineering';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#f3f2ed',
        color: '#242922',
        padding: '48px 54px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #d0d3c8',
          paddingBottom: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 42, fontWeight: 700 }}>
          ma<span style={{ color: '#a84429' }}>.</span>
        </div>
        <div style={{ fontSize: 17, letterSpacing: 2, textTransform: 'uppercase' }}>
          {project ? 'Selected work / Case study' : 'Developer portfolio / Lahore, Pakistan'}
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: 714 }}>
          <div
            style={{
              fontSize: 19,
              color: '#a84429',
              letterSpacing: 1.5,
              marginBottom: 22,
              textTransform: 'uppercase',
            }}
          >
            {category}
          </div>
          <div style={{ display: 'flex', fontSize: 74, fontWeight: 700, lineHeight: 1.04 }}>
            {title}
          </div>
          <div style={{ fontSize: 22, color: '#5c6356', marginTop: 26, lineHeight: 1.45 }}>
            {technologies}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 340,
            height: 320,
            background: '#293227',
            borderRadius: 4,
          }}
        >
          <svg width="290" height="286" viewBox="0 0 290 286">
            <path d="M145 31 250 91 145 151 40 91Z" fill="#576450" stroke="#c0c9b3" />
            <path d="M40 91 145 151 145 183 40 123Z" fill="#35412e" stroke="#85927a" />
            <path d="M145 151 250 91 250 123 145 183Z" fill="#425239" stroke="#85927a" />
            <path d="M145 112 250 172 145 232 40 172Z" fill="#48563f" stroke="#c0c9b3" />
            <path d="M40 172 145 232 145 257 40 197Z" fill="#35412e" stroke="#85927a" />
            <path d="M145 232 250 172 250 197 145 257Z" fill="#425239" stroke="#85927a" />
            <path d="M145 80 179 100 145 120 111 100Z" fill="#d79870" />
            <path d="M111 100 145 120 145 156 111 136Z" fill="#a84429" />
            <path d="M145 120 179 100 179 136 145 156Z" fill="#bc6845" />
            <path d="M145 156v43" stroke="#d79870" strokeWidth="3" />
            <path d="M91 187 121 204m47-9 34-20" stroke="#c0c9b3" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #d0d3c8',
          paddingTop: 20,
          fontSize: 18,
        }}
      >
        <span>{project ? site.name : 'Complex data. Useful, human products.'}</span>
        <span style={{ color: '#5c6356' }}>{project ? project.year : 'AI / Full stack'}</span>
      </div>
    </div>
  );
}
