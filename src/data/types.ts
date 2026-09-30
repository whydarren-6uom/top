export type Region = "JP" | "US" | "CN";

export type SourceLink = { label: string; url: string };

export type CardAccount = {
  status: string;
  network?: string;
  mode?: string;
  creditModeStatus?: string;
  issuerServicer?: string;
  billingCurrency?: string;
  annualFeeYen?: number;
};

export type PaymentMethod = {
  id: string;
  name: string;
  type: string;
  region?: Region;
  account?: CardAccount;
  rewards: string[];
  traits: string[];
  links: SourceLink[];
  sourceAsOf?: string;
  eligibleForRecommendations: boolean;
};

export type RecommendationCandidate = { id: string | null; pct: number | null; how: string; note: string };

export type JcbOffer = {
  id: string;
  url: string;
  advertisedMultiplier?: string;
  pointValuePercent: number | null;
  eligibility?: string;
  registrationRequired: boolean;
  channel: string;
  startsOn: string;
  endsOn: string | null;
  premiumOnlyOrTiered: boolean;
  fixedRewardPoints: number | null;
};

export type MerchantRule = {
  id: string;
  name: string;
  category: string;
  aliases: string[];
  program: string;
  notes: string[];
  memberSteps: string[];
  qualification?: string;
  acceptance?: string;
  shareholder?: string;
  defaultRecommendation: string;
  recommendation: RecommendationCandidate & { opportunity: RecommendationCandidate | null };
  sourceUrls: string[];
  jcbOffer?: JcbOffer;
  directoryEntry?: { name?: string; detailUrl?: string; area?: string; category?: string };
};

export type PaymentPreferences = {
  defaultOptimizationGoal: string;
  preferJal: boolean;
  hasMujiShareholderCoupon: boolean;
  hasUsmhShareholderVouchers: boolean;
  jalMileValueYen: number;
  allowUsCardsInJapan: boolean;
};

export type EligibilityDefaults = {
  jcbRegisteredMerchantIds: string[];
  jcbOsEligibilityConfirmed: boolean;
  paypayCreditIdentityVerified: boolean;
  discoverActivationConfirmed: boolean;
  discoverQuarterRemainingUsd: number | null;
  hsbcChinaCashbackEnrolled: boolean;
};

export type Recommendation = RecommendationCandidate & { opportunity: RecommendationCandidate | null };
