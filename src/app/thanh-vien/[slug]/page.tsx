import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Phone, Mail, Award, CheckCircle2, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { PageTitleBanner } from "@/components/layout/PageTitleBanner";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { teamMembersList, firmInfo } from "@/data/mockData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teamMembersList.map((member) => ({
    slug: member.id,
  }));
}

import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembersList.find((m) => m.id === slug);

  if (!member) {
    return {
      title: "Không tìm thấy luật sư - Công Ty Luật TNHH Hải Minh Quân",
    };
  }

  const desc =
    member.bio ||
    `${member.name} là ${member.role} giàu kinh nghiệm tại Công ty Luật TNHH Hải Minh Quân, chuyên tư vấn và đại diện tranh tụng pháp lý.`;

  return {
    title: `${member.name} - ${member.role}`,
    description: desc,
    alternates: {
      canonical: `/thanh-vien/${slug}/`,
    },
    openGraph: {
      title: `${member.name} - ${member.role} | Luật Hải Minh Quân`,
      description: desc,
      url: `/thanh-vien/${slug}/`,
      type: "profile",
      images: [
        {
          url: member.imageUrl,
          width: 800,
          height: 800,
          alt: `${member.name} - ${member.role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${member.name} - ${member.role}`,
      description: desc,
      images: [member.imageUrl],
    },
  };
}

export default async function MemberDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const member = teamMembersList.find((m) => m.id === slug);

  if (!member) {
    notFound();
  }

  // Other colleagues (excluding current member)
  const otherMembers = teamMembersList.filter((m) => m.id !== member.id).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <BreadcrumbSchema
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Thành viên", url: "/thanh-vien/" },
          { name: member.name, url: `/thanh-vien/${member.id}/` },
        ]}
      />
      <Header />

      {/* Page Title Banner */}
      <PageTitleBanner
        title={member.name}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Thành viên", href: "/thanh-vien/" },
          { label: member.name },
        ]}
      />

      {/* Main Content Area */}
      <main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full flex-1">
        {/* Top Heading with signature 4-diamonds divider */}
        <div className="mb-10">
          <Link
            href="/thanh-vien"
            className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-[#96794F] hover:underline mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại danh sách thành viên</span>
          </Link>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1816]">
            {member.name}
          </h2>
          <div className="h-gap mt-3">
            <span>
              <i /> <i /> <i /> <i />
            </span>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ════════ LEFT COLUMN: MEMBER PHOTO & CONTACT INFO ════════ */}
          <div className="lg:col-span-4 space-y-6">
            {/* Square Photo Card */}
            <div className="bg-white border border-slate-200/90 shadow-md overflow-hidden">
              <div className="relative aspect-square w-full bg-slate-100">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={400}
                  height={400}
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 text-center bg-white border-t border-slate-100">
                <h3 className="font-serif text-lg font-bold text-[#1A1816]">
                  {member.name}
                </h3>
                <div className="text-xs font-semibold text-[#96794F] mt-1 uppercase tracking-wider">
                  {member.role}
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-slate-50 border border-slate-200/80 p-6 space-y-4">
              <h4 className="font-serif text-base font-bold text-[#1A1816] border-b border-slate-200 pb-2">
                Thông tin liên hệ
              </h4>

              <div className="space-y-3 text-sm">
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#96794F]/10 text-[#96794F] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-500 uppercase font-semibold">Điện thoại</span>
                    <a
                      href={`tel:${(member.phone || firmInfo.phone).replace(/\s+/g, "")}`}
                      className="font-bold text-[#96794F] hover:underline"
                    >
                      {member.phone || firmInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#96794F]/10 text-[#96794F] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-500 uppercase font-semibold">Email</span>
                    <a
                      href={`mailto:${member.email || firmInfo.email}`}
                      className="text-slate-700 hover:text-[#96794F] font-medium transition-colors"
                    >
                      {member.email || firmInfo.email}
                    </a>
                  </div>
                </div>

                {/* Lawyer Card No if available */}
                {member.cardNo && (
                  <div className="flex items-start gap-3 pt-1 border-t border-slate-200/60">
                    <div className="w-9 h-9 rounded-full bg-[#96794F]/10 text-[#96794F] flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-500 uppercase font-semibold">Thẻ luật sư</span>
                      <span className="text-xs text-slate-700 font-medium leading-relaxed">
                        {member.cardNo}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Booking Button */}
              <div className="pt-2">
                <Link
                  href="/lien-he"
                  className="block w-full py-3 px-6 text-center rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-[0.98] text-[#14130F] text-xs font-bold uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Đặt lịch tư vấn trực tiếp
                </Link>
              </div>
            </div>
          </div>

          {/* ════════ RIGHT COLUMN: DETAILED CREDENTIALS & EXPERIENCE ════════ */}
          <div className="lg:col-span-8 space-y-8">
            {/* Bio introduction statement */}
            {member.bio && (
              <div className="p-6 bg-[#FAF6F0] border-l-4 border-[#96794F] text-slate-700 leading-relaxed text-[15px] italic rounded-none">
                &ldquo;{member.bio}&rdquo;
              </div>
            )}

            {/* Trình độ (Qualifications) */}
            {member.qualifications && member.qualifications.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-bold text-[#1A1816] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#96794F] inline-block" />
                  <span>Trình độ chuyên môn:</span>
                </h3>
                <ul className="space-y-2.5 pl-2 text-[15px] text-slate-700">
                  {member.qualifications.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#96794F] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quá trình công tác (Experience) */}
            {member.experience && member.experience.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="font-serif text-xl font-bold text-[#1A1816] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#96794F] inline-block" />
                  <span>Quá trình công tác:</span>
                </h3>
                <ul className="space-y-2.5 pl-2 text-[15px] text-slate-700">
                  {member.experience.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#96794F] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lĩnh vực phụ trách / Chuyên sâu (Expertise) */}
            {member.expertise && member.expertise.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="font-serif text-xl font-bold text-[#1A1816] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#96794F] inline-block" />
                  <span>Lĩnh vực chuyên sâu:</span>
                </h3>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {member.expertise.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3.5 py-1.5 bg-[#96794F]/10 text-[#96794F] border border-[#96794F]/20 text-xs font-semibold rounded-none"
                    >
                      • {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Consultation Box */}
            <div className="bg-[#26211C] border border-[#DFBA73]/30 text-white p-7 sm:p-8 rounded-none flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl mt-10">
              <div className="space-y-1.5 text-center sm:text-left">
                <h4 className="font-serif text-xl font-bold text-white">
                  Cần tư vấn trực tiếp với {member.name}?
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Liên hệ ngay Hotline để được hỗ trợ và giải đáp vướng mắc pháp lý nhanh chóng.
                </p>
              </div>
              <a
                href={`tel:${(member.phone || firmInfo.phone).replace(/\s+/g, "")}`}
                className="shrink-0 px-8 py-3 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-[0.98] text-[#14130F] text-xs font-bold uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Gọi ngay: {member.phone || firmInfo.phone}
              </a>
            </div>
          </div>
        </div>

        {/* ════════ OTHER COLLEAGUES SECTION ════════ */}
        {otherMembers.length > 0 && (
          <div className="mt-20 pt-16 border-t border-slate-200">
            <div className="text-left mb-8">
              <h3 className="font-serif text-2xl font-bold text-[#1A1816]">
                Các Luật sư & Chuyên gia khác
              </h3>
              <div className="h-gap mt-2">
                <span>
                  <i /> <i /> <i /> <i />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherMembers.map((colleague) => (
                <Link
                  key={colleague.id}
                  href={colleague.link || `/thanh-vien/${colleague.id}/`}
                  className="group block bg-white border border-slate-200/90 rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative cursor-pointer"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                    <Image
                      src={colleague.imageUrl}
                      alt={colleague.name}
                      width={400}
                      height={400}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="relative h-[82px] w-full overflow-hidden border-t border-slate-100">
                    {/* Default State */}
                    <div className="absolute inset-0 px-4 py-3 bg-white flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                      <h4 className="font-serif text-[15px] font-bold text-[#1A1816] line-clamp-1">
                        {colleague.name}
                      </h4>
                      <span className="text-xs text-[#96794F] font-medium block mt-0.5 tracking-wide line-clamp-1">
                        {colleague.role}
                      </span>
                    </div>

                    {/* Hover State */}
                    <div className="absolute inset-0 bg-[#7E643E] flex items-center justify-center px-4 transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="text-white text-[13.5px] font-medium tracking-wide flex items-center gap-2.5">
                        <span>{colleague.name}</span>
                        <span className="inline-block w-6 h-[1.5px] bg-[#DFBA73]" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}
