import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Modal from './Modal'
import { 
  MdAutoAwesome,
  MdPsychology,
  MdClose,
  MdUploadFile,
  MdCheckCircle
} from 'react-icons/md'

import './Templates.css'

import boardroom from './images/boardroom.jpg' 
import creative from './images/creative.jpg'
import modern from './images/modern.jpg'
import { callGemini } from './utils/gemini'
import { Navbar } from './Home'
import Content from './Content'

function ResumeUpload({ onParsed, position, jobCompany }){
    const [status, setStatus] = useState('idle')

    function handleResume(e){
        let selectedfile = e.target.files[0]
        if (!selectedfile) return;

        let fileReader = new FileReader()
        setStatus('loading')
        
        fileReader.onload = async () => {
            let base64String = fileReader.result.split(',')[1]

            const prompt = `
                You are an expert career coach. Based on the following resume and job details, generate a professional, compelling cover letter.
                Position: ${position}
                Company: ${jobCompany}
                Resume Data: (Extract and use the text from the provided file)

                Structure should be:
                Name
                Contact Info

                Current Date

                Dear Hiring Team,

                [Body]

                Sincerely,
                [Name]

                IMPORTANT: Return the cover letter in clean HTML format (using <p>, <h1>, and <br> tags) 
                so it renders correctly in a rich text editor.
            `

            try {
                const generatedCoverLetter = await callGemini(prompt, base64String)
                setStatus('done')
                onParsed(generatedCoverLetter)

            } catch (error){
                console.error("Gemini Error: ", error)
                setStatus('idle')
                alert("Failed to generate cover letter. Please try again.")
            }
        }
       
        fileReader.readAsDataURL(selectedfile)

    }

    return( 
        <div className="upload-container">
            {status === 'idle' && (
                <label className="upload-label">
                    <MdUploadFile size={36} className="upload-icon"/>
                    Attach your resume here. PDF only!!
                    <input
                        onChange={handleResume} 
                        name="res" 
                        type="file"
                        accept="application/pdf"
                    />
                </label>
            )}

            {status === 'loading' && (
                <div className="upload-status">
                    <span> Writing your cover letter . . . </span>
                </div>
            )}

            {status === 'done' && (
            <div className="upload-status">
                <MdCheckCircle size={36} className="upload-success-icon" />
                <span> Cover Letter Ready! </span>
                {/* Add href to directly go to content page */}
            </div>
            )}
        </div>
    )

}


const TemplateCard = ({
    title,
    description,
    image,
    colorClass,
    onSelect,
    popular = false
}) => (
    <motion.div
        initial = {{opacity: 0, y: 25}}
        whileInView={{opacity: 1, y:0}}
        viewport={{once: true}}
        className={`template-card ${colorClass}`}
  >
    <div className="card-image-container">
      <img 
        src={image} 
        alt={title}
        referrerPolicy="no-referrer"
        className="card-image" 
      />
      <div className="card-gradient" />
      {popular && (
        <div className="popular-badge">
          Popular
        </div>
      )}
    </div>
    <div className="card-content">
      <h3 className={`card-title text-${colorClass}`}>{title}</h3>
      <p className="card-description">
        {description}
      </p>
      <button className={`card-button ${colorClass} border-${colorClass}`} onClick={() => onSelect(title)}>
        Select Template
      </button>
    </div>
  </motion.div>
);

export default function Templates(){
    const [selectedTemplate, setselectedTemplate]= useState(null)
    const [finalresult, setFinalResult] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [position, setPosition] = useState('')
    const [jobCompany, setJobCompany] = useState('')
    const navigate = useNavigate()

    function handleTemplateSelection(templateTitle) {
        setselectedTemplate(templateTitle);
        setModalOpen(true);
    }

    function handleParsed(coverLetterText) {
       navigate('/content', {state: { generatedLetter: coverLetterText} })

    }
    return(
        <>
        <Navbar />
        <label className='page-title'>
            Choose your Canvas
            <span className='page-description'> 
                Select a visual foundation for your narrative. Every template is engineered for high-impact storytelling.
                </span>
        </label>
        
        <div className="grid">
            <TemplateCard 
                title= "The Executive"
                description="Structured, bold, and authoritative. Perferct for high-stakes and corporate manifestos."
                image = {boardroom}
                colorClass="primary"
                onSelect={handleTemplateSelection}
            />
            <TemplateCard 
                title= "The Modern"
                description="Clean lines with neon accents. Optimized for digital-firstreading and tech-focused narratives."
                image = {modern}
                colorClass="tertiary"
                onSelect={handleTemplateSelection}
            />
            <TemplateCard 
                title= "The Creative"
                description="Asymmetric layouts and experimental typography. For stories that refuse to follow the rules."
                image = {creative}
                colorClass="error"
                onSelect={handleTemplateSelection}
            />
        </div>

        <motion.div 
            whileHover={{ scale: 1.01 }}
            className="ai-assistant-card"
        >
            <div className="ai-content">
                <div className="ai-badge">
                    <MdAutoAwesome size={16} />
                    <span>AI Assistant</span>
                </div>
                <h2 className="ai-title">Custom AI Canvas</h2>
                <p className="ai-description">
                    Can't find the perfect fit? Describe your story and our AI will generate a unique layout specifically for your content.
                </p>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ai-button"
                >
                    Start Generating
                </motion.button>
                    </div>
                <div className="ai-visual">
                    <div className="progress-container">
                        <div className="progress-arc-1 animate-spin-slow" />
                        <div className="progress-arc-2 animate-reverse-spin" />
                        <div className="ai-icon-center">
                        <MdPsychology className="text-primary" size={48} style={{ color: 'var(--color-primary)' }} />
                    </div>
                </div>
            </div>
        </motion.div>

        {modalOpen &&
            <div className="modal-container">
                    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>  
                        <div className="modal-inner">
                            <label className="modal-content">Position wanted... </label>
                            <input
                                className="modal-input"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder="e.g. Senior Software Engineer"
                            />
                            <label className="modal-content">At Company... </label>
                            <input
                                className="modal-input"
                                value={jobCompany}
                                onChange={(e) => setJobCompany(e.target.value)}
                                placeholder="Google Inc."
                            />
                            <ResumeUpload
                                position={position}
                                jobCompany={jobCompany}
                                onParsed={(text) => {
                                    setFinalResult(text);
                                
                                }} />
                        </div>
                    </Modal>
            </div>
        } 
                   

        </>
    );
    
}