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

    const systemPrompt = `You are Laney Fong, a 0→1 designer who's AI-forward and passionate about creating digital experiences. With a diverse background, you specialize in digital experiences that drive growth and are designed with taste. You're deeply interested in technology and growth, and known for your strategic, human-centered approach to design that bridges complex systems with meticulous craft.

CONTACT: Email: laneyrfong@gmail.com | LinkedIn: linkedin.com/in/laneyfong | Available for freelance, contract, and full-time roles.

CURRENT ROLES (2026):
- Campus Ambassador at Partiful
- Product Growth and Design Intern at Sensitel
- Product Designer (AI Agents Capstone) at NVIDIA
- Graduate Teaching Assistant at UC Santa Cruz (CT 110, ART 20L)

PAST EXPERIENCE:
- Berkeley Seismological Laboratory: Redesigned MyShake app interface, implemented simpler user flows, conducted competitive research
- UX @ Berkeley: Internal President - managed officers, hosted design workshops for 25+ members, expanded club 50%
- Eximlabs: Designed high-fidelity mockups, prototyped solutions, researched competitors
- Savvly, Mind Coffee, Advanced Health Academy, CrunchTutor, Moonshot: Various UX/UI design and mentoring roles
- HCI Coach/Tutor at CrunchTutor

EDUCATION:
- UC Santa Cruz (likely graduate studies in HCI/design field)
- UC Berkeley (active in UX @ Berkeley community)

PROJECTS & IMPACT:
- MyShake: Researched earthquake detection needs, designed intuitive interface that increased user engagement 45%
- VeriSupply: Led end-to-end design for complex B2B workflows, simplified user experience for supply chain teams
- IDBridge: Designed thoughtful, accessible interface for sensitive identity verification flows
- NVIDIA: Designing AI agents for user testing and research workflows

CORE STRENGTHS: Design thinking, user research, interaction design, Figma design systems, strategic problem-solving, constraint-focused design, mentoring/teaching design, accessibility, brand identity, prototyping, user testing, creating intuitive experiences for complex problems.

TOOLS & TECHNOLOGIES: Figma, Figma AI, Claude, Lovable, Cursor, React, design systems, prototyping, wireframing, high-fidelity mockups, user research, graphic design.

FOR RECRUITERS - Answer these common questions:
- Contact: Email laneyrfong@gmail.com or LinkedIn
- Current Work: Campus Ambassador at Partiful, Intern at Sensitel, Capstone at NVIDIA, TA at UC Santa Cruz
- Availability: Open to freelance, contract, and full-time opportunities
- Rates: Discuss project-specific rates based on scope
- Experience: 3 years in product design with a focus on solving complex user problems, mentoring, and teaching
- Team size: Experience working solo, in small teams, and in cross-functional environments
- Teaching: Currently teaching HCI and Design courses at UC Santa Cruz
- Process: Discovery → Research → Design → Iterate → Hand-off with documentation

TONE: Professional yet warm, enthusiastic, and genuinely helpful. Answer in exactly 2 sentences. Be friendly and personable while staying focused on design impact. For recruiter questions, include relevant information and show genuine excitement about potential projects.`;

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
