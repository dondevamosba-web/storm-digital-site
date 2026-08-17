import { useEffect, useRef } from 'react'
import './App.css'

// Animated abstract motion background — replaces a licensed stock video with
// an original canvas-drawn "storm cell" field (drifting blobs + lightning
// flicker), matching the palette already in use on the real site.
function StormCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    let w, h

    const blobs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.18 + Math.random() * 0.16,
      vx: (Math.random() - 0.5) * 0.00025,
      vy: (Math.random() - 0.5) * 0.00025,
      hue: i % 2 === 0 ? 'lime' : 'violet',
    }))

    function resize() {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    let lastFlash = 0
    function frame(t) {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#150f23'
      ctx.fillRect(0, 0, w, h)

      blobs.forEach((b) => {
        b.x += b.vx
        b.y += b.vy
        if (b.x < -0.2 || b.x > 1.2) b.vx *= -1
        if (b.y < -0.2 || b.y > 1.2) b.vy *= -1

        const cx = b.x * w
        const cy = b.y * h
        const r = b.r * Math.max(w, h)
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        if (b.hue === 'lime') {
          grad.addColorStop(0, 'rgba(194,239,78,0.22)')
          grad.addColorStop(1, 'rgba(194,239,78,0)')
        } else {
          grad.addColorStop(0, 'rgba(106,95,193,0.28)')
          grad.addColorStop(1, 'rgba(106,95,193,0)')
        }
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fill()
      })

      // occasional lightning flicker across the canvas
      if (t - lastFlash > 3500 && Math.random() < 0.01) {
        lastFlash = t
        ctx.fillStyle = 'rgba(255,255,255,0.05)'
        ctx.fillRect(0, 0, w, h)
      }

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="storm-canvas" aria-hidden="true" />
}

function Logo() {
  return (
    <svg width="17" height="23" viewBox="0 0 17 23" fill="none">
      <path d="M10.5 0L0 13h6.2l-2.4 10L17 8.5H9.3L12 0z" fill="#c2ef4e" />
    </svg>
  )
}

const STATS = [
  { big: '$38', lbl: 'Average cost per lead for roofing clients (industry avg: $120+)' },
  { big: '48h', lbl: 'From kickoff to first campaigns live' },
  { big: '0', lbl: 'Retainer. We earn on performance, not promises' },
]

const VERTICALS = [
  { label: 'roofing', alt: false },
  { label: 'HVAC', alt: true },
  { label: 'plumbing', alt: false },
  { label: 'windows & doors', alt: true },
]

const STEPS = [
  { title: 'Audit', body: "We tear down your current ads, tracking and landing pages. Free, even if you never hire us." },
  { title: 'Launch', body: 'Campaigns live within 48 hours: tight geo-targeting, negative keywords, call tracking.' },
  { title: 'Optimize', body: 'Weekly bid, budget and creative iterations. You see every number we see.' },
  { title: 'Scale', body: "When CPL is stable, we scale spend 20% at a time — never blowing up what works." },
]

export default function App() {
  return (
    <div className="wrap">
      <header>
        <div className="wordmark">
          <Logo />
          <span className="name"><b>Storm</b>&nbsp;<span>Digital</span></span>
        </div>
        <a className="btn ghost" href="audit.html">Free audit</a>
      </header>

      <section className="hero">
        <StormCanvas />
        <div className="hero-content">
          <div className="eyebrow">Paid Ads · Home Services</div>
          <h1>Booked jobs, not <span className="hl">vanity metrics</span>.</h1>
          <p>Meta + Google Ads for roofing, HVAC, plumbing and window contractors. We get paid when your phone rings — no retainer.</p>
          <div className="hero-actions">
            <a className="btn" href="https://cal.com/guido-carminatti-wvudqi/15min">Book a 15-min call</a>
            <a className="btn ghost" href="audit.html">Get a free account audit</a>
          </div>
        </div>
      </section>

      <section>
        <div className="eyebrow">Results</div>
        <h2>What 90 days looks like</h2>
        <div className="stats">
          {STATS.map((s) => (
            <div className="card" key={s.big}>
              <div className="big">{s.big}</div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="eyebrow">Who we work with</div>
        <h2>Verticals we know cold</h2>
        <div className="verts">
          {VERTICALS.map((v) => (
            <span className={`chip${v.alt ? ' alt' : ''}`} key={v.label}>{v.label}</span>
          ))}
        </div>
      </section>

      <section>
        <div className="eyebrow">How it works</div>
        <h2>Four steps, no fluff</h2>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="card step-card" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="eyebrow">Clients</div>
        <h2>In their words</h2>
        <blockquote>
          "First month we booked more estimates from ads than the previous quarter combined."
          <footer>— HVAC owner, Texas</footer>
        </blockquote>
      </section>

      <section>
        <div className="cta">
          <h2>Get your free account audit</h2>
          <p>We'll find the wasted spend in your account in 48 hours. No call required, no obligation.</p>
          <a className="btn" href="audit.html">Request the audit</a>
        </div>
      </section>

      <footer className="site">
        <span className="mono">storm.mkt.agency</span>
        <span>© 2026 Storm Digital</span>
      </footer>
    </div>
  )
}
