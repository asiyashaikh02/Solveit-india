import { GoogleGenAI } from "@google/genai";

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

export async function sendMessage(history: { role: "user" | "model"; parts: { text: string }[] }[], message: string) {
  const ai = getAi();
  
  const contents = [
    ...history,
    { role: "user", parts: [{ text: message }] }
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
    config: {
      systemInstruction: `You are the SolveIt India Compliance Expert assistant. 
      Your goal is to help Indian business owners and professionals with compliance, GST, Income Tax, ROC filings, trademarks, and business registration queries.
      
      Guidelines:
      - Provide accurate, concise, and professional advice based on Indian laws and regulations (GST Act, Companies Act, etc.).
      - If you are unsure, suggest consulting a human expert via the SolveIt platform.
      - Be helpful, polite, and use clear language.
      - Mention that SolveIt India can help with end-to-end filings.
      
      Structure your responses using Markdown for better readability.`
    }
  });

  return response.text || "I'm sorry, I couldn't generate a response.";
}

export async function identifyExpertIntent(input: string) {
  const ai = getAi();
  
  const prompt = `Given the user query: "${input}", identify the following:
  1. Expert Type: "CA", "CS", or "Lawyer"
  2. Category: Select from the list below if Lawyer, else specify.
  3. Urgency: 1-10
  4. Success Recommendation: Why this category matches.

  Lawyer Categories: 
  - Property & Real Estate
  - Family Law
  - Criminal Law
  - Business & Corporate
  - Consumer & Civil
  - Intellectual Property
  - Employment Law

  Return ONLY a JSON object:
  {
    "expertType": string,
    "category": string,
    "urgency": number,
    "reasoning": string,
    "suggestedAction": "TALK_NOW" | "BOOK_LATER"
  }`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json"
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return {
      expertType: "Lawyer",
      category: "General",
      urgency: 5,
      reasoning: "Could not parse intent accurately.",
      suggestedAction: "BOOK_LATER"
    };
  }
}
