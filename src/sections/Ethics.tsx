import { useState } from 'react'
import Icon from '../components/Icon'
import { Badge, Disclaimer, SectionHeading } from '../components/UI'

const TOPICS = [
  { t: 'Patient privacy', d: 'Health data is sensitive. Systems need security, limited access and clear rules about who can use data and why.' },
  { t: 'Informed consent', d: 'People should understand how their data or care involves AI and what they are agreeing to, including secondary uses of data.' },
  { t: 'Dataset bias', d: 'If training data under-represents some groups, a model can perform worse for them without anyone noticing unless it is tested.' },
  { t: 'Representation in genetic research', d: 'Genomic datasets have historically included some populations far more than others, which can limit who benefits from the findings.' },
  { t: 'Transparency and explainability', d: 'Clinicians and patients benefit from knowing what a tool is for, what data it learned from, and how reliable it is, even when the inner workings are complex.' },
  { t: 'Accountability for mistakes', d: 'Responsibility is shared among developers, institutions and professionals, and depends on the circumstances, applicable law, professional duties and policies.' },
  { t: 'Human oversight', d: 'Meaningful oversight needs time, training and authority to question the tool. Having a person \u201Cin the loop\u201D on paper is not enough.' },
  { t: 'Genetic discrimination', d: 'Genetic information could be misused, for example in insurance or employment. Many places have laws against some forms, and the rules differ by country.' },
  { t: 'Responsible biological data use', d: 'Sharing data speeds up research but needs governance: access agreements, security, and respect for the purposes people consented to.' },
]

type Option = { label: string; strengths: string; weaknesses: string; considerations: string }
type Scenario = { id: string; title: string; prompt: string; options: Option[]; takeaway: string }

const SCENARIOS: Scenario[] = [
  {
    id: 'bias', title: 'An under-represented population',
    prompt: 'An AI model was trained on data that poorly represents one population. Should a hospital use the model for all patients without further validation?',
    options: [
      { label: 'Yes, use it for everyone straight away', strengths: 'Fast, simple and gives every patient the same tool.', weaknesses: 'The model\u2019s performance for the under-represented group is unknown and could be worse. Errors might be missed for a long time.', considerations: 'Justice and fairness; patient safety; duty to test before relying on a tool.' },
      { label: 'Validate on local data, including subgroups, then monitor after launch', strengths: 'Provides evidence for the people it will actually serve, and finds problems early.', weaknesses: 'Takes time and resources, and local data for small groups may be limited.', considerations: 'Equity; continuous monitoring; transparency about results.' },
      { label: 'Use it only for the groups the data represents well', strengths: 'Avoids applying it where evidence is weakest.', weaknesses: 'Can leave some patients without a potentially useful tool, and splitting care by group needs careful justification.', considerations: 'Fair access versus protection from harm; how groups are defined.' },
      { label: 'Never use AI in this hospital', strengths: 'Removes the specific risk of this model.', weaknesses: 'Forgoes possible benefits and does not remove human-caused errors or biases.', considerations: 'Weighing benefits and risks, not only risks.' },
    ],
    takeaway: 'Evidence about performance should come from the population a tool will serve, and should keep being collected after deployment.',
  },
  {
    id: 'blame', title: 'Who is responsible when an AI-assisted decision contributes to an error?',
    prompt: 'A clinician followed an AI tool\u2019s suggestion, and the patient was harmed because the suggestion was wrong. Who is responsible?',
    options: [
      { label: 'The clinician alone', strengths: 'Clinicians hold professional duties and make the final decision.', weaknesses: 'Ignores tool design, hospital procurement and training, and may discourage honest reporting.', considerations: 'Professional standards; whether the clinician could reasonably have noticed the error.' },
      { label: 'The developer alone', strengths: 'Developers control the design, testing and documentation of the tool.', weaknesses: 'Ignores how the hospital deployed it and how it was used.', considerations: 'Product liability and regulatory duties differ across countries.' },
      { label: 'The hospital or health system alone', strengths: 'Institutions choose, configure, train staff on and monitor tools.', weaknesses: 'Overlooks individual professional duties and developer failures.', considerations: 'Governance, staffing and policies.' },
      { label: 'It depends: responsibility may be shared', strengths: 'Reflects that several parties influence outcomes.', weaknesses: 'Can feel vague. Without clear rules, nobody may feel accountable.', considerations: 'Law, contracts, professional rules and the specific facts decide, which is why clear policies in advance matter.' },
    ],
    takeaway: 'Accountability depends on the circumstances, applicable laws, professional duties and institutional policies. Clear responsibilities should be agreed before something goes wrong.',
  },
  {
    id: 'genome', title: 'Sharing genetic research data',
    prompt: 'A research group wants to share participants\u2019 genetic data with other researchers to speed up discoveries. What should it do?',
    options: [
      { label: 'Share freely with anyone who asks', strengths: 'Maximises scientific openness and speed.', weaknesses: 'Genetic data is hard to anonymise, can affect relatives, and may go beyond what participants agreed to.', considerations: 'Privacy; consent scope; security.' },
      { label: 'Share through controlled access, within what participants consented to', strengths: 'Balances research benefit with protection and respect for consent.', weaknesses: 'Slower and more administrative; it still carries some re-identification risk.', considerations: 'Data-access agreements; oversight committees; clear consent wording.' },
      { label: 'Do not share at all', strengths: 'Minimises privacy risk.', weaknesses: 'Limits research that could benefit many people and can reduce reproducibility.', considerations: 'Balancing individual protection and collective benefit.' },
      { label: 'Share with any company that pays', strengths: 'Brings in funding.', weaknesses: 'Raises concerns about commercial use that participants did not expect and about discrimination.', considerations: 'Consent for commercial use; benefit sharing; limits on misuse.' },
    ],
    takeaway: 'Responsible sharing combines secure, governed access with consent that matches how the data is actually used.',
  },
]

const PRINCIPLES = [
  { t: 'Protect human autonomy', d: 'People, not machines, stay in control of healthcare decisions, and patients give informed consent.' },
  { t: 'Promote well-being, safety and the public interest', d: 'Tools must be safe and effective for their intended use, with evidence and ongoing monitoring.' },
  { t: 'Ensure transparency and explainability', d: 'Be open about what a tool does, how it was built and what its limits are.' },
  { t: 'Foster responsibility and accountability', d: 'Clear human responsibility, and ways for people to challenge and seek redress for decisions.' },
  { t: 'Ensure inclusiveness and equity', d: 'Tools should work appropriately for diverse populations and not widen health gaps.' },
  { t: 'Promote responsive and sustainable AI', d: 'Assess tools continually in real use, and consider workforce and environmental impact.' },
]

function ScenarioCard({ s }: { s: Scenario }) {
  const [sel, setSel] = useState<number | null>(null)
  const o = sel === null ? null : s.options[sel]
  return (
    <div className="card scenario">
      <h4>{s.title}</h4>
      <p id={`sp-${s.id}`}>{s.prompt}</p>
      <div className="options" role="group" aria-labelledby={`sp-${s.id}`}>
        {s.options.map((op, i) => <button key={op.label} className={`option ${sel === i ? 'picked' : ''}`} aria-pressed={sel === i} onClick={() => setSel(i)}>{op.label}</button>)}
      </div>
      {o ? (
        <div className="feedback" role="status">
          <dl>
            <dt>Strengths</dt><dd>{o.strengths}</dd>
            <dt>Weaknesses</dt><dd>{o.weaknesses}</dd>
            <dt>Ethical considerations</dt><dd>{o.considerations}</dd>
          </dl>
          <p><strong>Practical takeaway:</strong> {s.takeaway}</p>
          <p className="muted">Reasonable people can weigh these considerations differently. Try the other options to compare.</p>
        </div>
      ) : (
        <p className="muted">Choose an option to see the analysis.</p>
      )}
    </div>
  )
}

export default function Ethics() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="ethics" className="section" aria-labelledby="ethics-title">
      <div className="container">
        <SectionHeading eyebrow="Ethics" title="Responsible healthcare AI">
          Trust depends on more than accuracy. Explore the key issues, then test your thinking on three scenarios.
        </SectionHeading>
        <h3 id="ethics-title" className="sr-only">Ethics module</h3>
        <div className="topic-grid">
          {TOPICS.map((t, i) => (
            <div key={t.t} className={`topic ${open === i ? 'open' : ''}`}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                <Icon name="shield" size={16} /> {t.t}
              </button>
              {open === i && <p>{t.d}</p>}
            </div>
          ))}
        </div>
        <div className="grid-3 scen-grid">{SCENARIOS.map((s) => <ScenarioCard key={s.id} s={s} />)}</div>
        <div className="card principles">
          <div className="card-title"><Icon name="scale" size={20} /><h3>Principles for responsible healthcare AI</h3><Badge tone="grey">Based on WHO guidance (2021)</Badge></div>
          <ol>{PRINCIPLES.map((p) => <li key={p.t}><strong>{p.t}.</strong> {p.d}</li>)}</ol>
          <p className="muted">These six principles are summarised in our own words from the WHO guidance listed in the references.</p>
        </div>
        <Disclaimer>Ethical questions often have several defensible answers. These scenarios are simplified to encourage discussion, not to provide legal advice.</Disclaimer>
      </div>
    </section>
  )
}
