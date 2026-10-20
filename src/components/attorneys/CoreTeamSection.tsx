"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { teamMembersList } from "@/data/mockData";

export const CoreTeamSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(teamMembersList.length / itemsPerPage);

  const displayedMembers = teamMembersList.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section id="thanh-vien" className="w-full bg-white flex justify-center overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto bg-[#96794F] text-white py-20 lg:py-24">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left-aligned Heading matching exact style of luatvanbao.com */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-left max-w-2xl mb-12"
          >
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-white">
              Thành viên cốt lõi
            </h2>
            <div className="h-gap white mt-2">
              <span>
                <i /> <i /> <i /> <i />
              </span>
            </div>
          </motion.div>

          {/* Members view with white cards & real photos */}
          <div
            className={
              displayedMembers.length === 1
                ? "max-w-sm sm:max-w-md mx-auto"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            }
          >
            {displayedMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={member.link || `/thanh-vien/${member.id}/`}
                  className="group block bg-white rounded-none overflow-hidden shadow-xl transition-all duration-300 relative cursor-pointer"
                >
                  {/* Member Photo 400x400 (FULL COLOR) */}
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Bottom Card: Chuyển đổi thành button "Thông tin liên hệ" khi hover */}
                  <div className="relative h-[82px] w-full overflow-hidden border-t border-slate-100">
                    {/* Default State: Ô thông tin nền trắng */}
                    <div className="absolute inset-0 px-4 py-3.5 bg-white flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                      <h3 className="font-serif text-[15px] font-bold text-[#1A1816] line-clamp-1">
                        {member.name}
                      </h3>
                      <span className="text-xs text-[#96794F] font-medium block mt-0.5 tracking-wide line-clamp-1">
                        {member.role}
                      </span>
                    </div>

                    {/* Hover State: Button nền ấm "{member.name} ───" */}
                    <div className="absolute inset-0 bg-[#7E643E] flex items-center justify-center px-4 transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="text-white text-[13.5px] font-medium tracking-wide flex items-center gap-2.5">
                        <span>{member.name}</span>
                        <span className="inline-block w-6 h-[1.5px] bg-[#DFBA73]" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Carousel pagination dots */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-10">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className="p-2 flex items-center justify-center cursor-pointer"
                  aria-label={`Trang ${idx + 1}`}
                >
                  <span
                    className={`h-2.5 rounded-full transition-all duration-300 block ${
                      currentPage === idx
                        ? "w-7 bg-white"
                        : "w-2.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
