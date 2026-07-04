const notes = [
  "Campaigns change often.",
  "Always check current campaign details before making large purchases.",
  "JALカード特約店 usually requires direct JAL card payment.",
  "Mobile Suica charge via JALカードSuica earns JRE POINT, not direct JAL shopping miles/LSP.",
  "SMBC修行 excludes many e-money and prepaid charges.",
  "Prepaid card acceptance at Costco or Mastercard-only stores should be tested with small transactions first.",
  "FamiPay / prepaid recharge limits may apply.",
  "UQ mobile bill payment should be re-evaluated if I get au PAY Card or au PAY Gold Card.",
];

export default function Rules() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">
          Rules / Caveats
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          These notes prevent the app from treating temporary routes as permanent.
        </p>
      </div>

      <div className="grid gap-3">
        {notes.map((note) => (
          <div
            key={note}
            className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100"
          >
            {note}
          </div>
        ))}
      </div>
    </div>
  );
}
