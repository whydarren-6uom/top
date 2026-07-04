"use client";

import { useMemo, useState } from "react";
import { findMerchantRule } from "@/src/logic/recommend";
import MerchantCard from "./MerchantCard";
import { usePaymentData } from "./PaymentDataProvider";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const data = usePaymentData();
  const result = useMemo(() => findMerchantRule(query, data), [data, query]);
  const shownMerchants = query ? (result ? [result] : []) : [];

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

      {query && !result && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
          No exact Sanity rule matched. Use the quick decision flow or add this
          merchant to the Payment Optimizer JSON file in Sanity.
        </div>
      )}

      {shownMerchants.length > 0 && (
        <div className="grid gap-4">
          {shownMerchants.map((merchant) => (
            <MerchantCard key={merchant.id} merchant={merchant} />
          ))}
        </div>
      )}
    </section>
  );
}
