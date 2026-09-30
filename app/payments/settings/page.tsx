import type { Metadata } from "next";
import Settings from "@/src/payment-pages/Settings";

export const metadata: Metadata = { title: "Payment Optimizer · Settings" };
export default function SettingsPage() { return <Settings />; }
