import express from 'express'
import puppeteer from 'puppeteer'        // PDF
import HTMLtoDOCX from 'html-to-docx'   // DOCX

const app = express()
app.use(express.json())

app.post('/export/pdf', async (req, res) => {
  const { html } = req.body
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(html)
  const pdf = await page.pdf({ format: 'A4', margin: { top: '1in', bottom: '1in', left: '1in', right: '1in' }})
  await browser.close()
  res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="cover-letter.pdf"' })
  res.send(pdf)
})

app.post('/export/docx', async (req, res) => {
  const { html } = req.body
  const buffer = await HTMLtoDOCX(html)
  res.set({ 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Content-Disposition': 'attachment; filename="cover-letter.docx"' })
  res.send(buffer)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))