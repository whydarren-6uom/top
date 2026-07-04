import "server-only";

import { groq } from "next-sanity";
import { sanityFetch } from "@/lib/sanity.client";
import type { PaymentOptimizerData } from "./paymentData";

type PaymentOptimizerDocument = {
  lastUpdated?: string;
  dataFile?: {
    asset?: {
      url?: string;
      originalFilename?: string;
      mimeType?: string;
    };
  };
};

export const paymentOptimizerQuery = groq`*[_type == "paymentOptimizer" && key == "default"][0]{
  lastUpdated,
  dataFile {
    asset-> {
      url,
      originalFilename,
      mimeType
    }
  }
}`;

export async function loadPaymentOptimizerData(): Promise<PaymentOptimizerData | null> {
  try {
    const document = await sanityFetch<PaymentOptimizerDocument | null>({
      query: paymentOptimizerQuery,
      tags: ["paymentOptimizer"],
    });

    if (!document) {
      return null;
    }

    const json = document.dataFile?.asset?.url
      ? await fetchJsonFile(document.dataFile.asset.url)
      : null;

    if (!json) {
      return null;
    }

    const parsed = JSON.parse(json) as PaymentOptimizerData;

    return {
      ...parsed,
      lastUpdated: document.lastUpdated ?? parsed.lastUpdated,
    };
  } catch (error) {
    console.error("Error loading payment optimizer data:", error);
    return null;
  }
}

async function fetchJsonFile(url: string) {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch payment optimizer JSON file: ${url}`);
  }

  return response.text();
}
