import "@/app/styles/globals.css";
import "@/app/styles/prism.css";
import Script from "next/script";
import type { Metadata } from "next";
import { incognito } from "./assets/font/font";
import { gitlabmono } from "./assets/font/font";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

const options = {
  title: "Darren Wang | Software Engineer & QA Engineer",
  description:
    "Darren Wang is a Software Engineer and QA Engineer based in Tokyo, Japan, specializing in full-stack development, API integration, and quality assurance automation",
  url: "https://darrenwang.site",
};

export const metadata: Metadata = {
  title: options.title,
  metadataBase: new URL(options.url),
  description: options.description,
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: options.title,
    url: options.url,
    siteName: "darrenwang.site",
    locale: "en-US",
    type: "website",
    description: options.description,
    images: [
      {
        url: "/profile-thumbnail.jpg",
        width: 1128,
        height: 1129,
        alt: "Darren Wang",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: options.title,
    description: options.description,
    images: ["/profile-thumbnail.jpg"],
  },
  alternates: { canonical: options.url },
  other: {
    "google-site-verification": "IzcWMgn5Qjf-LCtA337KTGjivsf9bmod_1pZ-jxYQh8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${incognito.variable} ${gitlabmono.variable} font-inter dark:bg-zinc-900 bg-white dark:text-white text-zinc-700`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <SpeedInsights />
      </body>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      />
    </html>
  );
}
