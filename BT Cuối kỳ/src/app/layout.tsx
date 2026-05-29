import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CMT3 VJP Pro — BT Cuối Kỳ",
  description: "Website bài tập cuối kỳ của nhóm CMT3 VJP Pro — UEH",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${bebas.variable}`}>
      <body className="mesh-bg min-h-screen">
        <div className="noise-overlay" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
