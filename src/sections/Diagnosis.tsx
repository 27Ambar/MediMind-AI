import { useState } from 'react'
import Icon from '../components/Icon'
import { Badge, Disclaimer, ProgressBar } from '../components/UI'

type Verdict = 'strong' | 'partial' | 'weak'
type Q = { q: string; hint: string; options: { text: string; verdict: Verdict; why: string }[] }

const CASE_TEXT = 'A fictional hospital team reviews a synthetic chest image. A decision-support tool has highlighted one small rounded region for review. The referral note is brief: an adult with a mild cough. No earlier images are attached.'

const QUESTIONS: Q[] = [
  {
    q: 'What information is actually available to the team?', hint: 'List what is on the table, not what you wish was there.',
    options: [
      { text: 'The image, the tool\u2019s highlighted region, and a brief referral note', verdict: 'strong', why: 'Correct. Naming exactly what is available (and how thin it is) is the first step in judging how much weight any output deserves.' },
      { text: 'Only the highlighted region', verdict: 'partial', why: 'The highlight is part of it, but the rest of the image and the referral note are also available. Looking only at the flagged area risks missing context.' },
      { text: 'A confirmed diagnosis', verdict: 'weak', why: 'No diagnosis exists yet. A highlighted region is a prompt for review, not a conclusion.' },
    ],
  },
  {
    q: 'What kind of pattern might an AI system flag here?', hint: 'Think about what a model can actually see.',
    options: [
      { text: 'A rounded area that differs in brightness from its surroundings', verdict: 'strong', why: 'Image models respond to visual features such as contrast, edges and shape. The flag says the pattern resembles ones seen in training data; it does not say what the pattern is.' },
      { text: 'The patient\u2019s lifestyle and habits', verdict: 'weak', why: 'A model can only use the inputs it is given. Lifestyle information is not in the image.' },
      { text: 'What will happen to the patient, with certainty', verdict: 'weak', why: 'Models output statistical suggestions. They cannot know a person\u2019s future with certainty.' },
    ],
  },
  {
    q: 'What important information is missing?', hint: 'What would a careful clinician want before drawing conclusions?',
    options: [
      { text: 'Earlier images for comparison, medical history, and other test results', verdict: 'strong', why: 'Comparison with earlier images and wider clinical context often changes how the same image is interpreted.' },
      { text: 'Nothing. The highlighted region is enough', verdict: 'weak', why: 'Treating a single flag as sufficient is a common failure mode. Missing context is one reason models can be wrong.' },
      { text: 'Only the patient\u2019s name', verdict: 'weak', why: 'Identity details do not help interpret the image. The gaps that matter are clinical.' },
    ],
  },
  {
    q: 'What needs professional review?', hint: 'Consider both what was flagged and what was not.',
    options: [
      { text: 'The flagged region and the rest of the case, including images the tool did not flag if the clinical picture raises concern', verdict: 'strong', why: 'Models can miss things (false negatives). Professionals interpret the whole case rather than only the tool\u2019s highlights.' },
      { text: 'Only the images the tool flagged', verdict: 'partial', why: 'Reviewing flagged images is sensible, but \u201Cnot flagged\u201D is not the same as \u201Cnormal\u201D.' },
      { text: 'Nothing, if the tool is usually right', verdict: 'weak', why: '\u201CUsually right\u201D in one dataset does not guarantee correctness for this patient or this hospital.' },
    ],
  },
  {
    q: 'What are the risks of relying on an automated result?', hint: 'Think about people as well as software.',
    options: [
      { text: 'People may over-trust it (automation bias), and errors or dataset bias may go unnoticed', verdict: 'strong', why: 'Both human over-reliance and hidden model weaknesses are well-recognised concerns, which is why validation, monitoring and training matter.' },
      { text: 'Only a risk if the software crashes', verdict: 'weak', why: 'Software that runs smoothly can still be wrong, or less accurate for some groups of patients.' },
      { text: 'There is no risk if the tool is new', verdict: 'weak', why: 'Newness says nothing about safety. Evidence from the intended setting does.' },
    ],
  },
]

const LABEL: Record<Verdict, { t: string; icon: string; tone: 'mint' | 'amber' | 'grey' }> = {
  strong: { t: 'Strong reasoning', icon: 'check', tone: 'mint' },
  partial: { t: 'Partly right', icon: 'info', tone: 'amber' },
  weak: { t: 'Needs another look', icon: 'alert', tone: 'grey' },
}

export default function Diagnosis() {
  const [qi, setQi] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [strong, setStrong] = useState(0)
  const [done, setDone] = useState(false)
  const q = QUESTIONS[qi]

  const choose = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (q.options[i].verdict === 'strong') setStrong((s) => s + 1)
  }
  const next = () => {
    if (qi === QUESTIONS.length - 1) setDone(true)
    else { setQi(qi + 1); setPicked(null) }
  }
  const restart = () => { setQi(0); setPicked(null); setStrong(0); setDone(false) }

  return (
    <div className="lab-panel">
      <h3>AI-assisted diagnosis: a fictional case study</h3>
      <p>Decision-support tools can help clinicians notice patterns and consider relevant information. They do not know the patient, can be wrong, and depend on the quality and fairness of their data. Work through the case below.</p>
      <div className="card case"><Badge tone="amber">Fictional case</Badge><p>{CASE_TEXT}</p></div>

      {!done ? (
        <div className="card">
          <p className="muted">Question {qi + 1} of {QUESTIONS.length}</p>
          <ProgressBar value={qi + (picked !== null ? 1 : 0)} max={QUESTIONS.length} label="Case progress" />
          <h4 id="dq">{q.q}</h4>
          <p className="muted">Hint: {q.hint}</p>
          <div className="options" role="group" aria-labelledby="dq">
            {q.options.map((o, i) => (
              <button key={o.text} className={`option ${picked === i ? 'picked' : ''} ${picked !== null && o.verdict === 'strong' ? 'best' : ''}`} onClick={() => choose(i)} aria-disabled={picked !== null}>
                {o.text}
              </button>
            ))}
          </div>
          {picked !== null && (
            <div className="feedback" role="status">
              <Badge tone={LABEL[q.options[picked].verdict].tone}><Icon name={LABEL[q.options[picked].verdict].icon} size={14} /> {LABEL[q.options[picked].verdict].t}</Badge>
              <p>{q.options[picked].why}</p>
              {q.options[picked].verdict !== 'strong' && <p className="muted"><strong>Stronger answer:</strong> {q.options.find((o) => o.verdict === 'strong')!.text}.</p>}
              <button className="btn primary small" onClick={next}>{qi === QUESTIONS.length - 1 ? 'Finish case' : 'Next question'}</button>
            </div>
          )}
        </div>
      ) : (
        <div className="card">
          <div className="card-title"><Icon name="trophy" size={20} /><h4>Case review complete</h4></div>
          <p>You chose the strongest reasoning on {strong} of {QUESTIONS.length} questions.</p>
          <ul>
            <li>An AI flag is a prompt for review, not a diagnosis.</li>
            <li>Context, comparison images and history change how an image is read.</li>
            <li>“Not flagged” does not mean “normal”.</li>
            <li>Over-trust (automation bias) and dataset bias are real risks that need active management.</li>
          </ul>
          <button className="btn secondary" onClick={restart}><Icon name="rotate" size={16} /> Review the case again</button>
        </div>
      )}
      <Disclaimer>Fictional, simplified case for teaching. MediMind AI does not give diagnoses, treatment plans or personal medical advice.</Disclaimer>
    </div>
  )
}
