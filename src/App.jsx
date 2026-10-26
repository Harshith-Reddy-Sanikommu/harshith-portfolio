
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Code2,
  Database,
  ExternalLink,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'

import initialPortfolio from './data/portfolio'
import './App.css'
import './App.editor.css'

const PortfolioContext = createContext(null)

function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) throw new Error('Portfolio components must be rendered inside PortfolioContext')
  return context
}

function GithubIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function LinkedinIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.53v16.94c0 .85.69 1.53 1.55 1.53h16.9c.86 0 1.55-.68 1.55-1.53V3.53c0-.85-.69-1.53-1.55-1.53ZM8.01 18.46H5.03V9.07h2.98v9.39ZM6.52 7.79a1.73 1.73 0 1 1 0-3.46 1.73 1.73 0 0 1 0 3.46Zm11.94 10.67h-2.97v-4.57c0-1.09-.02-2.49-1.52-2.49-1.52 0-1.75 1.19-1.75 2.41v4.65H9.25V9.07h2.85v1.28h.04c.4-.73 1.37-1.5 2.82-1.5 3.01 0 3.57 1.98 3.57 4.55v5.06h-.07Z" />
    </svg>
  )
}

const categories = [
  'All',
  'Full Stack',
  'AI / Machine Learning',
  'Data Analytics',
]

const categoryIcons = {
  'Full Stack': Code2,
  'AI / Machine Learning': BrainCircuit,
  'Data Analytics': Database,
}

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, accent, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">
        <span className="eyebrow-dot" />
        {eyebrow}
      </span>

      <h2>
        {title} <span className="gradient-text">{accent}</span>
      </h2>

      {description && <p>{description}</p>}
    </div>
  )
}

function Navbar({ onEdit }) {
  const { data } = usePortfolio()
  const [open, setOpen] = useState(false)

  const links = [
    ['About', '#about'],
    ['Skills', '#skills'],
    ['Projects', '#projects'],
    ['Experience', '#experience'],
    ['Contact', '#contact'],
  ]

  return (
    <header className="navbar">
      <a className="brand" href="#home" onClick={() => setOpen(false)}>
        <span className="brand-mark">
          H<span>.</span>
        </span>

        <span>
          {data.name.toUpperCase()}<span className="brand-muted"> / PORTFOLIO</span>
        </span>
      </a>

      <button
        className="mobile-menu"
        onClick={() => setOpen(previous => !previous)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>

      <nav className={open ? 'nav-links nav-open' : 'nav-links'}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}

        <button
          className="nav-edit portfolio-edit-button"
          type="button"
          onClick={() => {
            setOpen(false)
            onEdit()
          }}
        >
          Edit Portfolio <Code2 size={15} />
        </button>
        <a
          className="nav-edit"
          href="#contact"
          onClick={() => setOpen(false)}
        >
          Let's talk <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  )
}

function Hero() {
  const { data } = usePortfolio()
  const [focusIndex, setFocusIndex] = useState(0)
  const focusPairs = [
    { topTitle: 'AI / ML', topDescription: 'Intelligent solutions', bottomTitle: 'Full Stack', bottomDescription: 'End-to-end applications' },
    { topTitle: 'Data Science', topDescription: 'Insights from data', bottomTitle: 'Software Development', bottomDescription: 'Building reliable software' },
  ]

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setFocusIndex(index => (index + 1) % focusPairs.length)
    }, 2800)
    return () => window.clearInterval(intervalId)
  }, [])

  const currentFocus = focusPairs[focusIndex]

  return (
    <section className="hero section-shell" id="home">
      <div className="hero-grid">
        <div className="hero-copy">
          <Reveal>
            <div className="availability">
              <span className="availability-dot" />
              OPEN TO PAID INTERNSHIPS & ENTRY-LEVEL OPPORTUNITIES
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1>
              Turning ideas
              <br />
              into <span className="gradient-text">digital reality.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="hero-description">
              I'm <strong>{data.name}</strong>, a Computer Science and Data Science
              undergraduate focused on full-stack development, software engineering,
              AI/ML, and data science. I build practical applications that combine
              thoughtful user experiences, reliable backend systems, and data-driven
              solutions.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="hero-actions">
              <a href="#projects" className="button-primary">
                Explore my work <ArrowDownRight size={18} />
              </a>

              <a href="#contact" className="button-secondary">
                Get in touch <ArrowUpRight size={17} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="hero-socials">
              <a href={data.github} target="_blank" rel="noreferrer">
                <GithubIcon size={17} />
                GitHub
              </a>

              <a href={data.linkedin} target="_blank" rel="noreferrer">
                <LinkedinIcon size={17} />
                LinkedIn
              </a>

              <span className="social-divider" />
              <span className="location-label">Based in {data.location}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="hero-art-wrap">
          <div className="hero-art">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-orbit orbit-three" />

            <motion.div
              className="art-core"
              animate={{ y: [0, -9, 0], rotate: [0, 3, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="core-icon">
                <Code2 size={52} strokeWidth={1.3} />
              </div>
              <span className="core-caption">BUILD · CREATE · REPEAT</span>
            </motion.div>

            <motion.div
              className="float-card float-card-top"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="float-icon purple">
                <BrainCircuit size={19} />
              </span>
              <span>
                <strong>{currentFocus.topTitle}</strong>
                <small>{currentFocus.topDescription}</small>
              </span>
            </motion.div>

            <motion.div
              className="float-card float-card-bottom"
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity }}
            >
              <span className="float-icon cyan">
                <Layers3 size={19} />
              </span>
              <span>
                <strong>{currentFocus.bottomTitle}</strong>
                <small>{currentFocus.bottomDescription}</small>
              </span>
            </motion.div>

            <div className="art-spark spark-one">
              <Sparkles size={18} />
            </div>

            <div className="art-spark spark-two">
              <Zap size={17} />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="hero-bottom">
        <span>SCROLL TO EXPLORE</span>
        <a href="#about" aria-label="Scroll to about">
          <ArrowDown size={17} />
        </a>
        <span className="hero-bottom-line" />
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section-shell section-pad" id="about">
      <Reveal>
        <SectionHeading
          eyebrow="A LITTLE ABOUT ME"
          title="Developer by mindset."
          accent="Builder by nature."
          description="Curiosity drives me. Building real things keeps me going."
        />
      </Reveal>

      <div className="about-grid">
        <Reveal className="about-main">
          <div className="about-card glass-card">
            <div className="about-card-icon">
              <Sparkles size={22} />
            </div>

            <h3>Making technology feel useful.</h3>

            <p>
              I'm a Computer Science and Data Science undergraduate at KITS,
              Warangal, graduating in 2027. I enjoy taking ideas from a rough
              concept to a working application — from the interface users see
              to the backend logic that powers it.
            </p>

            <p>
              My interests span full-stack development, software development, AI/ML,
              machine learning, data science, and data analytics. I focus on
              hands-on projects, practical problem-solving, and writing software
              that is clear, functional, and useful.
            </p>

            <a href="#contact" className="text-link">
              Let's build something <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>

        <div className="about-side">
          <Reveal delay={0.08}>
            <div className="mini-info-card glass-card">
              <div className="mini-icon purple">
                <GraduationCap size={21} />
              </div>
              <div>
                <span className="mini-label">EDUCATION</span>
                <h4>B.Tech · CSE (Data Science)</h4>
                <p>KITS Warangal · 2023–2027</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mini-info-card glass-card">
              <div className="mini-icon cyan">
                <BriefcaseBusiness size={20} />
              </div>
              <div>
                <span className="mini-label">EXPERIENCE</span>
                <h4>MERN Stack Engineer Intern</h4>
                <p>Blackbucks Education · 2026</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mini-info-card glass-card">
              <div className="mini-icon pink">
                <Monitor size={20} />
              </div>
              <div>
                <span className="mini-label">WHAT I BUILD</span>
                <h4>Web apps, ML & AI tools</h4>
                <p>From concept to deployment</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const { data } = usePortfolio()
  const skillIcons = [Code2, Layers3, Database, BrainCircuit, Zap]

  return (
    <section className="section-shell section-pad" id="skills">
      <Reveal>
        <SectionHeading
          eyebrow="MY TOOLKIT"
          title="Skills that turn"
          accent="ideas into products."
          description="Technologies I use to build, connect, and ship applications."
        />
      </Reveal>

      <div className="skills-grid">
        {data.skills.map((group, index) => {
          const Icon = skillIcons[index] || Code2

          return (
            <Reveal key={group.category} delay={index * 0.06}>
              <div className="skill-card glass-card">
                <div className="skill-card-top">
                  <span className={`skill-icon skill-icon-${index}`}>
                    <Icon size={21} />
                  </span>
                  <span className="skill-count">
                    {String(group.items.length).padStart(2, '0')} TOOLS
                  </span>
                </div>

                <h3>{group.category}</h3>

                <div className="skill-tags">
                  {group.items.map(skill => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function Projects() {
  const { data } = usePortfolio()
  const [active, setActive] = useState('All')

  const projects = useMemo(
    () =>
      data.projects.filter(
        project => active === 'All' || project.category === active,
      ),
    [active],
  )

  return (
    <section className="section-shell section-pad" id="projects">
      <Reveal>
        <SectionHeading
          eyebrow="SELECTED WORK"
          title="Ideas made"
          accent="real."
          description="Academic and personal projects built to explore ideas and solve practical problems."
        />
      </Reveal>

      <Reveal>
        <div className="project-filters">
          {categories.map(category => (
            <button
              key={category}
              className={
                active === category
                  ? 'filter-button filter-active'
                  : 'filter-button'
              }
              onClick={() => setActive(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="projects-grid">
        {projects.map((project, index) => {
          const Icon = categoryIcons[project.category] || Code2

          return (
            <Reveal key={project.title} delay={(index % 2) * 0.08}>
              <motion.article
                className="project-card glass-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="project-visual">
                  <div className="project-visual-glow" />

                  <span className="project-visual-icon">
                    <Icon size={36} strokeWidth={1.3} />
                  </span>

                  <span className="project-number">
                    {String(
                      data.projects.indexOf(project) + 1,
                    ).padStart(2, '0')}
                  </span>

                  <span className="project-type">{project.type}</span>
                </div>

                <div className="project-body">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-tech">
                    {project.tech.map(tech => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GithubIcon size={16} />
                      Source code
                      <ArrowUpRight size={14} />
                    </a>

                    <a href={project.live} target="_blank" rel="noreferrer">
                      <ExternalLink size={15} />
                      Live demo
                    </a>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section-shell section-pad" id="experience">
      <Reveal>
        <SectionHeading
          eyebrow="THE JOURNEY"
          title="Experience &"
          accent="education."
          description="Building a strong foundation through study, internships, and hands-on projects."
        />
      </Reveal>

      <div className="timeline">
        <Reveal>
          <div className="timeline-item">
            <span className="timeline-dot" />

            <div className="timeline-date">APR 2026 — JUL 2026</div>

            <div className="timeline-card glass-card">
              <span className="timeline-type">INTERNSHIP</span>
              <h3>MERN Stack Engineer Intern</h3>
              <h4>Blackbucks Education Pvt. Ltd.</h4>

              <p>
                Developed full-stack application features using React,
                Node.js, Express.js, and MongoDB. Worked on reusable UI
                components, REST API integration, backend functionality, and
                deployment.
              </p>

              <div className="project-tech">
                <span>React.js</span>
                <span>Node.js</span>
                <span>Express.js</span>
                <span>MongoDB</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="timeline-item">
            <span className="timeline-dot cyan-dot" />

            <div className="timeline-date">2023 — 2027</div>

            <div className="timeline-card glass-card">
              <span className="timeline-type">UNDERGRADUATE DEGREE</span>
              <h3>B.Tech — Computer Science & Engineering</h3>
              <h4>Data Science · KITS, Warangal</h4>

              <p>
                Focused on software development, data science, algorithms,
                databases, and applied AI/ML. Current CGPA: 8.3/10.
              </p>

              <div className="project-tech">
                <span>Computer Science</span>
                <span>Data Science</span>
                <span>AI / ML</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  const { data } = usePortfolio()
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(data.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${data.email}`
    }
  }

  return (
    <section className="section-shell contact-section" id="contact">
      <Reveal>
        <div className="contact-card">
          <div className="contact-glow" />

          <span className="eyebrow">
            <span className="eyebrow-dot" />
            HAVE AN OPPORTUNITY?
          </span>

          <h2>
            Let's create something
            <br />
            <span className="gradient-text">meaningful together.</span>
          </h2>

          <p>
            I'm seeking paid internship and entry-level opportunities in full-stack
            development, software engineering, AI/ML, and data science. I'd welcome
            the opportunity to contribute to a team, solve meaningful problems, and
            build useful technology through real-world experience.
          </p>

          <div className="contact-actions">
            <a
              className="button-primary"
              href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(data.email)}&su=${encodeURIComponent('Paid Internship / Entry-Level Opportunity')}`}
              target="_blank"
              rel="noreferrer"
            >
              <Mail size={17} />
              Email me
              <ArrowUpRight size={16} />
            </a>

            <button className="button-secondary" onClick={copyEmail}>
              {copied ? <Check size={16} /> : <Code2 size={16} />}
              {copied ? 'Copied email' : 'Copy email'}
            </button>
          </div>

          <div className="contact-details">
            <a
              href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(data.email)}&su=${encodeURIComponent('Paid Internship / Entry-Level Opportunity')}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`Email ${data.email}`}
            >
              <Mail size={15} />
              {data.email}
            </a>
            {data.phone && (
              <a href={`tel:${data.phone.replace(/[^\d+]/g, '')}`} aria-label={`Call ${data.phone}`}>
                <Phone size={15} />
                {data.phone}
              </a>
            )}
            <span className="contact-detail-location">
              <MapPin size={15} aria-hidden="true" />
              {data.location}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  const { data } = usePortfolio()
  return (
    <footer className="footer section-shell">
      <a className="brand" href="#home">
        <span className="brand-mark">
          H<span>.</span>
        </span>

        <span>
          {data.name.toUpperCase()}<span className="brand-muted"> / PORTFOLIO</span>
        </span>
      </a>

      <span>Designed with intention. Built with code.</span>

      <a className="back-top" href="#home">
        BACK TO TOP <ArrowUpRight size={14} />
      </a>

      <div className="footer-bottom">
        © {new Date().getFullYear()} {data.name}. All rights reserved.
      </div>
    </footer>
  )
}

function PortfolioEditor({ initialData, onClose, onSave }) {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(initialData)))
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [draftText, setDraftText] = useState(() => JSON.stringify(initialData, null, 2))
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  function updateField(field, value) {
    setDraft(previous => ({ ...previous, [field]: value }))
    setStatus('')
    setError('')
  }

  function updateSkillCategory(index, field, value) {
    setDraft(previous => ({
      ...previous,
      skills: previous.skills.map((skill, i) => i === index
        ? { ...skill, [field]: field === 'items' ? value.split(',').map(item => item.trim()).filter(Boolean) : value }
        : skill),
    }))
    setStatus('')
    setError('')
  }

  function updateProject(index, field, value) {
    setDraft(previous => ({
      ...previous,
      projects: previous.projects.map((project, i) => i === index
        ? { ...project, [field]: field === 'tech' ? value.split(',').map(item => item.trim()).filter(Boolean) : value }
        : project),
    }))
    setStatus('')
    setError('')
  }

  function addSkillCategory() {
    setDraft(previous => ({ ...previous, skills: [...previous.skills, { category: 'New Category', items: [] }] }))
  }

  function removeSkillCategory(index) {
    setDraft(previous => ({ ...previous, skills: previous.skills.filter((_, i) => i !== index) }))
  }

  function addProject() {
    setDraft(previous => ({
      ...previous,
      projects: [...previous.projects, {
        title: 'New Project', category: 'Full Stack', type: 'Personal Project', description: '', tech: [], github: '', live: '',
      }],
    }))
  }

  function removeProject(index) {
    setDraft(previous => ({ ...previous, projects: previous.projects.filter((_, i) => i !== index) }))
  }

  async function authenticate(event) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      const response = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const result = await response.json().catch(() => ({}))
      const isAuthenticated = result.authenticated === true || result.success === true
      if (!response.ok || !isAuthenticated) {
        setError(result.message || 'Incorrect password. Please try again.')
        return
      }
      setAuthenticated(true)
      setPassword('')
    } catch {
      setError('Could not reach the password-verification endpoint. Run locally with Vercel CLI or deploy to Vercel.')
    } finally {
      setBusy(false)
    }
  }

  function getValidatedDraft() {
    const candidate = showAdvanced ? (() => {
      try { return JSON.parse(draftText) } catch { throw new Error('The advanced JSON has invalid syntax. Fix it or switch back to the visual editor.') }
    })() : draft

    if (!candidate || typeof candidate !== 'object' || !Array.isArray(candidate.projects) || !Array.isArray(candidate.skills)) {
      setError('Portfolio data must include both skills and projects lists.')
      return null
    }
    if (!candidate.name || !candidate.email) {
      setError('Please provide at least your name and email address.')
      return null
    }
    return candidate
  }

  function saveDraft() {
    setError('')
    const parsed = getValidatedDraft()
    if (!parsed) return
    try {
      localStorage.setItem('harshith-portfolio-draft', JSON.stringify(parsed))
      onSave(parsed)
      setDraft(JSON.parse(JSON.stringify(parsed)))
      setDraftText(JSON.stringify(parsed, null, 2))
      setStatus('Draft saved in this browser and applied to this preview. Export and redeploy to publish changes for everyone.')
    } catch {
      setError('Could not save this draft in your browser.')
    }
  }

  function exportDraft() {
    setError('')
    const parsed = getValidatedDraft()
    if (!parsed) return
    const jsContent = `const portfolio = ${JSON.stringify(parsed, null, 2)}\n\nexport default portfolio\n`
    const blob = new Blob([jsContent], { type: 'text/javascript;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'portfolio.js'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
    setStatus('Exported portfolio.js. Replace src/data/portfolio.js with the downloaded file, then redeploy to publish changes.')
  }

  function switchAdvanced() {
    if (!showAdvanced) setDraftText(JSON.stringify(draft, null, 2))
    else {
      try {
        const parsed = JSON.parse(draftText)
        if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.projects) || !Array.isArray(parsed.skills)) {
          setError('JSON must contain skills and projects arrays before switching to visual editor.')
          return
        }
        setDraft(parsed)
      } catch {
        setError('The advanced JSON has invalid syntax. Fix it before switching to the visual editor.')
        return
      }
    }
    setShowAdvanced(value => !value)
    setError('')
    setStatus('')
  }

  const input = (label, value, onChange, options = {}) => (
    <label className={`visual-field ${options.wide ? 'visual-field-wide' : ''}`}>
      <span>{label}</span>
      {options.multiline ? (
        <textarea value={value ?? ''} onChange={event => onChange(event.target.value)} rows={options.rows || 3} placeholder={options.placeholder || ''} />
      ) : (
        <input type="text" value={value ?? ''} onChange={event => onChange(event.target.value)} placeholder={options.placeholder || ''} />
      )}
    </label>
  )

  return (
    <div className="portfolio-editor-backdrop" role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="portfolio-editor glass-card" role="dialog" aria-modal="true" aria-labelledby="portfolio-editor-title">
        <div className="portfolio-editor-header">
          <div>
            <span className="eyebrow"><span className="eyebrow-dot" /> PRIVATE CONTROLS</span>
            <h2 id="portfolio-editor-title">Portfolio <span className="gradient-text">Editor</span></h2>
            <p>Edit your personal details, skills, and projects using the visual form.</p>
          </div>
          <button className="editor-close" type="button" onClick={onClose} aria-label="Close editor"><X size={21} /></button>
        </div>

        {!authenticated ? (
          <form className="editor-auth-form" onSubmit={authenticate}>
            <label htmlFor="portfolio-admin-password">Admin password</label>
            <input
              id="portfolio-admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Enter your editor password"
              required
            />
            <button className="button-primary editor-action" type="submit" disabled={busy}>
              {busy ? 'Verifying…' : 'Unlock editor'} <ArrowUpRight size={16} />
            </button>
            <p className="editor-hint">The password is verified by a server endpoint and is not stored in the browser.</p>
          </form>
        ) : (
          <div className="editor-workspace">
            <div className="editor-notice">
              <strong>Visual portfolio editor</strong>
              <span>Update fields below, add or remove skill groups and projects, then save a local draft or export your portfolio data. Publishing still requires redeploying your site.</span>
            </div>

            {!showAdvanced && (
              <>
            <div className="editor-section">
              <div className="editor-section-heading"><h3>Personal details</h3><span>Contact and profile links</span></div>
              <div className="visual-fields-grid">
                {input('Full name', draft.name, value => updateField('name', value))}
                {input('Email address', draft.email, value => updateField('email', value))}
                {input('Phone', draft.phone, value => updateField('phone', value))}
                {input('Location', draft.location, value => updateField('location', value))}
                {input('GitHub URL', draft.github, value => updateField('github', value), { wide: true })}
                {input('LinkedIn URL', draft.linkedin, value => updateField('linkedin', value), { wide: true })}
              </div>
            </div>

            <div className="editor-section">
              <div className="editor-section-heading">
                <div><h3>Skills</h3><span>Group related technologies together</span></div>
                <button className="editor-small-button" type="button" onClick={addSkillCategory}>+ Add skill group</button>
              </div>
              {draft.skills.map((skill, index) => (
                <div className="editor-repeat-card" key={`skill-${index}`}>
                  <div className="editor-repeat-header"><strong>Skill group {index + 1}</strong><button className="editor-remove-button" type="button" onClick={() => removeSkillCategory(index)}>Remove</button></div>
                  <div className="visual-fields-grid">
                    {input('Category name', skill.category, value => updateSkillCategory(index, 'category', value))}
                    {input('Skills (comma-separated)', (skill.items || []).join(', '), value => updateSkillCategory(index, 'items', value), { wide: true, placeholder: 'React.js, JavaScript, HTML, CSS' })}
                  </div>
                </div>
              ))}
            </div>

            <div className="editor-section">
              <div className="editor-section-heading">
                <div><h3>Projects</h3><span>Project details and links</span></div>
                <button className="editor-small-button" type="button" onClick={addProject}>+ Add project</button>
              </div>
              {draft.projects.map((project, index) => (
                <div className="editor-repeat-card" key={`project-${index}`}>
                  <div className="editor-repeat-header"><strong>Project {index + 1}: {project.title || 'Untitled'}</strong><button className="editor-remove-button" type="button" onClick={() => removeProject(index)}>Remove</button></div>
                  <div className="visual-fields-grid">
                    {input('Project title', project.title, value => updateProject(index, 'title', value))}
                    {input('Category', project.category, value => updateProject(index, 'category', value), { placeholder: 'Full Stack, AI / Machine Learning…' })}
                    {input('Project type', project.type, value => updateProject(index, 'type', value), { placeholder: 'Personal Project' })}
                    {input('Technologies (comma-separated)', (project.tech || []).join(', '), value => updateProject(index, 'tech', value), { wide: true, placeholder: 'React.js, Node.js, MongoDB' })}
                    {input('Description', project.description, value => updateProject(index, 'description', value), { wide: true, multiline: true, rows: 3 })}
                    {input('GitHub URL', project.github, value => updateProject(index, 'github', value), { wide: true })}
                    {input('Live demo URL', project.live, value => updateProject(index, 'live', value), { wide: true })}
                  </div>
                </div>
              ))}
            </div>

              </>
            )}

            <div className="editor-advanced-toggle">
              <button className="button-secondary" type="button" onClick={switchAdvanced}>{showAdvanced ? 'Switch to visual editor' : 'Advanced JSON editor'}</button>
              <span>Optional: edit the full data structure directly.</span>
            </div>
            {showAdvanced && (
              <textarea
                className="portfolio-json-editor"
                value={draftText}
                onChange={event => { setDraftText(event.target.value); setStatus(''); setError('') }}
                spellCheck="false"
                aria-label="Advanced portfolio JSON editor"
              />
            )}

            <div className="editor-actions">
              <button className="button-secondary" type="button" onClick={saveDraft}>Save local draft</button>
              <button className="button-primary" type="button" onClick={exportDraft}>Export portfolio.js <ArrowUpRight size={16} /></button>
            </div>
            <p className="editor-hint">Local drafts are saved only in this browser. Export the file, replace src/data/portfolio.js, and redeploy to publish changes for everyone.</p>
          </div>
        )}

        {error && <p className="editor-message editor-error" role="alert">{error}</p>}
        {status && <p className="editor-message editor-success" role="status">{status}</p>}
      </section>
    </div>
  )
}

export default function App() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('harshith-portfolio-draft')
      return saved ? { ...initialPortfolio, ...JSON.parse(saved) } : initialPortfolio
    } catch {
      return initialPortfolio
    }
  })
  const [editorOpen, setEditorOpen] = useState(false)

  return (
    <PortfolioContext.Provider value={{ data, setData }}>
      <div className="app">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />

        <Navbar onEdit={() => setEditorOpen(true)} />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <Footer />

        {editorOpen && (
          <PortfolioEditor
            initialData={data}
            onClose={() => setEditorOpen(false)}
            onSave={setData}
          />
        )}
      </div>
    </PortfolioContext.Provider>
  )
}
