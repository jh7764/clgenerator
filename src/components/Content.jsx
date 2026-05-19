import { useState } from 'react'
import './Content.css'
import TiptapEditor from './Tiptap'
import Templates from './Templates'
import { Header, Footer } from './Home'
import { useLocation } from 'react-router-dom'
import { callGemini } from './utils/gemini'

import Modal from './Modal'

const SKILLS = ['Rapid Prototyping', 'User Psychology', 'Systems Thinking']
const TONES = ['Corporate Pro', 'Creative Rebel', 'Conversational', 'Authoritative']

export default function Content() {
  const location = useLocation()
  const initialData = location.state?.generatedLetter || ''

  const [modalOpen, setModalOpen] = useState(false)

  const [skills, setSkills] = useState(SKILLS)
  const [newSkill, setNewSkill] = useState('')
  const [addingSkill, setAddingSkill] = useState(false)
  const [coverLetter, setcoverLetter] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(
    {
      fullname: '',
      currentrole: '',
      jobdescription: '',
      northstar: '',
      keyachievement: '',
      anecdote: '',
      tone: ''
    }
  )

  const handleInputChange = (e) =>{
    const {name, value} = e.target 
    setData(prev => ({...prev, [name]:value}))
  }

  const handleRefine = async () => {
    localStorage.setItem('coverLetter', coverLetter)
    setLoading(true)
  
    const prompt = `
      Refine my cover letter with the following details:
      Name: ${data.fullname}
      Current Role: ${data.currentrole}
      Job Description: ${data.jobdescription}
      Professional Mission: ${data.northstar}
      Key Achievement: ${data.keyachievement}
      Tone: ${data.tone}
      Skills: ${skills.join(', ')}
      Personal Story: ${data.anecdote}
      Current Draft: ${coverLetter}

      Only respond with the cover letter. Please format it in HTML.
    `

    try {
      const updatedLetter = await callGemini(prompt);
      const cleaned = updatedLetter.replace(/^```html\s*/i, '').replace(/```\s*$/,'').trim();
      setcoverLetter(cleaned);
    } catch (error) {
      console.error("Refinement failed:", error);
    } finally {
      setLoading(false);
    }

  }
    
  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
    setAddingSkill(false)
  }

  const exportFile = async (type) => {
  console.log("coverletter conent: ", coverLetter?.slice(0,100));
  const res = await fetch("/api/export", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html: coverLetter })
  });
  if (!res.ok) {
    const errtxt = await res.text();
    console.error("Export error: ", errtxt);
    throw new Error(`Export failed: ${res.status}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const blob = new Blob([arrayBuffer], {type: 'application/pdf'});
  console.log("blob type: ", blob.type, "blob size: ", blob.size);
  const url = URL.createObjectURL(blob);
  console.log("Created URL:", url); 
  const newtab = ('', '_blank');
  newtab.location.href = url;
  //setTimeout(() => window.URL.revokeObjectURL(url), 10000);
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
            <input 
              name ="fullname" 
              value = {data.fullname}
              onChange={handleInputChange}
              className='content-input'  
              type='text' 
              placeholder='Maria Sterling' 
            />
          </label>
          <label className='content-label'>
            Current Role
            <input 
              name = "currentrole" 
              value = {data.currentrole}
              onChange={handleInputChange}
              className='content-input' 
              type='text' 
              placeholder='e.g. Senior Product' />
          </label>
          <label className = 'content-label'>
            Job Description
            <input 
              name="jobdescription" 
              value = {data.jobdescription}
              onChange={handleInputChange}
              className = 'content-input' 
              type='text' 
              placeholder='e.g What we are looking for...'/>
          </label>
        </div>

        <label className='content-label content-label--full'>
          <span>
            <span className='content-skill-icon'>⭐</span>
            Your 'North Star' (Professional Mission)
          </span>
          <textarea
            name= "northstar"
            value = {data.northstar}
            onChange={handleInputChange}
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
            name = "keyachievement"
            value = {data.keyachievement}
            onChange={handleInputChange}
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
                <span className='content-skill-icon'>🔥</span>
                {skill}
              </span>
            ))}
            {addingSkill ? (
              <input
                autoFocus
                name="skills"
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
              <span className={`content-tone-chip ${data.tone === tone ? 'active' : ''}`} key={tone} onClick={() => setData(prev => ({...prev, tone: tone}))}>{tone}</span>
            ))}
          </div>
        </div>
        <label className='content-label'>
            Optional - weave in a unique story or personal anecdote 
            <textarea
                name="anecdote"
                value = {data.anecdote}
                onChange={handleInputChange}
                className='content-textarea'
                rows={4}
                placeholder='Talk about how you solved a problem...'
            />
        </label>
      </section>

      <section className='content-card'>
          <button className='content-section-badge' onClick={handleRefine}>Save</button>
          <button className='content-section-badge' onClick={() => setModalOpen(true)}>Export</button>
      </section>
    </div>

    <aside className="editor-sidebar">
      <div className="sticky-editor">
            <TiptapEditor content={coverLetter} onChange={setcoverLetter} /> 
      </div>
    </aside>

    {modalOpen &&
      <div className="modal-container">
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>  
          <div className="modal-inner">
              <button onClick={() => exportFile()}>Export as PDF</button>
          </div>
        </Modal>
      </div>
    } 
  
    </main>

    <Footer />
        
    </>
  )
}