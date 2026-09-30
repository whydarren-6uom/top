import type { Metadata } from "next";
import Cards from "@/src/payment-pages/Cards";

export const metadata: Metadata = { title: "Payment Optimizer · Cards" };
export default function CardsPage() { return <Cards />; }
