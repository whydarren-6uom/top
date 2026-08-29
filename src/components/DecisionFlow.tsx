const flow = [
  {
    question: "Is there a merchant-specific campaign, coupon, membership, or shareholder benefit?",
    answer: "Apply that first, then compare payment methods.",
    tone: "Other",
  },
  {
    question: "Is this JAL特約店 or a JAL flight?",
    answer: "JAL CLUB EST Suica direct, unless a stronger current campaign overrides it.",
    tone: "JAL",
  },
  {
    question: "Is this JR / atre / station / transport?",
    answer: "Mobile Suica, and remember JRE POINT when applicable.",
    tone: "Suica",
  },
  {
    question: "Is this an eligible SMBC target store?",
    answer: "SMBC Olive Gold Debit Mode with the eligible smartphone Visa touch / mobile-order route when it is actually best.",
    tone: "SMBC",
  },
  {
    question: "Is this Mastercard-only?",
    answer: "PayPay Card Mastercard.",
    tone: "Mastercard",
  },
  {
    question: "Is this ordinary overseas spend?",
    answer: "Fidelity Rewards Visa, unless travel/dining/category campaigns point elsewhere.",
    tone: "Other",
  },
  {
    question: "Otherwise in Japan",
    answer: "JAL CLUB EST Suica as the ordinary baseline, then override for current campaigns.",
    tone: "JAL",
  },
];

const toneClass: Record<string, string> = {
  JAL: "border-red-200 bg-red-50 text-red-950 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-100",
  Suica: "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100",
  SMBC: "border-green-200 bg-green-50 text-green-950 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-100",
  Mastercard: "border-orange-200 bg-orange-50 text-orange-950 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-100",
  Other: "border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100",
};

export default function DecisionFlow() {
  return (
    <div className="grid gap-3">
      {flow.map((item, index) => (
        <div key={item.question} className={`rounded-lg border p-4 ${toneClass[item.tone]}`}>
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-current/20 text-sm font-semibold">{index + 1}</div>
            <div>
              <h3 className="text-base font-semibold">{item.question}</h3>
              <p className="mt-1 text-sm leading-relaxed opacity-90">Yes {"->"} {item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
