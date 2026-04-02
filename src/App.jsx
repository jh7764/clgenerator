import { useState } from 'react'
import { callGemini } from './utils/gemini'
import { Document, Page, Text, PDFDownloadLink, StyleSheet, Font } from '@react-pdf/renderer'
import Story from './components/Story'
import ResumeUpload from './components/ResumeUpload'
import JobDescription from './components/JobDescription'
import './App.css'

function App() {
  const [resume, setResume] = useState(null)
  const [story, setStory] = useState('')
  const [jobDescription, setjobDescription] = useState('')
  const [coverLetter, setcoverLetter] = useState('')
  const [loading, setloading] = useState(false)
  
  async function generate(){
    setloading(true)
    const letter = await callGemini(
      `You are an expert cover letter writer. 
      RESUME: 
      ${resume}

      JOB DESCRIPTION:
      ${jobDescription}

      PERSONAL STORY:
      ${story}

      Follow this exact format to create a tailored, personal, and compelling cover letter for the posiiton:
      
      Name
      Contact Info

      Date

      Hiring Team
      Company Name
      Company Location (city, country)

      Dear Hiring Team, 

      1st / Introductory Paragraph
      • Introduce me and grab the employer’s attention. Include a persuasive statement about 
      what makes me the ideal candidate for the position, reference my key skills that align with job description
      • State your interest including the title of the job/internship, as well as the company’s name
      
      2nd / Body Paragraph
      • Sales pitch to the employer, state why I should be considered for the job/internship. 
      • Elaborate on the skills and qualifications you mentioned in the opening 
      paragraph
      o Highlight 1-2 examples that demonstratelevel of expertise of those skills
      o Make sure you identify skills that are in the job description
      • The goal is to create an interest in you so the reader contacts you to schedule an interview
      
      3rd / Body Paragraph
      • Focus on why are I am drawn to the job and the organization
      o For example, do you connect with their mission statement? Do you want to work with the 
      specific population they serve? Why do you want to work or intern with this employer 
      over other organizations?
      
      4th / Closing Paragraph
      • Reiterate interest in the position, including the title of the job/internship, as well as the company’s name
      • Thank them for their consideration

      Sincerely,
      Name
      
      Make sure it is ATS compatible. Include creative ways to show passion for industry and personal story to make it narrative-like. Don't include any oxford-commas. 
      Get person's name and contact info through their resume.
      `
    )

    setcoverLetter(letter)
    setloading(false)
  }

  const styles = StyleSheet.create({
    page: {
      padding: 40,
    },
    text: {
      fontSize: 12,
      margin: 1,
      fontFamily: 'Times-Roman',
    }

  })
  return(
    <div className="app">
      <div className="app-header">
        <h1>Welcome to Covey!</h1>
        <p>Tailored letters in seconds - powered by AI</p>
      </div>

      <div className="step-card">
        <div className="step-label">
          <div className="step-number">1</div>
          <div className='resume-card'><h2>Upload Resume</h2><p>PDF format only</p></div>
        </div>
        <ResumeUpload onParsed={setResume} />
      </div>

      <div className="step-card">
        <div className="step-label">
          <div className="step-number">2</div>
          <div className='job-card'><h2>Job Description</h2><p>Paste the full job posting</p></div>
        </div>
        <JobDescription value={jobDescription} onChange={(e) => setjobDescription(e.target.value)} />
      </div>

      <div className="step-card story-card">
        <div className="step-label">
          <div className="step-number">3</div>
          <div className="story-card"><h2>Your Story</h2><p>Optional - a personal anecdote or achievement</p></div>
        </div>
        <Story value={story} onChange={(e) => setStory(e.target.value)} />
      </div>

      <button className={`generate-btn ${!resume || !jobDescription ? '' : ''}`} onClick={generate}>
        {loading ? "Generating..." : "Generate Cover Letter"}
      </button>

      {coverLetter && (
        <div className="output">
          <h2>Your Cover Letter</h2>
          <pre>{coverLetter}</pre>
          <button className="copy-btn" onClick={() => navigator.clipboard.writeText(coverLetter)}>
            Copy to Clipboard
          </button>
          <PDFDownloadLink 
              document={
                <Document>
                  <Page size="A4" style={styles.page}>
                    <Text style={styles.text}>{coverLetter}</Text>
                  </Page>
                </Document>
              } fileName="CLbyCovey.pdf">
              <button className="download-btn">Download PDF version</button>
          </PDFDownloadLink>
        </div>
      )}
    </div>
  )
}



export default App;
