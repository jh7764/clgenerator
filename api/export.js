import fs from "fs";
import path from "path";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { html } = req.body;

    if (typeof html !== "string" || html.trim() === "") {
      return res.status(400).json({ message: "Invalid HTML content" });
    }

    //hidden chrome browser
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    //render browser page
    const page = await browser.newPage();

    //renders html content into page
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    //converts page into a pdf buffer (ie raw binary file)
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });
    
    //closes browser
    await browser.close();

    //tells browser this is a pdf
    res.setHeader("Content-Type", "application/pdf");
    
    //download file
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="export.pdf"'
    );

    // Send PDF
    return res.send(pdfBuffer);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}