import { useEffect, useRef, useState } from 'react'
import Icon from '../components/Icon'
import { Badge, Collapsible, Disclaimer } from '../components/UI'

const STAGES = ['Biological target', 'Candidate generation', 'Virtual screening', 'Laboratory testing', 'Preclinical research', 'Clinical trials']

const TARGETS = [
  { id: 0, name: 'KX-7', kind: 'fictional kinase', text: 'An invented enzyme involved in a made-up signalling pathway.' },
  { id: 1, name: 'LM-2', kind: 'fictional receptor', text: 'An invented receptor on the surface of a made-up cell type.' },
  { id: 2, name: 'ZP-4', kind: 'fictional enzyme', text: 'An invented enzyme in a made-up metabolic process.' },
]

const CANDS = [
  { id: 'MM-101', size: 'Small', sol: 'High', flag: '' },
  { id: 'MM-102', size: 'Small', sol: 'Medium', flag: '' },
  { id: 'MM-103', size: 'Medium', sol: 'Low', flag: 'Predicted poor solubility' },
  { id: 'MM-104', size: 'Medium', sol: 'High', flag: '' },
  { id: 'MM-105', size: 'Large', sol: 'Medium', flag: 'Possible off-target effects' },
  { id: 'MM-106', size: 'Large', sol: 'Low', flag: 'Predicted poor solubility' },
]

// Illustrative values only (arbitrary units), one row per fictional target.
const SCORES = [
  [82, 74, 91, 55, 68, 87],
  [61, 88, 70, 79, 52, 84],
  [77, 59, 83, 90, 66, 72],
]

type Outcome = { label: string; tone: 'mint' | 'amber' | 'grey'; text: string }
const OUT = {
  yes: { label: 'Activity confirmed', tone: 'mint', text: 'In this simplified fictional assay the candidate behaved as predicted. It still has a long way to go.' },
  partial: { label: 'Partly confirmed', tone: 'amber', text: 'Some activity was seen, but weaker than the model predicted.' },
  no: { label: 'Not confirmed', tone: 'grey', text: 'No meaningful activity was observed, even though the computer ranked it highly. Predictions can be wrong.' },
  inc: { label: 'Inconclusive', tone: 'amber', text: 'Poor solubility made the experiment hard to interpret. The properties flagged earlier mattered.' },
} satisfies Record<string, Outcome>
const LAB: Record<string, keyof typeof OUT> = { '0-0': 'yes', '0-1': 'no', '0-2': 'inc', '1-1': 'partial', '1-3': 'yes', '1-5': 'inc', '2-3': 'no', '2-0': 'yes', '2-2': 'inc' }

function Molecule({ seed }: { seed: number }) {
  const hex = (cx: number, cy: number, r = 14) => Array.from({ length: 6 }, (_, k) => `${(cx + r * Math.cos((Math.PI / 3) * k + Math.PI / 6)).toFixed(1)},${(cy + r * Math.sin((Math.PI / 3) * k + Math.PI / 6)).toFixed(1)}`).join(' ')
  return (
    <svg viewBox="0 0 90 60" className="mol" aria-hidden="true">
      <polygon points={hex(24, 30)} className="m-stroke" />
      {seed % 2 === 0 && <polygon points={hex(49, 30)} className="m-hi" />}
      {seed % 3 === 0 && <polygon points={hex(36, 12, 10)} className="m-stroke" />}
      <path d={`M${seed % 2 === 0 ? 62 : 38} 30l14 ${seed % 2 === 0 ? -8 : 8}`} className="m-line" />
      <circle cx="78" cy={seed % 2 === 0 ? 22 : 38} r="4" className="m-hi" />
    </svg>
  )
}

export default function Drug() {
  const [stage, setStage] = useState(0)
  const [reached, setReached] = useState(0)
  const [target, setTarget] = useState<number | null>(null)
  const [scr, setScr] = useState(0) // 0 idle, 1..6 scoring, 7 done
  const [picked, setPicked] = useState<number | null>(null)
  const [tested, setTested] = useState(false)
  const timer = useRef<number | null>(null)
  useEffect(() => () => { if (timer.current !== null) window.clearTimeout(timer.current) }, [])

  const scores = target === null ? [] : SCORES[target]
  const adj = scores.map((s, i) => s - (CANDS[i].flag ? 20 : 0))
  const ranked = scores.map((_, i) => i).sort((a, b) => adj[b] - adj[a])
  const top3 = ranked.slice(0, 3)

  const go = (n: number) => { setStage(n); setReached((r) => Math.max(r, n)) }
  const pickTarget = (id: number) => { setTarget(id); setScr(0); setPicked(null); setTested(false); setReached(0) }
  const runScreen = () => {
    setScr(1)
    const tick = (n: number) => { timer.current = window.setTimeout(() => { setScr(n); if (n < 7) tick(n + 1) }, 650) }
    tick(2)
  }
  const reset = () => { if (timer.current !== null) window.clearTimeout(timer.current); setStage(0); setReached(0); setTarget(null); setScr(0); setPicked(null); setTested(false) }

  const canNext = (stage === 0 && target !== null) || stage === 1 || (stage === 2 && scr === 7) || (stage === 3 && tested) || stage === 4

  return (
    <div className="lab-panel">
      <h3>AI drug discovery simulator</h3>
      <p>Follow a simplified research pipeline from a <strong>fictional</strong> target to clinical trials. All molecules and values are invented for teaching.</p>
      <ol className="pipeline small" aria-label="Drug discovery stages">
        {STAGES.map((s, i) => (
          <li key={s}>
            <button className={`stage ${i === stage ? 'active' : ''} ${i < stage ? 'done' : ''}`} disabled={i > reached} aria-current={i === stage ? 'step' : undefined} onClick={() => setStage(i)}>
              <span className="stage-num">{i + 1}</span><span>{s}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="card">
        {stage === 0 && (
          <div>
            <h4>1. Choose a fictional biological target</h4>
            <p>A target is a molecule in the body (often a protein) that researchers think a medicine could influence.</p>
            <div className="options" role="group" aria-label="Fictional targets">
              {TARGETS.map((t) => (
                <button key={t.id} className={`option ${target === t.id ? 'picked' : ''}`} aria-pressed={target === t.id} onClick={() => pickTarget(t.id)}>
                  <strong>{t.name}</strong> ({t.kind})<br /><span className="muted">{t.text}</span>
                </button>
              ))}
            </div>
            <Collapsible title="How can protein structure prediction (such as AlphaFold) help?">
              <p>A protein’s 3D shape strongly influences what can bind to it. AlphaFold, from Google DeepMind, predicts a protein\u2019s 3D structure from its amino-acid sequence, and predictions for many proteins are shared through the AlphaFold Protein Structure Database. Researchers can use these models to form hypotheses about a target. The predictions come with confidence information, can be wrong in places, and do not replace laboratory experiments or clinical trials.</p>
            </Collapsible>
          </div>
        )}
        {stage === 1 && target !== null && (
          <div>
            <h4>2. Candidate generation for {TARGETS[target].name}</h4>
            <p>Computational methods can propose or collect many candidate molecules. Here are six fictional candidates with <strong>illustrative</strong> properties (arbitrary units).</p>
            <div className="cand-grid">
              {CANDS.map((c, i) => (
                <div key={c.id} className="cand">
                  <Molecule seed={i + 1} />
                  <strong>{c.id}</strong>
                  <span>Predicted fit: {scores[i]}</span>
                  <span>Size: {c.size} | Solubility: {c.sol}</span>
                  {c.flag && <Badge tone="amber">{c.flag}</Badge>}
                </div>
              ))}
            </div>
          </div>
        )}
        {stage === 2 && target !== null && (
          <div>
            <h4>3. Virtual screening</h4>
            <p>The model scores each candidate, then researchers prioritise. Candidates with predicted problems are ranked lower even if their fit score is high.</p>
            <button className="btn primary" onClick={runScreen} disabled={scr > 0 && scr < 7}><Icon name="play" size={16} /> {scr === 7 ? 'Run again' : scr > 0 ? 'Screening...' : 'Start simulated screening'}</button>
            <ul className="bars" aria-live="polite">
              {(scr === 7 ? ranked : scores.map((_, i) => i)).map((i) => (
                <li key={CANDS[i].id} className={scr === 7 && top3.includes(i) ? 'top' : ''}>
                  <span className="bar-label">{CANDS[i].id}</span>
                  <span className="bar-track"><span className="bar-fill" style={{ width: scr > i || scr === 7 ? `${adj[i]}%` : '0%' }} /></span>
                  <span className="bar-val">{scr > i || scr === 7 ? adj[i] : '...'}</span>
                  {scr === 7 && top3.includes(i) && <Badge tone="mint">Prioritised for lab</Badge>}
                </li>
              ))}
            </ul>
            {scr === 7 && <p className="muted">Bars show the illustrative fit score after a 20-point reduction for flagged properties. The top three move on; the rest are set aside, not proven useless.</p>}
          </div>
        )}
        {stage === 3 && target !== null && (
          <div>
            <h4>4. Laboratory testing</h4>
            <p>Choose a prioritised candidate to test in a simplified, fictional experiment.</p>
            <div className="options" role="group" aria-label="Prioritised candidates">
              {top3.map((i) => (
                <button key={i} className={`option ${picked === i ? 'picked' : ''}`} aria-pressed={picked === i} onClick={() => { setPicked(i); setTested(false) }}>{CANDS[i].id} (fit {scores[i]})</button>
              ))}
            </div>
            <button className="btn primary" disabled={picked === null} onClick={() => setTested(true)}>Run simulated lab experiment</button>
            {tested && picked !== null && (() => {
              const o = OUT[LAB[`${target}-${picked}`] ?? 'inc']
              return (
                <div className="feedback" role="status">
                  <Badge tone={o.tone}>{o.label}</Badge>
                  <p>{o.text}</p>
                  <p className="muted">Lesson: a high computer score is a reason to test, not evidence that a molecule works. Outcomes here are scripted for teaching.</p>
                </div>
              )
            })()}
          </div>
        )}
        {stage === 4 && (
          <div>
            <h4>5. Preclinical research</h4>
            <p>Candidates that survive lab testing are studied further, for example in cell systems and, where required, in animal studies, to learn about safety, how the body handles the compound, and appropriate dose ranges before any human study is considered. Many candidates do not progress.</p>
          </div>
        )}
        {stage === 5 && (
          <div>
            <h4>6. Clinical trials</h4>
            <ul>
              <li><strong>Phase 1:</strong> small studies mainly examining safety and how the body processes the compound.</li>
              <li><strong>Phase 2:</strong> studies in people with the condition, exploring whether it appears to work and further safety.</li>
              <li><strong>Phase 3:</strong> larger studies comparing it with existing care or placebo.</li>
              <li><strong>Regulatory review:</strong> authorities such as the FDA assess the evidence before a medicine can be marketed.</li>
            </ul>
            <p>AI can help at several earlier steps, but no computer prediction replaces this evidence. None of the fictional candidates here is a real drug.</p>
            <button className="btn secondary" onClick={reset}><Icon name="rotate" size={16} /> Start over</button>
          </div>
        )}
        <div className="btn-row">
          <button className="btn secondary small" disabled={stage === 0} onClick={() => setStage(stage - 1)}>Back</button>
          {stage < 5 && <button className="btn primary small" disabled={!canNext} onClick={() => go(stage + 1)}>Continue <Icon name="arrow" size={16} /></button>}
        </div>
        {!canNext && stage < 5 && <p className="muted" role="status">{stage === 0 ? 'Choose a target to continue.' : stage === 2 ? 'Run the screening to continue.' : 'Run the simulated experiment to continue.'}</p>}
      </div>
      <Disclaimer>All targets, molecules, scores and experimental outcomes on this page are fictional and illustrative. Nothing here is a real drug, a validated prediction, or a treatment.</Disclaimer>
    </div>
  )
}
