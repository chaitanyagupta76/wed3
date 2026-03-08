import type { Metadata } from "next";
import { Inter, Playball } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageProvider";
import { Suspense } from "react";
import siteConfig from "@/data/site-config.json";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Playball is a beautiful script font for weddings
const playball = Playball({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-playball",
});

export const metadata: Metadata = {
  title: siteConfig.seoTitle,
  description: siteConfig.seoDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playball.variable} antialiased bg-ivory text-textDark`}
        suppressHydrationWarning
      >
        <Suspense fallback={<div className="min-h-screen bg-ivory flex items-center justify-center">Loading...</div>}>
          <LanguageProvider>{children}</LanguageProvider>
        </Suspense>
      </body>
    </html>
  );
}
