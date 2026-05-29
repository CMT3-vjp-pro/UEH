"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Member {
  name: string;
  role: string;
  description: string;
  skill: string;
  color: string;
  delay: string;
  image: string;
}

const members: Member[] = [
  {
    name: "Tu",
    role: "Data Analyst",
    description:
      "Chuyên phân tích dữ liệu tài chính, xây dựng mô hình định lượng và báo cáo chuyên sâu phục vụ đầu tư.",
    skill: "Python · Pandas · Machine Learning",
    color: "from-yellow-400 to-amber-500",
    delay: "0s",
    image: "/images/tu.webp",
  },
  {
    name: "Man",
    role: "Bác Sĩ Vật Lý Trị Liệu",
    description:
      "Áp dụng kiến thức phân tích rủi ro từ vật lý trị liệu vào đầu tư: đánh giá 'sức khỏe' danh mục, phát hiện 'chấn thương' portfolio, phục hồi vị thế khi thị trường 'teo tóp'.",
    skill: "Quản lý rủi ro · Vật lý trị liệu · Phân tích danh mục",
    color: "from-cyan-400 to-blue-500",
    delay: "0.15s",
    image: "/images/man.webp",
  },
  {
    name: "Chau",
    role: "Luật Sư",
    description:
      "Chuyên gia pháp luật đầu tư — rà soát hợp đồng chứng khoán, tư vấn pháp lý sàn crypto & forex, đảm bảo nhà đầu tư không vi phạm quy định thị trường vốn.",
    skill: "Luật chứng khoán · Hợp đồng đầu tư · Compliance",
    color: "from-pink-400 to-rose-500",
    delay: "0.3s",
    image: "/images/chau.webp",
  },
  {
    name: "Trang",
    role: "Tài Chính Đầu Tư",
    description:
      "Chuyên đầu tư đa lĩnh vực: chứng khoán, coin, forex — phân tích thị trường và quản lý danh mục.",
    skill: "Chứng khoán · Crypto · Forex",
    color: "from-green-400 to-emerald-500",
    delay: "0.45s",
    image: "/images/trang.webp",
  },
  {
    name: "Lion",
    role: "Công An & Chứng Khoán",
    description:
      "Công an chìm kết hợp đầu tư chứng khoán — am hiểu pháp luật, phân tích thị trường và quản lý rủi ro.",
    skill: "Pháp luật · Chứng khoán · Quản lý rủi ro",
    color: "from-purple-400 to-violet-500",
    delay: "0.6s",
    image: "/images/lion.webp",
  },
];

function MemberCard({ member, index }: { member: Member; index: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100 + index * 150);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      className={`relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-default transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } hover:border-yellow-500/30 group`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Spinning ring on hover */}
        <div
          className={`absolute top-4 right-4 w-12 h-12 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full h-full animate-spin" style={{ animationDuration: "3s" }}>
            <div className={`w-full h-full rounded-full bg-gradient-to-br ${member.color} opacity-60 blur-sm`} />
          </div>
        </div>

        {/* Name on image */}
        <div className="absolute bottom-4 left-4">
          <h3
            className={`font-bebas text-3xl tracking-widest bg-gradient-to-br ${member.color} bg-clip-text text-transparent`}
          >
            {member.name}
          </h3>
          <p className="text-xs text-white/70 uppercase tracking-wider mt-0.5">
            {member.role}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Skill badge */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {member.skill.split("·").map((s) => (
            <span
              key={s.trim()}
              className={`px-2 py-0.5 rounded-full text-xs bg-gradient-to-r ${member.color} bg-opacity-10 border border-opacity-30 text-white/80`}
              style={{
                background: `rgba(${member.color.includes('yellow') ? '245,158,11' : member.color.includes('cyan') ? '34,211,238' : member.color.includes('pink') ? '244,114,182' : member.color.includes('green') ? '52,211,153' : '168,85,247'}, 0.1)`,
                borderColor: `rgba(${member.color.includes('yellow') ? '245,158,11' : member.color.includes('cyan') ? '34,211,238' : member.color.includes('pink') ? '244,114,182' : member.color.includes('green') ? '52,211,153' : '168,85,247'}, 0.3)`,
              }}
            >
              {s.trim()}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed">
          {member.description}
        </p>

        {/* Bottom accent */}
        <div
          className={`mt-4 h-0.5 bg-gradient-to-r from-transparent ${member.color} to-transparent transition-opacity duration-300 ${
            hovered ? "opacity-60" : "opacity-0"
          }`}
        />
      </div>

      {/* Glow on hover */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
      />
    </div>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      {/* Hero */}
      <section className="max-w-7xl mx-auto text-center mb-20">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          Đồ án cuối kỳ — UEH — Phân Tích & Đầu Tư Nâng Cao
        </div>

        <h1
          className={`font-bebas text-6xl md:text-8xl lg:text-9xl tracking-widest mb-6 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ lineHeight: 1 }}
        >
          <span className="shimmer-text">CMT3</span>
        </h1>

        <p
          className={`text-3xl md:text-5xl font-bebas tracking-widest text-gray-300 mb-6 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          VJP <span className="text-yellow-400">PRO</span>
        </p>

        <p
          className={`text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          5 thành viên — 5 chuyên môn — 1 mục tiêu: kết hợp kiến thức tài
          chính, pháp lý và công nghệ để hoàn thành xuất sắc bài tập cuối kỳ
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mb-20" />

      {/* Team */}
      <section className="max-w-7xl mx-auto">
        <h2
          className={`font-bebas text-4xl md:text-5xl tracking-widest text-center mb-4 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          THÀNH VIÊN <span className="text-yellow-400">NHÓM</span>
        </h2>
        <p
          className={`text-gray-500 text-center mb-16 transition-all duration-700 delay-400 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          5 chuyên môn phục vụ môn Phân Tích & Đầu Tư Nâng Cao
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {members.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </section>

      {/* Course info */}
      <section className="max-w-4xl mx-auto mt-20 grid grid-cols-3 gap-4">
        {[
          { number: "05", label: "Thành viên" },
          { number: "03", label: "Tab trang" },
          { number: "01", label: "AI Finance" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center p-6 rounded-2xl bg-white/5 border border-white/10 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${0.5 + i * 0.1}s` }}
          >
            <div className="font-bebas text-5xl shimmer-text">{stat.number}</div>
            <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
