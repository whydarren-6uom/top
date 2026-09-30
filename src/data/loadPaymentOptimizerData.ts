import "server-only";

import { groq } from "next-sanity";
import { sanityFetch } from "@/lib/sanity.client";
import { hasSanityConfig } from "@/lib/env.api";
import checkedInData from "./paymentOptimizer.expanded.v13.json";
import { normalizePaymentOptimizerData } from "./normalizePaymentData";
import type { PaymentOptimizerData } from "./paymentData";

type PaymentOptimizerDocument = {
  lastUpdated?: string;
  dataFile?: { asset?: { url?: string; originalFilename?: string; mimeType?: string } };
};

export const paymentOptimizerQuery = groq`*[_type == "paymentOptimizer" && key == "default"][0]{
  lastUpdated,
  dataFile { asset-> { url, originalFilename, mimeType } }
}`;

const parsedFallback = normalizePaymentOptimizerData(checkedInData, "checked-in-v13");
if (!parsedFallback) throw new Error("Checked-in payment optimizer v13 data failed validation.");
const fallback: PaymentOptimizerData = parsedFallback;

export async function loadPaymentOptimizerData(): Promise<PaymentOptimizerData> {
  if (!hasSanityConfig) return fallback;
  try {
    const document = await sanityFetch<PaymentOptimizerDocument | null>({
      query: paymentOptimizerQuery,
      tags: ["paymentOptimizer"],
    });
    const url = document?.dataFile?.asset?.url;
    if (!url) return fallback;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return fallback;
    const raw = await response.json() as unknown;
    const withDate = raw && typeof raw === "object"
      ? { ...raw, lastUpdated: document?.lastUpdated ?? (raw as { lastUpdated?: unknown }).lastUpdated }
      : raw;
    return normalizePaymentOptimizerData(withDate, "sanity-v13") ?? fallback;
  } catch (error) {
    console.error("Using checked-in payment optimizer data after Sanity validation failure:", error);
    return fallback;
  }
}
