const notes = [
  "Campaigns change often; verify current terms before large purchases.",
  "JALカード特約店 usually requires direct JAL card payment.",
  "Mobile Suica charge via JALカードSuica earns JRE POINT rather than direct JAL shopping miles/LSP.",
  "Mastercard-only merchants default to PayPay Card Mastercard unless a stronger supported route exists.",
  "Prepaid-card and wallet acceptance can differ by merchant and should be verified before relying on a route.",
  "FamiPay / prepaid recharge limits and campaign eligibility may apply.",
  "At checkout, apply membership, point-card, coupon, and shareholder-benefit rules before choosing the payment method.",
  "Overseas defaults can be overridden by category bonuses, targeted offers, insurance needs, and foreign-transaction-fee rules.",
];

export default function Rules() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Rules / Caveats</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Current rules that keep temporary offers and merchant exceptions from becoming permanent defaults.</p>
      </div>
      <div className="grid gap-3">
        {notes.map((note) => (
          <div key={note} className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100">{note}</div>
        ))}
      </div>
    </div>
  );
}
