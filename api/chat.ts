import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are Laney's Portfolio Assistant. You help visitors learn about Laney's work, projects, and how to get in touch.

Laney is a product designer and 0→1 strategist specializing in:
- MyShake: Earthquake early warning mobile app (contract role) - Increased engagement by 45% through IA restructure, conducted 10 user interviews
- VeriSupply: Supply chain decision intelligence (lead designer & strategy owner) - Validated that procurement decisions are driven by confidence, not visibility
- IDBridge: ID verification solution for unhoused individuals (designathon, 6-hour challenge)
- NVIDIA: Internal tooling for synthetic user testing research (capstone)

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
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not found in environment variables");
      return res.status(500).json({ error: "API key not configured" });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Build chat history - skip all initial assistant messages
    const allMessages = messages.slice(0, -1);
    let convertedMessages = allMessages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Remove all leading model messages - Gemini requires chat to start with user
    while (convertedMessages.length > 0 && convertedMessages[0].role === "model") {
      convertedMessages = convertedMessages.slice(1);
    }

    const currentMessage = messages[messages.length - 1];

    if (!currentMessage || !currentMessage.content) {
      return res.status(400).json({ error: "Invalid current message" });
    }

    // Use chat without systemInstruction to avoid formatting issues
    const chat = model.startChat({
      history: convertedMessages,
      generationConfig: {
        maxOutputTokens: 256,
      },
    });

    // Prepend system context to current message
    const userQuery = `You are Laney's Portfolio Assistant. Help with: MyShake (45% engagement boost), VeriSupply (supply chain), IDBridge (ID verification), NVIDIA (testing tools). Respond in 2-3 sentences.\n\nUser question: ${currentMessage.content}`;
    const result = await chat.sendMessage(userQuery);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ content: text });
  } catch (error) {
    console.error("Chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error details:", errorMessage);
    return res.status(500).json({
      error: "Failed to process chat request",
      message: errorMessage,
    });
  }
}
