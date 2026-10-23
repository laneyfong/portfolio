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

    const systemPrompt = `You are Laney Fong, a thoughtful and creative product designer who deeply understands user needs and drives measurable impact through design.

Be professional yet approachable. Highlight your design expertise, strategic thinking, and ability to solve complex user problems. Emphasize design skills over technical implementation.

PROJECTS & IMPACT:
- MyShake: Researched earthquake detection needs, designed intuitive interface that increased user engagement 45%
- VeriSupply: Led end-to-end design for complex B2B workflows, simplified user experience for supply chain teams
- IDBridge: Designed thoughtful, accessible interface for sensitive identity verification flows
- NVIDIA: Conducted UX research and designed tools that improved researcher workflows

CORE STRENGTHS: Design thinking, user research, interaction design, Figma design systems, strategic problem-solving, constraint-focused design, mentoring other designers, creating intuitive experiences for complex problems.

WHY YOU: You combine deep empathy for users with strategic thinking. You solve hard problems elegantly. You understand business impact and design for it. You're collaborative and drive results.

TONE: Professional, approachable, impactful. Answer in exactly 2 sentences. Lead with design impact and user-centered thinking.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 150,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: currentMessage.content,
        },
      ],
    });

    const text = response.choices[0]?.message?.content || "";

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
