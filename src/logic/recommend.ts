import type { PaymentOptimizerData } from "@/src/data/paymentData";
import type { MerchantRule, Recommendation, RecommendationInput } from "@/src/data/types";

const normalize = (value: string) => value.trim().toLowerCase();

export function findMerchantRule(query: string, data: PaymentOptimizerData): MerchantRule | undefined {
  const term = normalize(query);
  if (!term) return undefined;

  return data.merchants.find((merchant) => {
    const filters = merchant.filters
      ? Object.values(merchant.filters).flatMap((values) => values ?? [])
      : [];
    const searchable = [
      merchant.id,
      merchant.name,
      merchant.category,
      merchant.categoryDisplay ?? "",
      merchant.subCategoryDisplay ?? "",
      merchant.defaultRecommendation,
      ...(merchant.tags ?? []),
      ...(merchant.aliases ?? []),
      ...(merchant.examples ?? []),
      ...filters,
    ].map(normalize);

    return searchable.some((value) => value.includes(term) || term.includes(value));
  });
}

export function getCashierPhrase(merchant: MerchantRule) {
  const phraseStep = merchant.steps.find((step) => step.includes("Say:") || step.includes("say:"));
  return phraseStep?.replace(/^.*Say:\s?/i, "") ?? merchant.steps[0] ?? "";
}

export function recommendPayment(
  input: RecommendationInput = {},
  data: PaymentOptimizerData,
): Recommendation {
  const merchant = input.merchantId
    ? data.merchants.find((merchantRule) => merchantRule.id === input.merchantId)
    : undefined;

  if (input.campaignOverride) {
    return {
      primary: input.campaignOverride,
      secondary: merchant?.alternatives ?? [],
      steps: merchant?.steps ?? ["Confirm campaign terms before checkout."],
      reason: "Manual campaign override was provided.",
      warnings: merchant?.warnings ?? [],
    };
  }

  if (merchant) {
    let primary = merchant.defaultRecommendation;
    let reason = "Using the current explicit merchant rule.";

    if (input.goal === "use_mastercard_only") {
      primary = "PayPay Card Mastercard";
      reason = "Mastercard-only requirement overrides the general merchant preference.";
    } else if (
      (input.goal === "maximize_jal_miles" || input.goal === "maximize_jal_lsp") &&
      ((merchant.filters?.benefits ?? []).includes("JAL特約店") || merchant.category === "airline")
    ) {
      primary = "JAL CLUB EST Suica direct credit-card payment";
      reason = "JAL miles/LSP goal plus JAL flight or JAL特約店.";
    } else if (input.goal === "use_fastest_payment" && acceptsSuica(merchant)) {
      primary = "Mobile Suica";
      reason = "Fastest-payment goal and the merchant is Suica-friendly.";
    }

    return {
      primary,
      secondary: merchant.alternatives,
      steps: merchant.steps,
      reason,
      warnings: merchant.warnings,
    };
  }

  if (input.goal === "use_mastercard_only") {
    return {
      primary: "PayPay Card Mastercard",
      secondary: ["Check merchant-specific campaigns before paying."],
      steps: ["Use Mastercard directly."],
      reason: "Current no-annual-fee Mastercard fallback.",
      warnings: ["For cash advances, check current fees and interest before using the ¥30,000 cashing line."],
    };
  }

  if (input.category === "station_mall" || input.category === "transport") {
    return {
      primary: "Mobile Suica",
      secondary: ["Show or register JRE POINT first when applicable."],
      steps: ["Use the registered Mobile Suica."],
      reason: "JR/station/transport default.",
      warnings: ["Check merchant-specific campaigns before large purchases."],
    };
  }

  if (input.goal === "maximize_jal_miles" || input.goal === "maximize_jal_lsp") {
    return {
      primary: "JAL CLUB EST Suica direct credit-card payment",
      secondary: ["Use another route only when a current campaign clearly beats it."],
      steps: ["Pay directly with the JAL card when the merchant qualifies."],
      reason: "Goal is JAL miles/LSP.",
      warnings: ["JAL特約店 usually requires direct card payment."],
    };
  }

  if (input.category === "online" && input.goal === "use_current_campaign") {
    return {
      primary: "Use the active campaign card",
      secondary: ["JP BANK EXTAGE JCB for eligible JCB campaigns", "Fidelity Rewards Visa for its current targeted offer when eligible"],
      steps: ["Confirm enrollment and merchant eligibility before checkout."],
      reason: "Campaign mode requires current offer verification.",
      warnings: ["Campaign rules are temporary."],
    };
  }

  return {
    primary: "JAL CLUB EST Suica for ordinary Japan spend; Fidelity Rewards Visa for ordinary overseas spend.",
    secondary: ["Mobile Suica for JR/station use", "PayPay Card Mastercard for Mastercard-only merchants"],
    steps: ["Check merchant-specific campaign, coupon, membership and shareholder-benefit rules first."],
    reason: "No explicit merchant rule matched; using current dashboard defaults.",
    warnings: ["Current campaigns can override these defaults."],
  };
}

function acceptsSuica(merchant: MerchantRule) {
  return (
    (merchant.filters?.paymentMethods ?? []).some((method) => method.toLowerCase().includes("suica") || method.includes("交通系IC")) ||
    merchant.category === "station_mall" ||
    merchant.category === "transport"
  );
}
