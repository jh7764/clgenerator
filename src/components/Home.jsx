import './Home.css'
import React, { useState } from 'react'
import { HiMiniCursorArrowRipple } from "react-icons/hi2"
import { MdOutlineEditNote, MdOutlineAccountCircle } from "react-icons/md"
import { BsFillPaletteFill } from "react-icons/bs"
import { PiExportBold } from "react-icons/pi"
import Templates from './Templates'
import { useNavigate, Link } from 'react-router-dom'




export default function Home(){
  const [showTemplates, setShowTemplates] = useState(false)
  const navigate = useNavigate()
  
  return (
    <div className="home-container">
      <Header />
      <main>
        {showTemplates ? (<Templates />) : (
          <>
            <HeroSection onStart={() => navigate('/templates')} />
            <FeaturesSection />
            <CTASection  onStart={() => navigate('/templates')} />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}


export function Navbar(){
  return(
      <aside className="sidebar">
        <div className="sidebar-header" >
          <label className="sidebar-title">Generator</label>
          <span className="sidebar-subtitle">BUILD YOUR STORY</span>
          <nav className="sidebar-nav">
              
              <a className="sidebar-item" >
                  <button className="sidebar-btn">
                    <HiMiniCursorArrowRipple className="sidebar-icon" size={35} />
                    Selection
                  </button>
              </a>
              <a className="sidebar-item">
                  <button className="sidebar-btn">
                    <MdOutlineEditNote className="sidebar-icon" size={35} />
                    Content 
                  </button>
              </a>
              <a className="sidebar-item">
                  <button className="sidebar-btn">
                    <BsFillPaletteFill className="sidebar-icon" size={32}/>
                    Design      
                  </button>
              </a>
              <a className="sidebar-item">
                  <button className="sidebar-btn">
                    <PiExportBold className="sidebar-icon" size={35} />
                    Export
                  </button>
              </a>
          </nav>
      </div>
    </aside>
  )
}

export function Header() {
  return (
    <header className="header">
      <div className="head">
        <span className="header-logo">Covey</span>
      </div>
      <nav className="header-nav">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/templates">Templates</Link>
        <Link className="nav-link" href="#">History</Link>
      </nav>
      <div className="header-actions">
        <button className="icon-btn">
          <span className="material-symbols-outlined"><MdOutlineAccountCircle/></span>
        </button>
      </div>
    </header>
  )
}

export function HeroSection({ onStart }) {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className="hero-title text-neon-gradient">
          Design Your Story
        </h1>
        <p className="hero-subtitle">
          Stop sending boring applications. Generate electric cover letters that
          reflect your unique vibe in seconds.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary"onClick={onStart} >Get Started</button>
          <button className="btn-secondary">View Demo</button>
        </div>
      </div>

      <div className="hero-visual">
        <div className="preview-card">
          <div className="preview-inner">
            <div className="preview-line-title"></div>
            <div className="preview-line"></div>
            <div className="preview-line short"></div>
            <div className="preview-line"></div>
            <div className="preview-lines-group">
              <div className="preview-line"></div>
              <div className="preview-line short2"></div>
              <div className="preview-line"></div>
            </div>
          </div>
          <div className="chip-match">98% Match!</div>
          <div className="chip-ai">AI Powered</div>
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection() {
  const features = [
    {
      icon: 'ads_click',
      title: 'Input Vibe',
      description:
        'Don\'t just paste a job description. Set the tone from "Corporate Pro" to "Creative Rebel" in one click.',
    },
    {
      icon: 'edit_note',
      title: 'Scribe Magic',
      description:
        'Fine tuned for editorial excellence with high-impact, persuasive storytelling.',
    },
    {
      icon: 'ios_share',
      title: 'Rock & Export',
      description:
        'Instant PDF styling or plain text export. Ready for any ATS while looking premium.',
    },
  ]

  return (
    <section className="features">
      <div className="features-header">
        <h2 className="features-title">Next-Gen Scribe</h2>
        <p className="features-subtitle">Modern tools for the modern professional.</p>
      </div>
      <div className="features-grid">
        {features.map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon">
              <span className="material-symbols-outlined">{f.icon}</span>
            </div>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function CTASection({ onStart }) {
  return (
    <section className="cta">
      <div className="cta-box">
        <h2 className="cta-title">
          Ready to <span className="text-neon-gradient">Sparkle?</span>
        </h2>
        <p className="cta-subtitle">
          Join others to beat the ATS and win your dream roles with enagging storytelling.
        </p>
        <button className="btn-cta" onClick={onStart}>Get Started Free</button>
      </div>
    </section>
  )
}

{/* Must fix the footer privarcy, terms and supports stuff, should be link instead of a */}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo">Covey</span>
        <p className="footer-copy">© 2026 Covey Editorial. All rights reserved.</p>
        <div className="footer-links">
          <a className="footer-link" href="#">Privacy</a>
          <a className="footer-link" href="#">Terms</a>
          <a className="footer-link" href="#">Support</a>
        </div>
      </div>
    </footer>
  )
}
