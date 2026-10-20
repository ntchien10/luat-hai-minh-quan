import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Calendar,
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

export async function generateStaticParams() {
  return practiceServices.map((service) => ({
    slug: service.slug,
  }));
}

import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = practiceServices.find((s) => s.slug === slug);
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
  "tu-van-luat-doanh-nghiep": {
    benefits: [
      "Đội ngũ luật sư có hơn 10 năm kinh nghiệm đồng hành cùng các tập đoàn lớn",
      "Giải pháp tư vấn sát với thực tiễn kinh doanh, không lý thuyết suông",
      "Bảo mật tuyệt đối thông tin tài chính, chiến lược của doanh nghiệp",
    ],
    commitment: "Cam kết đồng hành bảo vệ tối đa lợi ích hợp pháp của doanh nghiệp, biến pháp luật thành lá chắn vững chắc cho mọi hoạt động kinh doanh.",
  },
  "thu-hoi-no": {
    benefits: [
      "Tuân thủ pháp luật 100%, bảo vệ uy tín và danh dự cho khách hàng",
      "Tối ưu chi phí, phí dịch vụ linh hoạt theo tỷ lệ thu hồi thành công",
      "Tác phong quyết liệt, chuyên nghiệp và bảo mật thông tin tối đa",
    ],
    commitment: "Không sử dụng biện pháp trái luật. Áp dụng toàn diện các đòn bẩy pháp lý để thu hồi tối đa công nợ trong thời gian ngắn nhất.",
  },
  "hop-dong": {
    benefits: [
      "Ngôn từ pháp lý chuẩn xác, rõ ràng, không mập mờ tạo kẽ hở",
      "Cân bằng hài hòa giữa việc bảo vệ lợi ích và việc giữ gìn mối quan hệ đối tác",
      "Thời gian xử lý nhanh chóng, đáp ứng kịp thời tiến độ giao kết thương mại",
    ],
    commitment: "Triệt tiêu rủi ro pháp lý từ khâu soạn thảo, đảm bảo hợp đồng có hiệu lực pháp lý cao nhất và dễ dàng thực thi.",
  },
  "to-tung-dan-su": {
    benefits: [
      "Kinh nghiệm dày dặn trong việc xử lý các vụ án đất đai, thừa kế và hôn nhân gia đình phức tạp",
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
    commitment: "Đảm bảo quyền bình đẳng trước pháp luật, buộc cơ quan nhà nước thực thi đúng thẩm quyền và bồi thường thiệt hại do quyết định trái luật gây ra.",
  },
  "luat-su-rieng": {
    benefits: [
      "Sự tận tâm, đồng hành kín đáo và bảo mật thông tin gia đình tuyệt đối",
      "Thời gian phục vụ linh hoạt 24/7, luôn có mặt khi thân chủ cần",
      "Giúp thân chủ tự tin đưa ra các quyết định đầu tư và kinh doanh an toàn",
    ],
    commitment: "Luôn đặt lợi ích, danh dự và sự an toàn pháp lý của thân chủ cùng gia đình lên hàng đầu trong mọi tình huống.",
  },
  "dai-dien-ngoai-to-tung": {
    benefits: [
      "Tiết kiệm tối đa thời gian và công sức đi lại cho khách hàng",
      "Tận dụng kinh nghiệm đàm phán sắc bén của Luật sư để đạt lợi ích cao nhất",
      "Giữ gìn mối quan hệ làm ăn tốt đẹp giữa các bên, tránh đối đầu tại Tòa án",
    ],
    commitment: "Thực hiện đúng phạm vi ủy quyền, bảo mật thông tin và luôn nỗ lực vì lợi ích cao nhất của khách hàng.",
  },
  "cac-dich-vu-khac": {
    benefits: [
      "Dịch vụ trọn gói, thủ tục nhanh gọn, không phát sinh chi phí ẩn",
      "Tỷ lệ hồ sơ được phê duyệt thành công ngay từ lần đầu tiên đạt trên 98%",
      "Đội ngũ chuyên viên chuyên nghiệp, nhiệt tình và chu đáo",
    ],
    commitment: "Cam kết hoàn thành công việc đúng tiến độ đã thỏa thuận, mang lại sự thuận tiện và an tâm tuyệt đối.",
  },
  "tu-van-dau-tu": {
    benefits: [
      "Tỷ lệ hồ sơ chấp thuận đầu tư thành công nhanh chóng, chuẩn xác quy định pháp luật",
      "Bảo vệ tối đa quyền lợi của nhà đầu tư trước các biến động chính sách và rủi ro tranh chấp",
      "Hỗ trợ song ngữ chuyên nghiệp, am hiểu sâu sắc thực tiễn đầu tư tại Việt Nam",
    ],
    commitment: "Cam kết đồng hành tận tâm, bảo đảm mọi thủ tục đầu tư diễn ra an toàn, đúng tiến độ và tối ưu hóa chi phí cho nhà đầu tư.",
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
      "Số liệu tài chính minh bạch, sẵn sàng cho việc huy động vốn, đấu thầu dự án hoặc gọi vốn đầu tư",
      "Đội ngũ chuyên gia thuế có hơn 15 năm kinh nghiệm thực chiến đa ngành nghề",
    ],
    commitment: "Bảo đảm tính tuân thủ pháp luật cao nhất, bảo vệ quyền và lợi ích hợp pháp của người nộp thuế.",
  },
  "dich-vu-khac": {
    benefits: [
      "Thủ tục trọn gói, nhanh gọn, tiết kiệm tối đa thời gian và chi phí đi lại cho khách hàng",
      "Tận tâm, chu đáo, bảo mật thông tin tuyệt đối trong mọi vụ việc",
      "Hỗ trợ khách hàng trên toàn quốc và người Việt Nam định cư ở nước ngoài",
    ],
    commitment: "Tận tâm phục vụ, lấy sự hài lòng và an toàn pháp lý của khách hàng làm thước đo thành công.",
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
  const service = practiceServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceArticles = usefulArticles.filter(
    (art) => art.serviceSlug === service.slug || art.category === service.title
  );
  const displayArticles =
    serviceArticles.length > 0 ? serviceArticles : usefulArticles.slice(0, 3);

  const whyChoose = serviceWhyChooseMap[slug] || {
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

              {/* Articles Grid (3 Columns on Desktop, 1 on Mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayArticles.map((art) => (
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
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <h3 className="font-serif text-[15px] sm:text-[16px] font-bold text-[#1A1816] group-hover:text-[#96794F] transition-colors line-clamp-2 leading-snug">
                          {renderNormalAmpersand(art.title)}
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
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {displayArticles.length === 0 && (
                <div className="p-10 text-center bg-slate-50 border border-slate-200 text-slate-500 space-y-2">
                  <p className="font-serif text-lg font-bold text-[#1A1816]">Nội dung đang được cập nhật</p>
                  <p className="text-sm">Vui lòng liên hệ Hotline <strong>{firmInfo.hotline}</strong> để được các Luật sư tư vấn trực tiếp.</p>
                </div>
              )}
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
