import express from "express";
import multer from "multer";
import { summarizeNotes } from "../controllers/summarizeController.js";

const router = express.Router();

// Configure multer to handle file uploads (stores files in memory)
const upload = multer();

// POST route to handle summarization requests
// Accepts either a PDF file or text in the request body
router.post("/summarizer", upload.single("file"), summarizeNotes);

export default router;
