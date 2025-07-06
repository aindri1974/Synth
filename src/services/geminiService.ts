import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

export async function generateWebsite(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{
        role: 'user',
        parts: [{ text: `Generate complete website code for: "${prompt}". Provide all files (HTML, CSS, JS) in this JSON format:
        {
          "files": [
            {
              "name": "index.html",
              "content": "<!DOCTYPE html>...",
              "type": "html"
            },
            {
              "name": "style.css",
              "content": "body {...}",
              "type": "css"
            },
            {
              "name": "script.js",
              "content": "function...",
              "type": "javascript"
            }
          ]
        }` }]
      }],
      config: {
        temperature: 0.1,
      },
    });

    // Extract JSON from response
    const text = response.text ?? "";
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error generating website:", error);
    throw error;
  }
}