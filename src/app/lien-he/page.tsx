import React from "react";
import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { PageTitleBanner } from "@/components/layout/PageTitleBanner";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { firmInfo } from "@/data/mockData";
import { ContactFormBlock } from "@/components/contact/ContactFormBlock";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Liên Hệ Tư Vấn Luật Sư",
  description:
    "Liên hệ Công ty Luật TNHH Hải Minh Quân để được tư vấn pháp lý nhanh chóng và chính xác. Trụ sở tại Hà Đông, Hà Nội. Hotline trực tuyến 24/7: " +
    firmInfo.phone,
  alternates: {
    canonical: "/lien-he/",
  },
  openGraph: {
    title: "Liên Hệ Tư Vấn Pháp Lý | Luật Hải Minh Quân",
    description:
      "Đặt lịch hẹn tư vấn trực tiếp với Luật sư giàu kinh nghiệm tại Hà Nội hoặc gửi yêu cầu tư vấn trực tuyến 24/7.",
    url: "/lien-he",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <BreadcrumbSchema
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Liên hệ", url: "/lien-he" },
        ]}
      />
      <Header />

      {/* Page Title Banner */}
      <PageTitleBanner
        title="Liên hệ"
        subTitleCite="với chúng tôi"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Liên hệ" },
        ]}
      />

      <main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full flex-1">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Card 1 */}
          <div className="p-8 border border-slate-200/90 bg-white text-center rounded-none shadow-sm space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FAF6F0] text-[#96794F] flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1816]">Hotline</h3>
            <p className="text-sm text-slate-600 font-semibold space-x-1">
              <a href="tel:0967932555" className="hover:text-[#96794F]">
                0967 932 555
              </a>
              <span>-</span>
              <a href="tel:0924189868" className="hover:text-[#96794F]">
                0924 189 868
              </a>
            </p>
            <span className="text-xs text-slate-400 block">Hỗ trợ 24/7 kể cả ngày lễ</span>
          </div>

          {/* Card 2 */}
          <div className="p-8 border border-slate-200/90 bg-white text-center rounded-none shadow-sm space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FAF6F0] text-[#96794F] flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1816]">Email</h3>
            <p className="text-sm text-slate-600">
              <a href={`mailto:${firmInfo.email}`} className="hover:text-[#96794F]">
                {firmInfo.email}
              </a>
            </p>
            <span className="text-xs text-slate-400 block">Phản hồi trong 2 giờ</span>
          </div>

          {/* Card 3 */}
          <div className="p-8 border border-slate-200/90 bg-white text-center rounded-none shadow-sm space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FAF6F0] text-[#96794F] flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1816]">Trụ sở Hà Nội</h3>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              {firmInfo.hanoiOffice}
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 border border-slate-200/90 bg-white text-center rounded-none shadow-sm space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FAF6F0] text-[#96794F] flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1816]">Giờ làm việc</h3>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Thứ 2 - Thứ 6: 08:00 - 17:30<br />
              Thứ 7: 08:30 - 12:00
            </p>
          </div>
        </div>

        {/* Two Column: Form + Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Form */}
          <ContactFormBlock />

          {/* Google Map */}
          <div className="lg:col-span-6 border border-slate-200/90 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <h3 className="font-serif text-lg font-bold text-[#1A1816]">
                Vị Trí Văn Phòng Trên Bản Đồ
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Khu đất dịch vụ Dọc Bún 1, Phường La Khê / Hà Đông, Hà Nội
              </p>
            </div>
            <div className="flex-1 min-h-[360px] relative">
              <iframe
                title="Bản đồ chỉ đường đến Công ty Luật TNHH Hải Minh Quân"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.7533923485747!2d105.76008137596827!3d20.962410389047975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134532729a67839%3A0xe51bbab73554620f!2zROG7jWMgQsO6biAxLCBMYSBLaMOqLCBIw6AgxJDDtG5nLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1710500000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}
