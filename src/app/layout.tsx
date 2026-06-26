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
  metadataBase: new URL("https://wyibe.com"),
  openGraph: {
    title: "Wyibe — Full-Stack Engineering & Agentic AI for B2B",
    description:
      "Production-grade web platforms and autonomous AI systems for businesses across the US, UK, Canada, and beyond.",
    url: "https://wyibe.com",
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
    canonical: "https://wyibe.com",
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
