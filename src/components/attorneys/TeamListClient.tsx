"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLiveTeam } from "@/lib/useLiveTeam";

export function TeamListClient() {
  const { members } = useLiveTeam();

  return (
    <div
      className={
        members.length === 1
          ? "max-w-sm sm:max-w-md mx-auto"
          : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      }
    >
      {members.map((member) => (
        <Link
          key={member.id}
          href={member.link || `/thanh-vien/${member.id}/`}
          className="group block bg-white border border-slate-200/90 rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative cursor-pointer"
        >
          {/* Photo */}
          <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
            <Image
              src={member.imageUrl}
              alt={member.name}
              width={400}
              height={400}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          </div>

          {/* Bottom Card with Hover Button */}
          <div className="relative h-[84px] w-full overflow-hidden border-t border-slate-100">
            {/* Default State */}
            <div className="absolute inset-0 px-4 py-3 bg-white flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
              <h3 className="font-serif text-[15px] font-bold text-[#1A1816] line-clamp-1">
                {member.name}
              </h3>
              <span className="text-xs text-[#96794F] font-medium block mt-0.5 tracking-wide line-clamp-1">
                {member.role}
              </span>
            </div>

            {/* Hover State: Contact info button */}
            <div className="absolute inset-0 bg-[#7E643E] flex items-center justify-center px-4 transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
              <span className="text-white text-[13.5px] font-medium tracking-wide flex items-center gap-2.5">
                <span>{member.name}</span>
                <span className="inline-block w-6 h-[1.5px] bg-[#DFBA73]" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
