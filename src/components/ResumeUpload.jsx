import { useState } from 'react'
import { callGemini } from '../utils/gemini'


function ResumeUpload({ onParsed }){
    const [file, setFile] = useState(null)

    function handleResume(e){
        let selectedfile = e.target.files[0]
        let fileReader = new FileReader()
        
        fileReader.onload = async () => {
            let base64String = fileReader.result.split(',')[1]
            setFile(base64String)
            const text = await callGemini(
                'Extract all the text from the resume',
                base64String
            )
            onParsed(text)
        }
       
        fileReader.readAsDataURL(selectedfile)


    }

    return(
        <input onChange = {handleResume} name='res' type='file' accept='application/pdf' />
    )

}

export default ResumeUpload;