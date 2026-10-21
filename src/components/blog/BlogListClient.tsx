"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, List, MessageSquare } from "lucide-react";
import { formatAmpersand } from "@/components/ui/Ampersand";
import { useLiveArticles } from "@/lib/useLiveArticles";

export function BlogListClient() {
  const { articles } = useLiveArticles();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const displayedArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-14">
      {displayedArticles.map((post) => (
        <article
          key={post.id}
          className="group border border-slate-200/80 bg-white rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          {/* Large Featured Image */}
          <div className="relative h-64 sm:h-80 md:h-[400px] w-full overflow-hidden bg-slate-100">
            <Link href={post.href || `/blog/${post.slug}/`}>
              <Image
                src={post.imageUrl || "/images/blog/phan-chia-di-san-theo-di-chuc.jpg"}
                alt={post.title}
                width={800}
                height={450}
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
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
              <Link href={post.href || `/blog/${post.slug}/`}>
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
                href={post.href || `/blog/${post.slug}/`}
                className="inline-block px-7 sm:px-8 py-2.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-95 text-[#14130F] text-xs font-bold uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Xem thêm
              </Link>
            </div>
          </div>
        </article>
      ))}

      {/* Pagination Navigation */}
      {totalPages > 1 && (
        <nav
          aria-label="Phân trang bài viết"
          className="flex items-center justify-center gap-2 pt-6 border-t border-slate-100"
        >
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => {
                  setCurrentPage(pageNum);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-[#96794F] text-white font-bold shadow-md"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-[#96794F] hover:text-white hover:border-[#96794F]"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
