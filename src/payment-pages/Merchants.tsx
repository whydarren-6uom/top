"use client";

import { useMemo, useState } from "react";
import MerchantCard from "@/src/components/MerchantCard";
import { usePaymentData } from "@/src/components/PaymentDataProvider";
import WarningBadge from "@/src/components/WarningBadge";
import {
  compactRecommendation,
  filterMerchants,
  getFilterableTags,
} from "@/src/logic/display";
import Tag from "@/src/components/Tag";

export default function Merchants() {
  const { merchants } = usePaymentData();
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const tags = useMemo(() => getFilterableTags(merchants), [merchants]);
  const filteredMerchants = useMemo(
    () => filterMerchants(merchants, query, selectedTag),
    [merchants, query, selectedTag],
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">
          Store list
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Every rule here is loaded from the Sanity Payment Optimizer JSON file.
        </p>
      </div>

      <section className="space-y-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <label
          htmlFor="store-filter"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          Search stores
        </label>
        <input
          id="store-filter"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search store, category, route, or tag..."
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none ring-green-500/20 placeholder:text-zinc-400 focus:border-green-500 focus:ring-4 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedTag("")}
            className={`rounded-md border px-2 py-1 text-xs ${
              selectedTag
                ? "border-zinc-200 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                : "border-green-500 bg-green-50 text-green-800 dark:bg-green-500/10 dark:text-green-200"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`rounded-md border px-2 py-1 text-xs ${
                selectedTag === tag
                  ? "border-green-500 bg-green-50 text-green-800 dark:bg-green-500/10 dark:text-green-200"
                  : "border-zinc-200 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <p className="text-sm text-zinc-500">
          Showing {filteredMerchants.length} of {merchants.length} stores.
        </p>
      </section>

      <div className="hidden overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 lg:block">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950">
            <tr>
              <th className="w-[18%] px-3 py-3">Store</th>
              <th className="w-[18%] px-3 py-3">Use</th>
              <th className="w-[17%] px-3 py-3">During SMBC修行</th>
              <th className="w-[17%] px-3 py-3">After SMBC修行</th>
              <th className="w-[15%] px-3 py-3">Tags</th>
              <th className="w-[15%] px-3 py-3">Warnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredMerchants.map((merchant) => (
              <tr key={merchant.id} className="align-top">
                <td className="px-3 py-3 font-semibold text-zinc-950 dark:text-white">
                  {merchant.name}
                </td>
                <td className="px-3 py-3 text-zinc-600 dark:text-zinc-400">
                  {compactRecommendation(merchant.defaultRecommendation)}
                </td>
                <td className="px-3 py-3 text-zinc-600 dark:text-zinc-400">
                  {compactRecommendation(merchant.duringSmbcTrainingRecommendation)}
                </td>
                <td className="px-3 py-3 text-zinc-600 dark:text-zinc-400">
                  {compactRecommendation(merchant.afterSmbcTrainingRecommendation)}
                </td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {merchant.tags
                      .filter((tag) => !/^not\s+/i.test(tag))
                      .slice(0, 3)
                      .map((tag) => (
                        <Tag key={tag} label={tag} />
                      ))}
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex flex-col gap-1.5">
                    {merchant.warnings.slice(0, 1).map((warning) => (
                      <WarningBadge key={warning}>{warning}</WarningBadge>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 lg:hidden">
        {filteredMerchants.map((merchant) => (
          <MerchantCard key={merchant.id} merchant={merchant} />
        ))}
      </div>
    </div>
  );
}
