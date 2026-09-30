"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { usePaymentData } from "@/src/components/PaymentDataProvider";
import { japanDate, recommendMerchant } from "@/src/logic/recommend";
import type { MerchantRule, Recommendation } from "@/src/data/types";

const PAGE_SIZE = 36;
const normalize = (value: string) => value.normalize("NFKC").toLocaleLowerCase();

function ResultCard({ merchant, recommendation }: { merchant: MerchantRule; recommendation: Recommendation }) {
  return <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
    <div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold text-zinc-950 dark:text-white">{merchant.name}</h3><p className="mt-1 text-xs capitalize text-zinc-500">{merchant.category.replaceAll("-", " ")}</p></div>{recommendation.pct !== null && <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-300">≈ {recommendation.pct.toFixed(recommendation.pct % 1 ? 1 : 0)}%</span>}</div>
    <p className="mt-3 text-sm font-medium leading-6 text-zinc-800 dark:text-zinc-200">{recommendation.how}</p>
    {recommendation.opportunity && <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900 dark:bg-amber-500/10 dark:text-amber-200"><strong>After setup:</strong> {recommendation.opportunity.how} (≈ {recommendation.opportunity.pct}%)</p>}
    <details className="mt-3 border-t border-zinc-100 pt-3 text-sm dark:border-zinc-800"><summary className="cursor-pointer select-none font-medium text-zinc-600 dark:text-zinc-300">Why and conditions</summary><div className="mt-3 space-y-2 leading-6 text-zinc-600 dark:text-zinc-400"><p>{recommendation.note || merchant.defaultRecommendation}</p>{merchant.qualification && <p><strong>Eligibility:</strong> {merchant.qualification}</p>}{merchant.acceptance && <p><strong>Acceptance:</strong> {merchant.acceptance}</p>}{merchant.memberSteps.length > 0 && <p><strong>Before paying:</strong> {merchant.memberSteps.join(" · ")}</p>}{merchant.notes.map((note) => <p key={note}>{note}</p>)}{merchant.sourceUrls.length > 0 && <div className="flex flex-wrap gap-x-3 gap-y-1">{merchant.sourceUrls.map((url, index) => <a key={url} href={url} target="_blank" rel="noreferrer" className="font-medium text-green-700 underline decoration-green-300 underline-offset-2 dark:text-green-300">Source {index + 1}</a>)}</div>}</div></details>
  </article>;
}

export default function Merchants() {
  const { data, preferences } = usePaymentData();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [category, setCategory] = useState("all");
  const [program, setProgram] = useState("all");
  const [page, setPage] = useState(1);
  const categories = useMemo(() => Array.from(new Set(data.merchants.map((merchant) => merchant.category))).sort(), [data.merchants]);
  const programs = useMemo(() => Array.from(new Set(data.merchants.map((merchant) => merchant.program))).sort(), [data.merchants]);
  const filtered = useMemo(() => { const needle = normalize(deferredQuery.trim()); return data.merchants.filter((merchant) => (category === "all" || merchant.category === category) && (program === "all" || merchant.program === program) && (!needle || normalize([merchant.name, ...merchant.aliases, merchant.category, merchant.program, merchant.directoryEntry?.area ?? ""].join(" ")).includes(needle))); }, [data.merchants, deferredQuery, category, program]);
  useEffect(() => setPage(1), [deferredQuery, category, program]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const today = japanDate();

  return <div className="space-y-6">
    <section><h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Stores</h2><p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Search Japanese, English, or Chinese names. Recommendations recalculate from your settings for {today} in Japan.</p></section>
    <section className="grid gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50 sm:grid-cols-3">
      <label className="sm:col-span-3"><span className="mb-1.5 block text-sm font-medium">Search stores</span><input aria-label="Search stores" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. 寿司郎, スシロー, Sushiro" className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-base outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-zinc-700 dark:bg-zinc-950" /></label>
      <label><span className="mb-1.5 block text-xs text-zinc-500">Category</span><select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"><option value="all">All categories</option>{categories.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label><span className="mb-1.5 block text-xs text-zinc-500">Program</span><select value={program} onChange={(event) => setProgram(event.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"><option value="all">All programs</option>{programs.map((value) => <option key={value}>{value}</option>)}</select></label>
      <div className="self-end text-sm text-zinc-500">{filtered.length.toLocaleString()} results · showing at most {PAGE_SIZE}</div>
    </section>
    {visible.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map((merchant) => <ResultCard key={merchant.id} merchant={merchant} recommendation={recommendMerchant(merchant, data, preferences, today)} />)}</div> : <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">No stores match those filters.</p>}
    {pageCount > 1 && <nav aria-label="Store result pages" className="flex items-center justify-between"><button type="button" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm disabled:opacity-40 dark:border-zinc-700">Previous</button><span className="text-sm text-zinc-500">Page {page} of {pageCount}</span><button type="button" disabled={page === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm disabled:opacity-40 dark:border-zinc-700">Next</button></nav>}
    <aside className="rounded-xl bg-zinc-100 p-4 text-xs leading-5 text-zinc-600 dark:bg-zinc-800/70 dark:text-zinc-300">Coverage: {data.catalogCoverage.jalCardSpecial.count.toLocaleString()} JAL directory records and {data.catalogCoverage.jcbPartner.count.toLocaleString()} JCB partner offers. Directory inclusion applies only to the listed eligible store/service; JCB multipliers require the stated card, registration, channel, and valid date.</aside>
  </div>;
}
