
export enum AppView {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  CAMPAIGN = 'CAMPAIGN',
  PITCH = 'PITCH',
  LEAD_SCORE = 'LEAD_SCORE',
  PLATFORM = 'PLATFORM', // Social Channels
  MARKET_INSIGHTS = 'MARKET_INSIGHTS',
  ADMIN = 'ADMIN'
}

export interface User {
  username: string;
  role: string;
}

export interface CampaignResult {
  objectives: string;
  contentIdeas: string[];
  adCopyVariations: string[];
  callToActions: string[];
  trackingStrategy: string;
}

export interface PitchResult {
  elevatorPitch: string;
  valueProposition: string;
  differentiators: string[];
  callToAction: string;
  followUpPlan: string;
}

export interface LeadScoreResult {
  score: number;
  reasoning: string;
  probability: number;
  recommendations: string[];
}

export interface MarketInsightsResult {
  marketShare: number;
  penetrationRatio: string;
  competitivePosition: string;
  growthOpportunities: string[];
  strategicRisk: string;
}

export interface SocialInsight {
  platform: string;
  strategy: string;
  bestTime: string;
  contentFormat: string;
  expectedReach: string;
}
