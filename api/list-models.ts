import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "API key not configured" });
    }

    const models = await genAI.listModels();
    const modelList = await models.toArray();

    return res.status(200).json({
      models: modelList.map((m) => ({
        name: m.name,
        displayName: m.displayName,
        description: m.description,
        inputTokenLimit: m.inputTokenLimit,
        outputTokenLimit: m.outputTokenLimit,
        supportedGenerationMethods: m.supportedGenerationMethods,
      })),
    });
  } catch (error) {
    console.error("List models error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      error: "Failed to list models",
      message: errorMessage,
    });
  }
}
