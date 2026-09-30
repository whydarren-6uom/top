"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PaymentOptimizerData } from "@/src/data/paymentData";
import { PaymentDataProvider } from "./PaymentDataProvider";

const routes = [{ href: "/payments", label: "Stores" }, { href: "/payments/cards", label: "Cards" }, { href: "/payments/settings", label: "Settings" }];

export default function PaymentShell({ data, children }: { data: PaymentOptimizerData; children: React.ReactNode }) {
  const pathname = usePathname();
  return <PaymentDataProvider data={data}>
    <main className="mx-auto min-h-[70vh] w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-600 dark:text-green-400">Payment optimizer</p>
        <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><h1 className="text-3xl font-semibold text-zinc-950 dark:text-white sm:text-4xl">Pay with confidence</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">A personal, rules-based guide. Rewards are estimates—not cash guarantees—and merchant acceptance always wins.</p></div>
          <nav aria-label="Payment optimizer" className="flex rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
            {routes.map((route) => { const active = route.href === "/payments" ? pathname === route.href : pathname.startsWith(route.href); return <Link key={route.href} href={route.href} aria-current={active ? "page" : undefined} className={`rounded-md px-3 py-2 text-sm font-medium transition ${active ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-950 dark:text-white" : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"}`}>{route.label}</Link>; })}
          </nav>
        </div>
      </header>
      {children}
      <footer className="mt-12 border-t border-zinc-200 pt-5 text-xs leading-5 text-zinc-500 dark:border-zinc-800">Catalog v{data.schemaVersion} · updated {data.lastUpdated} · Japan dates ({data.timezone}) · {data.source === "sanity-v13" ? "validated Sanity override" : "checked-in validated baseline"}</footer>
    </main>
  </PaymentDataProvider>;
}
