import "server-only";

import { groq } from "next-sanity";
import { sanityFetch } from "@/lib/sanity.client";
import {
  localPaymentOptimizerData,
  type PaymentOptimizerData,
} from "./paymentData";

type PaymentOptimizerDocument = {
  lastUpdated?: string;
  dataJson?: string;
};

export const paymentOptimizerQuery = groq`*[_type == "paymentOptimizer" && key == "default"][0]{
  lastUpdated,
  dataJson
}`;

export async function loadPaymentOptimizerData(): Promise<PaymentOptimizerData> {
  try {
    const document = await sanityFetch<PaymentOptimizerDocument | null>({
      query: paymentOptimizerQuery,
      tags: ["paymentOptimizer"],
    });

    if (!document?.dataJson) {
      return localPaymentOptimizerData;
    }

    const parsed = JSON.parse(document.dataJson) as PaymentOptimizerData;

    return {
      ...parsed,
      lastUpdated: document.lastUpdated ?? parsed.lastUpdated,
    };
  } catch (error) {
    console.error("Error loading payment optimizer data:", error);
    return localPaymentOptimizerData;
  }
}
