"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { pressItems } from "@/data/mockData";

export const PressSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Exact Heading from luatvanbao.com */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1816]">
            Báo chí nói gì về Luật{" "}
            <span translate="no" className="notranslate">
              Hải Minh Quân
            </span>
          </h2>
          <div className="h-gap">
            <span>
              <i /> <i /> <i /> <i />
            </span>
          </div>
        </motion.div>

        {/* Clean row of 5-6 full-color press logos directly on white background without box outlines */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-14">
          {pressItems.slice(0, 5).map((item, idx) => (
            <motion.a
              key={item.id}
              href={item.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center justify-center transition-transform hover:scale-105 duration-200"
              title={item.articleTitle}
            >
              <div className="w-36 sm:w-44 lg:w-48 h-12 sm:h-14 flex items-center justify-center">
                <Image
                  src={item.logoUrl}
                  alt={item.name}
                  width={192}
                  height={56}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
