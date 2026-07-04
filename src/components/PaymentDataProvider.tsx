"use client";

import { createContext, useContext } from "react";
import {
  localPaymentOptimizerData,
  type PaymentOptimizerData,
} from "@/src/data/paymentData";

const PaymentDataContext = createContext<PaymentOptimizerData>(
  localPaymentOptimizerData,
);

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
  return useContext(PaymentDataContext);
}
