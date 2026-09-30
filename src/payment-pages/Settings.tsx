"use client";

import { usePaymentData } from "@/src/components/PaymentDataProvider";

function Toggle({ checked, onChange, label, description }: { checked: boolean; onChange: (value: boolean) => void; label: string; description: string }) {
  return <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"><span><span className="block font-medium text-zinc-950 dark:text-white">{label}</span><span className="mt-1 block text-sm leading-5 text-zinc-500">{description}</span></span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-5 w-5 accent-green-600" /></label>;
}

export default function Settings() {
  const { data, preferences, updatePreference, resetPreferences } = usePaymentData();
  const exportSettings = () => {
    const contents = JSON.stringify({ schemaVersion: 1, exportedAt: new Date().toISOString(), preferences }, null, 2);
    const url = URL.createObjectURL(new Blob([contents], { type: "application/json" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "payment-optimizer-preferences.json"; anchor.click(); URL.revokeObjectURL(url);
  };

  return <div className="space-y-6"><section><h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Settings</h2><p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Saved only in this browser. Changes update store recommendations immediately.</p></section>
    <section className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"><label htmlFor="jal-value" className="font-medium text-zinc-950 dark:text-white">JAL mile value</label><p className="mt-1 text-sm text-zinc-500">Your personal yen value per mile—not a cash-back rate.</p><div className="mt-4 flex items-center gap-4"><input id="jal-value" type="range" min="0" max="10" step="0.1" value={preferences.jalMileValueYen} onChange={(event) => updatePreference("jalMileValueYen", Number(event.target.value))} className="w-full accent-green-600" /><output htmlFor="jal-value" className="w-20 rounded-md bg-zinc-100 px-2 py-1 text-center font-semibold dark:bg-zinc-800">¥{preferences.jalMileValueYen.toFixed(1)}</output></div></section>
    <section className="grid gap-3 md:grid-cols-2">
      <Toggle checked={preferences.preferJal} onChange={(value) => updatePreference("preferJal", value)} label="Prefer JAL on ties" description="Choose eligible JAL mileage when estimated values are equal." />
      <Toggle checked={preferences.allowUsCardsInJapan} onChange={(value) => updatePreference("allowUsCardsInJapan", value)} label="Allow US cards in Japan" description="Consider eligible US-issued cards, with acceptance and foreign-use caveats." />
      <Toggle checked={preferences.hasMujiShareholderCoupon} onChange={(value) => updatePreference("hasMujiShareholderCoupon", value)} label="MUJI shareholder coupon" description="Remind me to apply the coupon before choosing a payment card." />
      <Toggle checked={preferences.hasUsmhShareholderVouchers} onChange={(value) => updatePreference("hasUsmhShareholderVouchers", value)} label="USMH shareholder vouchers" description="Remind me to apply an eligible voucher before card payment." />
    </section>
    <div className="flex flex-wrap gap-3"><button type="button" onClick={exportSettings} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Export settings JSON</button><button type="button" onClick={resetPreferences} className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700">Reset to catalog defaults</button></div>
    <p className="text-xs leading-5 text-zinc-500">The export contains preferences only. It excludes card/account data and the {data.merchants.length.toLocaleString()}-store catalog.</p>
  </div>;
}
