
import { GoogleGenAI, Type } from "@google/genai";
import { CampaignResult, PitchResult, LeadScoreResult, MarketInsightsResult, SocialInsight } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCampaign = async (product: string, audience: string, platform: string): Promise<CampaignResult> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a detailed marketing campaign for the product "${product}" targeting "${audience}" specifically for the platform "${platform}".`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          objectives: { type: Type.STRING },
          contentIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
          adCopyVariations: { type: Type.ARRAY, items: { type: Type.STRING } },
          callToActions: { type: Type.ARRAY, items: { type: Type.STRING } },
          trackingStrategy: { type: Type.STRING },
        },
        required: ["objectives", "contentIdeas", "adCopyVariations", "callToActions", "trackingStrategy"]
      }
    },
  });

  return JSON.parse(response.text || "{}");
};

export const generatePitch = async (product: string, persona: string, industry: string): Promise<PitchResult> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Craft a professional B2B sales pitch for "${product}" tailored for a "${persona}" in the "${industry}" industry.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          elevatorPitch: { type: Type.STRING },
          valueProposition: { type: Type.STRING },
          differentiators: { type: Type.ARRAY, items: { type: Type.STRING } },
          callToAction: { type: Type.STRING },
          followUpPlan: { type: Type.STRING },
        },
        required: ["elevatorPitch", "valueProposition", "differentiators", "callToAction", "followUpPlan"]
      }
    },
  });

  return JSON.parse(response.text || "{}");
};

export const scoreLead = async (name: string, budget: string, need: string, urgency: string): Promise<LeadScoreResult> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze and score this lead: Company/Name: ${name}, Budget: ${budget}, Need: ${need}, Urgency: ${urgency}. Determine conversion probability and priority.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          reasoning: { type: Type.STRING },
          probability: { type: Type.NUMBER },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["score", "reasoning", "probability", "recommendations"]
      }
    },
  });

  return JSON.parse(response.text || "{}");
};

export const getMarketInsights = async (sales: string, marketSize: string, competitors: string, calculatedShare: number): Promise<MarketInsightsResult> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze market status for a company with $${sales} in sales in a $${marketSize} total market. 
    The mathematical market share is verified at ${calculatedShare}%. There are ${competitors} competitors.
    Provide strategic qualitative insights.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          marketShare: { type: Type.NUMBER },
          penetrationRatio: { type: Type.STRING },
          competitivePosition: { type: Type.STRING },
          growthOpportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
          strategicRisk: { type: Type.STRING },
        },
        required: ["marketShare", "penetrationRatio", "competitivePosition", "growthOpportunities", "strategicRisk"]
      }
    },
  });

  return JSON.parse(response.text || "{}");
};

export const getCrossPlatformInsights = async (product: string): Promise<SocialInsight[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a cross-platform content strategy for "${product}" across YouTube, Instagram, Twitter (X), and TikTok.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            platform: { type: Type.STRING },
            strategy: { type: Type.STRING },
            bestTime: { type: Type.STRING },
            contentFormat: { type: Type.STRING },
            expectedReach: { type: Type.STRING },
          },
          required: ["platform", "strategy", "bestTime", "contentFormat", "expectedReach"]
        }
      }
    },
  });

  return JSON.parse(response.text || "[]");
};
