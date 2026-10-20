import React from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { PracticeAreas } from "@/components/practice-areas/PracticeAreas";
import { CoreTeamSection } from "@/components/attorneys/CoreTeamSection";
import { LegalNewsSection } from "@/components/news/LegalNewsSection";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      {/* 1. Header chính nền trắng: Menu chuẩn 1:1 theo luatvanbao.com */}
      <Header />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Section About us */}
        <AboutSection />

        {/* 4. Section Dịch vụ */}
        <PracticeAreas />

        {/* 5. Section Thành viên cốt lõi */}
        <CoreTeamSection />

        {/* 6. Section Chia sẻ hữu ích */}
        <LegalNewsSection />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Nút gọi nhanh hotline khẩn cấp & Back to top */}
      <FloatingContact />
    </div>
  );
}
