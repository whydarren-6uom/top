import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { normalizePaymentOptimizerData } from "../src/data/normalizePaymentData.ts";
import { recommendMerchant } from "../src/logic/recommend.ts";

const raw = JSON.parse(await readFile(new URL("../src/data/paymentOptimizer.expanded.v13.json", import.meta.url), "utf8"));
const data = normalizePaymentOptimizerData(raw, "checked-in-v13");
assert(data, "v13 data must normalize");
const merchant = (id) => { const value = data.merchants.find((item) => item.id === id); assert(value, `missing merchant ${id}`); return value; };
const run = (id, { preferences = {}, eligibility = {}, date = "2026-10-01" } = {}) => recommendMerchant(merchant(id), { ...data, eligibilityDefaults: { ...data.eligibilityDefaults, ...eligibility } }, { ...data.userSettings, ...preferences }, date);

assert.equal(data.cards.length, 19);
assert.equal(data.catalogCoverage.jalCardSpecial.count, 3267);
assert.equal(data.merchants.filter((item) => item.directoryEntry).length, 3267);
assert.equal(new Set(data.merchants.map((item) => item.id)).size, data.merchants.length);
assert(!data.paymentMethods.some((item) => item.id === "paypay-gold"));
assert(data.paymentMethods.some((item) => item.id === "paypay-card-mastercard"));
assert.equal(run("sushiro").id, "chase-sapphire-preferred");
assert.equal(run("sushiro", { preferences: { allowUsCardsInJapan: false } }).id, "jal-club-est-suica");
assert.equal(run("sushiro", { preferences: { jalMileValueYen: 4 } }).id, "jal-club-est-suica");
assert.equal(run("lawson", { preferences: { allowUsCardsInJapan: false, jalMileValueYen: 0 } }).id, "smbc-olive-gold");
assert.equal(run("lawson", { preferences: { allowUsCardsInJapan: false, jalMileValueYen: 0 } }).pct, 1.5);
assert.equal(run("mcdonalds").opportunity?.pct, 10);
assert.equal(run("mcdonalds", { eligibility: { jcbOsEligibilityConfirmed: true, jcbRegisteredMerchantIds: ["000160"] } }).id, "jp-bank-extage-jcb");
assert.equal(run("starbucks", { date: "2027-01-13" }).opportunity, null);
assert.equal(run("jcb-000354").opportunity, null);
assert.equal(run("jcb-000441").opportunity?.pct, 20 / 220 * 100);
assert.equal(run("sushiro", { eligibility: { discoverActivationConfirmed: true, discoverQuarterRemainingUsd: 20 } }).id, "discover");
assert.equal(run("sushiro", { eligibility: { discoverActivationConfirmed: true, discoverQuarterRemainingUsd: 0 } }).id, "chase-sapphire-preferred");
assert.equal(run("sushiro", { eligibility: { discoverActivationConfirmed: true, discoverQuarterRemainingUsd: 20 }, date: "2027-01-01" }).id, "chase-sapphire-preferred");
assert.equal(run("costco").id, "hsbc-us-elite");
assert.equal(run("costco", { eligibility: { paypayCreditIdentityVerified: true } }).id, "paypay-card-mastercard");
for (const item of data.merchants) {
  const recommendation = recommendMerchant(item, data, data.userSettings, "2026-10-01");
  assert(recommendation.id === null || data.paymentMethods.some((method) => method.id === recommendation.id && method.eligibleForRecommendations));
  assert(!["paypay-gold", "boa-cal-alumni", "amex-hilton-aspire"].includes(recommendation.id));
}
console.log(`PASS: validated ${data.cards.length} cards and ${data.merchants.length.toLocaleString()} merchant recommendations.`);
