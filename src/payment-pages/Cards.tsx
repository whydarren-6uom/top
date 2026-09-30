"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { usePaymentData } from "@/src/components/PaymentDataProvider";
import type { PaymentMethod, Region } from "@/src/data/types";

const regionNames: Record<Region, string> = { JP: "Japan", US: "United States", CN: "China" };
const normalize = (value: string) => value.normalize("NFKC").toLocaleLowerCase();

function Card({ card }: { card: PaymentMethod }) {
  const restricted = !card.eligibleForRecommendations;
  return <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
    <div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold text-zinc-950 dark:text-white">{card.name}</h3><p className="mt-1 text-xs text-zinc-500">{card.account?.network || "Network not stated"}{card.account?.billingCurrency ? ` · ${card.account.billingCurrency}` : ""}</p></div><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${restricted ? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300" : "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-300"}`}>{restricted ? "Not recommended" : "Eligible"}</span></div>
    <dl className="mt-4 grid grid-cols-2 gap-3 text-xs"><div><dt className="text-zinc-500">Status</dt><dd className="mt-1 break-words font-medium text-zinc-800 dark:text-zinc-200">{card.account?.status.replaceAll("_", " ") || "Unknown"}</dd></div><div><dt className="text-zinc-500">Annual fee</dt><dd className="mt-1 font-medium text-zinc-800 dark:text-zinc-200">{card.account?.annualFeeYen !== undefined ? `¥${card.account.annualFeeYen.toLocaleString()}` : "See issuer terms"}</dd></div></dl>
    <details className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800"><summary className="cursor-pointer text-sm font-medium text-zinc-600 dark:text-zinc-300">Rewards, limits, and benefits</summary><div className="mt-3 space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{card.rewards.length > 0 && <ul className="list-disc space-y-1 pl-5">{card.rewards.map((item) => <li key={item}>{item}</li>)}</ul>}{card.traits.length > 0 && <ul className="list-disc space-y-1 pl-5">{card.traits.map((item) => <li key={item}>{item}</li>)}</ul>}{restricted && <p className="rounded-md bg-zinc-100 px-3 py-2 text-xs dark:bg-zinc-800">Locked, frozen, unresolved, or otherwise excluded by the validated catalog. It will not enter store recommendations.</p>}{card.links.length > 0 && <div className="flex flex-wrap gap-x-4 gap-y-2">{card.links.map((link) => <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noreferrer" className="font-medium text-green-700 underline decoration-green-300 underline-offset-2 dark:text-green-300">{link.label}</a>)}</div>}</div></details>
  </article>;
}

export default function Cards() {
  const { data } = usePaymentData();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [region, setRegion] = useState<"all" | Region>("all");
  const cards = useMemo(() => { const needle = normalize(deferredQuery.trim()); return data.cards.filter((card) => (region === "all" || card.region === region) && (!needle || normalize([card.name, card.region, card.account?.network, card.account?.issuerServicer, ...card.rewards, ...card.traits, ...card.links.map((link) => link.label)].filter(Boolean).join(" ")).includes(needle))); }, [data.cards, deferredQuery, region]);

  return <div className="space-y-6"><section><h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Cards</h2><p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">All {data.cards.length} validated cards. Benefits belong only to the named product and issuing region.</p></section>
    <section className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50 sm:flex-row"><input aria-label="Search cards" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search card, network, reward, or benefit" className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-base outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-zinc-700 dark:bg-zinc-950" /><select aria-label="Card region" value={region} onChange={(event) => setRegion(event.target.value as "all" | Region)} className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"><option value="all">All regions</option><option value="JP">Japan</option><option value="US">United States</option><option value="CN">China</option></select></section>
    {(["JP", "US", "CN"] as Region[]).map((group) => { const groupCards = cards.filter((card) => card.region === group); if (!groupCards.length) return null; return <section key={group} className="space-y-3"><div className="flex items-baseline justify-between"><h3 className="text-lg font-semibold text-zinc-950 dark:text-white">{regionNames[group]}</h3><span className="text-xs text-zinc-500">{groupCards.length} cards</span></div><div className="grid gap-4 md:grid-cols-2">{groupCards.map((card) => <Card key={card.id} card={card} />)}</div></section>; })}
    {cards.length === 0 && <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">No cards match that search.</p>}
  </div>;
}
