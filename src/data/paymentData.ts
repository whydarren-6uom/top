import paymentOptimizerJson from "./paymentOptimizer.json";
import type { MerchantRule, PaymentMethod } from "./types";

export type PaymentOptimizerData = {
  lastUpdated: string;
  userSettings: {
    smbcTrainingActive: boolean;
    smbcTrainingDeadline: string;
    smbcRemainingSpendYen: number;
    paypayMastercardLimitYen: number;
    paypayGoldBrand: string;
    paypayGoldLimitYen: number;
    hasAuPayCard: boolean;
    hasAuPayGoldCard: boolean;
    preferJal: boolean;
    preferAna: boolean;
  };
  paymentMethods: PaymentMethod[];
  merchants: MerchantRule[];
};

export const localPaymentOptimizerData =
  paymentOptimizerJson as PaymentOptimizerData;
