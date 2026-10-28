import type { LabTab } from './types'

export type Answer = 'human' | 'assisted' | 'collab'

export const ANSWERS: { id: Answer; label: string; hint: string }[] = [
  { id: 'human', label: 'Primarily human', hint: 'People do the core work; AI plays a small role or none.' },
  { id: 'assisted', label: 'AI-assisted', hint: 'AI does the data-heavy analysis; people review and decide.' },
  { id: 'collab', label: 'Human + AI collaboration', hint: 'People and AI each contribute essential parts throughout.' },
]

export type Question = { task: string; answer: Answer; why: string; topic: string; tab: LabTab | 'ethics' }

export const QUESTIONS: Question[] = [
  { task: 'Analysing patterns across thousands of medical images to flag ones that may need a closer look', answer: 'assisted', topic: 'medical imaging', tab: 'imaging',
    why: 'Machine learning is well suited to scanning very large image sets for patterns. Radiologists still review what is flagged and interpret the images in clinical context.' },
  { task: 'Listening to a patient\u2019s concerns and understanding what matters to them', answer: 'human', topic: 'patient communication', tab: 'care',
    why: 'Empathy, trust and understanding someone\u2019s values and circumstances are fundamentally human work. AI may help with notes or information, but it does not replace the conversation.' },
  { task: 'Predicting which candidate molecules deserve further research', answer: 'assisted', topic: 'drug discovery', tab: 'drug',
    why: 'Models can score and rank huge numbers of candidates. Scientists choose what to pursue, and laboratory experiments test the predictions.' },
  { task: 'Discussing treatment options with a patient and reaching a shared decision', answer: 'human', topic: 'patient communication', tab: 'care',
    why: 'Shared decision-making involves explaining risks and benefits, hearing preferences and taking responsibility. Tools can supply information, but the discussion is led by people.' },
  { task: 'Finding patterns in a very large genetic dataset', answer: 'assisted', topic: 'genetics', tab: 'genetics',
    why: 'Statistical and machine-learning methods can search datasets far too large for manual inspection. Researchers design the study, check the results and judge what they mean.' },
  { task: 'Interpreting a flagged scan using a patient\u2019s history, earlier images and other test results', answer: 'collab', topic: 'AI-assisted diagnosis', tab: 'diagnosis',
    why: 'The tool contributes pattern detection and the clinician contributes context and judgement. Neither is sufficient alone, which makes this a genuine collaboration.' },
  { task: 'Designing and carrying out a laboratory experiment to test a computer-predicted drug candidate', answer: 'human', topic: 'drug discovery', tab: 'drug',
    why: 'Scientists plan and run experiments and interpret surprises. Automation and software support the work, but this step exists precisely to check the computer\u2019s predictions.' },
  { task: 'Planning a complex operation using 3D models built from a patient\u2019s scans', answer: 'collab', topic: 'surgery and patient care', tab: 'care',
    why: 'Software can segment anatomy and build models; the surgical team studies them, weighs risks and decides the plan. Each side adds something the other cannot.' },
  { task: 'Watching many patients\u2019 vital signs to give early warning that someone may be getting worse', answer: 'assisted', topic: 'patient monitoring', tab: 'care',
    why: 'Software is good at continuous monitoring across many streams of data. Nurses and doctors decide whether an alert matters and what to do. (Some would call this collaboration; the key point is that people respond.)' },
  { task: 'Deciding whether an AI tool is safe, fair and appropriate to use with a hospital\u2019s own patients', answer: 'collab', topic: 'AI ethics and governance', tab: 'ethics',
    why: 'It needs technical evidence from data scientists and the tool\u2019s performance data, plus judgement from clinicians, ethicists, patients and regulators. Reasonable people could call it human-led, which is exactly the point: oversight is a human responsibility.' },
]
