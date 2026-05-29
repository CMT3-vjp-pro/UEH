"use client";

import { useEffect, useState } from "react";

type Tab = "powerbi" | "python";

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState<Tab>("powerbi");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="font-bebas text-6xl md:text-7xl tracking-widest shimmer-text mb-3">
            BÁO CÁO
          </h1>
          <p className="text-gray-400">
            Phân tích dữ liệu & trực quan hóa — nhóm CMT3 VJP Pro
          </p>
        </div>

        {/* Tab buttons */}
        <div
          className={`flex gap-2 mb-8 justify-center transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={() => setActiveTab("powerbi")}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === "powerbi"
                ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-lg shadow-yellow-500/30"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            📊 Power BI
          </button>
          <button
            onClick={() => setActiveTab("python")}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === "python"
                ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-lg shadow-yellow-500/30"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            🐍 Phân Tích Python
          </button>
        </div>

        {/* Tab content */}
        <div
          className={`transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {activeTab === "powerbi" && (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-yellow-500/20 shadow-2xl shadow-yellow-500/5 bg-black/40">
                <iframe
                  title="Power BI Report"
                  src="https://app.powerbi.com/view?r=eyJrIjoiMDFhYjIxMTEtZGRkYS00Nzg0LWJjMDMtMTY0MjJkMGEzYThmIiwidCI6ImI2YTdjYTMwLTRiMDUtNDg5MC05ZTQ4LWFlZmE1ZDA0NWZmMiJ9"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
              <p className="text-gray-500 text-sm mt-4 text-center">
                Power BI — nhấn F11 để phóng to
              </p>
            </div>
          )}

          {activeTab === "python" && (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-6">🐍</div>
                <h2 className="font-bebas text-4xl tracking-widest shimmer-text mb-4">
                  PHÂN TÍCH PYTHON
                </h2>
                <p className="text-gray-400 mb-6">
                  Sẽ cập nhật Jupyter Notebook sau khi nhóm hoàn thiện phân tích
                  dữ liệu bằng Python.
                </p>
                <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-5 text-left">
                  <p className="text-yellow-400/80 text-sm font-semibold mb-3">
                    📋 Nội dung dự kiến:
                  </p>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>🔹 Load & clean dữ liệu (Pandas)</li>
                    <li>🔹 Tính Sharpe Ratio, Sortino Ratio</li>
                    <li>🔹 VaR Monte Carlo simulation</li>
                    <li>🔹 Dự báo ARIMA / LSTM</li>
                    <li>🔹 Trực quan hóa (Matplotlib, Plotly)</li>
                  </ul>
                </div>
                <p className="text-gray-600 text-xs mt-4">
                  Liên hệ thành viên nhóm để được share Jupyter notebook.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
