import { useState } from 'react'
import Icon from '../components/Icon'
import { Reveal, SectionHeading, Badge } from '../components/UI'
import type { LabTab } from '../data/types'

const NODES: [number, number][][] = [
  [[60, 90], [60, 170], [60, 250], [60, 330]],
  [[190, 60], [190, 140], [190, 220], [190, 300], [190, 380]],
  [[320, 100], [320, 190], [320, 280], [320, 360]],
  [[450, 150], [450, 270]],
]

function NeuralHero() {
  const lines: JSX.Element[] = []
  NODES.slice(0, -1).forEach((layer, li) =>
    layer.forEach((a, ai) =>
      NODES[li + 1].forEach((b, bi) =>
        lines.push(
          <line
            key={`${li}-${ai}-${bi}`}
            x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]}
            className="nn-line"
            style={{ animationDelay: `${((ai * 3 + bi * 5 + li * 7) % 12) * 0.35}s` }}
          />,
        ),
      ),
    ),
  )
  return (
    <svg viewBox="0 0 520 440" className="hero-art" role="img" aria-label="Animated diagram of a neural network connecting layers of medical data to a final output">
      <defs>
        <radialGradient id="nodeGlow"><stop offset="0%" stopColor="#39D5FF" stopOpacity="0.9" /><stop offset="100%" stopColor="#39D5FF" stopOpacity="0" /></radialGradient>
      </defs>
      {lines}
      {NODES.flat().map((n, i) => (
        <g key={i}>
          <circle cx={n[0]} cy={n[1]} r="18" fill="url(#nodeGlow)" opacity="0.35" />
          <circle cx={n[0]} cy={n[1]} r="7" className="nn-node" style={{ animationDelay: `${(i % 7) * 0.4}s` }} />
        </g>
      ))}
      <text x="60" y="425" className="nn-label" textAnchor="middle">Data</text>
      <text x="255" y="425" className="nn-label" textAnchor="middle">Learned patterns</text>
      <text x="450" y="425" className="nn-label" textAnchor="middle">Output for review</text>
    </svg>
  )
}

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div>
          <Badge>Interactive educational experience</Badge>
          <h1 id="hero-title">Healthcare Is Evolving. Intelligence Is Leading the Way.</h1>
          <p className="hero-sub">
            Discover how artificial intelligence is helping researchers analyse medical images, accelerate drug discovery, personalise treatments, and transform patient care.
          </p>
          <div className="btn-row">
            <a className="btn primary" href="#lab">Explore the AI Lab <Icon name="arrow" size={18} /></a>
            <a className="btn secondary" href="#challenge">Take the AI Challenge</a>
          </div>
          <p className="hero-note"><Icon name="info" size={16} /> Educational demonstration. Not a medical device and not medical advice.</p>
        </div>
        <NeuralHero />
      </div>
    </section>
  )
}

type Area = { id: string; title: string; icon: string; text: string; action: string; tab?: LabTab; href?: string; motif: JSX.Element }

const AREAS: Area[] = [
  {
    id: 'imaging', title: 'Medical Imaging', icon: 'scan', tab: 'imaging', action: 'Open the imaging lab',
    text: 'Deep learning models can learn visual patterns in X-rays, CT, MRI and retinal photographs, helping reviewers prioritise images for a closer look.',
    motif: (<g><rect x="8" y="8" width="104" height="64" rx="8" className="m-stroke" /><circle cx="70" cy="40" r="14" className="m-hi" /><path d="M20 58c14-26 28-26 40 0" className="m-line" /></g>),
  },
  {
    id: 'diagnosis', title: 'AI-Assisted Diagnosis', icon: 'stethoscope', tab: 'diagnosis', action: 'Work through a case',
    text: 'Decision-support tools can surface patterns in clinical information. Clinicians still weigh context, missing data and the patient in front of them.',
    motif: (<g>{[16, 36, 56, 76, 96].map((x, i) => <rect key={x} x={x} y={64 - [20, 40, 28, 52, 34][i]} width="12" height={[20, 40, 28, 52, 34][i]} rx="3" className={i === 3 ? 'm-hi' : 'm-stroke'} />)}</g>),
  },
  {
    id: 'drug', title: 'Drug Discovery', icon: 'flask', tab: 'drug', action: 'Run the simulator',
    text: 'Computational tools can help researchers decide which candidate molecules deserve laboratory testing. Predictions still have to be verified experimentally.',
    motif: (<g><polygon points="40,14 62,26 62,50 40,62 18,50 18,26" className="m-stroke" /><polygon points="84,34 102,44 102,62 84,72 66,62 66,44" className="m-hi" /><path d="M62 38l4 2" className="m-line" /></g>),
  },
  {
    id: 'genetics', title: 'Genetics & Personalised Medicine', icon: 'dna', tab: 'genetics', action: 'Explore genetics',
    text: 'Researchers study how genetic variation relates to differences in how people respond to some medicines, while protecting privacy and fairness.',
    motif: (<g><path d="M30 8c0 24 60 24 60 32s-60 8-60 32" className="m-line" /><path d="M90 8c0 24-60 24-60 32s60 8 60 32" className="m-stroke" /></g>),
  },
  {
    id: 'care', title: 'Surgery & Patient Care', icon: 'pulse', tab: 'care', action: 'Tour the hospital',
    text: 'From surgical planning to patient monitoring, AI-assisted tools may support teams, with humans remaining responsible for care decisions.',
    motif: (<g><path d="M6 44h28l10-26 16 50 12-24h42" className="m-line" /></g>),
  },
  {
    id: 'ethics', title: 'Ethics & Responsible AI', icon: 'scale', href: '#ethics', action: 'Debate a scenario',
    text: 'Privacy, consent, bias, transparency and accountability decide whether healthcare AI earns trust. Reasonable people can weigh them differently.',
    motif: (<g><path d="M60 10v56M34 66h52M30 24h60" className="m-stroke" /><circle cx="36" cy="40" r="10" className="m-hi" /><circle cx="84" cy="40" r="10" className="m-stroke" /></g>),
  },
]

export function Explore({ openLab }: { openLab: (t: LabTab) => void }) {
  return (
    <section id="explore" className="section" aria-labelledby="explore-title">
      <div className="container">
        <SectionHeading eyebrow="Explore AI" title="Six areas where AI meets healthcare">
          Each card opens a hands-on module. Everything here is a simplified, synthetic teaching example.
        </SectionHeading>
        <h3 id="explore-title" className="sr-only">Healthcare AI areas</h3>
        <div className="grid-3">
          {AREAS.map((a) => (
            <Reveal key={a.id}>
              <article className="card area-card">
                <svg viewBox="0 0 120 80" className="motif" aria-hidden="true">{a.motif}</svg>
                <div className="card-title"><Icon name={a.icon} size={20} /><h3>{a.title}</h3></div>
                <p>{a.text}</p>
                {a.tab ? (
                  <button className="link-btn" onClick={() => openLab(a.tab as LabTab)}>{a.action} <Icon name="arrow" size={16} /></button>
                ) : (
                  <a className="link-btn" href={a.href}>{a.action} <Icon name="arrow" size={16} /></a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const STAGES = [
  { id: 'data', name: 'Data', icon: 'database', text: 'Healthcare AI starts with data: images, lab results, clinical notes, genetic sequences or sensor readings. Quality, privacy protection, consent and how well the data represents different people all shape what a model can safely do.' },
  { id: 'model', name: 'AI Model', icon: 'brain', text: 'A model is trained on examples to learn statistical relationships. It does not understand a patient the way a clinician does; it reflects the patterns (and gaps and biases) in its training data.' },
  { id: 'pattern', name: 'Pattern Recognition', icon: 'scan', text: 'Given new input, the model produces an output such as a flagged region, a risk score or a ranked list. This is a suggestion that can contain false positives and false negatives.' },
  { id: 'review', name: 'Human Review', icon: 'eye', text: 'Qualified professionals interpret the output alongside the patient\u2019s history, other tests and their own expertise. They can agree, question or set aside what the model suggests.', human: true },
  { id: 'decision', name: 'Clinical Decision', icon: 'stethoscope', text: 'The care decision is made by clinicians together with the patient, within professional standards and applicable rules. AI informs the decision; it does not replace clinical judgement or accountability.', human: true },
]

export function Pipeline() {
  const [i, setI] = useState(0)
  const s = STAGES[i]
  return (
    <section id="how" className="section alt" aria-labelledby="how-title">
      <div className="container">
        <SectionHeading eyebrow="How it works" title="From data to a decision made by people">
          Select each stage. The last two belong to humans.
        </SectionHeading>
        <h3 id="how-title" className="sr-only">Healthcare AI pipeline</h3>
        <ol className="pipeline" aria-label="Pipeline stages">
          {STAGES.map((st, idx) => (
            <li key={st.id}>
              <button
                className={`stage ${idx === i ? 'active' : ''} ${st.human ? 'human' : ''} ${idx < i ? 'done' : ''}`}
                aria-pressed={idx === i}
                onClick={() => setI(idx)}
              >
                <span className="stage-num">{idx + 1}</span>
                <Icon name={st.icon} size={22} />
                <span>{st.name}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="card stage-detail" aria-live="polite">
          <div className="card-title"><Icon name={s.icon} size={22} /><h3>{s.name}</h3>{s.human && <Badge tone="mint">Human-led</Badge>}</div>
          <p>{s.text}</p>
          <div className="btn-row">
            <button className="btn secondary small" disabled={i === 0} onClick={() => setI(i - 1)}>Previous</button>
            <button className="btn primary small" disabled={i === STAGES.length - 1} onClick={() => setI(i + 1)}>Next stage</button>
          </div>
        </div>
        <p className="callout"><Icon name="shield" size={18} /> Healthcare AI is designed to support qualified professionals, not to replace clinical judgement.</p>
      </div>
    </section>
  )
}

export function ClosingCta() {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta card">
          <h2 id="cta-title">Ready to test what you have learned?</h2>
          <p>Run the simulations, then see how well you can tell human work from AI-assisted work.</p>
          <div className="btn-row center">
            <a className="btn primary" href="#lab">Open the AI Lab</a>
            <a className="btn secondary" href="#challenge">Start the AI Challenge</a>
          </div>
        </div>
      </div>
    </section>
  )
}
