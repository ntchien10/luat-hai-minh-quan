"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  User,
  List,
  MessageSquare,
  Scale,
  PhoneCall,
  Home,
  Loader2,
  Phone,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { PageTitleBanner } from "@/components/layout/PageTitleBanner";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { fetchArticles, DbArticle } from "@/lib/api";
import { firmInfo, teamMembersList } from "@/data/mockData";
import { formatAmpersand } from "@/components/ui/Ampersand";

interface Props {
  slug: string;
}

export function BlogPostLiveDetail({ slug }: Props) {
  const [article, setArticle] = useState<DbArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadArticle = async () => {
      setIsLoading(true);
      const res = await fetchArticles();
      if (!isMounted) return;

      if (res.articles && res.articles.length > 0) {
        const cleanSlug = decodeURIComponent(slug).replace(/\/$/, "").trim().toLowerCase();
        const found = res.articles.find((a) => {
          const aSlug = decodeURIComponent(a.slug || "").replace(/\/$/, "").trim().toLowerCase();
          return aSlug === cleanSlug || a.id === cleanSlug || aSlug.includes(cleanSlug) || cleanSlug.includes(aSlug);
        });
        if (found) {
          setArticle(found);
          setIsLoading(false);
          return;
        }
      }
      setIsLoading(false);
    };

    loadArticle();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-32 text-slate-500">
          <Loader2 className="w-10 h-10 animate-spin text-[#96794F] mb-4" />
          <p className="text-sm font-semibold text-slate-700">Đang tải bài viết...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-[#333333]">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20 px-4 bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#FAF6F0] text-[#96794F] flex items-center justify-center mx-auto shadow-sm">
              <Scale className="w-10 h-10" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#FAF6F0] text-[#96794F] text-xs font-bold uppercase tracking-widest">
              Thông báo
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1816]">
              Bài Viết Đang Cập Nhật
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              Bài viết bạn đang tìm kiếm chưa sẵn sàng hoặc đang trong quá trình hiệu đính. Vui lòng quay lại chuyên mục tin tức hoặc liên hệ hotline để được luật sư tư vấn trực tiếp.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/blog/"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] text-[#14130F] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-md"
              >
                <Home className="w-4 h-4" />
                <span>Về Mục Tin Tức</span>
              </Link>
              <a
                href={`tel:${firmInfo.phoneRaw}`}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider hover:border-[#96794F] hover:text-[#96794F]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Hotline: {firmInfo.hotline}</span>
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const authorClean = article.author
    ? article.author.replace(/^(Ls\.\s*|Ths\.\s*|Luật sư\s*|Chuyên gia\s*)/i, "").trim()
    : "";
  const authorMember = teamMembersList.find((m) =>
    authorClean &&
    (m.name.includes(authorClean) ||
      authorClean.includes(m.name.replace(/^(Ls\.\s*|Ths\.\s*|Luật sư\s*|Chuyên gia\s*)/i, "").trim()))
  );
  const authorUrl = authorMember ? authorMember.link : "/thanh-vien";

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <Header />

      {/* Page Title Banner */}
      <PageTitleBanner
        title={article.title}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức", href: "/blog" },
          { label: article.title },
        ]}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Article Content (col-lg-8) */}
          <main className="lg:col-span-8 space-y-8">
            <article className="border border-slate-200/80 bg-white p-6 sm:p-10 shadow-sm rounded-none space-y-6">
              {/* Meta row */}
              <ul className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
                <li className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#96794F]" />
                  <span>{article.date}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#96794F]" />
                  <Link
                    href={authorUrl}
                    className="hover:text-[#96794F] transition-colors underline underline-offset-2"
                  >
                    Tác giả: {article.author}
                  </Link>
                </li>
                <li className="flex items-center gap-1.5">
                  <List className="w-3.5 h-3.5 text-[#96794F]" />
                  <span>{article.category || "Bài viết"}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#96794F]" />
                  <span>0 Bình luận</span>
                </li>
              </ul>

              {(article.image_url || (article as any).imageUrl) && (
                <div className="relative h-72 sm:h-96 md:h-[440px] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={article.image_url || (article as any).imageUrl || "/images/blog/phan-chia-di-san-theo-di-chuc.jpg"}
                    alt={article.title}
                    width={1200}
                    height={675}
                    priority
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] py-2 px-4 flex items-center justify-between text-xs text-[#14130F]">
                    <span translate="no" className="notranslate font-bold tracking-wider">
                      CÔNG TY LUẬT TNHH HẢI MINH QUÂN
                    </span>
                    <span className="italic font-medium text-slate-800">Điểm tựa pháp lý vững chắc</span>
                  </div>
                </div>
              )}

              {/* Lead Summary */}
              {article.excerpt && (
                <div className="bg-[#FAF6F0] border-l-4 border-[#96794F] p-5 text-slate-800 text-sm sm:text-base font-medium leading-relaxed italic">
                  {article.excerpt}
                </div>
              )}

              {/* Article Content */}
              <div className="space-y-4 text-slate-700 text-[15px] sm:text-base leading-relaxed text-justify">
                {article.content ? (
                  /<[a-z][\s\S]*>/i.test(article.content) ? (
                    <div
                      className="article-rich-content"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  ) : (
                    article.content.split("\n\n").map((block, index) => {
                      const trimmed = block.trim();
                      if (!trimmed || /^#+\s*$/.test(trimmed)) return null;
                      if (trimmed.startsWith("## ")) {
                        return (
                          <h2 key={index} className="font-serif text-xl sm:text-2xl font-bold text-[#96794F] mt-7 mb-3 border-b border-slate-100 pb-2">
                            {formatAmpersand(trimmed.replace(/^##\s+/, ""))}
                          </h2>
                        );
                      }
                      if (trimmed.startsWith("### ")) {
                        return (
                          <h3 key={index} className="font-serif text-lg sm:text-xl font-bold text-[#1A1816] mt-5 mb-2">
                            {formatAmpersand(trimmed.replace(/^###\s+/, ""))}
                          </h3>
                        );
                      }
                      if (trimmed.startsWith("- ")) {
                        const lines = trimmed.split("\n");
                        const items: string[] = [];
                        let current = "";
                        for (const l of lines) {
                          const cl = l.trim();
                          if (!cl) continue;
                          if (cl.startsWith("- ")) {
                            if (current) items.push(current);
                            current = cl.replace(/^-\s+/, "");
                          } else {
                            current = current ? `${current} ${cl}` : cl;
                          }
                        }
                        if (current) items.push(current);
                        return (
                          <ul key={index} className="list-disc pl-5 space-y-1.5 my-3 text-slate-700">
                            {items.map((it, i) => (
                              <li key={i}>{formatAmpersand(it)}</li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={index} className="leading-relaxed">
                          {formatAmpersand(trimmed)}
                        </p>
                      );
                    })
                  )
                ) : (
                  <p>{article.excerpt || "Nội dung đang được cập nhật."}</p>
                )}
              </div>

              {/* Author & Hotline CTA box */}
              <div className="p-6 bg-gradient-to-r from-slate-900 to-[#0F1E36] text-white rounded-xl shadow-lg mt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#DFBA73]">
                    Cần Luật Sư Tư Vấn Trực Tiếp Vụ Việc?
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Đội ngũ Luật sư thuộc Công ty Luật TNHH Hải Minh Quân luôn sẵn sàng bảo vệ quyền lợi hợp pháp của bạn.
                  </p>
                </div>
                <a
                  href={`tel:${firmInfo.phoneRaw}`}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] text-[#14130F] font-bold text-xs uppercase tracking-wider rounded-full shadow hover:brightness-110 transition-transform active:scale-95 shrink-0 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Hotline: {firmInfo.hotline}</span>
                </a>
              </div>
            </article>
          </main>

          {/* Sidebar (col-lg-4) */}
          <div className="lg:col-span-4">
            <BlogSidebar />
          </div>
        </div>
      </div>

      <Footer />
      <FloatingContact />
    </div>
  );
}
