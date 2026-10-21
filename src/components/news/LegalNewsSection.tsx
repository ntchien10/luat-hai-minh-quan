"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import { formatAmpersand } from "@/components/ui/Ampersand";
import { useLiveArticles } from "@/lib/useLiveArticles";

export const LegalNewsSection: React.FC = () => {
  const { articles } = useLiveArticles();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const displayedArticles = articles.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section id="tin-tuc" className="py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-aligned Heading with 'News' sub-heading from luatvanbao.com */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-left max-w-2xl mb-12"
        >
          <div className="text-xs uppercase font-bold tracking-widest text-[#96794F] mb-1 flex items-center gap-2">
            <span className="w-5 h-0.5 bg-[#96794F] inline-block" />
            News
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1A1816]">
            Chia sẻ hữu ích
          </h2>
          <div className="h-gap mt-2">
            <span>
              <i /> <i /> <i /> <i />
            </span>
          </div>
        </motion.div>

        {/* 3 Articles Grid (ct-carousel-blog-layout1) with genuine images & gold theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group bg-white border border-slate-200/80 rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Genuine article thumbnail from luatvanbao.com with gold branded banner overlay */}
                <Link
                  href={article.href || `/blog/${article.slug}/`}
                  className="block relative h-60 w-full overflow-hidden bg-slate-100 cursor-pointer"
                >
                  <Image
                    src={article.imageUrl || (article as any).image_url || "/images/blog/phan-chia-di-san-theo-di-chuc.jpg"}
                    alt={article.title}
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  {/* Subtle decorative bottom banner across image */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#96794F]/95 to-[#6E542D]/95 py-1.5 px-3 flex items-center justify-between text-[11px] text-white">
                    <span translate="no" className="notranslate font-bold tracking-wide">
                      LUẬT HẢI MINH QUÂN
                    </span>
                    <span className="italic text-[#E8CF94] text-[10px]">Điểm tựa pháp lý vững chắc</span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 space-y-3">
                  {/* Meta items: Date & Author */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#96794F]" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#96794F]" />
                      <Link
                        href="/thanh-vien/do-thi-thanh-hai/"
                        className="hover:text-[#96794F] transition-colors font-medium"
                      >
                        {article.author || "Ls. Đỗ Thị Thanh Hải"}
                      </Link>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1A1816] group-hover:text-[#96794F] transition-colors line-clamp-2 leading-snug">
                    <Link href={article.href || `/blog/${article.slug}/`}>
                      {formatAmpersand(article.title)}
                    </Link>
                  </h3>
                </div>
              </div>

              {/* Gold pill button "Xem thêm" */}
              <div className="p-6 pt-0">
                <Link
                  href={article.href || `/blog/${article.slug}/`}
                  aria-label={`Đọc bài viết: ${article.title}`}
                  className="inline-block px-7 sm:px-8 py-2.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-95 text-[#14130F] text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Xem thêm
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Carousel pagination dots */}
        <div className="flex items-center justify-center gap-1.5 mt-10">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className="p-2 flex items-center justify-center cursor-pointer"
              aria-label={`Trang tin ${idx + 1}`}
            >
              <span
                className={`h-2.5 rounded-full transition-all duration-300 block ${
                  currentPage === idx
                    ? "w-7 bg-[#96794F]"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
