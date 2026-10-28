import { useState } from 'react'
import Icon from '../components/Icon'
import { Badge, Disclaimer } from '../components/UI'

const ZONES = [
  {
    id: 'or', name: 'Operating room', icon: 'scale', level: 'Assistive',
    ai: ['Surgical planning software can help segment anatomy in scans and build 3D models for the team to study beforehand.', 'Some robotic systems offer motion scaling and tremor filtering for the surgeon.', 'Research systems explore recognising stages of a procedure to support training and review.'],
    human: 'Many robotic surgical systems are operated by the surgeon, who decides every step. The surgical team remains responsible for the patient.',
  },
  {
    id: 'monitor', name: 'Patient monitoring station', icon: 'pulse', level: 'Alerting',
    ai: ['Software can combine vital signs and other data to raise early-warning alerts when a patient may be getting worse.', 'Algorithms can filter noisy signals to reduce nuisance alarms.'],
    human: 'Nurses and doctors decide whether an alert is meaningful, examine the patient and choose what to do. Too many false alerts can cause alarm fatigue, so performance has to be checked locally.',
  },
  {
    id: 'imaging', name: 'Medical imaging workstation', icon: 'scan', level: 'Assistive',
    ai: ['Tools can prioritise urgent-looking studies in a reading queue, highlight regions for review or help with measurements.', 'Some tools are authorised for narrow, specific tasks in certain countries.'],
    human: 'Radiologists interpret the images and write the report. A tool that is not flagging anything does not mean a scan is normal.',
  },
  {
    id: 'ops', name: 'Hospital coordination dashboard', icon: 'building', level: 'Administrative',
    ai: ['Forecasting tools can help estimate bed demand and staffing needs.', 'Scheduling support can suggest ways to reduce waiting and idle time.'],
    human: 'Managers and clinicians weigh the suggestions against safety, fairness and local circumstances. These tools coordinate resources; they are not making treatment decisions.',
  },
]

const LEVELS = [
  { t: 'Assistive', d: 'The tool suggests or highlights; a person decides and acts.' },
  { t: 'Alerting', d: 'The tool notifies people when something may need attention; people respond.' },
  { t: 'Administrative', d: 'The tool helps with scheduling or logistics rather than clinical judgement.' },
  { t: 'Autonomous action', d: 'The tool acts on a patient without human approval. This page does not assume it, and it is not the norm in routine care.' },
]

export default function Care() {
  const [id, setId] = useState('or')
  const z = ZONES.find((x) => x.id === id)!
  return (
    <div className="lab-panel">
      <h3>AI in surgery and patient care: a simulated hospital</h3>
      <p>Select an area to see how AI-assisted tools might support professionals there. Availability varies by hospital and country, and not every tool is approved for clinical use.</p>
      <div className="hospital" role="group" aria-label="Hospital areas">
        {ZONES.map((x) => (
          <button key={x.id} className={`room ${x.id === id ? 'active' : ''}`} aria-pressed={x.id === id} onClick={() => setId(x.id)}>
            <Icon name={x.icon} size={26} /><span>{x.name}</span>
          </button>
        ))}
      </div>
      <div className="card" aria-live="polite">
        <div className="card-title"><Icon name={z.icon} size={20} /><h4>{z.name}</h4><Badge>{z.level}</Badge></div>
        <h5>How AI may assist</h5>
        <ul>{z.ai.map((t) => <li key={t}>{t}</li>)}</ul>
        <h5>What people still do</h5>
        <p>{z.human}</p>
      </div>
      <div className="card">
        <h4>AI-assisted versus autonomous</h4>
        <ul className="levels">{LEVELS.map((l) => <li key={l.t} className={l.t === z.level ? 'on' : ''}><strong>{l.t}:</strong> {l.d}</li>)}</ul>
      </div>
      <Disclaimer>Simplified teaching illustration. It does not describe any particular hospital, product or regulatory approval.</Disclaimer>
    </div>
  )
}
