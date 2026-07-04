import type { Metadata } from "next";
import PaymentOptimizerApp from "@/src/App";
import { loadPaymentOptimizerData } from "@/src/data/loadPaymentOptimizerData";

export const dynamic = "force-dynamic";

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

  if (!data) {
    return <PaymentDataSetup />;
  }

  return <PaymentOptimizerApp data={data} />;
}

function PaymentDataSetup() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-amber-300 bg-amber-50 p-5 text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100">
        <p className="text-sm font-semibold uppercase tracking-wide">
          Payment optimizer data missing
        </p>
        <h1 className="mt-2 text-2xl font-semibold">
          Add the Sanity JSON file to enable this page.
        </h1>
        <ol className="mt-4 space-y-2 text-sm leading-relaxed">
          <li>1. Open Sanity Studio at /studio.</li>
          <li>2. Create a Payment Optimizer JSON document.</li>
          <li>3. Set key to default.</li>
          <li>
            4. Upload a JSON file to Data JSON File. For the first upload, use
            docs/paymentOptimizer.example.json.
          </li>
          <li>5. Set Last Updated and publish.</li>
        </ol>
      </div>
    </main>
  );
}
