import SearchBox from "@/src/components/SearchBox";
import { usePaymentData } from "@/src/components/PaymentDataProvider";

export default function Home() {
  const { homepage } = usePaymentData();
  const defaults = homepage?.defaultNow ?? {};
  const campaigns = homepage?.activeCampaigns ?? [];
  const benefits = homepage?.shareholderBenefits ?? [];
  const points = homepage?.pointsAndExpiry ?? [];
  const checkout = homepage?.rememberAtCheckout ?? [];

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-medium text-green-700 dark:text-green-300">
          Default right now
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-white">
          {homepage?.title ?? "支払いダッシュボード"}
        </h2>
        {homepage?.subtitle && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {homepage.subtitle}
          </p>
        )}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(defaults).map(([key, item]) => (
            <div key={key} className="rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-xs uppercase tracking-wide text-zinc-500">{humanizeKey(key)}</p>
              <p className="mt-1 text-base font-semibold text-zinc-950 dark:text-white">
                {item.default ?? item.card ?? "-"}
              </p>
              {(item.why ?? item.rule) && (
                <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.why ?? item.rule}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <DashboardList title="Active campaigns" items={campaigns} primaryKeys={["name", "card"]} secondaryKeys={["deadline", "period", "purchaseWindow", "action", "value"]} />
      <DashboardList title="Remember at checkout" items={checkout} primaryKeys={["merchant"]} secondaryKeys={["show", "thenPay"]} />
      <DashboardList title="Shareholder benefits" items={benefits} primaryKeys={["name"]} secondaryKeys={["benefit", "remember", "nextMilestone", "expiry"]} />
      <DashboardList title="Points & expiry" items={points} primaryKeys={["program"]} secondaryKeys={["balance", "expiry", "bestUse"]} />

      <section className="space-y-3">
        <SectionTitle title="Merchant search" />
        <SearchBox />
      </section>
    </div>
  );
}

function DashboardList({
  title,
  items,
  primaryKeys,
  secondaryKeys,
}: {
  title: string;
  items: Array<Record<string, unknown>>;
  primaryKeys: string[];
  secondaryKeys: string[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="space-y-3">
      <SectionTitle title={title} />
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => {
          const titleValue = primaryKeys.map((key) => item[key]).find(Boolean);
          return (
            <div key={`${title}-${index}`} className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-zinc-950 dark:text-white">{String(titleValue ?? "-")}</h3>
              <div className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                {secondaryKeys.map((key) => item[key] == null ? null : (
                  <p key={key}><span className="font-medium text-zinc-700 dark:text-zinc-300">{humanizeKey(key)}:</span> {formatValue(item[key])}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function formatValue(value: unknown) {
  if (typeof value === "number") return value.toLocaleString();
  return String(value);
}

function humanizeKey(key: string) {
  return key.replace(/([a-z])([A-Z])/g, "$1 $2").replaceAll("_", " ");
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">{title}</h2>;
}
