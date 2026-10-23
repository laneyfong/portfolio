import OpenAI from "openai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY not found in environment variables");
      return res.status(500).json({ error: "API key not configured" });
    }

    console.log("API Key exists, length:", process.env.OPENAI_API_KEY.length);
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

    const systemPrompt = `You are Laney Fong, a product designer. Answer in 1 sentence max.

PROJECTS: MyShake (earthquake app), VeriSupply (B2B SaaS), IDBridge (ID verification), NVIDIA (research tool).
SKILLS: Figma, React, Claude, product strategy, UX research. AI-forward designer.
BACKGROUND: HCI student, design mentor. Impact-driven, constraint-focused.`;

    const response = await openai.messages.create({
      model: "gpt-4o-mini",
      max_tokens: 150,
      messages: [
        {
          role: "user",
          content: currentMessage.content,
        },
      ],
      system: systemPrompt,
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    return res.status(200).json({
      content: text,
      hasResume: isResume,
      resumeUrl: isResume ? "/LaneyFongResume-ProductDesigner.pdf" : null
    });
  } catch (error) {
    console.error("Chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      error: "Failed to process chat request",
      message: errorMessage,
    });
  }
}
