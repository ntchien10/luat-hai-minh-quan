import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { PageTitleBanner } from "@/components/layout/PageTitleBanner";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { TeamListClient } from "@/components/attorneys/TeamListClient";

export const metadata: Metadata = {
  title: "Đội Ngũ Luật Sư & Chuyên Gia",
  description:
    "Danh sách đội ngũ Luật sư uy tín, Cố vấn pháp lý và Chuyên viên giàu kinh nghiệm tại Công ty Luật TNHH Hải Minh Quân. Hỗ trợ tư vấn pháp lý chuyên sâu.",
  alternates: {
    canonical: "/thanh-vien/",
  },
  openGraph: {
    title: "Đội Ngũ Luật Sư & Chuyên Gia | Luật Hải Minh Quân",
    description:
      "Gặp gỡ đội ngũ Luật sư sáng lập, luật sư thành viên và cố vấn pháp lý hàng đầu của Hải Minh Quân.",
    url: "/thanh-vien",
    type: "website",
  },
};

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <BreadcrumbSchema
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Đội ngũ Luật sư", url: "/thanh-vien" },
        ]}
      />
      <Header />

      {/* Page Title Banner */}
      <PageTitleBanner
        title="Thành viên"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Thành viên" },
        ]}
      />

      {/* Main Team Grid */}
      <main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full flex-1">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#96794F]">
            Đội ngũ chuyên gia
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1816] mt-2">
            Đội Ngũ Luật Sư Nòng Cốt
          </h2>
          <div className="h-gap mt-3">
            <span>
              <i /> <i /> <i /> <i />
            </span>
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
            Với bề dày kinh nghiệm thực chiến và đạo đức nghề nghiệp chuẩn mực, các Luật sư của Hải Minh Quân luôn tận tâm bảo vệ tối đa quyền lợi của Quý thân chủ.
          </p>
        </div>

        <TeamListClient />
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}
