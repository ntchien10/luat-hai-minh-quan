import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Scale, ArrowLeft, Home, PhoneCall } from "lucide-react";
import { firmInfo } from "@/data/mockData";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#FAF6F0] text-[#96794F] flex items-center justify-center mx-auto shadow-sm">
            <Scale className="w-10 h-10" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-[#FAF6F0] text-[#96794F] text-xs font-bold uppercase tracking-widest">
            Mã lỗi 404
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1816]">
            Trang Không Tồn Tại
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            Địa chỉ bạn đang tìm kiếm có thể đã được thay đổi, di chuyển hoặc không còn khả dụng trên hệ thống của {firmInfo.name}.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] text-[#14130F] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.98] shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4" />
              <span>Về Trang Chủ</span>
            </Link>

            <Link
              href="/#dich-vu"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1A1816] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#96794F] active:scale-[0.98] shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <span>Xem Các Dịch Vụ</span>
            </Link>

            <a
              href={`tel:${firmInfo.phoneRaw}`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider hover:border-[#96794F] hover:text-[#96794F] active:scale-[0.98] transition-all transform hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Hotline 24/7: {firmInfo.hotline}</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
