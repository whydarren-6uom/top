import type { PaymentOptimizerData } from "@/src/data/paymentData";
import type {
  MerchantCategory,
  MerchantRule,
  Recommendation,
  RecommendationInput,
} from "@/src/data/types";

const ordinaryCategories: Array<MerchantCategory | string> = [
  "convenience_store",
  "restaurant",
  "supermarket",
  "other",
];

const normalize = (value: string) => value.trim().toLowerCase();

export function isSmbcTrainingDate(
  date = "2026-07-03",
  data: PaymentOptimizerData,
) {
  return (
    data.userSettings.smbcTrainingActive &&
    date <= data.userSettings.smbcTrainingDeadline
  );
}

export function findMerchantRule(
  query: string,
  data: PaymentOptimizerData,
): MerchantRule | undefined {
  const term = normalize(query);

  if (!term) {
    return undefined;
  }

  return data.merchants.find((merchant) => {
    const searchable = [
      merchant.id,
      merchant.name,
      merchant.category,
      ...(merchant.tags ?? []),
      ...(merchant.aliases ?? []),
      ...(merchant.examples ?? []),
    ].map(normalize);

    return searchable.some((value) => value.includes(term) || term.includes(value));
  });
}

export function getCashierPhrase(merchant: MerchantRule) {
  const phraseStep = merchant.steps.find(
    (step) => step.includes("Say:") || step.includes("say:"),
  );

  return phraseStep?.replace(/^.*Say:\s?/i, "") ?? merchant.steps[0] ?? "";
}

export function recommendPayment(
  input: RecommendationInput = {},
  data: PaymentOptimizerData,
): Recommendation {
  const date = input.date ?? "2026-07-03";
  const { merchants, userSettings } = data;
  const merchant =
    input.merchantId &&
    merchants.find((merchantRule) => merchantRule.id === input.merchantId);
  const trainingActive = isSmbcTrainingDate(date, data);

  if (merchant) {
    const goal = input.goal;
    let primary = merchant.defaultRecommendation;
    let reason = "Using the explicit merchant rule.";

    if (goal === "use_mastercard_only") {
      primary =
        (input.amount ?? 0) <= userSettings.paypayMastercardLimitYen
          ? "JAL Pay -> au PAY Prepaid -> PayPay ordinary Mastercard if small"
          : "JAL Pay -> au PAY Prepaid -> cash / Costco Global Card";
      reason = "Mastercard-only goal overrides general merchant preference.";
    } else if (
      (goal === "maximize_jal_miles" || goal === "maximize_jal_lsp") &&
      (merchant.tags.includes("JAL特約店") || merchant.category === "airline")
    ) {
      primary = "JAL CLUB EST Suica direct credit-card payment";
      reason = "JAL miles/LSP goal plus JAL flight or JAL特約店.";
    } else if (goal === "use_fastest_payment" && acceptsSuica(merchant)) {
      primary = "Mobile Suica";
      reason = "Fastest-payment goal and the merchant is Suica-friendly.";
    } else if (trainingActive && merchant.duringSmbcTrainingRecommendation) {
      primary = merchant.duringSmbcTrainingRecommendation;
      reason = "SMBC修行 mode is active through 2026-08-31.";
    } else if (!trainingActive && merchant.afterSmbcTrainingRecommendation) {
      primary = merchant.afterSmbcTrainingRecommendation;
      reason = "Using the post-SMBC修行 merchant rule.";
    }

    if (input.campaignOverride) {
      primary = input.campaignOverride;
      reason = "Manual campaign override was provided.";
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
      primary:
        (input.amount ?? 0) <= userSettings.paypayMastercardLimitYen
          ? "JAL Pay -> au PAY Prepaid -> PayPay ordinary Mastercard if small"
          : "JAL Pay -> au PAY Prepaid -> cash / Costco Global Card",
      secondary: ["Test prepaid/contactless acceptance with a small transaction."],
      steps: ["Say: Mastercardのタッチでお願いします"],
      reason: "Mastercard-only fallback ladder.",
      warnings: [
        "PayPay Gold is Visa, not Mastercard.",
        "PayPay ordinary Mastercard has only 3万円 limit.",
      ],
    };
  }

  if (input.category === "station_mall" || input.category === "transport") {
    return {
      primary: "Mobile Suica",
      secondary: ["Show JRE POINT first if the store participates."],
      steps: ["Say: Suicaでお願いします"],
      reason: "Station/JR/transport IC rule.",
      warnings: [
        "Mobile Suica charge earns JRE POINT, not direct JAL shopping miles/LSP.",
      ],
    };
  }

  if (input.category === "online" && input.goal === "use_current_campaign") {
    return {
      primary: "Use the active campaign card",
      secondary: ["JP BANK EXTAGE JCB for JCB campaign", "PayPay Gold for PayPay/Yahoo/LYP value"],
      steps: ["Confirm campaign terms before checkout."],
      reason: "Campaign mode requires manual confirmation.",
      warnings: ["Campaign rules are not permanent and may change."],
    };
  }

  if (trainingActive && ordinaryCategories.includes(input.category ?? "other")) {
    return {
      primary: "SMBC Olive Gold",
      secondary: ["JAL CLUB EST Suica for JAL特約店", "Mobile Suica for station/JR convenience"],
      steps: ["Say: クレジットでお願いします"],
      reason: "Ordinary spend before or on 2026-08-31 should help finish SMBC修行.",
      warnings: [
        "Avoid excluded e-money/prepaid charges if trying to count spend toward 100万円.",
      ],
    };
  }

  if (input.goal === "maximize_jal_miles" || input.goal === "maximize_jal_lsp") {
    return {
      primary: "JAL CLUB EST Suica direct credit-card payment",
      secondary: ["Use JAL Pay only for an eligible LSP campaign route."],
      steps: ["Say: クレジットでお願いします"],
      reason: "Goal is JAL miles/LSP.",
      warnings: [
        "Avoid Mobile Suica if the goal is direct JAL shopping miles/LSP.",
        "JALカード特約店 usually requires direct card payment.",
      ],
    };
  }

  return {
    primary: "Choose based on goal: JAL/LSP = JAL card; convenience = Suica; campaign = campaign card.",
    secondary: ["SMBC Olive Gold as general fallback", "PayPay Gold for PayPay/Yahoo/LYP"],
    steps: ["Confirm accepted payment methods, then choose the best current route."],
    reason: "No explicit merchant rule matched.",
    warnings: ["Rules and campaigns may change; check before large purchases."],
  };
}

function acceptsSuica(merchant: MerchantRule) {
  return (
    merchant.tags.some((tag) => tag.toLowerCase().includes("suica")) ||
    merchant.category === "station_mall"
  );
}
