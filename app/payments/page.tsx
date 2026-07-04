import type { Metadata } from "next";
import PaymentOptimizerApp from "@/src/App";

export const metadata: Metadata = {
  title: "Japan Payment Optimizer",
  description:
    "Personal hidden payment optimizer for Japanese cards, wallets, and store rules.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentsPage() {
  return <PaymentOptimizerApp />;
}
