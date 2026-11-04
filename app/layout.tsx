import type { Metadata, Viewport } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const font = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "সংখ্যা পদ্ধতি পরীক্ষা",
  description: "এইচএসসি আইসিটি তৃতীয় অধ্যায়ের সংখ্যা পদ্ধতি নিয়ে ২৫ মিনিটের এমসিকিউ পরীক্ষা।",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f5f1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body className={font.className}>{children}</body>
    </html>
  );
}
