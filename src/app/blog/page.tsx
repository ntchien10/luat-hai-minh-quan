import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, User, List, MessageSquare } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { PageTitleBanner } from "@/components/layout/PageTitleBanner";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { usefulArticles } from "@/data/mockData";
import { formatAmpersand } from "@/components/ui/Ampersand";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Kiến Thức & Tin Tức Pháp Luật",
  description:
    "Cập nhật các kiến thức, phân tích và hướng dẫn pháp lý hữu ích mới nhất từ các Luật sư hàng đầu tại Công ty Luật TNHH Hải Minh Quân.",
  alternates: {
    canonical: "/blog/",
  },
  openGraph: {
    title: "Kiến Thức & Cẩm Nang Pháp Luật - Luật Hải Minh Quân",
    description:
      "Tổng hợp các bài viết giải đáp thắc mắc pháp lý về hôn nhân gia đình, thừa kế, đất đai, doanh nghiệp và hình sự.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogListingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <BreadcrumbSchema
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Tin tức pháp luật", url: "/blog" },
        ]}
      />
      <Header />

      {/* Page Title Banner */}
      <PageTitleBanner
        title="Tin tức"
        subTitleCite="pháp luật"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức pháp luật" },
        ]}
      />

      {/* Main Content Area */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Articles Stream (col-lg-8) */}
          <main className="lg:col-span-8 space-y-14">
            {usefulArticles.map((post) => (
              <article
                key={post.id}
                className="group border border-slate-200/80 bg-white rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Large Featured Image */}
                <div className="relative h-64 sm:h-80 md:h-[400px] w-full overflow-hidden bg-slate-100">
                  <Link href={`/blog/${post.slug}/`}>
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={800}
                      height={450}
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                </div>

                {/* Entry Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  {/* Meta Items */}
                  <ul className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
                    <li className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#96794F]" />
                      <span>{post.date}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#96794F]" />
                      <Link
                        href="/thanh-vien/do-thi-thanh-hai/"
                        className="hover:text-[#96794F] transition-colors underline underline-offset-2"
                      >
                        Tác giả: {post.author}
                      </Link>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <List className="w-3.5 h-3.5 text-[#96794F]" />
                      <span>{post.category || "Bài viết"}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#96794F]" />
                      <span>0 Bình luận</span>
                    </li>
                  </ul>

                  {/* Title */}
                  <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[#1A1816] group-hover:text-[#96794F] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}/`}>
                      {formatAmpersand(post.title)}
                    </Link>
                  </h2>

                  {/* Excerpt Snippet */}
                  <p className="text-slate-600 text-[14.5px] leading-relaxed text-justify line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Readmore Button */}
                  <div className="pt-2">
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="inline-block px-7 sm:px-8 py-2.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-95 text-[#14130F] text-xs font-bold uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      Xem thêm
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {/* Pagination Navigation */}
            <nav
              aria-label="Phân trang bài viết"
              className="flex items-center justify-center gap-2 pt-6 border-t border-slate-100"
            >
              <span className="w-10 h-10 flex items-center justify-center bg-[#96794F] text-white font-bold text-sm shadow-md">
                1
              </span>
              <button
                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-[#96794F] hover:text-white hover:border-[#96794F] transition-colors text-sm font-medium"
              >
                2
              </button>
              <span className="px-2 text-slate-400">...</span>
              <button
                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-[#96794F] hover:text-white hover:border-[#96794F] transition-colors text-sm font-medium"
              >
                19
              </button>
              <button
                className="px-4 h-10 flex items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-[#96794F] hover:text-white hover:border-[#96794F] transition-colors text-sm font-medium"
              >
                Tiếp theo &rarr;
              </button>
            </nav>
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
