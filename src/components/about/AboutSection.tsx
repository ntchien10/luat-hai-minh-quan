"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { firmInfo } from "@/data/mockData";

export const AboutSection: React.FC = () => {
  return (
    <section id="gioi-thieu" className="py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Exact copy & formatting from luatvanbao.com (Bay từ bên trái vào) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-6 space-y-4"
          >
            {/* Sub-heading */}
            <div className="text-xs uppercase font-bold tracking-widest text-[#96794F]">
              About us
            </div>

            {/* Heading 1:1 */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1A1816] leading-tight">
              Dịch Vụ Luật Sư Giỏi Tư Vấn Pháp Luật Uy Tín
            </h2>

            {/* Decorative line */}
            <div className="h-gap">
              <span>
                <i /> <i /> <i /> <i />
              </span>
            </div>

            {/* Đoạn 1: Giới thiệu thương hiệu và sứ mệnh */}
            <p className="text-slate-700 text-[14px] sm:text-[15px] leading-relaxed text-justify">
              <strong>
                Công ty Luật TNHH{" "}
                <span translate="no" className="notranslate">
                  Hải Minh Quân
                </span>
              </strong>{" "}
              là tổ chức hành nghề luật sư uy tín tại Hà Nội và toàn quốc, 
              quy tụ đội ngũ luật sư, chuyên gia pháp lý giàu kinh nghiệm và tận tâm với nghề. Chúng tôi đồng hành cùng cá nhân và doanh 
              nghiệp trong việc phòng ngừa rủi ro, tháo gỡ các vướng mắc pháp lý phức tạp và bảo vệ tối đa quyền, lợi ích hợp pháp 
              của thân chủ theo đúng quy định pháp luật.
            </p>

            {/* Đoạn 2: Năng lực chuyên môn thực chiến & cam kết */}
            <p className="text-slate-700 text-[14px] sm:text-[15px] leading-relaxed text-justify">
              Với phương châm <em>&ldquo;Tận tâm – Bản lĩnh – Bảo mật tuyệt đối&rdquo;</em>,{" "}
              <span translate="no" className="notranslate">
                Hải Minh Quân
              </span>{" "}
              khẳng định thế mạnh vượt trội 
              trong các lĩnh vực: <strong>Tố tụng Dân sự, Hình sự, Hành chính</strong>, <strong>Tư vấn Đầu tư</strong>, 
              <strong>Sở hữu trí tuệ</strong>, <strong>Luật sư Doanh nghiệp</strong> và <strong>Tư vấn Kế toán thuế</strong>. 
              Chúng tôi cam kết mang lại giải pháp pháp lý thực chất, an toàn và tối ưu chi phí cho mọi khách hàng.
            </p>

            {/* Exact Contact prompt */}
            <div className="pt-4 mt-4 border-t border-dashed border-slate-300">
              <p className="text-[15px] text-slate-800">
                Tư vấn trực tiếp:{" "}
                <a
                  href="tel:0967932555"
                  className="text-[#96794F] font-bold text-base hover:underline"
                >
                  0967 932 555
                </a>
                {" - "}
                <a
                  href="tel:0924189868"
                  className="text-[#96794F] font-bold text-base hover:underline"
                >
                  0924 189 868
                </a>
              </p>
            </div>
          </motion.div>

          {/* Right Column: Exact 1.jpg image representation (Bay từ bên phải vào) */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.85,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-none overflow-hidden shadow-lg border border-slate-200">
              <div className="relative h-[440px] sm:h-[480px] w-full bg-slate-100">
                <Image
                  src="/images/about/about-court.jpg"
                  alt="Dịch Vụ Luật Sư Giỏi Tư Vấn Pháp Luật Uy Tín"
                  width={900}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
