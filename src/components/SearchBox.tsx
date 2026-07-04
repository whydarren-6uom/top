"use client";

import { useMemo, useState } from "react";
import { merchants } from "@/src/data/merchants";
import { findMerchantRule } from "@/src/logic/recommend";
import MerchantCard from "./MerchantCard";

const quickSearches = [
  "FamilyMart",
  "7-Eleven",
  "atre",
  "MUJI",
  "三田製麺所",
  "元祖油堂",
  "Life",
  "Maruman",
  "Costco",
  "Amazon",
  "UQ",
];

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const result = useMemo(() => findMerchantRule(query), [query]);
  const shownMerchants = query ? (result ? [result] : []) : merchants.slice(0, 3);

  return (
    <section className="space-y-4">
      <div>
        <label
          htmlFor="merchant-search"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          Merchant search
        </label>
        <input
          id="merchant-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try FamilyMart, 7-Eleven, atre, Costco, Amazon, UQ..."
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none ring-green-500/20 placeholder:text-zinc-400 focus:border-green-500 focus:ring-4 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {quickSearches.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => setQuery(term)}
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 hover:border-green-400 hover:text-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-green-500 dark:hover:text-white"
          >
            {term}
          </button>
        ))}
      </div>

      {query && !result && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
          No exact local rule matched. Use the quick decision flow or add this
          merchant to <code>src/data/merchants.ts</code>.
        </div>
      )}

      <div className="grid gap-4">
        {shownMerchants.map((merchant) => (
          <MerchantCard key={merchant.id} merchant={merchant} />
        ))}
      </div>
    </section>
  );
}
