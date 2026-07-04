import MerchantCard from "@/src/components/MerchantCard";
import { usePaymentData } from "@/src/components/PaymentDataProvider";
import WarningBadge from "@/src/components/WarningBadge";
import { getCashierPhrase } from "@/src/logic/recommend";

export default function Merchants() {
  const { merchants } = usePaymentData();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">
          Store list
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Every rule here is loaded from Sanity JSON or the local{" "}
          <code>src/data/paymentOptimizer.json</code> fallback.
        </p>
      </div>

      <div className="hidden overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 lg:block">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950">
            <tr>
              <th className="w-[14%] px-3 py-3">Store</th>
              <th className="w-[19%] px-3 py-3">Default payment</th>
              <th className="w-[18%] px-3 py-3">During SMBC修行</th>
              <th className="w-[18%] px-3 py-3">After SMBC修行</th>
              <th className="w-[14%] px-3 py-3">Cashier phrase</th>
              <th className="w-[17%] px-3 py-3">Warnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {merchants.map((merchant) => (
              <tr key={merchant.id} className="align-top">
                <td className="px-3 py-3 font-semibold text-zinc-950 dark:text-white">
                  {merchant.name}
                </td>
                <td className="px-3 py-3 text-zinc-600 dark:text-zinc-400">
                  {merchant.defaultRecommendation}
                </td>
                <td className="px-3 py-3 text-zinc-600 dark:text-zinc-400">
                  {merchant.duringSmbcTrainingRecommendation ?? "-"}
                </td>
                <td className="px-3 py-3 text-zinc-600 dark:text-zinc-400">
                  {merchant.afterSmbcTrainingRecommendation ?? "-"}
                </td>
                <td className="px-3 py-3 font-semibold text-emerald-700 dark:text-emerald-300">
                  {getCashierPhrase(merchant)}
                </td>
                <td className="px-3 py-3">
                  <div className="flex flex-col gap-1.5">
                    {merchant.warnings.slice(0, 2).map((warning) => (
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
        {merchants.map((merchant) => (
          <MerchantCard key={merchant.id} merchant={merchant} />
        ))}
      </div>
    </div>
  );
}
