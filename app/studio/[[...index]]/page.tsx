"use client";

import dynamic from "next/dynamic";

const StudioClient = dynamic(() => import("./StudioClient"), {
  ssr: false,
  loading: () => (
    <main className="flex min-h-screen items-center justify-center">
      Loading Sanity Studio…
    </main>
  ),
});

export default function Studio() {
  return <StudioClient />;
}
