import HTMLtoDOCX from 'html-to-docx'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { html } = req.body
  if (!html) return res.status(400).json({ error: 'Missing html' })

  const buffer = await HTMLtoDOCX(html, null, {
    margins: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
  })

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  res.setHeader('Content-Disposition', 'attachment; filename="cover-letter.docx"')
  res.send(buffer)
}

