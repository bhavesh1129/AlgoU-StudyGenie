import { PDFParse } from "pdf-parse";

/**
 * Extracts text from a PDF file
 */
export const extractPdfText = async (buffer) => {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    return result.text;
};
