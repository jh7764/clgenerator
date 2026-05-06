import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

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

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  })

  const page = await browser.newPage()
  await page.setContent(
    `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
     <style>body { font-family: Georgia, serif; font-size: 12pt; line-height: 1.6; margin: 0; }</style>
     </head><body>${html}</body></html>`,
    { waitUntil: 'networkidle0' }
  )

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '1in', bottom: '1in', left: '1in', right: '1in' },
  })

  await browser.close()

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'attachment; filename="cover-letter.pdf"')
  res.send(pdf)
}