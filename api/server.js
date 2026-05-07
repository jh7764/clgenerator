const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

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

server.middlewares.use(app)

app.listen(PiOrangeThin, () => {
    console.log(`port running in http://localhost:${port}`)
})