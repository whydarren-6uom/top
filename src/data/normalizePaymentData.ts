import type { PaymentOptimizerData } from "./paymentData";
import type { EligibilityDefaults, JcbOffer, MerchantRule, PaymentMethod, PaymentPreferences, RecommendationCandidate, Region, SourceLink } from "./types";

type JsonRecord = Record<string, unknown>;
const record = (value: unknown): value is JsonRecord => typeof value === "object" && value !== null && !Array.isArray(value);
const text = (value: unknown, fallback = "") => typeof value === "string" ? value : fallback;
const number = (value: unknown, fallback = 0) => typeof value === "number" && Number.isFinite(value) ? value : fallback;
const nullableNumber = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? value : null;
const bool = (value: unknown, fallback = false) => typeof value === "boolean" ? value : fallback;
const texts = (value: unknown) => Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
const objects = (value: unknown) => Array.isArray(value) ? value.filter(record) : [];

function links(value: unknown): SourceLink[] {
  return objects(value).map((link) => ({ label: text(link.label), url: text(link.url) }))
    .filter((link) => link.label && /^https:\/\//.test(link.url));
}

function method(value: JsonRecord): PaymentMethod | null {
  const id = text(value.id); const name = text(value.name); const type = text(value.type);
  if (!id || !name || !type) return null;
  const account = record(value.account) ? value.account : undefined;
  const rawRegion = text(value.region);
  const region = ["JP", "US", "CN"].includes(rawRegion) ? rawRegion as Region : undefined;
  return {
    id, name, type, region,
    account: account ? {
      status: text(account.status, "unknown"), network: text(account.network) || undefined,
      mode: text(account.mode) || undefined, creditModeStatus: text(account.creditModeStatus) || undefined,
      issuerServicer: text(account.issuerServicer) || undefined, billingCurrency: text(account.billingCurrency) || undefined,
      annualFeeYen: typeof account.annualFeeYen === "number" ? account.annualFeeYen : undefined,
    } : undefined,
    rewards: texts(value.rewards), traits: texts(value.traits), links: links(value.links),
    sourceAsOf: text(value.sourceAsOf) || undefined,
    eligibleForRecommendations: bool(value.eligibleForRecommendations),
  };
}

function candidate(value: unknown): RecommendationCandidate {
  const item = record(value) ? value : {};
  return { id: typeof item.id === "string" ? item.id : null, pct: nullableNumber(item.pct), how: text(item.how), note: text(item.note) };
}

function jcbOffer(value: unknown): JcbOffer | undefined {
  if (!record(value) || !text(value.id) || !text(value.url)) return undefined;
  return {
    id: text(value.id), url: text(value.url), advertisedMultiplier: text(value.advertisedMultiplier) || undefined,
    pointValuePercent: nullableNumber(value.pointValuePercent), eligibility: text(value.eligibility) || undefined,
    registrationRequired: bool(value.registrationRequired), channel: text(value.channel), startsOn: text(value.startsOn),
    endsOn: typeof value.endsOn === "string" ? value.endsOn : null,
    premiumOnlyOrTiered: bool(value.premiumOnlyOrTiered), fixedRewardPoints: nullableNumber(value.fixedRewardPoints),
  };
}

function merchant(value: JsonRecord): MerchantRule | null {
  const id = text(value.id); const name = text(value.name); if (!id || !name) return null;
  const rec = record(value.recommendation) ? value.recommendation : {};
  const directory = record(value.directoryEntry) ? value.directoryEntry : value.directoryEntry === true ? {} : undefined;
  return {
    id, name, category: text(value.category, "other"), aliases: texts(value.aliases), program: text(value.program, "ordinary"),
    notes: texts(value.notes), memberSteps: texts(value.memberSteps), qualification: text(value.qualification) || undefined,
    acceptance: text(value.acceptance) || undefined, shareholder: text(value.shareholder) || undefined,
    defaultRecommendation: text(value.defaultRecommendation, "Confirm acceptance before paying"),
    recommendation: { ...candidate(rec), opportunity: record(rec.opportunity) ? candidate(rec.opportunity) : null },
    sourceUrls: texts(value.sourceUrls).filter((url) => /^https:\/\//.test(url)), jcbOffer: jcbOffer(value.jcbOffer),
    directoryEntry: directory ? { name: text(directory.name) || undefined, detailUrl: text(directory.detailUrl) || undefined, area: text(directory.area) || undefined, category: text(directory.category) || undefined } : undefined,
  };
}

export function normalizePaymentOptimizerData(value: unknown, source: PaymentOptimizerData["source"]): PaymentOptimizerData | null {
  if (!record(value) || number(value.schemaVersion) < 13) return null;
  const paymentMethods = objects(value.paymentMethods).map(method).filter((item): item is PaymentMethod => item !== null);
  const merchants = objects(value.merchants).map(merchant).filter((item): item is MerchantRule => item !== null);
  const cardIds = new Set(objects(value.cards).map((card) => text(card.paymentMethodId)).filter(Boolean));
  const cards = paymentMethods.filter((item) => item.type === "card" && cardIds.has(item.id));
  if (paymentMethods.length < 19 || cards.length !== 19 || merchants.length < 3400) return null;

  const settings = record(value.userSettings) ? value.userSettings : {};
  const userSettings: PaymentPreferences = {
    defaultOptimizationGoal: text(settings.defaultOptimizationGoal, "maximize_net_value"), preferJal: bool(settings.preferJal, true),
    hasMujiShareholderCoupon: bool(settings.hasMujiShareholderCoupon), hasUsmhShareholderVouchers: bool(settings.hasUsmhShareholderVouchers),
    jalMileValueYen: Math.min(10, Math.max(0, number(settings.jalMileValueYen, 2))), allowUsCardsInJapan: bool(settings.allowUsCardsInJapan, true),
  };
  const eligibility = record(value.eligibilityDefaults) ? value.eligibilityDefaults : {};
  const eligibilityDefaults: EligibilityDefaults = {
    jcbRegisteredMerchantIds: texts(eligibility.jcbRegisteredMerchantIds), jcbOsEligibilityConfirmed: bool(eligibility.jcbOsEligibilityConfirmed),
    paypayCreditIdentityVerified: bool(eligibility.paypayCreditIdentityVerified), discoverActivationConfirmed: bool(eligibility.discoverActivationConfirmed),
    discoverQuarterRemainingUsd: nullableNumber(eligibility.discoverQuarterRemainingUsd), hsbcChinaCashbackEnrolled: bool(eligibility.hsbcChinaCashbackEnrolled),
  };
  const coverage = record(value.catalogCoverage) ? value.catalogCoverage : {};
  const jal = record(coverage.jalCardSpecial) ? coverage.jalCardSpecial : {}; const jcb = record(coverage.jcbPartner) ? coverage.jcbPartner : {};
  return {
    schemaVersion: number(value.schemaVersion), lastUpdated: text(value.lastUpdated), timezone: text(value.timezone, "Asia/Tokyo"),
    userSettings, eligibilityDefaults, paymentMethods, cards, merchants,
    globalRules: objects(value.globalRules).map((rule) => ({ id: text(rule.id), rule: text(rule.rule) })).filter((rule) => rule.id && rule.rule),
    catalogCoverage: {
      jalCardSpecial: { count: number(jal.count), source: text(jal.source), pages: number(jal.pages) || undefined, asOf: text(jal.asOf) || undefined, scope: text(jal.scope) || undefined },
      jcbPartner: { count: number(jcb.count), source: text(jcb.source), asOf: text(jcb.asOf) || undefined, fullyReviewed20x: number(jcb.fullyReviewed20x) || undefined, otherEntries: text(jcb.otherEntries) || undefined },
    }, source,
  };
}
