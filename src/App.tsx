"use client";

import { useState } from "react";
import Notice from "@/src/components/Notice";
import { PaymentDataProvider } from "@/src/components/PaymentDataProvider";
import type { PaymentOptimizerData } from "@/src/data/paymentData";
import Home from "@/src/payment-pages/Home";
import Merchants from "@/src/payment-pages/Merchants";
import Rules from "@/src/payment-pages/Rules";
import Settings from "@/src/payment-pages/Settings";
import Wallets from "@/src/payment-pages/Wallets";

type Tab = "home" | "merchants" | "wallets" | "rules" | "settings";

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "home", label: "Dashboard" },
  { id: "merchants", label: "Stores" },
  { id: "wallets", label: "Wallets" },
  { id: "rules", label: "Rules" },
  { id: "settings", label: "Settings" },
];

export default function PaymentOptimizerApp({
  data,
}: {
  data: PaymentOptimizerData;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <PaymentDataProvider data={data}>
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                Personal Japan payment optimizer
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-zinc-950 dark:text-white sm:text-4xl">
                Which card or wallet should I use?
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Sanity-managed JSON rules for SMBC修行, JAL miles/LSP, Mobile
                Suica, PayPay, FamiPay, Mastercard-only routes, and UQ mobile
                strategy.
              </p>
            </div>
            <Notice />
          </div>

          <div className="-mx-4 border-y border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95 sm:mx-0 sm:rounded-lg sm:border">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 rounded-md border px-3 py-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? "border-green-500 bg-green-50 text-green-800 dark:bg-green-500/10 dark:text-green-200"
                      : "border-zinc-200 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "home" && <Home />}
          {activeTab === "merchants" && <Merchants />}
          {activeTab === "wallets" && <Wallets />}
          {activeTab === "rules" && <Rules />}
          {activeTab === "settings" && <Settings />}
        </div>
      </main>
    </PaymentDataProvider>
  );
}
