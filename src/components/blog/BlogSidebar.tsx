"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Phone, ChevronRight } from "lucide-react";
import { usefulArticles, firmInfo } from "@/data/mockData";
import { formatAmpersand } from "@/components/ui/Ampersand";

export const BlogSidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { name: "Tất cả bài viết", count: usefulArticles.length, href: "/blog/" },
    { name: "Luật sở hữu trí tuệ", count: usefulArticles.filter(a => a.serviceSlug === "luat-so-huu-tri-tue").length, href: "/service/luat-so-huu-tri-tue/" },
    { name: "Luật doanh nghiệp", count: usefulArticles.filter(a => a.serviceSlug === "luat-doanh-nghiep").length, href: "/service/luat-doanh-nghiep/" },
    { name: "Luật hôn nhân & gia đình", count: usefulArticles.filter(a => a.serviceSlug === "luat-hon-nhan-va-gia-dinh").length, href: "/service/luat-hon-nhan-va-gia-dinh/" },
    { name: "Luật dân sự", count: usefulArticles.filter(a => a.serviceSlug === "luat-dan-su").length, href: "/service/luat-dan-su/" },
    { name: "Luật đất đai", count: usefulArticles.filter(a => a.serviceSlug === "luat-dat-dai").length, href: "/service/luat-dat-dai/" },
    { name: "Luật hình sự", count: usefulArticles.filter(a => a.serviceSlug === "luat-hinh-su").length, href: "/service/luat-hinh-su/" },
    { name: "Luật hành chính", count: usefulArticles.filter(a => a.serviceSlug === "luat-hanh-chinh").length, href: "/service/luat-hanh-chinh/" },
    { name: "Luật đầu tư", count: usefulArticles.filter(a => a.serviceSlug === "luat-dau-tu").length, href: "/service/luat-dau-tu/" },
    { name: "Dịch vụ khác", count: usefulArticles.filter(a => a.serviceSlug === "dich-vu-khac").length, href: "/service/dich-vu-khac/" },
  ];

  return (
    <aside className="space-y-8">
      {/* 1. Search Widget */}
      <div className="bg-white p-6 border border-slate-200/90 shadow-sm rounded-none">
        <h3 className="font-serif text-lg font-bold text-[#1A1816] mb-4 pb-2 border-b-2 border-[#96794F]">
          Tìm kiếm
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchTerm.trim()) {
              window.location.href = `/blog?s=${encodeURIComponent(searchTerm)}`;
            }
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#96794F] text-slate-800 pr-10"
          />
          <button
            type="submit"
            aria-label="Tìm kiếm bài viết"
            className="absolute right-0 top-0 bottom-0 px-3.5 bg-[#96794F] text-white hover:bg-[#82673E] transition-colors flex items-center justify-center cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 2. Latest Posts Widget */}
      <div className="bg-white p-6 border border-slate-200/90 shadow-sm rounded-none">
        <h3 className="font-serif text-lg font-bold text-[#1A1816] mb-4 pb-2 border-b-2 border-[#96794F]">
          Bài viết mới nhất
        </h3>
        <ul className="space-y-3.5 divide-y divide-slate-100 text-[13.5px]">
          {usefulArticles.slice(0, 5).map((post) => (
            <li key={post.id} className="pt-3.5 first:pt-0">
              <Link
                href={`/blog/${post.slug}/`}
                className="group flex items-start gap-2 text-slate-700 hover:text-[#96794F] transition-colors leading-snug"
              >
                <ChevronRight className="w-3.5 h-3.5 text-[#96794F] mt-1 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                <span className="font-medium line-clamp-2">{formatAmpersand(post.title)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Categories Widget */}
      <div className="bg-white p-6 border border-slate-200/90 shadow-sm rounded-none">
        <h3 className="font-serif text-lg font-bold text-[#1A1816] mb-4 pb-2 border-b-2 border-[#96794F]">
          Danh mục
        </h3>
        <ul className="space-y-2 text-[14px]">
          {categories.map((cat, idx) => (
            <li key={idx}>
              <Link
                href={cat.href}
                className="flex items-center justify-between py-1.5 text-slate-600 hover:text-[#96794F] border-b border-slate-50 transition-colors"
              >
                <span>{formatAmpersand(cat.name)}</span>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Hotline Consultation Card */}
      <div className="p-7 rounded-none bg-[#26211C] border border-[#DFBA73]/30 text-white shadow-lg text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-[#96794F]/20 border border-[#DFBA73]/40 mx-auto flex items-center justify-center">
          <Phone className="w-7 h-7 text-[#DFBA73] animate-pulse" />
        </div>
        <h4 className="font-serif text-xl font-bold">Cần Tư Vấn Pháp Lý?</h4>
        <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
          Đội ngũ Luật sư giàu kinh nghiệm của chúng tôi sẵn sàng hỗ trợ bạn 24/7.
        </p>
        <div className="space-y-2.5">
          <a
            href={`tel:${firmInfo.phoneRaw}`}
            className="block w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-[0.98] text-[#14130F] font-bold text-xs uppercase tracking-wider shadow-md transition-all text-center"
          >
            Hotline: {firmInfo.hotline}
          </a>
          <a
            href={`tel:${firmInfo.secondaryPhoneRaw}`}
            className="block w-full py-2.5 px-4 rounded-full bg-white/10 text-white border border-[#DFBA73]/50 hover:bg-white/20 active:scale-[0.98] font-bold text-xs uppercase tracking-wider shadow-md transition-all text-center"
          >
            Hotline: {firmInfo.secondaryPhone}
          </a>
        </div>
      </div>
    </aside>
  );
};
