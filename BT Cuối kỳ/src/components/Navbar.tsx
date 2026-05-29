"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Trang Chủ" },
  { href: "/report", label: "Báo Cáo" },
  { href: "/ai-finance", label: "AI Finance" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center font-bebas text-black text-xl tracking-wider">
            C3
          </div>
          <span className="font-bebas text-xl tracking-widest shimmer-text">
            CMT3 VJP PRO
          </span>
        </Link>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 rounded-xl p-1">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/"
                ? pathname === "/"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-lg shadow-yellow-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
