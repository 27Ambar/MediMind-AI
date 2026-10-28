import { useEffect, useState } from 'react'
import Icon from '../components/Icon'
import { Badge, ProgressBar, SectionHeading } from '../components/UI'
import { ANSWERS, QUESTIONS } from '../data/quiz'
import type { Answer } from '../data/quiz'
import type { LabTab } from '../data/types'

const KEY = 'medimind-best-score'

function readBest(): number | null {
  try { const v = window.localStorage.getItem(KEY); return v === null ? null : Number(v) } catch { return null }
}
function writeBest(n: number) { try { window.localStorage.setItem(KEY, String(n)) } catch { /* storage unavailable: ignore */ } }

export default function Challenge({ openLab }: { openLab: (t: LabTab) => void }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<Answer | null>(null)
  const [score, setScore] = useState(0)
  const [missed, setMissed] = useState<number[]>([])
  const [done, setDone] = useState(false)
  const [best, setBest] = useState<number | null>(null)
  useEffect(() => setBest(readBest()), [])

  const q = QUESTIONS[i]
  const correct = picked !== null && picked === q.answer

  const choose = (a: Answer) => {
    if (picked !== null) return
    setPicked(a)
    if (a === q.answer) setScore((s) => s + 1)
    else setMissed((m) => [...m, i])
  }
  const next = () => {
    if (i === QUESTIONS.length - 1) {
      setDone(true)
      if (best === null || score > best) { writeBest(score); setBest(score) }
    } else { setI(i + 1); setPicked(null) }
  }
  const replay = () => { setI(0); setPicked(null); setScore(0); setMissed([]); setDone(false) }
  const pct = Math.round((score / QUESTIONS.length) * 100)

  const topics = Array.from(new Set(missed.map((m) => QUESTIONS[m].topic)))
  const firstMissed = missed.length ? QUESTIONS[missed[0]] : null

  return (
    <section id="challenge" className="section alt" aria-labelledby="challenge-title">
      <div className="container narrow">
        <SectionHeading eyebrow="AI Challenge" title="AI or Human?">
          Who does the work in each healthcare task? Real tasks are rarely all-human or all-AI, so read the reasoning after every answer.
        </SectionHeading>
        <h3 id="challenge-title" className="sr-only">AI or Human quiz</h3>
        {!done ? (
          <div className="card quiz">
            <div className="quiz-top">
              <span>Question {i + 1} of {QUESTIONS.length}</span>
              <span className="score-pill" aria-live="polite">Score: {score}</span>
            </div>
            <ProgressBar value={i + (picked !== null ? 1 : 0)} max={QUESTIONS.length} label="Quiz progress" />
            <h4 id="qtext">{q.task}</h4>
            <div className="options" role="group" aria-labelledby="qtext">
              {ANSWERS.map((a) => {
                const state = picked === null ? '' : a.id === q.answer ? 'right' : picked === a.id ? 'wrong' : 'dim'
                return (
                  <button key={a.id} className={`option ${state}`} onClick={() => choose(a.id)} aria-disabled={picked !== null}>
                    <strong>{a.label}</strong><br /><span className="muted">{a.hint}</span>
                    {state === 'right' && <span className="mark"><Icon name="check" size={16} /> Best answer</span>}
                    {state === 'wrong' && <span className="mark"><Icon name="x" size={16} /> Your answer</span>}
                  </button>
                )
              })}
            </div>
            {picked !== null && (
              <div className={`feedback ${correct ? 'good' : ''}`} role="status">
                {correct && <span className="burst" aria-hidden="true" />}
                <Badge tone={correct ? 'mint' : 'amber'}>{correct ? 'Correct' : 'Not quite'}</Badge>
                <p>{q.why}</p>
                <button className="btn primary small" onClick={next}>{i === QUESTIONS.length - 1 ? 'See my results' : 'Next question'} <Icon name="arrow" size={16} /></button>
              </div>
            )}
          </div>
        ) : (
          <div className="card quiz result">
            <Icon name="trophy" size={34} />
            <h3>Final score: {score} / {QUESTIONS.length}</h3>
            <p className="big-pct" aria-label={`${pct} percent correct`}>{pct}%</p>
            {best !== null && <p className="muted">Best on this device: {best} / {QUESTIONS.length}</p>}
            <div className="summary">
              <h4>Your learning summary</h4>
              {missed.length === 0 ? (
                <p>Excellent. You recognised how AI supports, and does not replace, people across every scenario. Try the ethics scenarios next to see where the hardest questions are.</p>
              ) : (
                <p>Worth revisiting: <strong>{topics.join(', ')}</strong>. Remember that most healthcare AI is about support: AI handles scale and pattern-finding, while people bring context, communication, accountability and final judgement.</p>
              )}
            </div>
            <div className="btn-row center">
              <button className="btn primary" onClick={replay}><Icon name="rotate" size={16} /> Play again</button>
              {firstMissed && firstMissed.tab !== 'ethics' && <button className="btn secondary" onClick={() => openLab(firstMissed.tab as LabTab)}>Review: {firstMissed.topic}</button>}
              {firstMissed && firstMissed.tab === 'ethics' && <a className="btn secondary" href="#ethics">Review: ethics</a>}
              {!firstMissed && <a className="btn secondary" href="#lab">Explore the lab</a>}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
