const BASE_URL =  "/api/gemini"
export const callGemini = async(prompt, pdfBase64 = null) => {
    const parts =[];

    if (pdfBase64){
        parts.push({
            inlineData: { mimeType: "application/pdf", data:pdfBase64 }
        })
    }

    parts.push({ text: prompt });

    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts }]
        })
    });

    if (!res.ok) {

        const errorText = await res.text();
        console.error(`API Error (${res.status}):`, errorText);
        throw new Error(`Server responded with ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    console.log('Gemini response:', data);
    return data.candidates[0].content.parts[0].text;
    }


