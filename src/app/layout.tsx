import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wyibe — Full-Stack Engineering & Agentic AI for B2B",
  description:
    "Wyibe builds production-grade web platforms and autonomous AI systems for businesses across the US, UK, Canada, and beyond. Strategy, engineering, and deployment — end to end.",
  keywords: [
    "software development agency",
    "full-stack engineering",
    "Agentic AI",
    "LLM integration",
    "Next.js development",
    "B2B software services",
    "US UK Canada",
    "cloud architecture",
    "AI consulting",
  ],
  authors: [{ name: "Ahmed Malik", url: "https://linkedin.com/in/ahhmedmalik" }],
  creator: "Wyibe",
  metadataBase: new URL("https://wyibe.dev"),
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32.png",
  },
  openGraph: {
    title: "Wyibe — Full-Stack Engineering & Agentic AI for B2B",
    description:
      "Production-grade web platforms and autonomous AI systems for businesses across the US, UK, Canada, and beyond.",
    url: "https://wyibe.dev",
    siteName: "Wyibe",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wyibe — Full-Stack Engineering & Agentic AI for B2B",
    description:
      "Production-grade web platforms and autonomous AI systems for businesses across the US, UK, Canada, and beyond.",
    creator: "@wyibe",
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
  alternates: {
    canonical: "https://wyibe.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
