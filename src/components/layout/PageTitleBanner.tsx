"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { formatAmpersand } from "@/components/ui/Ampersand";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageTitleBannerProps {
  title: string;
  subTitleCite?: string;
  breadcrumbs: BreadcrumbItem[];
}

export const PageTitleBanner: React.FC<PageTitleBannerProps> = ({
  title,
  subTitleCite,
  breadcrumbs,
}) => {
  return (
    <div
      id="pagetitle"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#26211C] text-center overflow-hidden"
    >
      {/* Background Image with dark overlay matching Lawsight theme */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/bg-page-title.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#14130F]/85 via-[#26211C]/80 to-[#1A1714]/90" />

      {/* Content */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          {formatAmpersand(title)}{" "}
          {subTitleCite && (
            <cite className="font-normal italic text-slate-200">
              {formatAmpersand(subTitleCite)}
            </cite>
          )}
        </h1>

        {/* Breadcrumb list matching .ct-breadcrumb */}
        <nav aria-label="Breadcrumb" className="mt-4">
          <ul className="flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-slate-200">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={index} className="flex items-center gap-2">
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">
                      {item.label}
                    </span>
                  )}
                  {!isLast && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
