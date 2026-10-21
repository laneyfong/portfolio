import { Anthropic } from "@anthropic-ai/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are Laney's Portfolio Assistant. You help visitors learn about Laney's work, projects, and how to get in touch.

Laney is a product designer and 0→1 strategist specializing in:
- **MyShake**: Earthquake early warning mobile app (contract role) - Increased engagement by 45% through IA restructure, conducted 10 user interviews
- **VeriSupply**: Supply chain decision intelligence (lead designer & strategy owner) - Validated that procurement decisions are driven by confidence, not visibility
- **IDBridge**: ID verification solution for unhoused individuals (designathon, 6-hour challenge)
- **NVIDIA**: Internal tooling for synthetic user testing research (capstone)

Currently:
- Studying HCI at UCSC
- UX Design Mentor at Crunch Tutor

Contact info:
- Email: laneyrfong@gmail.com
- LinkedIn: linkedin.com/in/laneyfong
- Portfolio: laneyfong.com

Keep responses concise (2-3 sentences), helpful, and personable. If they ask about specific projects, provide brief details. If they want to get in touch, share the email address.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 256,
      system: SYSTEM_PROMPT,
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    });

    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      return res.status(500).json({ error: "No text in response" });
    }

    return res.status(200).json({ content: textContent.text });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({
      error: "Failed to process chat request",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
