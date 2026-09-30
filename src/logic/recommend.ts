import type { PaymentOptimizerData } from "@/src/data/paymentData";
import type { EligibilityDefaults, MerchantRule, PaymentPreferences, Recommendation, RecommendationCandidate } from "@/src/data/types";

export function japanDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function recommendMerchant(
  merchant: MerchantRule,
  data: PaymentOptimizerData,
  preferences: PaymentPreferences,
  date = japanDate(),
): Recommendation {
  const eligibility: EligibilityDefaults = data.eligibilityDefaults;
  const available = (id: string) => data.paymentMethods.some((card) => card.id === id && card.eligibleForRecommendations);
  const candidates: RecommendationCandidate[] = [];
  const add = (id: string, pct: number, how: string, note = "") => {
    if (available(id)) candidates.push({ id, pct, how, note });
  };

  if (merchant.program === "cash-or-store-wallet") return result(null, null, "Cash / store-designated wallet", "Confirm this branch’s accepted payment method.");
  if (merchant.program === "suica-charge") return result("jal-club-est-suica", 1.5, "JAL CLUB EST Suica → Mobile Suica recharge", "1.5% JRE POINT; merchant-side points are separate.");
  if (merchant.program === "china-unionpay") return result("hsbc-cn-unionpay-diamond", null, "HSBC China UnionPay Diamond", "CNY 1 = 1 point; claim U-plan offers before paying.");
  if (merchant.program === "uq-mobile") return result("au-pay-gold", 1, "au PAY Gold linked to the UQ bill", "Only confirmed eligible charges count; pending utility/bank conditions are excluded.");

  if (merchant.program === "mastercard-only") {
    add("hsbc-us-elite", 1, "HSBC USA Elite Mastercard · physical card", "Confirm Japan merchant acceptance.");
    if (eligibility.paypayCreditIdentityVerified) add("paypay-card-mastercard", 1, "PayPay Card Mastercard · physical card", "Registration and identity verification confirmed.");
    const best = candidates.sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0) || (a.id === "paypay-card-mastercard" ? -1 : 1))[0];
    return { ...(best ?? result(null, null, "Use an accepted Mastercard", "Verify acceptance.")), opportunity: eligibility.paypayCreditIdentityVerified ? null : { id: "paypay-card-mastercard", pct: 1, how: "PayPay Card Mastercard · after registration/identity verification", note: "Conditional domestic no-fee Mastercard fallback." } };
  }

  add("jal-club-est-suica", preferences.jalMileValueYen, "JAL CLUB EST Suica · direct card payment", `1 mile/¥100 valued at ¥${preferences.jalMileValueYen}/mile; miles are not cash.`);
  const oliveTarget = merchant.notes.some((note) => note.includes("対象店1.5%ルート"));
  add("smbc-olive-gold", oliveTarget ? 1.5 : 0.5, oliveTarget ? "Olive Gold debit · eligible smartphone touch route" : "Olive Gold · debit mode", oliveTarget ? "1.5% V Point only at eligible locations and via the supported smartphone touch route; physical-card touch, iD, chip, and swipe are excluded." : "Ordinary debit reward is 0.5% V Point. Declined credit mode is never used.");
  if (preferences.allowUsCardsInJapan) add("fidelity-rewards-visa", 2, "Fidelity Rewards Visa · direct card payment", "2% cash back when redeemed to an eligible Fidelity account; confirm acceptance.");
  if (eligibility.paypayCreditIdentityVerified) add("paypay-card-mastercard", 1, "PayPay Card Mastercard · direct card payment");
  if (merchant.program === "jal-special") add("jal-club-est-suica", 2 * preferences.jalMileValueYen, "JAL CLUB EST Suica · direct card payment", `Directory-listed eligible scope only; 2 miles/¥100 valued at ¥${preferences.jalMileValueYen}/mile.`);
  if (preferences.allowUsCardsInJapan && merchant.category === "dining") {
    add("chase-sapphire-preferred", 3, "Chase Sapphire Preferred · direct card payment", "3x dining points valued at the 1¢ cash baseline.");
    add("wells-fargo-autograph", 3, "Wells Fargo Autograph · direct card payment", "Eligible dining earns 3x at the 1¢ cash baseline.");
    if (eligibility.discoverActivationConfirmed && (eligibility.discoverQuarterRemainingUsd ?? 0) > 0 && date >= "2026-10-01" && date <= "2026-12-31") {
      add("discover", 5, "Discover · activated Q4 dining category", "5% only within the remaining quarterly cap and where Discover is accepted.");
    }
  }
  if (preferences.allowUsCardsInJapan && ["hotel", "airline", "rental", "fuel", "transit"].includes(merchant.category)) {
    add("wells-fargo-autograph", 3, "Wells Fargo Autograph · direct card payment", "Eligible 3x category; MCC and acceptance restrictions apply.");
  }

  let opportunity: RecommendationCandidate | null = null;
  const offer = merchant.jcbOffer;
  if (offer && offer.pointValuePercent !== null && !offer.premiumOnlyOrTiered && date >= offer.startsOn && (!offer.endsOn || date <= offer.endsOn)) {
    const pct = offer.fixedRewardPoints ? 20 / 220 * 100 : offer.pointValuePercent;
    const info = { id: "jp-bank-extage-jcb", pct, how: `JP BANK EXTAGE JCB · ${offer.channel}`, note: offer.fixedRewardPoints ? "About 20 points on the ¥220 monthly fee; the enrollment fee is not multiplied." : "20x ≈ 10% J-POINT value, not 20% cashback; EXTAGE extra rewards are not assumed." };
    if (eligibility.jcbOsEligibilityConfirmed && eligibility.jcbRegisteredMerchantIds.includes(offer.id)) add(info.id, pct, info.how, `${info.note} Registration confirmed; channel restrictions still apply.`);
    else opportunity = { ...info, how: `${info.how} · registration required`, note: `${info.note} Confirm OS eligibility and register this merchant in MyJCB.` };
  }

  candidates.sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0) || (preferences.preferJal && a.id === "jal-club-est-suica" ? -1 : 0));
  let best = candidates[0] ?? result(null, null, "Confirm acceptance before choosing payment", "No eligible card rule matched.");
  if (opportunity && (opportunity.pct ?? 0) <= (best.pct ?? 0)) opportunity = null;
  if (merchant.shareholder === "muji" && preferences.hasMujiShareholderCoupon) best = { ...best, how: `Use MUJI shareholder coupon first → ${best.how}`, note: `${best.note} Coupon discount and card reward are not added together.` };
  if (merchant.shareholder === "usmh" && preferences.hasUsmhShareholderVouchers) best = { ...best, how: `Use USMH shareholder voucher first → ${best.how}`, note: `${best.note} Voucher terms and remaining balance apply.` };
  return { ...best, opportunity };
}

function result(id: string | null, pct: number | null, how: string, note: string): Recommendation {
  return { id, pct, how, note, opportunity: null };
}
