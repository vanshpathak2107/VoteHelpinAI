import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "VoteSphere AI — Interactive Election Education Platform",
  description: "Your AI-powered guide to understanding the complete election process. From voter registration to result declaration — learn, quiz, and explore democracy interactively.",
  keywords: ["election", "voting", "democracy", "education", "AI", "India", "voter registration", "EVM", "quiz"],
  authors: [{ name: "VoteSphere AI" }],
  openGraph: {
    title: "VoteSphere AI — Understand Democracy",
    description: "AI-powered interactive election education platform",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0F172A] text-slate-100 antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
