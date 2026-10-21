import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ChevronRight,
  Scale,
  Sparkles,
  Award,
  Phone,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { practiceServices, allNavigationServices, firmInfo, usefulArticles } from "@/data/mockData";
import { ServiceArticlesLive } from "@/components/service/ServiceArticlesLive";

// Ánh xạ tương thích ngược các slug cũ để không bao giờ bị lỗi 404
const SLUG_ALIASES: Record<string, string> = {
  "to-tung-dan-su": "luat-dan-su",
  "to-tung-hinh-su": "luat-hinh-su",
  "to-tung-hanh-chinh": "luat-hanh-chinh",
  "so-huu-tri-tue": "luat-so-huu-tri-tue",
  "luat-su-doanh-nghiep": "luat-doanh-nghiep",
  "tu-van-luat-doanh-nghiep": "luat-doanh-nghiep",
  "tu-van-dau-tu": "luat-dau-tu",
  "tu-van-ke-toan-thue": "dich-vu-khac",
  "cac-dich-vu-khac": "dich-vu-khac",
};

export async function generateStaticParams() {
  const primarySlugs = practiceServices.map((service) => ({ slug: service.slug }));
  const aliasSlugs = Object.keys(SLUG_ALIASES).map((slug) => ({ slug }));
  return [...primarySlugs, ...aliasSlugs];
}

import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = SLUG_ALIASES[slug] || slug;
  const service = practiceServices.find((s) => s.slug === resolvedSlug || s.slug === slug);
  if (!service) return { title: "Dịch vụ pháp lý - Công ty Luật TNHH Hải Minh Quân" };

  const image = service.hoverImage || "/images/about/about-court.jpg";
  const rawTitle = service.seoTitle || `Luật Sư ${service.title} Tại Hà Nội`;
  const fullTitle = `${rawTitle} | Luật Hải Minh Quân`;

  const fullDesc =
    service.shortDesc.length >= 130
      ? service.shortDesc
      : `${service.shortDesc} Dịch vụ luật sư chuyên nghiệp, tận tâm tại Công ty Luật TNHH Hải Minh Quân Hà Nội.`;

  return {
    title: rawTitle,
    description: fullDesc,
    alternates: {
      canonical: `/service/${service.slug}/`,
    },
    openGraph: {
      title: fullTitle,
      description: fullDesc,
      url: `/service/${service.slug}/`,
      type: "website",
      locale: "vi_VN",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDesc,
      images: [image],
    },
  };
}

const serviceWhyChooseMap: Record<
  string,
  {
    benefits: string[];
    commitment: string;
  }
> = {
  "luat-dan-su": {
    benefits: [
      "Kinh nghiệm dày dặn trong việc xử lý các tranh chấp hợp đồng, tài sản và thừa kế phức tạp",
      "Luôn ưu tiên giải pháp hòa giải để tiết kiệm tối đa thời gian và chi phí cho khách hàng",
      "Theo sát vụ việc đến cùng cho tới khi bản án hoặc quyết định có hiệu lực thi hành",
    ],
    commitment: "Tận tâm, kiên định bảo vệ quyền lợi chính đáng của thân chủ trên nền tảng thượng tôn pháp luật và công lý.",
  },
  "luat-hinh-su": {
    benefits: [
      "Phản ứng tức thì, có mặt tại các trại tạm giam, cơ quan điều tra trên toàn quốc",
      "Am hiểu sâu sắc quy chuẩn tố tụng hình sự và tâm lý tội phạm",
      "Bảo mật tuyệt đối danh tính và đời tư của thân chủ cùng gia đình",
    ],
    commitment: "Tất cả vì sự thật khách quan và quyền con người. Kiên quyết chống oan sai và bảo đảm phán quyết công bằng.",
  },
  "luat-hanh-chinh": {
    benefits: [
      "Nắm vững hệ thống văn bản pháp luật hành chính và các quy định quản lý nhà nước",
      "Kinh nghiệm xử lý các vụ việc khiếu kiện bồi thường đất đai, cưỡng chế phức tạp",
      "Bản lĩnh vững vàng, kiên quyết bảo vệ lẽ phải trước cơ quan công quyền",
    ],
    commitment: "Đảm bảo quyền bình đẳng trước pháp luật, yêu cầu hủy bỏ quyết định trái thẩm quyền và đòi bồi thường thỏa đáng.",
  },
  "luat-dat-dai": {
    benefits: [
      "Nắm bắt cập nhật Luật Đất đai 2024 mới nhất, tháo gỡ điểm nghẽn về cấp Sổ đỏ lần đầu",
      "Kinh nghiệm hòa giải và tranh tụng thực chiến giải quyết triệt để tranh chấp ranh giới, lối đi chung",
      "Tối ưu mức bồi thường, hỗ trợ tái định cư khi nhà nước thu hồi đất sát với giá thị trường",
    ],
    commitment: "Bảo toàn tài sản đất đai quý giá của khách hàng, đem lại sự minh bạch, an tâm pháp lý trọn vẹn.",
  },
  "luat-hon-nhan-va-gia-dinh": {
    benefits: [
      "Giải quyết ly hôn thuận tình nhanh gọn 7 - 15 ngày, chỉ cần đến Tòa 01 lần duy nhất",
      "Bảo vệ tối đa quyền nuôi con, quyền thăm nom và mức cấp dưỡng thỏa đáng",
      "Phân chia tài sản chung vợ chồng và chứng minh tài sản riêng rõ ràng, chuẩn xác",
    ],
    commitment: "Bảo mật tuyệt đối thông tin riêng tư, ứng xử nhân văn, thấu cảm và bảo vệ tương lai con trẻ.",
  },
  "luat-so-huu-tri-tue": {
    benefits: [
      "Đội ngũ luật sư và chuyên gia sở hữu trí tuệ giàu kinh nghiệm xử lý hồ sơ nhãn hiệu phức tạp",
      "Chiến lược bảo hộ toàn diện thương hiệu, logo, bao bì và phần mềm",
      "Quyết liệt đại diện xử lý hành vi xâm phạm, làm nhái thương hiệu độc quyền",
    ],
    commitment: "Cam kết biến tài sản trí tuệ thành lợi thế cạnh tranh bền vững và độc quyền cho doanh nghiệp.",
  },
  "luat-doanh-nghiep": {
    benefits: [
      "Tối ưu chi phí so với việc duy trì phòng pháp chế nội bộ cồng kềnh",
      "Giải pháp tư vấn thực tiễn, sắc bén, đồng hành cùng mục tiêu kinh doanh của doanh nghiệp",
      "Bảo mật tuyệt đối toàn bộ thông tin tài chính và chiến lược kinh doanh",
    ],
    commitment: "Đồng hành sát cánh, bảo vệ tối đa lợi ích của doanh nghiệp trên con đường phát triển bền vững.",
  },
  "luat-dau-tu": {
    benefits: [
      "Tỷ lệ hồ sơ cấp Giấy chứng nhận đầu tư IRC thành công nhanh chóng, chuẩn xác quy định pháp luật",
      "Bảo vệ tối đa quyền lợi của nhà đầu tư trước các biến động chính sách và rủi ro tranh chấp",
      "Hỗ trợ song ngữ chuyên nghiệp, am hiểu sâu sắc thực tiễn đầu tư FDI tại Việt Nam",
    ],
    commitment: "Cam kết đồng hành tận tâm, bảo đảm mọi thủ tục đầu tư diễn ra an toàn, đúng tiến độ và tối ưu chi phí.",
  },
  "dich-vu-khac": {
    benefits: [
      "Thủ tục trọn gói, nhanh gọn, tiết kiệm tối đa thời gian và chi phí đi lại cho khách hàng",
      "Hỗ trợ chuyên gia nước ngoài trọn gói Work Permit, thẻ tạm trú và thủ tục mã số mã vạch",
      "Đội ngũ chuyên viên chuyên nghiệp, nhiệt tình, bảo mật thông tin tuyệt đối",
    ],
    commitment: "Tận tâm phục vụ, lấy sự hài lòng và an toàn pháp lý của khách hàng làm thước đo thành công.",
  },
  // Giữ lại các key cũ cho tương thích
  "to-tung-dan-su": {
    benefits: [
      "Kinh nghiệm dày dặn trong việc xử lý các vụ án đất đai, thừa kế và tranh chấp hợp đồng",
      "Luôn ưu tiên giải pháp hòa giải để tiết kiệm tối đa thời gian và chi phí cho khách hàng",
      "Theo sát vụ việc đến cùng cho tới khi bản án hoặc quyết định có hiệu lực thi hành",
    ],
    commitment: "Tận tâm, kiên định bảo vệ quyền lợi chính đáng của thân chủ trên nền tảng thượng tôn pháp luật và công lý.",
  },
  "to-tung-hinh-su": {
    benefits: [
      "Phản ứng tức thì, có mặt tại các trại tạm giam, cơ quan điều tra trên toàn quốc",
      "Am hiểu sâu sắc quy chuẩn tố tụng hình sự và tâm lý tội phạm",
      "Bảo mật tuyệt đối danh tính và đời tư của thân chủ cùng gia đình",
    ],
    commitment: "Tất cả vì sự thật khách quan và quyền con người. Kiên quyết chống oan sai và bảo đảm mức án đúng người đúng tội.",
  },
  "to-tung-hanh-chinh": {
    benefits: [
      "Nắm vững hệ thống văn bản pháp luật hành chính và các quy định quản lý nhà nước",
      "Kinh nghiệm xử lý các vụ việc tranh chấp bồi thường đất đai phức tạp",
      "Bản lĩnh vững vàng, kiên quyết bảo vệ lẽ phải trước cơ quan công quyền",
    ],
    commitment: "Đảm bảo quyền bình đẳng trước pháp luật, buộc cơ quan nhà nước thực thi đúng thẩm quyền.",
  },
  "tu-van-dau-tu": {
    benefits: [
      "Tỷ lệ hồ sơ chấp thuận đầu tư thành công nhanh chóng, chuẩn xác quy định pháp luật",
      "Bảo vệ tối đa quyền lợi của nhà đầu tư trước các biến động chính sách và rủi ro tranh chấp",
      "Hỗ trợ song ngữ chuyên nghiệp, am hiểu sâu sắc thực tiễn đầu tư tại Việt Nam",
    ],
    commitment: "Cam kết đồng hành tận tâm, bảo đảm mọi thủ tục đầu tư diễn ra an toàn, đúng tiến độ.",
  },
  "so-huu-tri-tue": {
    benefits: [
      "Đội ngũ luật sư và chuyên gia sở hữu trí tuệ giàu kinh nghiệm xử lý hồ sơ phức tạp",
      "Chiến lược bảo hộ toàn diện, phòng ngừa nguy cơ bị đối thủ đăng ký trước thương hiệu",
      "Quyết liệt bảo vệ quyền lợi thân chủ khi phát sinh hành vi vi phạm, nhái nhãn",
    ],
    commitment: "Cam kết biến tài sản trí tuệ thành lợi thế cạnh tranh bền vững và độc quyền cho doanh nghiệp của bạn.",
  },
  "luat-su-doanh-nghiep": {
    benefits: [
      "Tối ưu chi phí so với việc duy trì phòng pháp chế nội bộ cồng kềnh",
      "Giải pháp tư vấn thực tiễn, sắc bén, đồng hành cùng mục tiêu kinh doanh của doanh nghiệp",
      "Bảo mật tuyệt đối toàn bộ thông tin tài chính và chiến lược kinh doanh",
    ],
    commitment: "Đồng hành sát cánh, bảo vệ tối đa lợi ích của doanh nghiệp trên con đường phát triển bền vững.",
  },
  "tu-van-ke-toan-thue": {
    benefits: [
      "Tránh các khoản phạt chậm nộp và truy thu thuế tiền tỷ do thiếu hiểu biết quy định",
      "Số liệu tài chính minh bạch, sẵn sàng cho việc huy động vốn hoặc đấu thầu",
      "Đội ngũ chuyên gia thuế có hơn 15 năm kinh nghiệm thực chiến đa ngành nghề",
    ],
    commitment: "Bảo đảm tính tuân thủ pháp luật cao nhất, bảo vệ quyền và lợi ích hợp pháp của người nộp thuế.",
  },
};

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

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolvedSlug = SLUG_ALIASES[slug] || slug;
  const service = practiceServices.find((s) => s.slug === resolvedSlug || s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceArticles = usefulArticles.filter(
    (art) => art.serviceSlug === service.slug || art.category === service.title
  );
  const displayArticles =
    serviceArticles.length > 0 ? serviceArticles : usefulArticles.slice(0, 3);

  const whyChoose = serviceWhyChooseMap[service.slug] || serviceWhyChooseMap[slug] || {
    benefits: [
      "Đội ngũ luật sư giỏi, tận tâm, giàu kinh nghiệm thực chiến",
      "Giải pháp pháp lý bảo mật, an toàn và tối ưu chi phí",
      "Thời gian giải quyết nhanh gọn, hiệu quả cao",
    ],
    commitment: "Đồng hành bảo vệ tối đa lợi ích hợp pháp của thân chủ trên tinh thần Đức sáng - Tâm trong - Trí vững.",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <BreadcrumbSchema
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Dịch vụ", url: "/#dich-vu" },
          { name: service.title, url: `/service/${service.slug}/` },
        ]}
      />
      <Header />

      {/* Main Container */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full flex-1">
        {/* Visual Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-[13px] text-slate-500">
            <li>
              <Link href="/" className="hover:text-[#96794F] transition-colors">
                Trang chủ
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <Link href="/#dich-vu" className="hover:text-[#96794F] transition-colors">
                Dịch vụ pháp lý
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li className="text-[#96794F] font-semibold">
              {service.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Content Area (col-lg-9): Clean Title + Rich Overview + Articles Grid */}
          <main className="lg:col-span-9 space-y-8">
            {/* Clean Service Title with Dashed Underline */}
            <div>
              <h1 className="font-serif text-2xl sm:text-[28px] font-bold uppercase tracking-wider text-[#1A1816]">
                {renderNormalAmpersand(service.title)}
              </h1>
              <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                {service.shortDesc}
              </p>
              <div className="border-b border-dashed border-slate-300 mt-4" />
            </div>

            {/* 1. Service Overview & Scope (H2) */}
            {service.overview && (
              <section className="space-y-5 bg-[#FAF6F0]/40 p-6 sm:p-7 border border-slate-200/80">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#96794F]">
                  {renderNormalAmpersand("Giới Thiệu Dịch Vụ & Phạm Vi Pháp Lý")}
                </h2>
                <p className="text-[14.5px] sm:text-[15.5px] text-slate-700 leading-relaxed text-justify">
                  {service.overview}
                </p>

                {service.scope && service.scope.length > 0 && (
                  <div className="pt-2 space-y-3">
                    <h3 className="font-serif text-base font-bold text-[#1A1816]">
                      Các công việc trọng tâm do Luật Hải Minh Quân thực hiện:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.scope.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3 bg-white border border-slate-200/70 text-xs sm:text-[13px] text-slate-700 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#96794F] mt-2 shrink-0" />
                          <span>{renderNormalAmpersand(item)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* 2. Process (H2) */}
            {service.process && service.process.length > 0 && (
              <section className="space-y-4 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1816]">
                  Quy Trình Cung Cấp Dịch Vụ Chuyên Nghiệp
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.process.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white border border-slate-200/80 shadow-xs space-y-2 hover:border-[#96794F]/60 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-serif text-xl font-bold text-[#96794F]">
                          {p.step}
                        </span>
                        <h3 className="font-serif text-sm sm:text-base font-bold text-[#1A1816]">
                          {renderNormalAmpersand(p.title)}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. Articles Section (H2) */}
            <section className="space-y-5 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1816]">
                {renderNormalAmpersand("Cẩm Nang & Hướng Dẫn Pháp Lý")}
              </h2>

              {/* Real-time Dynamic Articles Grid with fallback */}
              <ServiceArticlesLive
                serviceSlug={service.slug}
                serviceTitle={service.title}
                initialArticles={displayArticles}
              />
            </section>

            {/* 4. Why Choose Us (H2) */}
            <section className="space-y-5 pt-8 border-t border-slate-200">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1816] flex items-center gap-2.5">
                <Sparkles className="w-6 h-6 text-[#DFBA73]" />
                <span>Tại Sao Khách Hàng Tin Chọn Luật Hải Minh Quân?</span>
              </h2>
              <div className="space-y-3">
                {whyChoose.benefits.map((b, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 bg-gradient-to-r from-amber-50/60 to-transparent border-l-4 border-[#DFBA73]"
                  >
                    <Award className="w-5 h-5 text-[#96794F] shrink-0" />
                    <span className="text-sm font-medium text-slate-800">{b}</span>
                  </div>
                ))}
              </div>

              {/* Quote block */}
              <div className="p-5 bg-slate-50 border-l-4 border-[#96794F] text-sm text-slate-700 italic">
                &ldquo;{whyChoose.commitment}&rdquo;
              </div>
            </section>

            {/* 5. CTA Callout Banner (H3 inside) */}
            <div className="p-8 sm:p-10 bg-[#26211C] border border-[#DFBA73]/30 text-white rounded-none shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  Cần Tư Vấn Về {service.title}?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Liên hệ ngay với Luật sư của chúng tôi để nhận giải pháp pháp lý tối ưu nhất.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 shrink-0">
                <a
                  href={`tel:${firmInfo.phoneRaw}`}
                  className="px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-[0.98] text-[#14130F] font-bold text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(150,121,79,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>HOTLINE: {firmInfo.hotline}</span>
                </a>
                <a
                  href={`tel:${firmInfo.secondaryPhoneRaw}`}
                  className="px-6 sm:px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white border border-[#DFBA73]/50 hover:border-[#DFBA73] font-bold text-xs uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>HOTLINE: {firmInfo.secondaryPhone}</span>
                </a>
              </div>
            </div>
          </main>

          {/* Sidebar (col-lg-3): Services Navigation & Quick Contact */}
          <aside className="lg:col-span-3">
            {/* Services List Navigation Widget (Sticky fixed when scrolling) */}
            <div className="sticky top-24 z-10 bg-white p-5 border border-slate-200/90 shadow-sm max-h-[calc(100vh-7.5rem)] overflow-y-auto">
              <h3 className="font-serif text-base font-bold text-[#1A1816] mb-3 pb-2 border-b-2 border-[#96794F] uppercase tracking-wide">
                Danh Mục Dịch Vụ
              </h3>
              <ul className="space-y-1 text-[13px]">
                {allNavigationServices.map((svc, idx) => {
                  const isActive = svc.href.includes(service.slug) || svc.title === service.title;
                  return (
                    <li key={idx}>
                      <Link
                        href={svc.href}
                        className={`flex items-center justify-between px-3 py-2 transition-all duration-200 ${
                          isActive
                            ? "bg-[#96794F] text-white font-bold"
                            : "text-slate-700 hover:text-[#96794F] hover:bg-slate-50 border-b border-slate-100"
                        }`}
                      >
                        <span className="line-clamp-1">{renderNormalAmpersand(svc.title)}</span>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "opacity-60"}`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Quick Hotline Card */}
              <div className="mt-6 p-5 bg-[#26211C] text-white text-center space-y-3 rounded-none border border-[#DFBA73]/30 shadow-md">
                <div className="w-10 h-10 rounded-full border border-[#DFBA73]/50 mx-auto flex items-center justify-center bg-[#DFBA73]/10">
                  <Scale className="w-5 h-5 text-[#DFBA73]" />
                </div>
                <h4 className="font-serif text-base font-bold">
                  Tư Vấn Trực Tiếp 24/7
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Đội ngũ Luật sư uy tín sẵn sàng hỗ trợ giải đáp mọi vướng mắc pháp lý.
                </p>
                <a
                  href={`tel:${firmInfo.phoneRaw}`}
                  className="block w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-[0.98] text-[#14130F] font-bold text-xs uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
                >
                  Hotline: {firmInfo.hotline}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
      <FloatingContact />
    </div>
  );
}
