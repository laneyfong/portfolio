import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "API key not configured" });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const currentMessage = messages[messages.length - 1];
    if (!currentMessage || !currentMessage.content) {
      return res.status(400).json({ error: "Invalid current message" });
    }

    // Check if user is asking about resume
    const resumeKeywords = ["resume", "cv", "download resume", "your resume", "cv download"];
    const isResume = resumeKeywords.some(keyword =>
      currentMessage.content.toLowerCase().includes(keyword)
    );

    if (isResume) {
      return res.status(200).json({
        content: "Here's my resume! Feel free to download it to learn more about my experience, skills, and design background.",
        hasResume: true,
        resumeUrl: "/LaneyFongResume-ProductDesigner.pdf"
      });
    }

    // Use simple generateContent API
    const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

    const prompt = `You are Laney Fong answering questions about your work and projects. Respond in first person as if you are Laney speaking directly to the person.

Your projects:
- MyShake: Earthquake early warning app where I boosted engagement by 45%
- VeriSupply: Supply chain decision intelligence platform I led design & strategy for
- IDBridge: ID verification solution for unhoused individuals (designed in a 6-hour challenge)
- NVIDIA: Internal synthetic user testing research tool (capstone project)

You study HCI at UCSC and mentor UX Design at Crunch Tutor.
Contact: laneyrfong@gmail.com

Keep responses to 2-3 sentences. Be warm, conversational, and share personal insights about your work.

Question: ${currentMessage.content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ content: text });
  } catch (error) {
    console.error("Chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      error: "Failed to process chat request",
      message: errorMessage,
    });
  }
}
