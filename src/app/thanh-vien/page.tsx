import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { PageTitleBanner } from "@/components/layout/PageTitleBanner";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { teamMembersList } from "@/data/mockData";

import { BreadcrumbSchema } from "@/components/seo/JsonLd";

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembersList.map((member) => (
            <Link
              key={member.id}
              href={member.link || `/thanh-vien/${member.id}/`}
              className="group block bg-white border border-slate-200/90 rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative cursor-pointer"
            >
              {/* Photo */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={400}
                  height={400}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bottom Card with Hover Button */}
              <div className="relative h-[84px] w-full overflow-hidden border-t border-slate-100">
                {/* Default State */}
                <div className="absolute inset-0 px-4 py-3 bg-white flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                  <h3 className="font-serif text-[15px] font-bold text-[#1A1816] line-clamp-1">
                    {member.name}
                  </h3>
                  <span className="text-xs text-[#96794F] font-medium block mt-0.5 tracking-wide line-clamp-1">
                    {member.role}
                  </span>
                </div>

                {/* Hover State: Contact info button */}
                <div className="absolute inset-0 bg-[#7E643E] flex items-center justify-center px-4 transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="text-white text-[13.5px] font-medium tracking-wide flex items-center gap-2.5">
                    <span>{member.name}</span>
                    <span className="inline-block w-6 h-[1.5px] bg-[#DFBA73]" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}
