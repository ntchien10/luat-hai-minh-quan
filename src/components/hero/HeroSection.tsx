"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { firmInfo } from "@/data/mockData";

export const HeroSection: React.FC = () => {

  return (
    <div className="relative w-full">
      {/* ─── HERO BANNER SECTION (FULL WIDTH Ở 100%, GIỚI HẠN MAX 1920PX KHI ZOOM NHỎ/MÀN SIÊU RỘNG) ─── */}
      <section className="w-full bg-white flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[1920px] mx-auto h-[calc(100vh-76px)] sm:h-[calc(100vh-80px)] lg:h-[calc(100vh-84px)] min-h-[480px] max-h-[850px] flex items-center overflow-hidden bg-[#111111]">
          {/* Real Background with Lady Justice statue and flowing 3D Gold Ribbons */}
          <div
            className="absolute inset-0 bg-cover bg-right md:bg-center bg-no-repeat pointer-events-none z-0"
            style={{
              backgroundImage: "url('/images/bg-hero-gold.jpg')",
            }}
          />

          {/* Mobile Gradient Overlay to keep text legible while showing the statue on the right */}
          <div className="md:hidden absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none z-0" />

          {/* ════════ LAWYER CUTOUT PINNED TO BOTTOM WITH 0 GAP (DESKTOP & TABLET) ════════ */}
          <div
            className="hidden md:flex absolute bottom-0 z-10 h-[78%] sm:h-[82%] lg:h-[86%] max-h-[620px] aspect-[934/983] pointer-events-none items-end"
            style={{
              left: "max(1.5rem, calc((100% - 1320px) / 2 + 1.5rem))",
            }}
          >
            <motion.div
              initial={{ x: -140, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/lawyer-thanh-hai-hero.webp"
                alt="Luật sư Đỗ Thị Thanh Hải - Giám đốc Công ty Luật TNHH Hải Minh Quân"
                width={650}
                height={684}
                priority
                className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
              />
            </motion.div>
          </div>

          {/* Main Content Container (Full Height Flex Center) */}
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
              {/* ════════ LEFT COLUMN SPACER (RESERVES SPACE FOR LAWYER CUTOUT ON MD+) ════════ */}
              <div className="hidden md:block md:col-span-5 lg:col-span-5 pointer-events-none" />

              {/* ════════ RIGHT COLUMN: TEXT & CTA BUTTON (BAY TỪ BÊN PHẢI & DƯỚI) ════════ */}
              <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-center py-6 sm:py-8 md:py-0 md:pl-4 lg:pl-8 xl:pl-12 space-y-4 sm:space-y-5 lg:space-y-6 text-left">
                {/* Tiêu đề H1 (Bay từ bên phải vào) */}
                <motion.h1
                  initial={{ x: 90, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 1.4,
                    delay: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[50px] font-bold text-white leading-[1.22] tracking-tight"
                >
                  <span className="block text-xs sm:text-sm font-sans font-semibold tracking-widest text-[#D4AF37] uppercase mb-1.5 sm:mb-2">
                    CÔNG TY LUẬT TNHH{" "}
                    <span translate="no" className="notranslate">
                      HẢI MINH QUÂN
                    </span>
                  </span>
                  Luật Sư Tư Vấn Pháp Lý <br />
                  Uy Tín Tại Hà Nội <span className="font-sans font-normal text-[0.88em] mx-1">&amp;</span> <span className="whitespace-nowrap">Toàn Quốc</span>
                </motion.h1>

                {/* Đoạn mô tả (Mờ dần / trượt nhẹ từ dưới lên) */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.3,
                    delay: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-slate-200 text-xs sm:text-sm md:text-base lg:text-[16px] leading-relaxed max-w-xl font-normal"
                >
                  Công ty Luật TNHH{" "}
                  <span translate="no" className="notranslate">
                    Hải Minh Quân
                  </span>{" "}
                  là đối tác pháp lý của bạn. <br className="hidden sm:block" />
                  Sứ mệnh của chúng tôi là bảo vệ quyền lợi và cung cấp <br className="hidden sm:block" />
                  giải pháp pháp lý tối ưu cho mọi tình huống.
                </motion.p>

                {/* Nút bấm (Bay từ bên dưới vào) */}
                <motion.div
                  initial={{ y: 55, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.3,
                    delay: 1.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="pt-1 sm:pt-2"
                >
                  <Link
                    href="#lien-he"
                    className="inline-block px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-95 text-[#14130F] text-xs sm:text-[13px] font-bold uppercase tracking-wider shadow-[0_8px_25px_rgba(150,121,79,0.45)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    LIÊN HỆ TƯ VẤN NGAY
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
