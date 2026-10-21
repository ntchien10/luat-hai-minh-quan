"use client";

import React from "react";
import { motion } from "framer-motion";
import { firmInfo } from "@/data/mockData";

export const AchievementsSection: React.FC = () => {
  const counterItems = [
    { value: firmInfo.counters.dossiers, label: "Hồ sơ", isGold: true },
    { value: firmInfo.counters.clients, label: "Khách hàng", isGold: false },
    { value: firmInfo.counters.branches, label: "Phạm vi hoạt động", isGold: true },
    { value: firmInfo.counters.staff, label: "Nhân sự", isGold: false },
  ];

  return (
    <section className="py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: Heading + Mission + Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left Column (6 cols): Title */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-2"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-[#96794F]">
              Thành tựu
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1A1816] leading-tight">
              {firmInfo.achievementsHeading}
            </h2>
            <div className="h-gap">
              <span>
                <i /> <i /> <i /> <i />
              </span>
            </div>
          </motion.div>

          {/* Middle Column (3 cols): Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 pt-2"
          >
            <p className="text-slate-700 text-[14px] leading-relaxed text-justify">
              Sứ mệnh của Công ty Luật TNHH{" "}
              <span translate="no" className="notranslate">
                Hải Minh Quân
              </span>{" "}
              là bảo vệ quyền và lợi ích hợp pháp của khách hàng với phương châm Đức Sáng - Tâm Trong - Trí Vững.
            </p>
          </motion.div>

          {/* Right Column (3 cols): Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 pt-2"
          >
            <p className="text-slate-700 text-[14px] leading-relaxed text-justify">
              {firmInfo.vision}
            </p>
          </motion.div>
        </div>

        {/* 4 Counter Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {counterItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`py-10 px-6 rounded-none flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 ${
                item.isGold
                  ? "bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] text-[#14130F] shadow-[0_4px_14px_rgba(150,121,79,0.35)] hover:shadow-[0_8px_20px_rgba(150,121,79,0.5)]"
                  : "bg-[#26211C] text-white shadow-[0_4px_14px_rgba(38,33,28,0.35)] hover:shadow-[0_8px_20px_rgba(38,33,28,0.5)]"
              }`}
            >
              <span className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 tracking-tight">
                {item.value}
              </span>
              <h3 className="font-serif text-sm sm:text-base lg:text-lg font-semibold">
                {item.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
