export const RULE_SNAPSHOT_DATE = "2026-07-03";

export const userSettings = {
  smbcTrainingActive: true,
  smbcTrainingDeadline: "2026-08-31",
  smbcRemainingSpendYen: 350000,
  paypayMastercardLimitYen: 30000,
  paypayGoldBrand: "Visa",
  paypayGoldLimitYen: 300000,
  hasAuPayCard: false,
  hasAuPayGoldCard: false,
  preferJal: true,
  preferAna: false,
};

export type UserSettings = typeof userSettings;
