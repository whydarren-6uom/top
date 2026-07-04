"use client";

import { createContext, useContext } from "react";
import type { PaymentOptimizerData } from "@/src/data/paymentData";

const PaymentDataContext = createContext<PaymentOptimizerData | null>(null);

export function PaymentDataProvider({
  data,
  children,
}: {
  data: PaymentOptimizerData;
  children: React.ReactNode;
}) {
  return (
    <PaymentDataContext.Provider value={data}>
      {children}
    </PaymentDataContext.Provider>
  );
}

export function usePaymentData() {
  const data = useContext(PaymentDataContext);

  if (!data) {
    throw new Error("Payment optimizer data provider is missing.");
  }

  return data;
}
