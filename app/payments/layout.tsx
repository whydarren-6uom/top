import PaymentShell from "@/src/components/PaymentShell";
import { loadPaymentOptimizerData } from "@/src/data/loadPaymentOptimizerData";

export const dynamic = "force-dynamic";

export default async function PaymentsLayout({ children }: { children: React.ReactNode }) {
  const data = await loadPaymentOptimizerData();
  return <PaymentShell data={data}>{children}</PaymentShell>;
}
