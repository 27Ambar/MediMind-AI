import { useState } from 'react'
import Icon from '../components/Icon'
import { Badge, Collapsible, Disclaimer } from '../components/UI'

// A fictional cohort of 12 participants. Carriers of the fictional variant are marked.
const COHORT = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, carrier: [1, 4, 7, 10].includes(i) }))

const CYP_STEPS = [
  { t: 'A medicine that must be activated', d: 'Clopidogrel is an antiplatelet medicine that is given in an inactive form (a prodrug). The body has to convert it into its active form before it can work.' },
  { t: 'An enzyme does the converting', d: 'An enzyme called CYP2C19 is involved in that activation. Enzymes are proteins built from instructions in genes, here the CYP2C19 gene.' },
  { t: 'Genetic variation can change enzyme activity', d: 'People can carry different versions (variants) of the CYP2C19 gene. Some variants reduce how well the enzyme works, which can change how much active medicine is formed.' },
  { t: 'Guidelines exist, but decisions stay clinical', d: 'Expert groups such as the Clinical Pharmacogenetics Implementation Consortium (CPIC) publish guidelines describing how clinicians may use genotype results. Real decisions depend on the patient, the reason for treatment and other factors, and are made by qualified healthcare professionals.' },
]

export default function Genetics() {
  const [view, setView] = useState<'one' | 'personal'>('one')
  const [cyp, setCyp] = useState(0)
  const carriers = COHORT.filter((p) => p.carrier)
  const others = COHORT.filter((p) => !p.carrier)

  const dot = (p: { id: number; carrier: boolean }) => (
    <li key={p.id} className={`person ${p.carrier ? 'carrier' : ''}`} aria-label={`Fictional participant ${p.id}${p.carrier ? ', carries the fictional variant' : ''}`}>
      {p.carrier ? '\u25C6' : '\u25CF'}
    </li>
  )

  return (
    <div className="lab-panel">
      <h3>Genetics and personalised medicine</h3>
      <div className="grid-2">
        <div className="card">
          <h4>What is genetic information?</h4>
          <p>DNA contains instructions, organised into genes, for building the molecules cells use. Small differences between people (variants) are normal and mostly have no health effect, but some influence traits, disease risk or how the body handles certain medicines.</p>
          <p>Genomic datasets are large, so researchers use statistics and machine learning to look for associations. An association is a clue for further study, not proof of cause.</p>
        </div>
        <div className="card">
          <h4>Pharmacogenomics</h4>
          <p>Pharmacogenomics studies how genetic variation relates to differences in response to medicines. <strong>Personalised medicine</strong> aims to use such information, together with clinical factors, to fit care to the individual. Only some gene–medicine pairs have strong evidence and guidelines.</p>
        </div>
      </div>

      <div className="card">
        <h4>Research approach: one-size-fits-all or personalised?</h4>
        <p>A fictional cohort of 12 participants, with illustrative groups only. <Badge tone="amber">No real data</Badge></p>
        <div className="chips" role="group" aria-label="Research approach">
          <button className={`chip ${view === 'one' ? 'active' : ''}`} aria-pressed={view === 'one'} onClick={() => setView('one')}>One-size-fits-all</button>
          <button className={`chip ${view === 'personal' ? 'active' : ''}`} aria-pressed={view === 'personal'} onClick={() => setView('personal')}>Personalised</button>
        </div>
        {view === 'one' ? (
          <div>
            <ul className="people" aria-label="All participants analysed together">{COHORT.map(dot)}</ul>
            <p>Everyone is analysed as one group. Differences between subgroups are averaged out, so a pattern that matters for some participants can be hidden.</p>
          </div>
        ) : (
          <div className="split-groups">
            <div>
              <p><strong>Group A:</strong> carries the fictional variant ({carriers.length})</p>
              <ul className="people" aria-label="Participants who carry the fictional variant">{carriers.map(dot)}</ul>
            </div>
            <div>
              <p><strong>Group B:</strong> does not ({others.length})</p>
              <ul className="people" aria-label="Participants without the variant">{others.map(dot)}</ul>
            </div>
            <p className="full">Researchers can ask whether response differs between groups and design studies to test it. This only works if the groups are well represented in the data; small or missing groups lead to unreliable conclusions.</p>
          </div>
        )}
        <p className="muted">{'\u25C6'} = carries the fictional variant, {'\u25CF'} = does not.</p>
      </div>

      <div className="card">
        <h4>Educational example: CYP2C19 and clopidogrel</h4>
        <div className="chips" role="group" aria-label="Example steps">
          {CYP_STEPS.map((s, i) => <button key={s.t} className={`chip ${cyp === i ? 'active' : ''}`} aria-pressed={cyp === i} onClick={() => setCyp(i)}>Step {i + 1}</button>)}
        </div>
        <div aria-live="polite"><strong>{CYP_STEPS[cyp].t}</strong><p>{CYP_STEPS[cyp].d}</p></div>
        <Disclaimer tone="warn">This example explains a concept. It is not medication guidance. Never change or stop a medicine based on a website; real medication decisions require a qualified healthcare professional.</Disclaimer>
      </div>

      <div className="learn">
        <Collapsible title="Genetic privacy, informed consent and responsible data sharing">
          <p>Genetic data can reveal information about relatives and cannot be changed like a password. Participants should understand what they agree to (informed consent), data should be protected and shared under clear rules, and uses beyond the original consent need careful governance.</p>
        </Collapsible>
        <Collapsible title="Why representative datasets matter">
          <p>Genomic research datasets have historically included some populations far more than others. Models and findings built on unbalanced data can be less reliable, or less useful, for under-represented groups, which can widen health inequalities.</p>
        </Collapsible>
      </div>
      <p className="callout"><Icon name="lock" size={18} /> MediMind AI never asks for genetic data and does not infer genetic traits or health risks about visitors.</p>
    </div>
  )
}
