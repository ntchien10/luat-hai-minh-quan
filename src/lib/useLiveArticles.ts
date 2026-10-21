"use client";

import { useState, useEffect } from "react";
import { BlogItem, usefulArticles } from "@/data/mockData";
import { fetchArticles, DbArticle } from "@/lib/api";

export function useLiveArticles(): { articles: BlogItem[]; isLive: boolean } {
  const [articles, setArticles] = useState<BlogItem[]>(usefulArticles);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadLive = async () => {
      // 1. Lấy dữ liệu từ SQLite API trên hosting (hoặc local fallback)
      const res = await fetchArticles();
      if (isMounted && res.articles && res.articles.length > 0) {
        const mapped: BlogItem[] = res.articles
          .filter((a) => a.is_published !== false)
          .map((a: DbArticle) => ({
            id: a.id,
            title: a.title,
            slug: a.slug,
            date: a.date,
            author: a.author,
            imageUrl:
              a.image_url ||
              (a as any).imageUrl ||
              "/images/blog/phan-chia-di-san-theo-di-chuc.jpg",
            href: `/blog/${a.slug}/`,
            excerpt: a.excerpt,
            category: a.category,
            serviceSlug: a.service_slug || (a as any).serviceSlug || "luat-dan-su",
            content: a.content,
          }));
        setArticles(mapped);
        setIsLive(true);
      }
    };

    loadLive();

    return () => {
      isMounted = false;
    };
  }, []);

  return { articles, isLive };
}
