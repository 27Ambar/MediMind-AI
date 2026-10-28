// Scripted answers used by Ask MediMind in DEMO mode. No AI model is involved.
export type Faq = { keys: string[]; q: string; a: string }

export const FAQ: Faq[] = [
  { keys: ['deep learning', 'neural network', 'cnn', 'convolutional'], q: 'What is deep learning?',
    a: 'Deep learning uses neural networks with many layers that learn patterns from examples. In imaging, convolutional neural networks (CNNs) slide small filters over an image: early layers pick up edges and textures, later layers combine them into shapes. What they learn depends entirely on their training data.' },
  { keys: ['x-ray', 'xray', 'ct', 'mri', 'imaging', 'radiology', 'scan'], q: 'How is AI used with medical images?',
    a: 'Research and some regulated tools help prioritise studies, highlight regions for review or assist with measurements on X-rays, CT and MRI. They usually support a radiologist rather than replace one, and they need validation in the setting where they are used.' },
  { keys: ['retinopathy', 'retina', 'eye'], q: 'What is AI screening for diabetic retinopathy?',
    a: 'Diabetic retinopathy affects the retina in people with diabetes. Deep-learning systems have been studied for screening retinal photographs and suggesting who should see a specialist. Screening only indicates who may need further assessment; it is not a diagnosis.' },
  { keys: ['false positive', 'false negative', 'error', 'mistake', 'wrong'], q: 'What are false positives and false negatives?',
    a: 'A false positive flags something that is not actually there; a false negative misses something that is. Both occur in every screening or detection method, including AI and human review, which is why results need clinical interpretation.' },
  { keys: ['bias', 'representative', 'fairness', 'diverse'], q: 'How does dataset bias affect healthcare AI?',
    a: 'If training data under-represents some patients, devices or hospitals, a model can be less accurate for them. Testing performance across subgroups and in the real setting, and monitoring afterwards, helps reveal this.' },
  { keys: ['screening', 'detection', 'diagnosis', 'treatment', 'difference'], q: 'Screening vs detection vs diagnosis vs treatment?',
    a: 'Screening checks a population for possible signs or risk. Detection identifies a possible feature in data. Diagnosis is a clinical conclusion made with professional judgement. Treatment is the intervention chosen for a particular patient.' },
  { keys: ['drug discovery', 'drug', 'molecule', 'candidate', 'virtual screening'], q: 'How does AI help drug discovery?',
    a: 'Computational methods can propose and rank candidate molecules so that researchers choose which to test. Predictions must still be confirmed in laboratory experiments, preclinical studies and clinical trials. AI can help at some steps; it does not skip the evidence.' },
  { keys: ['alphafold', 'protein structure', 'protein'], q: 'What is AlphaFold?',
    a: 'AlphaFold is a system from Google DeepMind that predicts a protein\u2019s 3D structure from its amino-acid sequence. The predictions give researchers hypotheses to work with, include confidence estimates, and do not replace experiments.' },
  { keys: ['genetic', 'genome', 'dna', 'gene', 'variant'], q: 'How does AI relate to genetics?',
    a: 'Genomic datasets are huge, so statistics and machine learning are used to look for associations between variants and traits or treatment responses. Associations are clues for further study, and representative data and privacy protections are essential.' },
  { keys: ['pharmacogenomics', 'personalised', 'personalized', 'cyp2c19', 'clopidogrel'], q: 'What is pharmacogenomics?',
    a: 'Pharmacogenomics studies how genetic variation relates to differences in medicine response. CYP2C19 and clopidogrel is a well-known example used in teaching, with published clinical guidelines. I cannot give medication advice; decisions belong to qualified healthcare professionals.' },
  { keys: ['surgery', 'robot', 'surgical', 'hospital', 'monitoring'], q: 'How is AI used in surgery and hospitals?',
    a: 'Examples include surgical planning software, surgeon-controlled robotic systems, early-warning alerts from monitoring data, and scheduling support. Availability varies by hospital and country, and not every tool is approved for clinical use.' },
  { keys: ['replace', 'doctors', 'jobs'], q: 'Will AI replace doctors?',
    a: 'There is no basis for saying it inevitably will. Current healthcare AI mostly supports specific tasks, while clinicians provide context, communication, responsibility and judgement. How roles evolve is an open question.' },
  { keys: ['ethic', 'privacy', 'consent', 'accountab', 'responsib'], q: 'What are the main ethical issues?',
    a: 'Privacy, informed consent, bias and fairness, transparency, accountability and human oversight. The WHO has published guidance with six principles. Reasonable people can weigh these differently in specific cases.' },
  { keys: ['fda', 'approved', 'regulat', 'validation', 'validated'], q: 'Is healthcare AI regulated?',
    a: 'Software that functions as a medical device is regulated in many countries. In the US the FDA regulates medical devices, including AI-enabled ones, and publishes a list of authorised AI-enabled devices. Rules differ between countries and between applications.' },
]

const PERSONAL = /(\bmy (symptom|pain|chest|head|child|son|daughter|mother|father|blood|test|scan|result|medic)|\bi have\b|\bi feel\b|\bi am (sick|ill|pregnant)|should i (take|stop|start)|\bdosage\b|\bdose\b|diagnose me|what do i have|treat my|prescri)/i

export const PERSONAL_REPLY = 'I can only help with general educational questions about healthcare AI. I can\u2019t diagnose, suggest treatments or advise on medicines. For personal medical concerns, please speak to a qualified healthcare professional, or local emergency services if it is urgent.'

export function demoAnswer(question: string): { text: string; matched: boolean } {
  const q = question.toLowerCase().trim()
  if (PERSONAL.test(q)) return { text: PERSONAL_REPLY, matched: true }
  let best: Faq | null = null
  let bestScore = 0
  for (const f of FAQ) {
    const s = f.keys.reduce((n, k) => (q.includes(k) ? n + k.length : n), 0)
    if (s > bestScore) { bestScore = s; best = f }
  }
  if (best) return { text: best.a, matched: true }
  return { text: 'I do not have a scripted answer for that. In demo mode I can cover: medical imaging, deep learning, diagnosis support, drug discovery, AlphaFold, genetics, personalised medicine, surgery and patient care, regulation, and ethics. Try one of the suggested questions.', matched: false }
}
