import { useEffect, useRef, useState } from 'react'
import Icon from '../components/Icon'
import { Badge, Collapsible, Disclaimer, ProgressBar } from '../components/UI'

type ScenarioId = 'chest' | 'retina' | 'mri'

const SCENARIOS: { id: ScenarioId; name: string; short: string; use: string; examines: string[]; note: string; box: [number, number, number, number] }[] = [
  {
    id: 'chest', name: 'Synthetic chest X-ray', short: 'X-ray', box: [182, 98, 48, 48],
    use: 'AI tools for chest radiographs are an active area of research and, for some narrowly defined tasks, regulated products. They typically help prioritise or flag images for a radiologist.',
    examines: ['Brightness differences between lung fields', 'Edges and outlines of rounded shapes', 'Position relative to ribs and the heart shadow'],
    note: 'The highlighted region is a drawn teaching example, not a finding. Normal structures such as overlapping ribs can look suspicious to a model (a false positive), and subtle abnormalities can be missed (a false negative).',
  },
  {
    id: 'retina', name: 'Synthetic retinal photograph', short: 'Retina', box: [64, 150, 70, 60],
    use: 'Diabetic retinopathy screening is a well-studied use of deep learning: the goal is to screen a defined population and refer people who may need an eye specialist. Screening is not the same as diagnosis.',
    examines: ['Small bright or dark spots away from the optic disc', 'Thin blood-vessel patterns and their branching', 'Image quality, focus and lighting'],
    note: 'Performance can change with camera type, lighting, and who was included in the training data. A screening tool must be validated in the setting where it will be used.',
  },
  {
    id: 'mri', name: 'Synthetic brain MRI slice', short: 'MRI', box: [88, 94, 44, 44],
    use: 'MRI analysis research includes measuring structures and helping localise regions of interest. Scanner settings differ between hospitals, which can affect how well a model transfers.',
    examines: ['Intensity differences between neighbouring tissues', 'Symmetry between the left and right sides', 'Shape and boundaries of the region'],
    note: 'Different scanners and protocols produce different-looking images. A model trained on one hospital\u2019s scans may behave differently on another\u2019s (distribution shift).',
  },
]

const STEPS = [
  'Preparing the image: resizing and normalising brightness.',
  'Early layers respond to simple features such as edges and textures.',
  'Deeper layers combine features into larger shapes and patterns.',
  'Output: one region is highlighted for a human to review (illustrative).',
]

function Synthetic({ id, step, box }: { id: ScenarioId; step: number; box: [number, number, number, number] }) {
  return (
    <svg viewBox="0 0 300 300" className="scan" role="img" aria-label={`Synthetic ${id} illustration used for teaching. Not a real patient image.`}>
      <defs>
        <radialGradient id="lung"><stop offset="0%" stopColor="#5d7284" /><stop offset="100%" stopColor="#1b2a38" /></radialGradient>
        <radialGradient id="ret"><stop offset="0%" stopColor="#d9783b" /><stop offset="75%" stopColor="#8c3a22" /><stop offset="100%" stopColor="#3a1410" /></radialGradient>
        <radialGradient id="brain"><stop offset="0%" stopColor="#b9c3cc" /><stop offset="100%" stopColor="#58656f" /></radialGradient>
        <radialGradient id="heat"><stop offset="0%" stopColor="#39D5FF" stopOpacity="0.75" /><stop offset="100%" stopColor="#39D5FF" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="300" height="300" fill="#060d15" />
      {id === 'chest' && (
        <g>
          <ellipse cx="102" cy="150" rx="62" ry="98" fill="url(#lung)" />
          <ellipse cx="198" cy="150" rx="62" ry="98" fill="url(#lung)" />
          <path d="M150 40v230" stroke="#cfd8df" strokeWidth="9" opacity="0.55" />
          <ellipse cx="136" cy="190" rx="34" ry="52" fill="#a7b4be" opacity="0.4" />
          {[70, 100, 130, 160, 190, 220].map((y) => (
            <g key={y} fill="none" stroke="#dfe7ec" strokeWidth="3" opacity="0.32">
              <path d={`M150 ${y}q-60 -14 -108 ${y / 6}`} />
              <path d={`M150 ${y}q60 -14 108 ${y / 6}`} />
            </g>
          ))}
          <circle cx="206" cy="122" r="10" fill="#dce6ec" opacity="0.8" />
        </g>
      )}
      {id === 'retina' && (
        <g>
          <circle cx="150" cy="150" r="132" fill="url(#ret)" />
          <circle cx="218" cy="140" r="20" fill="#e8c46f" opacity="0.9" />
          <g fill="none" stroke="#5b1713" strokeWidth="3" strokeLinecap="round">
            <path d="M218 140C170 110 120 90 70 80" /><path d="M218 140C170 150 120 170 60 160" />
            <path d="M218 140C200 200 160 240 120 260" /><path d="M218 140C200 90 170 50 130 34" />
          </g>
          {[[92, 176], [104, 192], [84, 198], [116, 178]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#f1dd96" opacity="0.85" />)}
        </g>
      )}
      {id === 'mri' && (
        <g>
          <ellipse cx="150" cy="150" rx="112" ry="130" fill="#2a3640" />
          <ellipse cx="150" cy="150" rx="98" ry="116" fill="url(#brain)" />
          <path d="M150 52v196" stroke="#45525c" strokeWidth="3" />
          <path d="M132 120q-14 24 0 52q6 14 18 6M168 120q14 24 0 52q-6 14-18 6" fill="#26323b" stroke="none" />
          <g fill="none" stroke="#6c7a85" strokeWidth="2.5" opacity="0.7">
            <path d="M70 120q20 -22 44 -8M60 170q22 14 40 -2M200 112q24 -10 40 14M196 176q22 18 42 0M120 70q20 10 40 0" />
          </g>
          <circle cx="110" cy="116" r="12" fill="#f0f4f7" opacity="0.85" />
        </g>
      )}
      {step >= 1 && step < 4 && <rect x="0" y="0" width="300" height="300" fill="none" stroke="#39D5FF" strokeOpacity="0.25" strokeDasharray="4 8" />}
      {step >= 2 && <circle cx={box[0] + box[2] / 2} cy={box[1] + box[3] / 2} r={Math.max(box[2], box[3]) * 0.95} fill="url(#heat)" className="heat" />}
      {step >= 4 && (
        <g>
          <rect x={box[0]} y={box[1]} width={box[2]} height={box[3]} rx="4" className="roi" />
          <text x={box[0] + box[2] > 200 ? box[0] + box[2] : box[0]} y={box[1] - 6} textAnchor={box[0] + box[2] > 200 ? 'end' : 'start'} className="roi-label">Flagged for human review</text>
        </g>
      )}
      <text x="8" y="292" className="synthetic-tag">SYNTHETIC ILLUSTRATION - NOT A REAL PATIENT</text>
    </svg>
  )
}

export default function Imaging() {
  const [sid, setSid] = useState<ScenarioId>('chest')
  const [step, setStep] = useState(0) // 0 idle, 1..3 analysing, 4 done
  const [revealed, setRevealed] = useState(false)
  const [limit, setLimit] = useState<'fp' | 'fn' | 'bias'>('fp')
  const timer = useRef<number | null>(null)
  const sc = SCENARIOS.find((s) => s.id === sid)!

  const clear = () => { if (timer.current !== null) { window.clearTimeout(timer.current); timer.current = null } }
  useEffect(() => clear, [])

  const run = () => {
    clear(); setRevealed(false); setStep(1)
    const tick = (n: number) => {
      timer.current = window.setTimeout(() => {
        setStep(n)
        if (n < 4) tick(n + 1)
      }, 1100)
    }
    tick(2)
  }
  const reset = () => { clear(); setStep(0); setRevealed(false) }
  const choose = (id: ScenarioId) => { reset(); setSid(id) }
  const running = step > 0 && step < 4

  const limitText = {
    fp: { t: 'False positive', d: 'The system flags something that is actually normal. Consequences can include anxiety, extra tests and wasted resources. Normal anatomy and imaging artefacts are common causes.' },
    fn: { t: 'False negative', d: 'The system fails to flag something that matters. This is why people should not treat \u201Cno flag\u201D as proof that nothing is there, and why clinical review stays essential.' },
    bias: { t: 'Dataset bias', d: 'If training images mostly come from certain hospitals, devices or patient groups, performance can be worse for others. Validation across the populations and settings where a tool will be used is necessary.' },
  }

  return (
    <div className="lab-panel">
      <div className="split">
        <div>
          <h3>Medical imaging lab</h3>
          <p>Choose a synthetic scenario, run the educational analysis, and watch how a deep-learning system might build up from simple features to a highlighted region. The highlight is scripted to teach the idea; it is <strong>not</strong> a measurement of anything.</p>
          <div className="chips" role="group" aria-label="Imaging scenario">
            {SCENARIOS.map((s) => (
              <button key={s.id} className={`chip ${s.id === sid ? 'active' : ''}`} aria-pressed={s.id === sid} onClick={() => choose(s.id)}>{s.short}</button>
            ))}
          </div>
          <p className="muted">{sc.use}</p>
          <div className="btn-row">
            <button className="btn primary" onClick={run} disabled={running}><Icon name="play" size={16} /> {step === 4 ? 'Run again' : running ? 'Analysing...' : 'Start educational analysis'}</button>
            {step > 0 && <button className="btn secondary" onClick={reset}><Icon name="rotate" size={16} /> Reset</button>}
          </div>
          <ProgressBar value={Math.min(step, 4)} max={4} label="Analysis progress" />
          <ol className="steps" aria-live="polite">
            {STEPS.map((s, i) => <li key={s} className={step > i ? 'done' : step === i && running ? 'now' : ''}>{s}</li>)}
          </ol>
        </div>
        <figure className="scan-wrap">
          <Synthetic id={sid} step={step} box={sc.box} />
          <figcaption>{sc.name}. {step === 0 ? 'Press Start to begin.' : step < 4 ? 'Analysis in progress.' : 'Simulated result: a region is highlighted for human review.'}</figcaption>
        </figure>
      </div>

      {step === 4 && (
        <div className="card reveal-card">
          {!revealed ? (
            <button className="btn primary" onClick={() => setRevealed(true)}>Reveal the educational explanation</button>
          ) : (
            <div>
              <div className="card-title"><Icon name="book" size={20} /><h4>What the simulated system was “looking at”</h4><Badge tone="amber">Simulated</Badge></div>
              <ul>{sc.examines.map((e) => <li key={e}>{e}</li>)}</ul>
              <p>{sc.note}</p>
              <h4>Explore the limitations</h4>
              <div className="chips" role="group" aria-label="Limitations">
                {(['fp', 'fn', 'bias'] as const).map((k) => <button key={k} className={`chip ${limit === k ? 'active' : ''}`} aria-pressed={limit === k} onClick={() => setLimit(k)}>{limitText[k].t}</button>)}
              </div>
              <p aria-live="polite"><strong>{limitText[limit].t}.</strong> {limitText[limit].d}</p>
            </div>
          )}
        </div>
      )}

      <Disclaimer>This demonstration is for educational purposes only and does not analyse real patient images or provide medical advice.</Disclaimer>

      <div className="learn">
        <Collapsible title="What is deep learning, and what do neural networks do?">
          <p>Deep learning is a kind of machine learning that uses neural networks with many layers. A network is a large set of simple mathematical units whose connections are adjusted during training so that inputs (such as pixels) map to useful outputs (such as a label or a highlighted region).</p>
        </Collapsible>
        <Collapsible title="How can a convolutional neural network (CNN) learn visual patterns?">
          <p>A CNN slides small filters across an image. Early filters respond to edges and textures; later layers combine them into shapes and larger structures. Training adjusts the filters using many labelled examples, so the network learns which patterns tend to go with which labels in <em>that</em> data.</p>
        </Collapsible>
        <Collapsible title="Screening, detection, diagnosis and treatment are different things">
          <p><strong>Screening</strong> checks a defined population for possible signs or risk. <strong>Detection</strong> identifies a possible feature in data. <strong>Diagnosis</strong> is a clinical conclusion made with professional judgement and several kinds of evidence. <strong>Treatment</strong> is the intervention chosen for a particular patient. An image-analysis tool usually contributes to detection or screening, not to a diagnosis on its own.</p>
        </Collapsible>
        <Collapsible title="Why are clinical validation and human review necessary?">
          <p>A model that performs well on one dataset can behave differently in another hospital, on another device or in another population. Regulators and clinical teams therefore expect evidence from the intended setting, monitoring after deployment, and a clear role for human reviewers.</p>
        </Collapsible>
      </div>
    </div>
  )
}
