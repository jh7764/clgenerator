const express = require('express');
const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');  // For Vercel/Node 18+
const HTMLtoDOCX = require('html-to-docx');

const app = express();
app.use(express.json({ limit: '10mb' }));

// PDF endpoint
app.post('/export/pdf', async (req, res) => {
  try {
    const { html } = req.body;
    // Use puppeteer-core with Chromium binary provided by @sparticuz/chromium
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: 'A4', margin: { top: '1in', bottom: '1in', left: '1in', right: '1in' } });
    await browser.close();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="cover-letter.pdf"'
    });
    res.send(pdf);
  } catch (err) {
    console.error(err);
    res.status(500).send('PDF generation failed');
  }
});

// DOCX endpoint
app.post('/export/docx', async (req, res) => {
  try {
    const { html } = req.body;
    const buffer = await HTMLtoDOCX(html);
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename="cover-letter.docx"'
    });
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('DOCX generation failed');
  }
});

// Export the Express app for Vercel (no app.listen)
module.exports = app;