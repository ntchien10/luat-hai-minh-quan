import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, User, List, MessageSquare, Tag, Share2, Scale, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { PageTitleBanner } from "@/components/layout/PageTitleBanner";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { usefulArticles, firmInfo, teamMembersList } from "@/data/mockData";
import { BlogPostLiveDetail } from "@/components/blog/BlogPostLiveDetail";

export async function generateStaticParams() {
  return usefulArticles.map((article) => ({
    slug: article.slug,
  }));
}

import { BreadcrumbSchema, ArticleSchema } from "@/components/seo/JsonLd";

function formatIsoDate(dateStr: string): string {
  if (!dateStr) return "2026-08-15T09:00:00+07:00";
  if (/^\d{4}-\d{2}-\d{2}T/.test(dateStr)) return dateStr;
  const match = dateStr.match(/(\d{1,2})\s+Tháng\s+(\d{1,2}),\s*(\d{4})/i);
  if (match) {
    const day = match[1].padStart(2, "0");
    const month = match[2].padStart(2, "0");
    const year = match[3];
    return `${year}-${month}-${day}T09:00:00+07:00`;
  }
  return "2026-08-15T09:00:00+07:00";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = usefulArticles.find((p) => p.slug === slug);
  if (!post) {
    const cleanTitle = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      title: `${cleanTitle} | Luật Hải Minh Quân`,
      description: "Bài viết cẩm nang pháp luật - Công ty Luật TNHH Hải Minh Quân",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}/`,
    },
    openGraph: {
      title: `${post.title} | Luật Hải Minh Quân`,
      description: post.excerpt,
      url: `/blog/${post.slug}/`,
      type: "article",
      locale: "vi_VN",
      publishedTime: formatIsoDate(post.date),
      authors: [post.author || "Luật sư Đỗ Thị Thanh Hải"],
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

function renderNormalAmpersand(text: string) {
  if (!text || !text.includes("&")) return text;
  const parts = text.split("&");
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="font-sans font-semibold text-[0.88em] mx-1 inline-block select-all">&amp;</span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = usefulArticles.find((p) => p.slug === slug);

  if (!post) {
    return <BlogPostLiveDetail slug={slug} />;
  }

  const categoryRelated = usefulArticles.filter(
    (p) => p.id !== post.id && (p.serviceSlug === post.serviceSlug || p.category === post.category)
  );
  const relatedPosts = (categoryRelated.length >= 3 ? categoryRelated : usefulArticles.filter((p) => p.id !== post.id)).slice(0, 3);

  const authorClean = post.author
    ? post.author.replace(/^(Ls\.\s*|Ths\.\s*|Luật sư\s*|Chuyên gia\s*)/i, "").trim()
    : "";
  const authorMember = teamMembersList.find((m) =>
    authorClean &&
    (m.name.includes(authorClean) ||
      authorClean.includes(m.name.replace(/^(Ls\.\s*|Ths\.\s*|Luật sư\s*|Chuyên gia\s*)/i, "").trim()))
  );
  const authorUrl = authorMember ? authorMember.link : "/thanh-vien";

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <BreadcrumbSchema
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Tin tức pháp luật", url: "/blog/" },
          { name: post.title, url: `/blog/${post.slug}/` },
        ]}
      />
      <ArticleSchema
        title={post.title}
        description={post.excerpt || post.title}
        url={`/blog/${post.slug}/`}
        imageUrl={post.imageUrl}
        datePublished={formatIsoDate(post.date)}
        authorName={post.author || "Luật sư Đỗ Thị Thanh Hải"}
        authorUrl={authorUrl}
      />
      <Header />

      {/* Page Title Banner */}
      <PageTitleBanner
        title={post.title}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức", href: "/blog" },
          { label: post.title },
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
                  <span>{post.date}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#96794F]" />
                  <Link
                    href={authorUrl}
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

              {/* Featured Image with bottom branding ribbon */}
              <div className="relative h-72 sm:h-96 md:h-[440px] w-full overflow-hidden bg-slate-100">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={1200}
                  height={675}
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] py-2 px-4 flex items-center justify-between text-xs text-[#14130F]">
                  <span className="font-bold tracking-wider">CÔNG TY LUẬT TNHH HẢI MINH QUÂN</span>
                  <span className="italic font-medium text-slate-800">Điểm tựa pháp lý vững chắc</span>
                </div>
              </div>

              {/* Lead Summary */}
              <div className="bg-[#FAF6F0] border-l-4 border-[#96794F] p-5 text-slate-800 text-sm sm:text-base font-medium leading-relaxed italic">
                {post.excerpt}
              </div>

              {/* Article Detailed Body */}
              <div className="space-y-4 text-slate-700 text-[15px] sm:text-base leading-relaxed text-justify">
                {post.content ? (
                  /<[a-z][\s\S]*>/i.test(post.content) ? (
                    <div
                      className="article-rich-content"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  ) : (
                    post.content.split("\n\n").map((block, index) => {
                      const trimmed = block.trim();
                      if (!trimmed || /^#+\s*$/.test(trimmed)) return null;
                      if (trimmed.startsWith("## ")) {
                        return (
                          <h2 key={index} className="font-serif text-xl sm:text-2xl font-bold text-[#96794F] mt-7 mb-3 border-b border-slate-100 pb-2">
                            {renderNormalAmpersand(trimmed.replace(/^##\s+/, ""))}
                          </h2>
                        );
                      }
                      if (trimmed.startsWith("### ")) {
                        return (
                          <h3 key={index} className="font-serif text-lg sm:text-xl font-bold text-[#1A1816] mt-5 mb-2">
                            {renderNormalAmpersand(trimmed.replace(/^###\s+/, ""))}
                          </h3>
                        );
                      }
                      if (trimmed.startsWith("#### ")) {
                        return (
                          <h4 key={index} className="font-serif text-base font-bold text-[#1A1816] mt-4 mb-2">
                            {renderNormalAmpersand(trimmed.replace(/^####\s+/, ""))}
                          </h4>
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
                              <li key={i}>{renderNormalAmpersand(it)}</li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={index} className="leading-relaxed">
                          {renderNormalAmpersand(trimmed)}
                        </p>
                      );
                    })
                  )
                ) : (
                  <p>{post.excerpt}</p>
                )}

                <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-none space-y-3">
                  <h3 className="font-serif text-lg font-bold text-[#1A1816] flex items-center gap-2">
                    <Scale className="w-5 h-5 text-[#96794F]" />
                    Lời khuyên từ Luật Hải Minh Quân
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Mỗi vụ việc pháp lý đều có những tính chất và tình tiết đặc thù. Để được bảo vệ tối đa quyền và lợi ích hợp pháp của mình, Quý khách hàng vui lòng liên hệ trực tiếp với chúng tôi qua Hotline: <strong>{firmInfo.phone}</strong> hoặc để lại thông tin để được hỗ trợ chuyên sâu kịp thời.
                  </p>
                </div>
              </div>

              {/* Tags & Share */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <Tag className="w-4 h-4 text-[#96794F]" />
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-sm">Pháp lý</span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-sm">Hôn nhân gia đình</span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-sm">Tư vấn luật</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <Share2 className="w-4 h-4 text-[#96794F]" />
                  <span>Chia sẻ bài viết</span>
                </div>
              </div>
            </article>

            {/* Back link */}
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#96794F] hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại danh sách bài viết</span>
              </Link>
            </div>

            {/* Related Posts */}
            <div className="pt-8 border-t border-slate-200 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#1A1816]">
                Bài viết liên quan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}/`}
                    className="group border border-slate-200/80 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={related.imageUrl}
                        alt={related.title}
                        width={400}
                        height={225}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[11px] text-slate-400 block">{related.date}</span>
                      <h4 className="font-serif text-sm font-bold text-[#1A1816] group-hover:text-[#96794F] transition-colors line-clamp-2">
                        {renderNormalAmpersand(related.title)}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </main>

          {/* Sidebar */}
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
