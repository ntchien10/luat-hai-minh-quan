"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { allNavigationServices, firmInfo, footerGalleryImages } from "@/data/mockData";
import { formatAmpersand } from "@/components/ui/Ampersand";

export const Footer: React.FC = () => {
  return (
    <footer id="lien-he" className="bg-[#26211C] text-slate-300 text-[14px] border-t border-white/10 overflow-hidden">
      {/* Main Footer Container */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1 (5 cols): Office Contact info with White Scales Logo from luatvanbao.com */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Official Brand Logo (Bấm vào sẽ tải lại trang) */}
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/";
              }}
              className="flex items-center gap-3.5 group cursor-pointer inline-flex"
            >
              <div className="w-14 h-14 rounded-full bg-white p-1 shrink-0 shadow-lg border border-[#D4AF37]/40 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Công ty Luật TNHH Hải Minh Quân"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain p-0.5 rounded-full"
                />
              </div>
              <div>
                <span
                  translate="no"
                  className="notranslate block font-serif text-[11px] font-semibold text-[#D4AF37] tracking-widest uppercase"
                >
                  CÔNG TY LUẬT TNHH
                </span>
                <span
                  translate="no"
                  className="notranslate block font-serif text-xl font-bold text-white tracking-wider group-hover:text-[#D4AF37] transition-colors"
                >
                  HẢI MINH QUÂN
                </span>
                <span className="block text-[11px] text-slate-400 tracking-wider">
                  ĐỨC SÁNG • TÂM TRONG • TRÍ VỮNG
                </span>
              </div>
            </Link>

            <div className="space-y-3 text-slate-300 pt-2 text-[13.5px]">
              <p>
                <strong className="text-white">Điện thoại / Hotline:</strong><br />
                <a
                  href="tel:0967932555"
                  className="text-slate-300 hover:text-[#D4AF37] transition-colors"
                >
                  0967 932 555
                </a>
                {" - "}
                <a
                  href="tel:0924189868"
                  className="text-slate-300 hover:text-[#D4AF37] transition-colors"
                >
                  0924 189 868
                </a>
              </p>

              <p>
                <strong className="text-white">Email:</strong><br />
                <a
                  href={`mailto:${firmInfo.email}`}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {firmInfo.email}
                </a>
              </p>

              <p className="leading-relaxed">
                <strong className="text-white">Trụ sở chính:</strong>{" "}
                <a
                  href={firmInfo.mapUrl || "https://maps.app.goo.gl/CrBtZoPSprZKJRPV6"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-[#D4AF37] hover:underline transition-colors"
                  title="Bấm để mở Google Maps chỉ đường"
                >
                  {firmInfo.hanoiOffice}
                </a>
              </p>

              <p className="leading-relaxed text-[12.5px] text-slate-400 pt-1 border-t border-white/10">
                <strong className="text-white">Đại diện pháp luật:</strong> {firmInfo.director} - {firmInfo.directorRole}
              </p>

              <p className="leading-relaxed text-[12px] text-slate-400">
                <strong className="text-white">Giấy phép ĐKHĐ:</strong> Số {firmInfo.licenseNumber} do Sở Tư pháp TP. Hà Nội cấp
              </p>

              <p className="leading-relaxed text-[12px] text-slate-400">
                <strong className="text-white">Thẻ Luật sư:</strong> {firmInfo.lawyerCard}
              </p>
            </div>
          </motion.div>

          {/* Column 2 (3 cols): Exact "Hình ảnh" widget with 6 gallery photos from luatvanbao.com */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-4"
          >
            <h3 className="font-serif text-lg font-bold text-white tracking-wider mb-4">
              Hình ảnh
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {footerGalleryImages.map((src, idx) => {
                const galleryCaptions = [
                  "Công ty Luật Hải Minh Quân tư vấn pháp lý trực tiếp tại Hà Nội",
                  "Đoàn luật sư tham gia tranh tụng bảo vệ quyền lợi thân chủ",
                  "Hội thảo phổ biến và cập nhật kiến thức pháp luật",
                  "Đội ngũ luật sư nghiên cứu và thẩm định hồ sơ vụ việc",
                  "Văn phòng tư vấn pháp luật Công ty Luật TNHH Hải Minh Quân",
                  "Hoạt động trao đổi và giải quyết tranh chấp pháp lý",
                ];
                return (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-none overflow-hidden border border-white/10 group bg-slate-800"
                  >
                    <Image
                      src={src}
                      alt={galleryCaptions[idx] || `Hoạt động Luật Hải Minh Quân ${idx + 1}`}
                      width={90}
                      height={90}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Column 3 (4 cols): Exact 10 Dịch vụ from luatvanbao.com */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 lg:col-span-4 space-y-4"
          >
            <h3 className="font-serif text-lg font-bold text-white tracking-wider mb-4">
              Dịch vụ
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-[13px]">
              {allNavigationServices.map((svc, idx) => (
                <li key={idx}>
                  <Link
                    href={svc.href}
                    className="hover:text-[#D4AF37] transition-all duration-200 line-clamp-1 flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span className="text-[#DFBA73] group-hover:text-[#F3DEAB] group-hover:scale-125 transition-all">•</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{formatAmpersand(svc.title)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Sub-footer Copyright */}
      <div className="bg-[#1A1714] py-4 border-t border-white/5">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            Copyright © 2026 <strong>{firmInfo.name}</strong>. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <span>Follow us:</span>
            <a
              href={firmInfo.facebookUrl || "https://www.facebook.com/luathaiminhquan.vn"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors"
              aria-label="Facebook Công ty Luật Hải Minh Quân"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
