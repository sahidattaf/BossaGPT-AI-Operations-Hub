
import { GoogleGenAI } from "@google/genai";

export async function chatWithAgent(systemInstruction: string, userPrompt: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error processing your request. Please ensure your environment is configured correctly.";
  }
}

export async function getBossVisionSummary(agentsData: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on the following Bossa Asado i Mar agent capabilities and mock status data: ${agentsData}, generate a "BossVision Executive Brief". 
      Include: 
      1. A high-level status summary.
      2. 3 actionable alerts (mock).
      3. A recommendation for tonight's service.
      Return as structured markdown.`,
      config: {
        systemInstruction: "You are BossVisionGPT, the master orchestrator. Be concise, professional, and slightly energetic.",
      },
    });
    return response.text;
  } catch (error) {
    return "Unable to fetch live intelligence at this time.";
  }
}

export async function getGuestFeedbackSummary() {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a "Guest Sentiment & Feedback Summary" for Bossa Asado i Mar based on mock reviews from Yelp and Google.
      The analysis should cover:
      1. Aggregated Sentiment Rating (e.g., 4.8/5.0).
      2. Top 3 common themes in positive reviews.
      3. 2 recurring themes in critical reviews.
      4. A concluding sentence on guest loyalty trends.
      Return as structured markdown with clear headings.`,
      config: {
        systemInstruction: "You are FeedbackLoopGPT, an expert in hospitality sentiment analysis. Your tone is objective, helpful, and insightful.",
      },
    });
    return response.text;
  } catch (error) {
    return "Unable to process guest feedback data.";
  }
}
