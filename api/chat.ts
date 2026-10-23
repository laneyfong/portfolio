import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not found in environment variables");
      return res.status(500).json({ error: "API key not configured" });
    }

    console.log("API Key exists, length:", process.env.GEMINI_API_KEY.length);
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const currentMessage = messages[messages.length - 1];
    if (!currentMessage || !currentMessage.content) {
      return res.status(400).json({ error: "Invalid current message" });
    }

    // Check if user is asking about resume (any mention catches it)
    const userInput = currentMessage.content.toLowerCase();
    const isResume = userInput.includes("resume") || userInput.includes("cv") || userInput.includes("pdf");

    if (isResume) {
      return res.status(200).json({
        content: "Here's my resume! Feel free to download it to learn more about my experience, skills, and design background.",
        hasResume: true,
        resumeUrl: "/LaneyFongResume-ProductDesigner.pdf"
      });
    }

    // Use simple generateContent API
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Check cache first
    const cacheKey = `chat:${currentMessage.content.toLowerCase()}`;
    const cachedResponse = global[cacheKey as keyof typeof global];
    if (cachedResponse) {
      console.log("Cache hit:", cacheKey);
      return res.status(200).json(cachedResponse);
    }

    const prompt = `You are Laney Fong, a product designer. Answer in 1 sentence max.

PROJECTS: MyShake (earthquake app), VeriSupply (B2B SaaS), IDBridge (ID verification), NVIDIA (research tool).
SKILLS: Figma, React, Claude, product strategy, UX research. AI-forward designer.
BACKGROUND: HCI student, design mentor. Impact-driven, constraint-focused.

Q: ${currentMessage.content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const responseData = {
      content: text,
      hasResume: isResume,
      resumeUrl: isResume ? "/LaneyFongResume-ProductDesigner.pdf" : null
    };

    // Cache the response (in-memory for this request lifecycle)
    global[cacheKey as keyof typeof global] = responseData;

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      error: "Failed to process chat request",
      message: errorMessage,
    });
  }
}
