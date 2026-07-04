import SearchBox from "@/src/components/SearchBox";
import { usePaymentData } from "@/src/components/PaymentDataProvider";

export default function Home() {
  const { userSettings } = usePaymentData();

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-medium text-green-700 dark:text-green-300">
          Default right now
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-white">
          Ordinary spend {"->"} SMBC Olive Gold
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          JAL特約店 {"->"} JAL card direct; station/JR/atre {"->"} Mobile
          Suica; Mastercard-only {"->"} JAL Pay; Yahoo/PayPay coupons {"->"}{" "}
          PayPay Gold.
        </p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-3">
          <Metric label="SMBC remaining" value={`${userSettings.smbcRemainingSpendYen.toLocaleString()}円`} />
          <Metric label="SMBC deadline" value={userSettings.smbcTrainingDeadline} />
          <Metric label="PayPay MC limit" value={`${userSettings.paypayMastercardLimitYen.toLocaleString()}円`} />
        </dl>
      </section>

      <section className="space-y-3">
        <SectionTitle title="Search first" />
        <SearchBox />
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
      <dt className="text-xs uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-zinc-950 dark:text-white">
        {value}
      </dd>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">
      {title}
    </h2>
  );
}
