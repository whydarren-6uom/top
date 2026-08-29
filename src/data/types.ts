export type PaymentMethod = {
  id: string;
  name: string;
  type: "credit_card" | "prepaid" | "wallet" | "point_card" | "membership";
  network?:
    | "Visa"
    | "Mastercard"
    | "JCB"
    | "Suica"
    | "QUICPay"
    | "iD"
    | "PayPay"
    | "FamiPay"
    | "Other";
  status?: string;
  mode?: string;
  annualFeeYen?: number;
  creditLimitYen?: number;
  cashAdvanceLimitYen?: number;
  bestFor: string[];
  avoidFor: string[];
  notes: string[];
};

export type MerchantCategory =
  | "convenience_store"
  | "restaurant"
  | "supermarket"
  | "station_mall"
  | "airline"
  | "online"
  | "transport"
  | "drugstore"
  | "electronics"
  | "retail"
  | "other";

export type MerchantFilters = {
  storeCategory?: string[];
  storeSubcategory?: string[];
  paymentMethods?: string[];
  rewardPrograms?: string[];
  benefits?: string[];
  conditions?: string[];
};

export type MerchantRule = {
  id: string;
  name: string;
  category: MerchantCategory | string;
  categoryDisplay?: string;
  subCategoryDisplay?: string;
  defaultRecommendation: string;
  steps: string[];
  alternatives: string[];
  warnings: string[];
  tags: string[];
  tagKeys?: string[];
  filters?: MerchantFilters;
  aliases?: string[];
  examples?: string[];
};

export type Goal =
  | "maximize_jal_miles"
  | "maximize_jal_lsp"
  | "maximize_cashback"
  | "use_fastest_payment"
  | "use_mastercard_only"
  | "use_current_campaign";

export type RecommendationInput = {
  merchantId?: string;
  category?: MerchantCategory | string;
  amount?: number;
  date?: string;
  goal?: Goal;
  campaignOverride?: string;
};

export type Recommendation = {
  primary: string;
  secondary?: string[];
  steps: string[];
  reason: string;
  warnings: string[];
};
