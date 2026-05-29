import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { messages, apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing API key" },
        { status: 401 }
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const systemPrompt = `Bạn là AI Finance Assistant của nhóm CMT3 VJP Pro, chuyên về phân tích tài chính, cổ phiếu, danh mục đầu tư, rủi ro, và các chủ đề liên quan đến môn "Phân Tích và Đầu Tư Nâng Cao". Hãy trả lời ngắn gọn, có cấu trúc markdown rõ ràng, dễ đọc. Nếu câu hỏi nằm ngoài phạm vi tài chính, hãy nói rõ và gợi ý quay về chủ đề chính.`;

    const chatMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const response = await fetch(
      "https://api.minimax.chat/v1/text/chatcompletion_v2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "MiniMax-Text-01",
          messages: chatMessages,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data.error?.message || data.error || "MiniMax API request failed",
        },
        { status: response.status }
      );
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      data.choices?.[0]?.text ||
      "Xin lỗi, mình chưa nhận được phản hồi hợp lệ.";

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json(
      { error: `Server error: ${err}` },
      { status: 500 }
    );
  }
}
