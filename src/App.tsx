import { useEffect } from 'react'
import './App.css'

const base = import.meta.env.BASE_URL

const roles = [
  'Systems Security Engineer',
  'Cybersecurity Enthusiast',
  'Software Developer',
  'Problem Solver',
]

const navItems = ['About', 'Skills', 'Education', 'Experience', 'Projects', 'Writeups', 'Contact']

const skills = [
  { title: 'Programming', icon: '⌘', items: ['C', 'C++', 'Java', 'Kotlin', 'Python', 'SQL'] },
  { title: 'Mobile & UI', icon: '◈', items: ['Jetpack Compose', 'Kotlin', 'Interface Logic'] },
  { title: 'Databases', icon: '▣', items: ['MySQL', 'PostgreSQL', 'Relational Modeling'] },
  { title: 'Security Concepts', icon: '⚿', items: ['Cybersecurity', 'Networking', 'Access Control'] },
]

const projects = [
  {
    title: 'Secure Systems Lab',
    image: `${base}project-secure-lab.svg`,
    alt: 'Abstract screenshot of a secure systems dashboard',
    text: 'A learning lab for access control patterns, offline-first deployment ideas, and hardened Linux workflows.',
    learned: 'Practiced threat-aware system boundaries and deployment tradeoffs.',
    github: 'https://github.com/youcef5546',
    label: 'Primary GitHub',
  },
  {
    title: 'Clean Architecture Toolkit',
    image: `${base}project-architecture.svg`,
    alt: 'Abstract screenshot of layered clean architecture modules',
    text: 'Software structure studies using OOP, Java, Kotlin, Python, SQL, and maintainable boundaries for scalable apps.',
    learned: 'Focused on separation of concerns and testable module design.',
    github: 'https://github.com/youcef5546',
    label: 'Primary GitHub',
  },
  {
    title: 'Cyber Network Notes',
    image: `${base}project-network-notes.svg`,
    alt: 'Abstract screenshot of network security notes and nodes',
    text: 'A curated knowledge base around networking, cryptographic licensing, Docker, obfuscation, and security fundamentals.',
    learned: 'Turned internship observations into reusable study references.',
    github: 'https://github.com/youceftalahoubri-cmyk',
    label: 'Secondary GitHub',
  },
]

const writeups = [
  {
    title: 'LAN-only software environments',
    tag: 'Architecture',
    text: 'Notes on why network isolation can reduce attack surface for specialized engineering software deployments.',
  },
  {
    title: 'Hardware-bound licensing',
    tag: 'Cryptography',
    text: 'A concise study entry on device identity, cryptographic key exchange, and operational licensing constraints.',
  },
  {
    title: 'Layered Docker access control',
    tag: 'DevSecOps',
    text: 'Observations on container layering, permission boundaries, and hardened offline-first Linux delivery.',
  },
]

function App() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const img = document.querySelector<HTMLImageElement>('.avatar img')
    img?.addEventListener('error', () => img.classList.add('is-hidden'))

    const menuBtn = document.getElementById('menuBtn')
    const mobilePanel = document.getElementById('mobilePanel')

    const toggleMenu = () => {
      const open = mobilePanel?.classList.toggle('open') ?? false
      menuBtn?.setAttribute('aria-expanded', open ? 'true' : 'false')
      if (menuBtn) menuBtn.textContent = open ? '×' : '☰'
    }

    menuBtn?.addEventListener('click', toggleMenu)

    mobilePanel?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobilePanel.classList.remove('open')
        menuBtn?.setAttribute('aria-expanded', 'false')
        if (menuBtn) menuBtn.textContent = '☰'
      })
    })

    const typing = document.getElementById('typing')
    let roleIndex = 0
    let charIndex = 0
    let deleting = false
    let typeTimer = 0

    const type = () => {
      if (!typing) return

      const word = roles[roleIndex]
      typing.textContent = word.slice(0, charIndex)

      if (!deleting && charIndex < word.length) {
        charIndex += 1
      } else if (deleting && charIndex > 0) {
        charIndex -= 1
      } else {
        deleting = !deleting
        if (!deleting) roleIndex = (roleIndex + 1) % roles.length
      }

      typeTimer = window.setTimeout(type, deleting ? 42 : 92 + (charIndex % 4) * 14)
    }

    if (!prefersReduced) {
      type()
    } else if (typing) {
      typing.textContent = roles[0]
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.16 },
    )

    document.querySelectorAll('.reveal,.glass').forEach((el) => observer.observe(el))

    const profile = document.getElementById('profileCard')
    const glow = document.querySelector<HTMLElement>('.cursor-glow')
    const aurora = document.querySelector<HTMLElement>('.aurora')

    const onMouseMove = (event: MouseEvent) => {
      const x = event.clientX
      const y = event.clientY

      if (glow) {
        glow.style.transform = `translate(${x - 180}px,${y - 180}px)`
      }

      if (aurora) {
        aurora.style.setProperty('--mx', `${(x / window.innerWidth) * 100}%`)
        aurora.style.setProperty('--my', `${(y / window.innerHeight) * 100}%`)
      }

      if (profile && window.innerWidth > 900) {
        const rx = (y / window.innerHeight - 0.5) * -8
        const ry = (x / window.innerWidth - 0.5) * 10
        profile.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
      }
    }

    document.addEventListener('mousemove', onMouseMove)

    const canvas = document.getElementById('particles') as HTMLCanvasElement | null
    let animationFrame = 0
    let removeResize = () => {}

    if (canvas && !prefersReduced) {
      const ctx = canvas.getContext('2d')
      let width = 0
      let height = 0
      let dpr = 1

      let parts: Array<{
        x: number
        y: number
        vx: number
        vy: number
        s: number
        a: number
        phase: number
        i: number
      }> = []

      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2)
        width = canvas.width = window.innerWidth * dpr
        height = canvas.height = window.innerHeight * dpr

        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`

        parts = Array.from({ length: 90 }, (_, i) => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35 * dpr,
          vy: (Math.random() - 0.5) * 0.35 * dpr,
          s: (Math.random() * 2 + 1) * dpr,
          a: Math.random() * 0.65 + 0.18,
          phase: Math.random() * Math.PI * 2,
          i,
        }))
      }

      const loop = (time: number) => {
        if (!ctx) return

        ctx.clearRect(0, 0, width, height)

        for (const p of parts) {
          p.x += p.vx
          p.y += p.vy

          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1

          ctx.beginPath()
          ctx.fillStyle =
            p.i % 3
              ? `rgba(6,182,212,${p.a * 0.55})`
              : `rgba(123,47,190,${p.a * 0.55})`

          ctx.arc(
            p.x + Math.sin(time * 0.001 + p.phase) * 10 * dpr,
            p.y,
            p.s,
            0,
            Math.PI * 2,
          )

          ctx.fill()
        }

        animationFrame = requestAnimationFrame(loop)
      }

      resize()

      window.addEventListener('resize', resize)

      removeResize = () => window.removeEventListener('resize', resize)

      animationFrame = requestAnimationFrame(loop)
    }

    return () => {
      window.clearTimeout(typeTimer)
      observer.disconnect()
      document.removeEventListener('mousemove', onMouseMove)
      menuBtn?.removeEventListener('click', toggleMenu)
      cancelAnimationFrame(animationFrame)
      removeResize()
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to portfolio
      </a>

      <div className="aurora" aria-hidden="true" />
      <canvas id="particles" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />

      <header className="nav" aria-label="Primary navigation">
        <a className="brand" href="#hero" aria-label="Talahoubri Youcef home">
          <span className="brand-mark">TY</span>
          <span>Talahoubri Youcef</span>
        </a>

        <nav className="nav-links" aria-label="Desktop navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="menu-btn"
            id="menuBtn"
            aria-label="Open menu"
            aria-expanded="false"
          >
            ☰
          </button>
        </div>
      </header>

      <nav className="mobile-panel" id="mobilePanel" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>

      <main id="main">
        <section className="hero" id="hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <div className="kicker">
                <span className="pulse" /> Algiers, Algeria · ENSTA
              </div>

              <h1>
                <span className="gradient-text">Systems</span>
                <br />
                Security
                <br />
                Portfolio
              </h1>

              <p className="hero-lead">
                I am Talahoubri Youcef, a third-year Systems Security Engineering
                student at ENSTA, building reliable software foundations and
                studying the security architecture behind hardened, offline-first
                environments.
              </p>

              <div className="type-line" aria-live="polite">
                I build as a <span id="typing">Systems Security Engineer</span>
                <i />
              </div>

              <p className="current-line">
                <strong>Currently learning:</strong> secure Linux hardening,
                applied networking labs, and disciplined software architecture for
                security-sensitive systems.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#projects">
                  Explore Work
                </a>

                <a
                  className="btn btn-ghost"
                  href="mailto:youceftalahoubri@gmail.com"
                >
                  Start a Conversation
                </a>

                <a
                  className="btn btn-ghost"
                  href={`${base}resume-talahoubri-youcef.pdf`}
                  download
                >
                  Download Resume PDF
                </a>
              </div>

              <div className="stats">
                <div className="stat">
                  <strong>3rd</strong>
                  <span>Engineering Year</span>
                </div>

                <div className="stat">
                  <strong>B2</strong>
                  <span>English & French</span>
                </div>

                <div className="stat">
                  <strong>2026</strong>
                  <span>Security Internship</span>
                </div>
              </div>
            </div>

            <div className="profile-stage reveal" aria-label="Animated profile card">
              <article className="profile-card cinematic-profile" id="profileCard">
                <div className="data-streams" aria-hidden="true">
                  <span>
                    01001100 01100001 01101110 · ACCESS_GRANTED · 101101
                  </span>
                  <span>
                    SECURITY_SCAN -- ENSTA -- SYSTEMS_SECURITY -- 2026
                  </span>
                  <span>
                    LAN_ONLY // HARDENED_LINUX // CRYPTO_KEY_EXCHANGE
                  </span>
                </div>

                <div className="profile-frame">
                  <div className="scan-name">Talahoubri Youcef</div>

                  <div className="avatar">
                    <img
                      src={`${base}profile-picture.jpg`}
                      alt="Profile picture of Talahoubri Youcef from GitHub profile youceftalahoubri-cmyk"
                      loading="eager"
                    />
                    <span aria-hidden="true">TY</span>
                  </div>

                  <div className="profile-info">
                    <p className="type-card-line line-one">
                      Systems Security Engineering Student
                    </p>

                    <p className="type-card-line line-two">
                      Networking · Clean Architecture
                    </p>

                    <p className="type-card-line line-three">
                      Status: profile parsed and validated
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <div className="divider" />

        <section id="about">
          <div className="container">
            <div className="section-head reveal">
              <h2>About Me</h2>
              <p>
                A security-minded engineering profile with a software developer's
                craft, focused on practical systems, defensive thinking, and clean
                implementation.
              </p>
            </div>

            <div className="cards">
              <article className="glass card-pad about-card reveal">
                <h3>Profile</h3>

                <p>
                  Based in Algiers, Algeria, I study Systems Security at ENSTA
                  (École Nationale Supérieure des Technologies Avancées). My work
                  connects low-level programming, modern application development,
                  networking fundamentals, and cybersecurity concepts into a
                  disciplined engineering practice.
                </p>

                <div className="bio-list">
                  <div>
                    <strong>Role</strong>
                    <span>Systems Security Engineering Student</span>
                  </div>

                  <div>
                    <strong>School</strong>
                    <span>ENSTA</span>
                  </div>

                  <div>
                    <strong>Specialization</strong>
                    <span>Systems Security</span>
                  </div>

                  <div>
                    <strong>Education</strong>
                    <span>Engineering Degree, 3rd Year</span>
                  </div>
                </div>
              </article>

              <article className="glass card-pad reveal">
                <h3>Languages</h3>

                <div className="language">
                  <div>
                    <strong>Arabic</strong>
                    <span>Native</span>
                  </div>

                  <div>
                    <strong>English</strong>
                    <span>B2</span>
                  </div>

                  <div>
                    <strong>French</strong>
                    <span>B2</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="container">
            <div className="section-head reveal">
              <h2>Skills</h2>
              <p>
                Practical tools and concepts grouped as verifiable technology
                chips instead of arbitrary percentage scores.
              </p>
            </div>

            <div className="skills-grid">
              {skills.map((skill) => (
                <article className="glass skill reveal" key={skill.title}>
                  <div className="skill-top">
                    <span className="skill-icon">{skill.icon}</span>
                  </div>

                  <strong>{skill.title}</strong>

                  <div className="badges skill-badges">
                    {skill.items.map((item) => (
                      <span className="badge" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="badges reveal all-badges">
              <span className="badge">Cybersecurity</span>
              <span className="badge">Networking</span>
              <span className="badge">OOP</span>
              <span className="badge">Clean Architecture</span>
              <span className="badge">Git</span>
              <span className="badge">GitHub</span>
              <span className="badge">Docker Concepts</span>
              <span className="badge">Linux Hardening</span>
            </div>
          </div>
        </section>

        <section id="education">
          <div className="container">
            <div className="section-head reveal">
              <h2>Education</h2>
              <p>
                Formal engineering training in advanced technologies with
                specialization in systems security.
              </p>
            </div>

            <article className="glass timeline-item reveal">
              <div className="date">Current · 3rd Year</div>

              <div>
                <h3>Engineering Degree — Systems Security</h3>

                <p>
                  ENSTA — École Nationale Supérieure des Technologies Avancées
                </p>

                <ul>
                  <li>Specialization in Systems Security.</li>
                  <li>
                    Engineering curriculum spanning programming, systems thinking,
                    networking, databases, and secure architectures.
                  </li>
                  <li>Location: Algiers, Algeria.</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section id="experience">
          <div className="container">
            <div className="section-head reveal">
              <h2>Experience</h2>
              <p>
                Institutional exposure to cybersecurity architecture inside a
                petroleum engineering software environment.
              </p>
            </div>

            <div className="timeline">
              <article className="glass timeline-item reveal">
                <div className="date">April 2026</div>

                <div>
                  <h3>
                    Institutional Discovery Internship — HDSS / WELLEDGE
                    Technologies LLC
                  </h3>

                  <p>
                    Observed security and deployment architecture for specialized
                    petroleum engineering software.
                  </p>

                  <ul>
                    <li>
                      Cybersecurity architecture in a petroleum engineering
                      software company.
                    </li>
                    <li>Network isolation through LAN-only environments.</li>
                    <li>
                      Hardware-bound software licensing with cryptographic key
                      exchange.
                    </li>
                    <li>Docker-based layered access control.</li>
                    <li>ProGuard code obfuscation.</li>
                    <li>
                      Offline-first deployment on hardened Linux systems.
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="container">
            <div className="section-head reveal">
              <h2>Projects</h2>
              <p>
                Project cards now show visual previews, learning outcomes, and
                honest GitHub profile routing. Demo buttons were removed until live
                demos exist.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <article
                  className="glass project reveal"
                  key={project.title}
                >
                  <img
                    className="project-visual"
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                  />

                  <div className="project-body">
                    <h3>{project.title}</h3>

                    <p>{project.text}</p>

                    <p className="learned">
                      <strong>What I learned:</strong> {project.learned}
                    </p>

                    <div className="project-actions">
                      <a
                        className="mini-btn"
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.label}
                      </a>

                      <span className="mini-note">Live demo pending</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="writeups">
          <div className="container">
            <div className="section-head reveal">
              <h2>Writeups & Labs</h2>
              <p>
                Short security-focused notes that show how I reason about systems,
                deployment constraints, and defensive architecture.
              </p>
            </div>

            <div className="cards">
              {writeups.map((writeup) => (
                <article
                  className="glass card-pad reveal"
                  key={writeup.title}
                >
                  <span className="writeup-tag">{writeup.tag}</span>

                  <h3>{writeup.title}</h3>

                  <p>{writeup.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="section-head reveal">
              <h2>Contact</h2>
              <p>
                Open to cybersecurity learning opportunities, engineering
                collaboration, and software development conversations.
              </p>
            </div>

            <div className="contact-grid">
              <a
                className="glass contact-link reveal"
                href="mailto:youceftalahoubri@gmail.com"
              >
                <b>Email</b>
                <span>youceftalahoubri@gmail.com</span>
              </a>

              <a
                className="glass contact-link reveal"
                href="tel:+213663686297"
              >
                <b>Phone</b>
                <span>+213 663 686 297</span>
              </a>

              <a
                className="glass contact-link reveal"
                href="https://github.com/youceftalahoubri-cmyk"
                target="_blank"
                rel="noreferrer"
              >
                <b>Profile GitHub</b>
                <span>github.com/youceftalahoubri-cmyk</span>
              </a>

              <a
                className="glass contact-link reveal"
                href="https://github.com/youcef5546"
                target="_blank"
                rel="noreferrer"
              >
                <b>Additional GitHub</b>
                <span>github.com/youcef5546</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} Talahoubri Youcef · Systems Security
          Engineering Student · Algiers, Algeria
        </div>
      </footer>
    </>
  )
}

export default App