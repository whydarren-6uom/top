"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { PaymentOptimizerData } from "@/src/data/paymentData";
import type { PaymentPreferences } from "@/src/data/types";

const STORAGE_KEY = "dar.wang:payment-preferences:v1";
type PaymentContextValue = { data: PaymentOptimizerData; preferences: PaymentPreferences; updatePreference: <Key extends keyof PaymentPreferences>(key: Key, value: PaymentPreferences[Key]) => void; resetPreferences: () => void };
const PaymentDataContext = createContext<PaymentContextValue | null>(null);

function sanitizePreferences(value: unknown, fallback: PaymentPreferences): PaymentPreferences {
  if (!value || typeof value !== "object") return fallback;
  const candidate = value as Partial<PaymentPreferences>;
  return {
    ...fallback,
    preferJal: typeof candidate.preferJal === "boolean" ? candidate.preferJal : fallback.preferJal,
    hasMujiShareholderCoupon: typeof candidate.hasMujiShareholderCoupon === "boolean" ? candidate.hasMujiShareholderCoupon : fallback.hasMujiShareholderCoupon,
    hasUsmhShareholderVouchers: typeof candidate.hasUsmhShareholderVouchers === "boolean" ? candidate.hasUsmhShareholderVouchers : fallback.hasUsmhShareholderVouchers,
    allowUsCardsInJapan: typeof candidate.allowUsCardsInJapan === "boolean" ? candidate.allowUsCardsInJapan : fallback.allowUsCardsInJapan,
    jalMileValueYen: typeof candidate.jalMileValueYen === "number" && Number.isFinite(candidate.jalMileValueYen) ? Math.min(10, Math.max(0, candidate.jalMileValueYen)) : fallback.jalMileValueYen,
  };
}

export function PaymentDataProvider({ data, children }: { data: PaymentOptimizerData; children: React.ReactNode }) {
  const [preferences, setPreferences] = useState(data.userSettings);
  useEffect(() => {
    try { const stored = window.localStorage.getItem(STORAGE_KEY); if (stored) setPreferences(sanitizePreferences(JSON.parse(stored), data.userSettings)); } catch { /* Storage is optional. */ }
  }, [data.userSettings]);
  useEffect(() => { try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)); } catch { /* Storage is optional. */ } }, [preferences]);
  const updatePreference = useCallback(<Key extends keyof PaymentPreferences>(key: Key, value: PaymentPreferences[Key]) => setPreferences((current) => sanitizePreferences({ ...current, [key]: value }, data.userSettings)), [data.userSettings]);
  const resetPreferences = useCallback(() => setPreferences(data.userSettings), [data.userSettings]);
  const context = useMemo(() => ({ data, preferences, updatePreference, resetPreferences }), [data, preferences, updatePreference, resetPreferences]);
  return <PaymentDataContext.Provider value={context}>{children}</PaymentDataContext.Provider>;
}

export function usePaymentData() {
  const value = useContext(PaymentDataContext);
  if (!value) throw new Error("Payment optimizer data provider is missing.");
  return value;
}
