import type { EligibilityDefaults, MerchantRule, PaymentMethod, PaymentPreferences } from "./types";

export type CatalogCoverage = {
  jalCardSpecial: { count: number; source: string; pages?: number; asOf?: string; scope?: string };
  jcbPartner: { count: number; source: string; asOf?: string; fullyReviewed20x?: number; otherEntries?: string };
};

export type PaymentOptimizerData = {
  schemaVersion: number;
  lastUpdated: string;
  timezone: string;
  userSettings: PaymentPreferences;
  eligibilityDefaults: EligibilityDefaults;
  paymentMethods: PaymentMethod[];
  cards: PaymentMethod[];
  merchants: MerchantRule[];
  globalRules: Array<{ id: string; rule: string }>;
  catalogCoverage: CatalogCoverage;
  source: "checked-in-v13" | "sanity-v13";
};
