import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { html } = req.body;

    if (typeof html !== "string" || html.trim() === "") {
      return res.status(400).json({ message: "Invalid HTML content" });
    }

    const filePath = path.join("/tmp", "exported.html");

    fs.writeFileSync(filePath, html, "utf8");

    return res.status(200).json({
      message: "HTML saved successfully!",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}