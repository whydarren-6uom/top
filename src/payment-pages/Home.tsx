import DecisionFlow from "@/src/components/DecisionFlow";
import SearchBox from "@/src/components/SearchBox";
import { usePaymentData } from "@/src/components/PaymentDataProvider";

const cards = [
  {
    title: "What should I use right now?",
    body: "Ordinary spend -> SMBC Olive Gold; JAL特約店 -> JAL card direct; station/JR/atre -> Mobile Suica; Mastercard-only -> JAL Pay.",
    tone: "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
  },
  {
    title: "SMBC修行 mode",
    body: "Active until 2026-08-31. Use SMBC Olive Gold for ordinary spend unless a strong merchant-specific route applies.",
    tone: "border-green-200 bg-green-50 dark:border-green-500/30 dark:bg-green-500/10",
  },
  {
    title: "JAL mode",
    body: "For JAL miles/LSP, use JAL CLUB EST Suica direct credit-card payment, especially at JAL flights and JALカード特約店.",
    tone: "border-red-200 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10",
  },
  {
    title: "Suica / station mode",
    body: "Use Mobile Suica for JR, atre, ekinaka, transport IC only, and fast small payments.",
    tone: "border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10",
  },
  {
    title: "Mastercard-only mode",
    body: "Try JAL Pay first, then au PAY Prepaid, then PayPay ordinary Mastercard only for small amounts.",
    tone: "border-orange-200 bg-orange-50 dark:border-orange-500/30 dark:bg-orange-500/10",
  },
  {
    title: "PayPay / Yahoo mode",
    body: "Use PayPay Gold / PayPay Credit for Yahoo!ショッピング, LOHACO, LYP, and PayPay coupon cases.",
    tone: "border-blue-200 bg-blue-50 dark:border-blue-500/30 dark:bg-blue-500/10",
  },
];

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

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className={`rounded-lg border p-4 ${card.tone}`}>
            <h3 className="text-base font-semibold text-zinc-950 dark:text-white">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {card.body}
            </p>
          </article>
        ))}
      </section>

      <section className="space-y-3">
        <SectionTitle title="Search first" />
        <SearchBox />
      </section>

      <section className="space-y-3">
        <SectionTitle title="Quick decision flow" />
        <DecisionFlow />
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
