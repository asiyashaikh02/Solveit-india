import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: any = null;

function getAi() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it to your environment secrets.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export interface GeneratedCampaign {
  title: string;
  description: string;
  cta: string;
}

export async function generateCampaignContent(event: string, targetAudience: string): Promise<GeneratedCampaign | null> {
  try {
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a high-conversion marketing message for a legal/compliance service in India.
      Event: ${event}
      Target Audience: ${targetAudience}
      
      Return a JSON object with:
      - title: A catchy short headline (max 40 chars)
      - description: A persuasive description (max 120 chars)
      - cta: A short call to action button text (max 15 chars)`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            cta: { type: Type.STRING }
          },
          required: ["title", "description", "cta"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim());
    }
    return null;
  } catch (error) {
    console.error("Failed to generate campaign content:", error);
    return null;
  }
}
