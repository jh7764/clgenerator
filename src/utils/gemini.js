const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const BASE_URL =  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent"
export const callGemini = async(prompt, pdfBase64 = null) => {
    const parts =[];

    if (pdfBase64){
        parts.push({
            inlineData: { mimeType: "application/pdf", data:pdfBase64 }
        })
    }

    parts.push({ text: prompt });

    const res = await fetch(`${BASE_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        contents: [{ parts }]
        })
    });

    const data = await res.json();
    console.log('Gemini response:', data);
    return data.candidates[0].content.parts[0].text;
    }


