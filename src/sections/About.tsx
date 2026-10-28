import Icon from '../components/Icon'
import { SectionHeading } from '../components/UI'

const REFS = [
  { t: 'World Health Organization. Ethics and governance of artificial intelligence for health: WHO guidance (2021).', u: 'https://www.who.int/news/item/28-06-2021-who-issues-first-global-report-on-ai-in-health-and-six-guiding-principles-for-its-design-and-use', note: 'Source of the six principles summarised in the Ethics section.' },
  { t: 'U.S. Food and Drug Administration. Artificial Intelligence-Enabled Medical Devices.', u: 'https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices', note: 'How the FDA regulates AI-enabled devices and its public device list.' },
  { t: 'Jumper J. et al. Highly accurate protein structure prediction with AlphaFold. Nature 596, 583-589 (2021).', u: 'https://doi.org/10.1038/s41586-021-03819-2', note: 'The AlphaFold research paper.' },
  { t: 'AlphaFold Protein Structure Database (EMBL-EBI and Google DeepMind).', u: 'https://alphafold.ebi.ac.uk/', note: 'Official database of predicted protein structures.' },
  { t: 'Gulshan V. et al. Development and validation of a deep learning algorithm for detection of diabetic retinopathy in retinal fundus photographs. JAMA 316(22), 2402-2410 (2016).', u: 'https://doi.org/10.1001/jama.2016.17216', note: 'Research example behind the retinal screening discussion.' },
  { t: 'Obermeyer Z. et al. Dissecting racial bias in an algorithm used to manage the health of populations. Science 366, 447-453 (2019).', u: 'https://doi.org/10.1126/science.aax2342', note: 'A published example of bias in a health algorithm.' },
  { t: 'Lee C.R. et al. Clinical Pharmacogenetics Implementation Consortium guideline for CYP2C19 genotype and clopidogrel therapy: 2022 update. Clin Pharmacol Ther 112(5), 959-967.', u: 'https://doi.org/10.1002/cpt.2526', note: 'Guideline behind the CYP2C19 and clopidogrel teaching example.' },
]

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading eyebrow="About" title="About this project">
          MediMind AI accompanies the group presentation “AI in Healthcare &amp; Well-Being: Advancing Care Through Intelligence.”
        </SectionHeading>
        <h3 id="about-title" className="sr-only">Project information and references</h3>
        <div className="grid-2">
          <div className="card">
            <h4>What this is, and is not</h4>
            <ul>
              <li>An educational demonstration built for a college project.</li>
              <li>All images, cases, molecules, cohorts and results are synthetic or fictional.</li>
              <li>Not a medical device. It does not diagnose, recommend treatment or analyse real patient data.</li>
              <li>Collects no personal data. The quiz stores only your best score in your own browser.</li>
            </ul>
          </div>
          <div className="card">
            <h4>References</h4>
            <ul className="refs">
              {REFS.map((r) => (
                <li key={r.u}>
                  <a href={r.u} target="_blank" rel="noopener noreferrer">{r.t} <Icon name="external" size={14} /></a>
                  <span className="muted"> {r.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
