import type { Metadata } from "next";
import TakarakujiChecker from "@/src/takarakuji/TakarakujiChecker";

export const metadata: Metadata = { title: "Takarakuji Result Checker", description: "A browser-local checker for published Japan lottery results." };

export default function TakarakujiPage() {
  return <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8"><TakarakujiChecker /></main>;
}
