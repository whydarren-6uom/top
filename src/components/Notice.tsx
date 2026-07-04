import { usePaymentData } from "./PaymentDataProvider";

export default function Notice() {
  const { lastUpdated } = usePaymentData();

  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
      Rules and campaigns may change. Last manually updated:{" "}
      {lastUpdated}.
    </div>
  );
}
