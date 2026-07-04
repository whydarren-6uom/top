import "server-only";
import { createClient, type QueryParams } from "next-sanity";
import {
  apiVersion,
  dataset,
  getMissingSanityConfigMessage,
  hasSanityConfig,
  projectId,
} from "@/lib/env.api";
import { profileQuery } from "./sanity.query";
import { ProfileType } from "@/types";

const client = hasSanityConfig
  ? createClient({
      projectId: projectId!,
      dataset: dataset!,
      apiVersion,
      useCdn: false,
    })
  : null;

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  if (!client) {
    throw new Error(getMissingSanityConfigMessage());
  }

  return client.fetch<QueryResponse>(query, qParams, {
    cache: "no-store",
    next: { tags },
  });
}

export async function getProfile(): Promise<ProfileType> {
  if (!client) {
    throw new Error(getMissingSanityConfigMessage());
  }

  return client.fetch(profileQuery, {}, { cache: "no-store" });
}
