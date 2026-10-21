"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { fetchArticles, DbArticle } from "@/lib/api";
import { BlogItem } from "@/data/mockData";
import { formatAmpersand } from "@/components/ui/Ampersand";

interface Props {
  serviceSlug: string;
  serviceTitle: string;
  initialArticles: BlogItem[];
}

export function ServiceArticlesLive({
  serviceSlug,
  serviceTitle,
  initialArticles,
}: Props) {
  const [articles, setArticles] = useState<BlogItem[]>(initialArticles);

  useEffect(() => {
    let isMounted = true;

    const loadLiveArticles = async () => {
      const res = await fetchArticles();
      if (!isMounted || !res.articles || res.articles.length === 0) return;

      const filtered = res.articles.filter((a: DbArticle) => {
        if (a.is_published === false) return false;
        return (
          a.service_slug === serviceSlug ||
          a.category === serviceTitle ||
          (serviceSlug === "luat-dan-su" && (a.service_slug === "to-tung-dan-su" || a.category?.toLowerCase().includes("dân sự")))
        );
      });

      if (filtered.length > 0) {
        const mapped: BlogItem[] = filtered.map((a: DbArticle) => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          date: a.date,
          author: a.author,
          imageUrl: a.image_url || (a as any).imageUrl || "/images/blog/phan-chia-di-san-theo-di-chuc.jpg",
          href: `/blog/${a.slug}/`,
          excerpt: a.excerpt || "",
          category: a.category || serviceTitle,
          serviceSlug: a.service_slug || serviceSlug,
          content: a.content || "",
        }));

        setArticles(mapped);
      }
    };

    loadLiveArticles();

    return () => {
      isMounted = false;
    };
  }, [serviceSlug, serviceTitle]);

  if (articles.length === 0) {
    return (
      <div className="p-10 text-center bg-slate-50 border border-slate-200 text-slate-500 space-y-2">
        <p className="font-serif text-lg font-bold text-[#1A1816]">Nội dung đang được cập nhật</p>
        <p className="text-sm">Vui lòng liên hệ Hotline <strong>0967 932 555</strong> để được các Luật sư tư vấn trực tiếp.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((art) => (
        <article
          key={art.id}
          className="group bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:border-[#96794F]/60"
        >
          <Link href={`/blog/${art.slug}/`} className="block overflow-hidden">
            {/* Image Thumbnail */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
              <Image
                src={art.imageUrl}
                alt={art.title}
                width={600}
                height={375}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="font-serif text-[15px] sm:text-[16px] font-bold text-[#1A1816] group-hover:text-[#96794F] transition-colors line-clamp-2 leading-snug">
                {formatAmpersand(art.title)}
              </h3>

              {/* Small Divider */}
              <div className="w-8 h-[2px] bg-[#96794F]/40 group-hover:w-14 group-hover:bg-[#96794F] transition-all duration-300 my-1.5" />

              <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-3 leading-relaxed">
                {art.excerpt}
              </p>
            </div>
          </Link>

          {/* Card Footer */}
          <div className="px-4 pb-3.5 pt-1 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-[#96794F]" />
              <span>{art.date}</span>
            </span>
            <Link
              href={`/blog/${art.slug}/`}
              className="font-semibold text-[#96794F] hover:text-[#7E643E] flex items-center gap-1 text-[11.5px]"
            >
              <span>Xem tiếp</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
