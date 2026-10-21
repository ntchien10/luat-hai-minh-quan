"use client";

import { useState, useEffect } from "react";
import { BlogItem, usefulArticles } from "@/data/mockData";
import { fetchArticlesFromSupabase, isSupabaseConfigured, DbArticle } from "@/lib/supabase";

export function useLiveArticles(): { articles: BlogItem[]; isLive: boolean } {
  const [articles, setArticles] = useState<BlogItem[]>(usefulArticles);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadLive = async () => {
      // 1. Kiểm tra Supabase
      if (isSupabaseConfigured()) {
        const res = await fetchArticlesFromSupabase();
        if (isMounted && res.articles.length > 0) {
          const mapped: BlogItem[] = res.articles
            .filter((a) => a.is_published !== false)
            .map((a: DbArticle) => ({
              id: a.id,
              title: a.title,
              slug: a.slug,
              date: a.date,
              author: a.author,
              imageUrl: a.image_url,
              href: `/blog/${a.slug}/`,
              excerpt: a.excerpt,
              category: a.category,
              serviceSlug: a.service_slug,
              content: a.content,
            }));
          setArticles(mapped);
          setIsLive(true);
          return;
        }
      }

      // 2. Fallback local storage
      if (typeof window !== "undefined") {
        const local = localStorage.getItem("hmq_local_articles");
        if (local && isMounted) {
          try {
            const parsed: DbArticle[] = JSON.parse(local);
            const mapped: BlogItem[] = parsed
              .filter((a) => a.is_published !== false)
              .map((a) => ({
                id: a.id,
                title: a.title,
                slug: a.slug,
                date: a.date,
                author: a.author,
                imageUrl: a.image_url,
                href: `/blog/${a.slug}/`,
                excerpt: a.excerpt,
                category: a.category,
                serviceSlug: a.service_slug,
                content: a.content,
              }));
            setArticles(mapped);
            setIsLive(true);
          } catch (e) {
            console.error(e);
          }
        }
      }
    };

    loadLive();

    return () => {
      isMounted = false;
    };
  }, []);

  return { articles, isLive };
}
