import type { MerchantRule } from "@/src/data/types";
import { getCashierPhrase, recommendPayment } from "@/src/logic/recommend";
import { usePaymentData } from "./PaymentDataProvider";
import Tag from "./Tag";
import WarningBadge from "./WarningBadge";

export default function MerchantCard({ merchant }: { merchant: MerchantRule }) {
  const data = usePaymentData();
  const recommendation = recommendPayment({ merchantId: merchant.id }, data);
  const phrase = getCashierPhrase(merchant);

  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              {merchant.name}
            </h3>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {merchant.category.replaceAll("_", " ")}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {merchant.tags.slice(0, 4).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>

        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Primary
          </p>
          <p className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {recommendation.primary}
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {recommendation.reason}
          </p>
        </div>

        {phrase && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100">
            <p className="text-xs font-medium uppercase tracking-wide opacity-80">
              Cashier phrase
            </p>
            <p className="mt-1 text-lg font-semibold">{phrase}</p>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <ListBlock title="Steps" items={merchant.steps} />
          <ListBlock title="Alternatives" items={merchant.alternatives} />
        </div>

        {merchant.warnings.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {merchant.warnings.map((warning) => (
              <WarningBadge key={warning}>{warning}</WarningBadge>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h4>
      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
