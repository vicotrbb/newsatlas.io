import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://newsatlas.io"),
  title: {
    default: "News Atlas - Free World News Explorer",
    template: "%s | News Atlas - Free World News Explorer",
  },
  description:
    "Explore the latest news from every country through an interactive world map. Get free access to curated news from around the globe with our visual news explorer.",
  keywords: [
    "world news",
    "global news",
    "interactive map",
    "news by country",
    "international news",
    "world map",
    "news explorer",
    "free news",
    "country news",
    "global news map",
    "world news today",
    "international news coverage",
    "news by region",
    "visual news explorer",
    "real-time news",
  ],
  authors: [{ name: "Victor Bona" }],
  creator: "Victor Bona",
  openGraph: {
    title: "News Atlas - Free World News Explorer",
    description:
      "Explore the latest news from every country through an interactive world map. Get free access to curated news from around the globe.",
    url: "https://newsatlas.io",
    siteName: "News Atlas",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://newsatlas.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "News Atlas - Interactive World News Explorer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News Atlas - Free World News Explorer",
    description:
      "Explore the latest news from every country through an interactive world map. Free access to curated global news.",
    creator: "@BonaVictor",
    images: ["https://newsatlas.io/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-site-verification",
    // yandex: "your-yandex-verification",
    // bing: "your-bing-verification",
  },
  alternates: {
    canonical: "https://newsatlas.io",
    languages: {
      "en-US": "/en-US",
    },
  },
  category: "news",
  other: {
    // "google-site-verification": "your-google-verification-code",
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-full mx-4 mt-8">
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}