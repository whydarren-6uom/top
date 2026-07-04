import type { Metadata } from "next";
import PaymentOptimizerApp from "@/src/App";
import { loadPaymentOptimizerData } from "@/src/data/loadPaymentOptimizerData";

export const metadata: Metadata = {
  title: "Japan Payment Optimizer",
  description:
    "Personal hidden payment optimizer for Japanese cards, wallets, and store rules.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PaymentsPage() {
  const data = await loadPaymentOptimizerData();

  return <PaymentOptimizerApp data={data} />;
}
