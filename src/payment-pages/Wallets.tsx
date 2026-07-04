import { usePaymentData } from "@/src/components/PaymentDataProvider";
import PaymentMethodCard from "@/src/components/PaymentMethodCard";

const roles: Record<string, string> = {
  "smbc-olive-gold": "修行 / high-rate Visa touch",
  "jal-club-est-suica": "JAL miles/LSP + Mobile Suica recharge",
  "mobile-suica": "station/JR/small payments",
  "jp-bank-extage-jcb": "Amazon/JCB/FamiPay",
  "paypay-gold-visa": "LYP/Yahoo/PayPay",
  "jal-pay": "Mastercard prepaid backup",
  "au-pay": "Ponta/Mastercard prepaid backup",
  "ana-pay": "Visa/iD backup",
  famipay: "FamilyMart",
  "lacuca-life": "Life point layer",
  "jre-point": "atre/JR point layer",
};

export default function Wallets() {
  const { paymentMethods } = usePaymentData();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">
          Wallet list
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Card, wallet, point-card, and membership roles.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 className="text-base font-semibold text-zinc-950 dark:text-white">
              {method.name}
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {roles[method.id] ?? method.bestFor[0]}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <PaymentMethodCard key={method.id} method={method} />
        ))}
      </div>
    </div>
  );
}
