import type { MerchantRule, PaymentMethod } from "./types";

export type DashboardMetric = {
  label: string;
  value: string;
  detail?: string;
};

export type PaymentOptimizerData = {
  lastUpdated: string;
  canonicalStatusVersion?: number;
  canonicalStatusAsOf?: string;
  userSettings: {
    paypayMastercardLimitYen?: number;
    paypayMastercardCashAdvanceLimitYen?: number;
    smbcPaymentMode?: string;
    smbcCreditModeStatus?: string;
    paypayGoldStatus?: string;
    defaultOptimizationGoal?: string;
    [key: string]: unknown;
  };
  paymentMethods: PaymentMethod[];
  merchants: MerchantRule[];
  homepage?: {
    title?: string;
    subtitle?: string;
    defaultNow?: Record<
      string,
      {
        default?: string;
        why?: string;
        how?: string;
        rechargeFrom?: string;
        card?: string;
        through?: string;
        rule?: string;
        status?: string;
      }
    >;
    cards?: {
      japan?: Array<Record<string, unknown>>;
      us?: Array<Record<string, unknown>>;
      closed?: Array<Record<string, unknown>>;
    };
    rememberAtCheckout?: Array<Record<string, unknown>>;
    shareholderBenefits?: Array<Record<string, unknown>>;
    activeCampaigns?: Array<Record<string, unknown>>;
    pointsAndExpiry?: Array<Record<string, unknown>>;
    searchFirst?: string[];
  };
};
