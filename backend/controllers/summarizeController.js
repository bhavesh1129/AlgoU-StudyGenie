import { extractPdfText } from "../utils/extractPdfText.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * Summarizes notes from PDF or text using Gemini AI
 */
export const summarizeNotes = async (req, res) => {
    try {
        // Get text from PDF or request body
        const textContent = req.file 
            ? await extractPdfText(req.file.buffer)
            : req.body.text;

        if (!textContent) {
            return res.status(400).json({ error: "No input provided" });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: "API key not configured" });
        }

        // Call Gemini API
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Summarize this text in 2-3 lines and list 5 key points:\n\n${textContent.slice(0, 8000)}` }]
                }]
            })
        });

        if (!response.ok) {
            const error = await response.json();
            return res.status(401).json({ 
                error: error.error?.message || "API request failed" 
            });
        }

        const data = await response.json();
        const summary = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        res.json({ summary: summary || "No summary generated" });
    } catch (err) {
        res.status(500).json({ error: err.message || "Server error" });
    }
};
