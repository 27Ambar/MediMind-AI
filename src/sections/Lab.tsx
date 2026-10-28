import { SectionHeading, Tabs } from '../components/UI'
import type { LabTab } from '../data/types'
import Imaging from './Imaging'
import Diagnosis from './Diagnosis'
import Drug from './Drug'
import Genetics from './Genetics'
import Care from './Care'

const TABS: { id: LabTab; label: string; icon: string }[] = [
  { id: 'imaging', label: 'Imaging', icon: 'scan' },
  { id: 'diagnosis', label: 'Diagnosis', icon: 'stethoscope' },
  { id: 'drug', label: 'Drug discovery', icon: 'flask' },
  { id: 'genetics', label: 'Genetics', icon: 'dna' },
  { id: 'care', label: 'Patient care', icon: 'pulse' },
]

export default function Lab({ tab, setTab }: { tab: LabTab; setTab: (t: LabTab) => void }) {
  return (
    <section id="lab" className="section" aria-labelledby="lab-title">
      <div className="container">
        <SectionHeading eyebrow="Interactive Lab" title="Hands-on healthcare AI simulations">
          Five modules with synthetic data. Pick a tab and explore.
        </SectionHeading>
        <h3 id="lab-title" className="sr-only">Interactive lab modules</h3>
        <Tabs tabs={TABS} value={tab} onChange={setTab} label="Lab modules" />
        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="panel">
          {tab === 'imaging' && <Imaging />}
          {tab === 'diagnosis' && <Diagnosis />}
          {tab === 'drug' && <Drug />}
          {tab === 'genetics' && <Genetics />}
          {tab === 'care' && <Care />}
        </div>
      </div>
    </section>
  )
}
