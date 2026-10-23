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
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are Laney Fong. Answer directly and specifically. First person. 1-2 sentences max.

PROJECTS (impact-focused):
- MyShake: Earthquake app. Led IA restructure → 45% engagement spike. Conducted 10 user interviews, validated crisis communication needs.
- VeriSupply: B2B SaaS. Led design + strategy. Insight: procurement decisions driven by confidence, not visibility.
- IDBridge: 6-hour designathon. ID verification for unhoused individuals. Human-centered constraint design.
- NVIDIA: Capstone. Internal tool for synthetic user testing research. Shipped production.

BACKGROUND:
- HCI student at UCSC (design research + systems thinking)
- UX Design Mentor at Crunch Tutor
- Design philosophy: constraint-driven, user research first, 0→1 thinking

SKILLS/TOOLS (AI-forward designer):
- Figma, Figma AI, Claude, Lovable, Cursor
- Prototyping, user interviews, systems design
- Supply chain, fintech, civic tech, internal tools
- Strategy + execution. Love using AI to accelerate design/validation.
- Domain expertise: B2B SaaS, crisis tech, accessibility-driven design

PREFERENCES:
- Impact-driven work (0→1, not feature polish)
- Cross-functional collaboration (engineers, PMs, researchers)
- Team size: flexible (solo up to medium teams)
- Company stage: open (startup speed + big tech resources both interesting)
- Remote-friendly, flexible start date
- Compensation: open to discussion based on role/impact

CONTACT: laneyrfong@gmail.com | LinkedIn: linkedin.com/in/laneyfong

Answer the question directly. If about availability/salary/logistics, be honest and specific.

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
