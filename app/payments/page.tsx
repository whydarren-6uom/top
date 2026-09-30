import type { Metadata } from "next";
import Merchants from "@/src/payment-pages/Merchants";

export const metadata: Metadata = { title: "Payment Optimizer · Stores", description: "Find the best available payment method for stores in the validated personal catalog.", robots: { index: false, follow: false } };
export default function PaymentsPage() { return <Merchants />; }
