const flow = [
  {
    question: "Is this JAL特約店 or JAL flight?",
    answer: "JAL CLUB EST Suica direct.",
    tone: "JAL",
  },
  {
    question: "Is this JR / atre / station / transport IC only?",
    answer: "Mobile Suica.",
    tone: "Suica",
  },
  {
    question: "Is this 7-Eleven / SMBC high-rate store?",
    answer: "SMBC Olive smartphone Visa touch.",
    tone: "SMBC",
  },
  {
    question: "Is this FamilyMart?",
    answer: "JP BANK JCB -> FamiPay.",
    tone: "JCB",
  },
  {
    question: "Is this Mastercard-only?",
    answer: "JAL Pay -> au PAY -> PayPay Mastercard if small.",
    tone: "Mastercard",
  },
  {
    question: "Is this Yahoo/LOHACO/PayPay coupon?",
    answer: "PayPay Gold.",
    tone: "PayPay",
  },
  {
    question: "Is this ordinary spend before 2026-08-31?",
    answer: "SMBC Olive Gold.",
    tone: "SMBC",
  },
  {
    question: "Otherwise",
    answer:
      "Choose by goal: JAL/LSP = JAL card; convenience = Suica; campaign = campaign card.",
    tone: "Other",
  },
];

const toneClass: Record<string, string> = {
  JAL: "border-red-200 bg-red-50 text-red-950 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-100",
  Suica:
    "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100",
  SMBC: "border-green-200 bg-green-50 text-green-950 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-100",
  JCB: "border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-100",
  Mastercard:
    "border-orange-200 bg-orange-50 text-orange-950 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-100",
  PayPay:
    "border-blue-200 bg-blue-50 text-blue-950 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-100",
  Other:
    "border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100",
};

export default function DecisionFlow() {
  return (
    <div className="grid gap-3">
      {flow.map((item, index) => (
        <div
          key={item.question}
          className={`rounded-lg border p-4 ${toneClass[item.tone]}`}
        >
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-current/20 text-sm font-semibold">
              {index + 1}
            </div>
            <div>
              <h3 className="text-base font-semibold">{item.question}</h3>
              <p className="mt-1 text-sm leading-relaxed opacity-90">
                Yes {"->"} {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
