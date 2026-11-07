import type { Metadata, Viewport } from "next";
import { Anek_Bangla, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

// Body text: clear and easy to read, also in long explanations.
const bodyFont = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

// Headings, numbers and the timer: a rounder, more modern look.
const displayFont = Anek_Bangla({
  subsets: ["bengali", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "এইচএসসি আইসিটি পরীক্ষা",
  description: "এইচএসসি আইসিটি তৃতীয় ও চতুর্থ অধ্যায়ের এমসিকিউ পরীক্ষা।",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f5f1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
