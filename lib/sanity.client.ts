import "server-only";
import { createClient, type QueryParams } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/lib/env.api";
import { profileQuery } from "./sanity.query";
import { ProfileType } from "@/types";

const client = createClient({ projectId, dataset, apiVersion, useCdn: false });

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    cache: "no-store",
    next: { tags },
  });
}

export async function getProfile(): Promise<ProfileType> {
  return client.fetch(profileQuery, {}, { cache: "no-store" });
}
