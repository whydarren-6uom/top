import type { MerchantRule } from "@/src/data/types";

const paymentPatterns: Array<[RegExp, string]> = [
  [/MUJI App.*JRE POINT.*Mobile Suica/i, "MUJI app + JRE POINT + Mobile Suica"],
  [/JRE POINT.*Mobile Suica/i, "JRE POINT + Mobile Suica"],
  [/JP BANK.*FamiPay|FamiPay.*JP BANK/i, "JP BANK EXTAGE JCB -> FamiPay"],
  [/SMBC Olive Gold.*Visa touch|smartphone Visa touch/i, "SMBC Olive Gold smartphone Visa touch"],
  [/JAL CLUB EST Suica.*direct|JAL card direct|JAL direct/i, "JAL CLUB EST Suica direct"],
  [/JAL Pay.*au PAY.*PayPay/i, "JAL Pay -> au PAY Prepaid -> PayPay MC"],
  [/PayPay Gold|PayPay Credit/i, "PayPay Gold / PayPay Credit"],
  [/LaCuCa.*SMBC|Life app.*SMBC/i, "LaCuCa/Life app + SMBC Olive Gold"],
  [/SMBC Olive Gold/i, "SMBC Olive Gold"],
  [/Mobile Suica/i, "Mobile Suica"],
  [/JAL Pay/i, "JAL Pay"],
  [/au PAY/i, "au PAY"],
  [/JP BANK EXTAGE JCB/i, "JP BANK EXTAGE JCB"],
  [/FamiPay/i, "FamiPay"],
  [/PayPay/i, "PayPay"],
  [/JAL CLUB EST Suica/i, "JAL CLUB EST Suica"],
  [/Best current campaign|campaign-best|active campaign/i, "Best current campaign"],
  [/Cash/i, "Cash"],
];

export function compactRecommendation(value?: string) {
  if (!value) {
    return "-";
  }

  const matches = paymentPatterns
    .filter(([pattern]) => pattern.test(value))
    .map(([, label]) => label);
  const unique = Array.from(new Set(matches));

  if (unique.length > 0) {
    return unique.slice(0, 2).join(" / ");
  }

  return value.length > 72 ? `${value.slice(0, 69).trim()}...` : value;
}

export function isCashierPhrase(item: string) {
  const normalized = item.trim().toLowerCase();

  return (
    normalized.startsWith("say:") ||
    normalized.includes(" say ") ||
    normalized.includes("say ") ||
    normalized.includes("でお願いします") ||
    normalized.includes("checkout say") ||
    normalized.includes("cashier")
  );
}

export function getUsefulSteps(merchant: MerchantRule) {
  return merchant.steps.filter((step) => !isCashierPhrase(step));
}

export function getFilterableTags(merchants: MerchantRule[]) {
  const tags = merchants.flatMap((merchant) => merchant.tags);

  return Array.from(
    new Set(
      tags
        .filter((tag) => !/^not\s+/i.test(tag.trim()))
        .filter((tag) => tag !== "JAL optional")
        .sort((a, b) => a.localeCompare(b)),
    ),
  );
}

export function filterMerchants(
  merchants: MerchantRule[],
  query: string,
  tag: string,
) {
  const term = query.trim().toLowerCase();

  return merchants.filter((merchant) => {
    const matchesTag = !tag || merchant.tags.includes(tag);

    if (!matchesTag) {
      return false;
    }

    if (!term) {
      return true;
    }

    const searchable = [
      merchant.name,
      merchant.category,
      merchant.defaultRecommendation,
      merchant.duringSmbcTrainingRecommendation ?? "",
      merchant.afterSmbcTrainingRecommendation ?? "",
      ...merchant.tags,
      ...(merchant.aliases ?? []),
      ...(merchant.examples ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(term);
  });
}
