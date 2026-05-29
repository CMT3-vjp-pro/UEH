"use client";

import { useEffect, useState, useRef } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME_NO_KEY = `Chào bạn! 👋 Mình là **AI Finance Assistant** của nhóm CMT3 VJP Pro.

🔑 **Chưa có API key** — Vui lòng nhập MiniMax API Key ở ô bên dưới để bắt đầu.

Sau khi nhập key, mình có thể hỗ trợ bạn về:
• Phân tích cổ phiếu & danh mục đầu tư
• Tính toán tỷ suất lợi nhuận (Simple Return, Log Return)
• Đo lường rủi ro (Sharpe Ratio, VaR, Drawdown)
• Dự báo xu hướng giá cơ bản`;

const WELCOME_WITH_KEY = `Chào bạn! 👋 Mình là **AI Finance Assistant** của nhóm CMT3 VJP Pro.

🤖 Đã kết nối MiniMax API thật!

Mình có thể hỗ trợ bạn về:
• Phân tích cổ phiếu & danh mục đầu tư
• Tính toán tỷ suất lợi nhuận (Simple Return, Log Return)
• Đo lường rủi ro (Sharpe Ratio, VaR, Drawdown)
• Dự báo xu hướng giá cơ bản

Bạn cần mình giúp gì hôm nay?`;

export default function AiFinancePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [connected, setConnected] = useState(false);
  const connectRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const connectApiKey = () => {
    const key = apiKeyInput.trim();
    if (!key) return;
    connectRef.current = true;
    setConnected(true);
    setMessages([{ role: "assistant", content: WELCOME_WITH_KEY }]);
  };

  const disconnect = () => {
    connectRef.current = false;
    setConnected(false);
    setApiKeyInput("");
    setMessages([{ role: "assistant", content: WELCOME_NO_KEY }]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);

    if (!connectRef.current) {
      await new Promise((r) => setTimeout(r, 1000));
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "🔑 Vui lòng nhập **MiniMax API Key** ở ô bên trên để mình trả lời thật nhé!",
        },
      ]);
      setLoading(false);
      return;
    }

    // Build conversation history for API
    const conversationHistory = [
      ...messages.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: userMsg },
    ];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: apiKeyInput.trim(),
          messages: conversationHistory,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `❌ Lỗi: ${data.error || "Không thể kết nối AI. Kiểm tra lại API key."}`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `❌ Lỗi kết nối: ${err}. Vui lòng thử lại.`,
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-10rem)]">
        {/* Header */}
        <div
          className={`text-center mb-6 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            AI-powered
          </div>
          <h1 className="font-bebas text-6xl md:text-7xl tracking-widest shimmer-text mb-3">
            AI FINANCE
          </h1>
          <p className="text-gray-400">
            Trợ lý AI phân tích tài chính — hỏi đáp về cổ phiếu, danh mục,
            rủi ro
          </p>
        </div>

        {/* API Key section */}
        <div
          className={`mb-6 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            {!connected ? (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-400 text-lg">🔑</span>
                  <span className="text-white font-semibold">
                    Kết nối MiniMax API Key
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Nhập API Key từ{" "}
                  <a
                    href="https://console.minimax.chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 underline hover:text-yellow-300"
                  >
                    console.minimax.chat
                  </a>{" "}
                  để sử dụng AI thật. Key được gửi thẳng đến server và không
                  lưu ở đâu khác.
                </p>
                <div className="flex gap-3">
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") connectApiKey();
                    }}
                    placeholder="eyJh..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-yellow-500/50 transition-colors font-mono"
                  />
                  <button
                    onClick={connectApiKey}
                    disabled={!apiKeyInput.trim()}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-yellow-500/30 transition-all active:scale-95 whitespace-nowrap"
                  >
                    Kết nối
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 font-semibold text-sm">
                    ✅ Đã kết nối MiniMax API
                  </span>
                </div>
                <button
                  onClick={disconnect}
                  className="text-gray-400 hover:text-white text-sm underline transition-colors"
                >
                  Ngắt kết nối
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Chat container */}
        <div
          className={`flex-1 flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-sm">
                  Nhập tin nhắn để bắt đầu...
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black rounded-br-md"
                      : "bg-white/10 text-gray-200 rounded-bl-md"
                  }`}
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl rounded-bl-md px-5 py-3">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <div className="flex gap-3">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi về tài chính, cổ phiếu, danh mục..."
                rows={1}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none outline-none focus:border-yellow-500/50 transition-colors"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-yellow-500/30 transition-all active:scale-95"
              >
                Gửi
              </button>
            </div>
            <p className="text-center text-xs text-gray-600 mt-2">
              {connected
                ? "🤖 MiniMax AI thật — có thể sai, chỉ dùng tham khảo"
                : "🔑 Nhập API Key ở ô trên để dùng AI thật"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
