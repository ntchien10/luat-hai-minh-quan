"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  UserCheck,
  FileCheck,
  Scale,
  ShieldAlert,
  Building2,
  Coins,
  HeartHandshake,
  Award,
  TrendingUp,
  Calculator,
} from "lucide-react";
import { practiceServices } from "@/data/mockData";
import { formatAmpersand } from "@/components/ui/Ampersand";

export const PracticeAreas: React.FC = () => {
  const getServiceIcon = (name: string) => {
    const iconClass = "w-8 h-8 sm:w-9 sm:h-9 text-[#96794F] transition-transform duration-300";
    switch (name) {
      case "Scale":
        return <Scale className={iconClass} strokeWidth={1.5} />;
      case "ShieldAlert":
        return <ShieldAlert className={iconClass} strokeWidth={1.5} />;
      case "Building2":
        return <Building2 className={iconClass} strokeWidth={1.5} />;
      case "TrendingUp":
        return <TrendingUp className={iconClass} strokeWidth={1.5} />;
      case "Award":
        return <Award className={iconClass} strokeWidth={1.5} />;
      case "Briefcase":
        return <Briefcase className={iconClass} strokeWidth={1.5} />;
      case "Calculator":
        return <Calculator className={iconClass} strokeWidth={1.5} />;
      case "HeartHandshake":
        return <HeartHandshake className={iconClass} strokeWidth={1.5} />;
      default:
        return <Scale className={iconClass} strokeWidth={1.5} />;
    }
  };

  return (
    <section id="dich-vu" className="py-10 lg:py-14 bg-white overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Exact Heading on 1 single line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-5xl mx-auto mb-7 lg:mb-9"
        >
          <h2 className="font-serif text-lg sm:text-2xl md:text-[26px] lg:text-[28px] xl:text-[31px] font-bold text-[#1A1816] whitespace-normal sm:whitespace-nowrap tracking-tight">
            Chúng tôi ở đây để hỗ trợ bạn mọi vấn đề về Pháp lý
          </h2>
          <div className="h-gap mt-2">
            <span>
              <i /> <i /> <i /> <i />
            </span>
          </div>
        </motion.div>

        {/* 8 Services Grid: 2 rows of 4 cards on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 lg:gap-4">
          {practiceServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: (idx % 4) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden min-h-[165px] sm:min-h-[175px] lg:min-h-[180px] flex flex-col justify-center"
            >
              {/* Default State: Dashed border container matching .grid-item-holder */}
              <div className="w-full h-full border-2 border-dashed border-[#DFBA73]/50 group-hover:border-[#96794F] p-3.5 sm:p-4 text-center flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 bg-[#FCFBF8]">
                <div className="mb-2 flex justify-center drop-shadow-[0_2px_4px_rgba(150,121,79,0.3)]">
                  {getServiceIcon(service.iconName)}
                </div>

                <h3 className="font-serif text-[15px] sm:text-[16px] font-bold text-[#1A1816] mb-1 line-clamp-1 group-hover:text-[#96794F]">
                  {formatAmpersand(service.title)}
                </h3>

                <p className="text-slate-600 text-[11.5px] sm:text-[12px] leading-relaxed max-w-xs mx-auto line-clamp-2">
                  {service.shortDesc}
                </p>
              </div>

              {/* Hover State: Slide-up image overlay with "Consult now" button matching .grid-item-hover */}
              <div className="absolute inset-0 w-full h-full bg-[#191514] overflow-hidden opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out flex flex-col items-center justify-center p-3.5 sm:p-4 text-center">
                {/* Background Image of the service */}
                {service.hoverImage && (
                  <div className="absolute inset-0">
                    <Image
                      src={service.hoverImage}
                      alt={service.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover opacity-35"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 flex flex-col items-center justify-center space-y-1.5">
                  <p className="font-serif text-[15px] sm:text-[16px] font-bold text-white line-clamp-1">
                    {formatAmpersand(service.title)}
                  </p>
                  <p className="text-slate-300 text-[11px] sm:text-[11.5px] max-w-xs line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <Link
                    href={service.href || `/service/${service.slug}/`}
                    aria-label={`Xem chi tiết dịch vụ ${service.title}`}
                    className="mt-1 inline-block px-6 py-2 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-95 text-[#14130F] text-[11px] font-bold uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>

              {/* Direct Touch Link for Mobile & Tablet to avoid requiring hover */}
              <Link
                href={service.href || `/service/${service.slug}/`}
                className="absolute inset-0 z-20 md:hidden"
                aria-label={`Xem dịch vụ ${service.title}`}
              >
                <span className="sr-only">Xem chi tiết dịch vụ {service.title}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
