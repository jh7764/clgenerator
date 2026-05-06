import HTMLtoDOCX from 'html-to-docx'

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => (data += chunk))
    req.on('end', () => { try { resolve(JSON.parse(data)) } catch { reject(new Error('Invalid JSON')) } })
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { html } = await parseBody(req)
  if (!html) return res.status(400).json({ error: 'Missing html' })

  const buffer = await HTMLtoDOCX(html, null, {
    margins: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
  })

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  res.setHeader('Content-Disposition', 'attachment; filename="cover-letter.docx"')
  res.send(buffer)
}

