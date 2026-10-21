import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { PageTitleBanner } from "@/components/layout/PageTitleBanner";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { BlogListClient } from "@/components/blog/BlogListClient";

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
          <main className="lg:col-span-8">
            <BlogListClient />
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
