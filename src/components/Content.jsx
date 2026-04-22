import { useState } from 'react'
import './Content.css'
import TiptapEditor from './Tiptap'
import Templates from './Templates'
import { Header, Footer } from './Home'



const SKILLS = ['Rapid Prototyping', 'User Psychology', 'Systems Thinking']
const TONES = ['Corporate Pro', 'Creative Rebel', 'Conversational', 'Authoritative']

export default function Content({ initialCoverLetter }) {
    const [skills, setSkills] = useState(SKILLS)
    const [newSkill, setNewSkill] = useState('')
    const [addingSkill, setAddingSkill] = useState(false)
    const [coverLetter, setcoverLetter] = useState(initialCoverLetter)
    const [loading, setloading] = useState(false)

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
    setAddingSkill(false)
  }


  
  return (
    <>
    <Header />
    <main className='main-layout'>
    <div className='content'>
      <div className='content-step-badge'>Step 02 - Editorial Narrative</div>

      <h1 className='content-title'>
        Master the <span className='content-title-accent'>Impact.</span>
      </h1>
      <p className='content-desc'>
        Define your professional identity and let Covey weave the narrative.
      </p>

      {/* Identity Section */}
      <section className='content-card'>
        <div className='content-section-badge'>Identity</div>

        <div className='content-row'>
          <label className='content-label'>
            Full Name
            <input className='content-input' type='text' placeholder='Maria Sterling' />
          </label>
          <label className='content-label'>
            Current Role
            <input className='content-input' type='text' placeholder='e.g. Senior Product' />
          </label>
          <label className = 'content-label'>
            Job Description
            <input className = 'content-input' type='text' placeholder='e.g What we are looking for...'/>
          </label>
        </div>

        <label className='content-label content-label--full'>
          Your 'North Star' (Professional Mission)
          <textarea
            className='content-textarea'
            rows={3}
            placeholder='To bridge the gap between human empathy and digital precision...'
          />
        </label>
      </section>

      {/* Impact Section */}
      <section className='content-card'>
        <div className='content-section-badge'>Impact</div>

        <label className='content-label content-label--full'>
          <span className='content-label-row'>
            Key Achievement
            <span className='content-metrics-badge'>Metrics Matter</span>
          </span>
          <input
            className='content-input'
            type='text'
            placeholder='Increased conversion by 40% via...'
          />
        </label>

        <div className='content-label content-label--full'>
          <span>The 'Magic' Sauce</span>
          <div className='content-skills'>
            {skills.map((skill) => (
              <span className='content-skill-chip' key={skill}>
                <span className='content-skill-icon'>⚡</span>
                {skill}
              </span>
            ))}
            {addingSkill ? (
              <input
                autoFocus
                className='content-input content-skill-input'
                onBlur={addSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                placeholder='Add skill...'
                type='text'
                value={newSkill}
              />
            ) : (
              <button className='content-skill-add' onClick={() => setAddingSkill(true)}>+</button>
            )}
          </div>
        </div>

        <div className='content-label content-label--full'>
          <span>Tone of Voice</span>
          <div className='content-tones'>
            {TONES.map((tone) => (
              <span className='content-tone-chip' key={tone}>{tone}</span>
            ))}
          </div>
        </div>
        <label className='content-label'>
            Optional - weave in a unique story or personal anecdote 
            <textarea
                className='content-textarea'
                rows={4}
                placeholder='Talk about how you solved a problem...'
            />
        </label>
      </section>
    </div>

    <aside className="editor-sidebar">
      <div className="sticky-editor">
            <TiptapEditor content={coverLetter} /> 
      </div>
    </aside>

    </main>
        
    <Footer />
    </>
  )
}
