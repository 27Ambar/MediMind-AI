import { useCallback, useEffect, useState } from 'react'
import Icon from './components/Icon'
import type { LabTab } from './data/types'
import { ClosingCta, Explore, Hero, Pipeline } from './sections/Home'
import Lab from './sections/Lab'
import Challenge from './sections/Challenge'
import Ethics from './sections/Ethics'
import Assistant from './sections/Assistant'
import About from './sections/About'

const NAV = [
  { href: '#home', label: 'Home' },
  { href: '#explore', label: 'Explore AI' },
  { href: '#lab', label: 'Interactive Lab' },
  { href: '#challenge', label: 'AI Challenge' },
  { href: '#ethics', label: 'Ethics' },
  { href: '#about', label: 'About' },
]

export default function App() {
  const [menu, setMenu] = useState(false)
  const [tab, setTab] = useState<LabTab>('imaging')
  const [active, setActive] = useState('#home')

  const openLab = useCallback((t: LabTab) => {
    setTab(t)
    document.getElementById('lab')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const ids = NAV.map((n) => n.href.slice(1))
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav">
        <div className="container nav-row">
          <a className="logo" href="#home" onClick={() => setMenu(false)}>
            <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#0B1F33" stroke="#39D5FF" strokeOpacity=".5" /><path d="M6 17h5l3-7 4 13 3-6h5" fill="none" stroke="#39D5FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span>MediMind <b>AI</b></span>
          </a>
          <button className="menu-btn" aria-expanded={menu} aria-controls="nav-links" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>
            <Icon name={menu ? 'x' : 'menu'} size={22} />
          </button>
          <nav id="nav-links" className={`links ${menu ? 'open' : ''}`} aria-label="Main">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={active === n.href ? 'current' : ''} aria-current={active === n.href ? 'true' : undefined} onClick={() => setMenu(false)}>{n.label}</a>
            ))}
          </nav>
        </div>
      </header>
      <main id="main">
        <Hero />
        <Explore openLab={openLab} />
        <Pipeline />
        <Lab tab={tab} setTab={setTab} />
        <Challenge openLab={openLab} />
        <Ethics />
        <Assistant />
        <ClosingCta />
        <About />
      </main>
      <footer className="footer">
        <div className="container">
          <p><strong>MediMind AI</strong> - Where Intelligence Meets Better Healthcare.</p>
          <p className="muted">Educational demonstration only. Not medical advice. All cases, images and results are synthetic or fictional.</p>
          <a className="link-btn" href="#ask"><Icon name="message" size={16} /> Ask MediMind</a>
        </div>
      </footer>
    </>
  )
}
