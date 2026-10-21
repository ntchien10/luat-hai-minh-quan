"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Search,
  Menu,
  X,
  Phone,
  LogIn,
  MapPin,
  Mail,
} from "lucide-react";
import {
  allNavigationServices,
  firmInfo,
  usefulArticles,
  teamMembersList,
} from "@/data/mockData";
import { formatAmpersand } from "@/components/ui/Ampersand";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

// 4 Cờ ngôn ngữ dạng SVG sắc nét chuẩn quốc tế
function FlagUK() {
  return (
    <svg viewBox="0 0 60 30" className="w-full h-full object-cover block">
      <clipPath id="uk-clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="uk-t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function FlagJapan() {
  return (
    <svg viewBox="0 0 60 40" className="w-full h-full object-cover block">
      <rect width="60" height="40" fill="#ffffff" />
      <circle cx="30" cy="20" r="12" fill="#bc002d" />
    </svg>
  );
}

function FlagKorea() {
  return (
    <svg viewBox="0 0 60 40" className="w-full h-full object-cover block">
      <rect width="60" height="40" fill="#ffffff" />
      <g transform="translate(30 20)">
        <path d="M0,-11 A11,11 0 0,1 0,11 A5.5,5.5 0 0,0 0,0 A5.5,5.5 0 0,1 0,-11" fill="#cd2e3a" />
        <path d="M0,11 A11,11 0 0,1 0,-11 A5.5,5.5 0 0,0 0,0 A5.5,5.5 0 0,1 0,11" fill="#0047a0" />
      </g>
      <g transform="translate(13 10) rotate(33)">
        <rect x="-6" y="-3.5" width="12" height="1.5" fill="#000" />
        <rect x="-6" y="-0.5" width="12" height="1.5" fill="#000" />
        <rect x="-6" y="2.5" width="12" height="1.5" fill="#000" />
      </g>
      <g transform="translate(47 30) rotate(33)">
        <rect x="-6" y="-3.5" width="5.2" height="1.5" fill="#000" />
        <rect x="0.8" y="-3.5" width="5.2" height="1.5" fill="#000" />
        <rect x="-6" y="-0.5" width="5.2" height="1.5" fill="#000" />
        <rect x="0.8" y="-0.5" width="5.2" height="1.5" fill="#000" />
        <rect x="-6" y="2.5" width="5.2" height="1.5" fill="#000" />
        <rect x="0.8" y="2.5" width="5.2" height="1.5" fill="#000" />
      </g>
      <g transform="translate(47 10) rotate(-33)">
        <rect x="-6" y="-3.5" width="5.2" height="1.5" fill="#000" />
        <rect x="0.8" y="-3.5" width="5.2" height="1.5" fill="#000" />
        <rect x="-6" y="-0.5" width="12" height="1.5" fill="#000" />
        <rect x="-6" y="2.5" width="5.2" height="1.5" fill="#000" />
        <rect x="0.8" y="2.5" width="5.2" height="1.5" fill="#000" />
      </g>
      <g transform="translate(13 30) rotate(-33)">
        <rect x="-6" y="-3.5" width="12" height="1.5" fill="#000" />
        <rect x="-6" y="-0.5" width="5.2" height="1.5" fill="#000" />
        <rect x="0.8" y="-0.5" width="5.2" height="1.5" fill="#000" />
        <rect x="-6" y="2.5" width="12" height="1.5" fill="#000" />
      </g>
    </svg>
  );
}

function FlagVietnam() {
  return (
    <svg viewBox="0 0 60 40" className="w-full h-full object-cover block">
      <rect width="60" height="40" fill="#da251d" />
      <polygon
        points="30,8 33.7,19.4 45.7,19.4 36,26.4 39.7,37.8 30,30.8 20.3,37.8 24,26.4 14.3,19.4 26.3,19.4"
        fill="#ffff00"
      />
    </svg>
  );
}

export const Header: React.FC = () => {
  const pathname = usePathname() || "";
  const isHomeActive = pathname === "/";
  const isServicesActive = pathname.startsWith("/service");
  const isBlogActive = pathname.startsWith("/blog");
  const isAboutActive = pathname.startsWith("/thanh-vien") || pathname.startsWith("/gioi-thieu");
  const isContactActive = pathname.startsWith("/lien-he");

  const [isSticky, setIsSticky] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchResults = React.useMemo(() => {
    if (!normalizedQuery) return null;

    const matchedServices = allNavigationServices.filter(
      (s) => s.title.toLowerCase().includes(normalizedQuery)
    );

    const matchedArticles = usefulArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(normalizedQuery) ||
        (a.excerpt && a.excerpt.toLowerCase().includes(normalizedQuery))
    );

    const matchedAttorneys = teamMembersList.filter(
      (m) =>
        m.name.toLowerCase().includes(normalizedQuery) ||
        m.role.toLowerCase().includes(normalizedQuery) ||
        (m.bio && m.bio.toLowerCase().includes(normalizedQuery))
    );

    const totalCount =
      matchedServices.length + matchedArticles.length + matchedAttorneys.length;

    return {
      services: matchedServices,
      articles: matchedArticles,
      attorneys: matchedAttorneys,
      totalCount,
    };
  }, [normalizedQuery]);

  const servicesTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const aboutTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    setAboutOpen(false);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 350);
  };

  const handleAboutEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(false);
    setAboutOpen(true);
  };

  const handleAboutLeave = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutOpen(false);
    }, 350);
  };

  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    };
  }, []);

  // Khởi tạo ngôn ngữ ngay từ attribute data-lang (đã được sync script trong <head> gán trước đó),
  // hoặc localStorage / cookie để TUYỆT ĐỐI KHÔNG BỊ NHẢY cờ Việt Nam
  const [currentLang, setCurrentLang] = useState<"vi" | "en" | "ja" | "ko">(() => {
    if (typeof document !== "undefined") {
      const docLang = document.documentElement.getAttribute("data-lang") as "vi" | "en" | "ja" | "ko";
      if (docLang && ["vi", "en", "ja", "ko"].includes(docLang)) {
        return docLang;
      }
    }
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("selected_lang") as "vi" | "en" | "ja" | "ko";
        if (saved && ["vi", "en", "ja", "ko"].includes(saved)) {
          return saved;
        }
        const m = document.cookie.match(/(?:^|;\s*)googtrans=\/(?:vi|auto)\/([a-z]+)/);
        if (m && m[1] && ["vi", "en", "ja", "ko"].includes(m[1])) {
          return m[1] as "vi" | "en" | "ja" | "ko";
        }
      } catch (e) {}
    }
    return "vi";
  });

  // Hàm kích hoạt dịch tự động của Google Translate với cơ chế thử lại nếu script đang load
  const triggerGoogleTranslate = (langCode: "vi" | "en" | "ja" | "ko", retries = 25) => {
    if (typeof document === "undefined") return;
    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo) {
      const targetVal = langCode === "vi" ? "" : langCode;
      combo.value = targetVal;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
      combo.dispatchEvent(new Event("input", { bubbles: true }));
    } else if (retries > 0) {
      setTimeout(() => triggerGoogleTranslate(langCode, retries - 1), 150);
    }
  };

  useEffect(() => {
    // Tải Google Translate script an toàn
    if (typeof window !== "undefined" && !document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "vi",
              includedLanguages: "en,ja,ko,vi",
              autoDisplay: false,
            },
            "google_translate_element"
          );
          // Nếu người dùng đã chọn ngôn ngữ khác tiếng Việt từ trước, kích hoạt ngay khi Google Translate sẵn sàng
          const saved = (localStorage.getItem("selected_lang") || "vi") as "vi" | "en" | "ja" | "ko";
          if (saved !== "vi") {
            setTimeout(() => triggerGoogleTranslate(saved), 150);
          }
        }
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSelectLanguage = (langCode: "vi" | "en" | "ja" | "ko") => {
    setCurrentLang(langCode);
    if (typeof window === "undefined") return;

    // Cập nhật ngay lập tức data-lang trên thẻ html để CSS kích hoạt cờ tức thì 0ms, không giật
    document.documentElement.setAttribute("data-lang", langCode);
    try {
      localStorage.setItem("selected_lang", langCode);
    } catch (e) {}

    const host = window.location.hostname;

    if (langCode === "vi") {
      // Xóa sạch cookie googtrans để trở về tiếng Việt gốc
      const domains = ["", host];
      if (!host.includes("localhost") && !host.includes("127.0.0.1")) {
        domains.push(`.${host}`);
      }
      domains.forEach((d) => {
        const domainStr = d ? `; domain=${d}` : "";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${domainStr}`;
      });

      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (combo) {
        combo.value = "";
        combo.dispatchEvent(new Event("change", { bubbles: true }));
        combo.dispatchEvent(new Event("input", { bubbles: true }));
      }
      // Reload nhanh để trả lại văn bản gốc tiếng Việt nguyên bản 100% sạch sẽ
      setTimeout(() => window.location.reload(), 150);
      return;
    }

    // Ghi cookie cho cả /vi/ và /auto/ để Google Translate nhận diện mọi trường hợp
    const domains = ["", host];
    if (!host.includes("localhost") && !host.includes("127.0.0.1")) {
      domains.push(`.${host}`);
    }
    domains.forEach((d) => {
      const domainStr = d ? `; domain=${d}` : "";
      document.cookie = `googtrans=/vi/${langCode}; path=/${domainStr}`;
      document.cookie = `googtrans=/auto/${langCode}; path=/${domainStr}`;
    });

    // Kích hoạt dịch trực tiếp trên trang
    triggerGoogleTranslate(langCode);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 38);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* TOPBAR (Thanh thông tin đầu trang - Dark Forest Green #0E3A24 chuẩn thương hiệu - Cuộn tự nhiên theo trang, KHÔNG CỐ ĐỊNH) */}
      <div
        id="topbar-info"
        className="w-full bg-[#0E3A24] text-white text-xs font-medium py-2 border-b border-white/10 shadow-xs relative z-30"
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Bên trái: Địa chỉ (Hyperlink Google Maps) | Email | Hotline */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 text-slate-200 text-[11px] sm:text-[12px] lg:text-[12.5px] truncate">
            {/* Địa chỉ - Click mở Google Maps chỉ đường trực tiếp */}
            <a
              href="https://maps.app.goo.gl/Y91ruvwpFkt7DguQ7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 truncate hover:text-[#DFBA73] hover:underline transition-all cursor-pointer group"
              title={`Bấm để mở Google Maps chỉ đường:\n${firmInfo.headquarters}`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#DFBA73] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate underline-offset-2">
                {firmInfo.addressShort}
              </span>
            </a>

            <span className="text-white/20 select-none hidden md:inline">|</span>

            {/* Email */}
            <a
              href={`mailto:${firmInfo.email}`}
              className="hidden md:flex items-center gap-1.5 shrink-0 hover:text-[#DFBA73] hover:underline transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
              <span>{firmInfo.email}</span>
            </a>

            <span className="text-white/20 select-none hidden sm:inline">|</span>

            {/* Hotline */}
            <a
              href={`tel:${firmInfo.hotlineRaw}`}
              className="hidden sm:flex items-center gap-1.5 shrink-0 font-bold text-white hover:text-[#DFBA73] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
              <span>{firmInfo.phone}</span>
            </a>
          </div>

          {/* Bên phải: 4 Cờ ngôn ngữ (Đã bỏ kính lúp theo yêu cầu) */}
          <div className="flex items-center gap-1.5 shrink-0 ml-3">
            {/* Tiếng Anh */}
            <button
              type="button"
              data-flag="en"
              onClick={() => handleSelectLanguage("en")}
              className={`w-5 sm:w-6 h-3.5 sm:h-4 rounded-[2px] overflow-hidden border transition-all duration-200 cursor-pointer ${
                currentLang === "en"
                  ? "border-2 border-[#DFBA73] ring-2 ring-[#DFBA73]/50 scale-110 shadow-md opacity-100"
                  : "border-white/30 opacity-80 hover:opacity-100 hover:scale-105 shadow-xs"
              }`}
              title="English (Tiếng Anh)"
            >
              <FlagUK />
            </button>

            {/* Tiếng Nhật */}
            <button
              type="button"
              data-flag="ja"
              onClick={() => handleSelectLanguage("ja")}
              className={`w-5 sm:w-6 h-3.5 sm:h-4 rounded-[2px] overflow-hidden border transition-all duration-200 cursor-pointer ${
                currentLang === "ja"
                  ? "border-2 border-[#DFBA73] ring-2 ring-[#DFBA73]/50 scale-110 shadow-md opacity-100"
                  : "border-white/30 opacity-80 hover:opacity-100 hover:scale-105 shadow-xs"
              }`}
              title="日本語 (Tiếng Nhật)"
            >
              <FlagJapan />
            </button>

            {/* Tiếng Hàn */}
            <button
              type="button"
              data-flag="ko"
              onClick={() => handleSelectLanguage("ko")}
              className={`w-5 sm:w-6 h-3.5 sm:h-4 rounded-[2px] overflow-hidden border transition-all duration-200 cursor-pointer ${
                currentLang === "ko"
                  ? "border-2 border-[#DFBA73] ring-2 ring-[#DFBA73]/50 scale-110 shadow-md opacity-100"
                  : "border-white/30 opacity-80 hover:opacity-100 hover:scale-105 shadow-xs"
              }`}
              title="한국어 (Tiếng Hàn)"
            >
              <FlagKorea />
            </button>

            {/* Tiếng Việt */}
            <button
              type="button"
              data-flag="vi"
              onClick={() => handleSelectLanguage("vi")}
              className={`w-5 sm:w-6 h-3.5 sm:h-4 rounded-[2px] overflow-hidden border transition-all duration-200 cursor-pointer ${
                currentLang === "vi"
                  ? "border-2 border-[#DFBA73] ring-2 ring-[#DFBA73]/50 scale-110 shadow-md opacity-100"
                  : "border-white/30 opacity-80 hover:opacity-100 hover:scale-105 shadow-xs"
              }`}
              title="Tiếng Việt"
            >
              <FlagVietnam />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR (Thanh Menu chính nền trắng - CỐ ĐỊNH Ở ĐẦU TRANG KHI SCROLL) */}
      <header
        id="masthead"
        className={`w-full bg-white z-50 sticky top-0 transition-all duration-300 ${
          isSticky
            ? "shadow-[0_4px_25px_rgba(0,0,0,0.08)]"
            : "border-b border-slate-100"
        }`}
      >
        {/* Main Navbar Wrapper */}
        <div className={`transition-all duration-300 ${isSticky ? "py-2 sm:py-2.5" : "py-3 sm:py-4"}`}>
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
          {/* Official Logo Brand (Bấm vào sẽ tải lại trang) */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Công ty Luật TNHH Hải Minh Quân"
                width={56}
                height={56}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#1A1816] uppercase leading-tight group-hover:text-[#96794F] transition-colors">
                HẢI MINH QUÂN
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#96794F] uppercase">
                CÔNG TY LUẬT TNHH
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3">
            <Link
              href="/"
              onMouseEnter={() => {
                if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
                if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
                setServicesOpen(false);
                setAboutOpen(false);
              }}
              className={`px-3 py-2 font-serif text-[15px] border-b-2 transition-colors ${
                isHomeActive
                  ? "font-semibold text-[#96794F] border-[#96794F]"
                  : "font-medium text-[#1A1816] border-transparent hover:text-[#96794F]"
              }`}
            >
              Trang chủ
            </Link>

            {/* Dịch vụ Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <Link
                href="/#dich-vu"
                className={`flex items-center gap-1 px-3 py-1 font-serif text-[15px] border-b-2 transition-colors ${
                  isServicesActive
                    ? "font-semibold text-[#96794F] border-[#96794F]"
                    : "font-medium text-[#1A1816] border-transparent group-hover:text-[#96794F]"
                }`}
              >
                <span>Dịch vụ</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180 text-[#96794F]" : "group-hover:rotate-180 group-hover:text-[#96794F]"
                  } ${isServicesActive ? "text-[#96794F]" : ""}`}
                />
              </Link>

              {/* Dropdown Menu Container */}
              <div
                className={`absolute left-0 top-full pt-1.5 w-64 z-50 transition-all duration-200 ${
                  servicesOpen
                    ? "opacity-100 visible pointer-events-auto translate-y-0"
                    : "opacity-0 invisible pointer-events-none -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0"
                }`}
              >
                {/* Generous invisible hover bridge connecting trigger link to menu */}
                <div className="absolute -top-4 left-0 right-0 h-5 bg-transparent" />

                <div className="bg-white border border-slate-200 border-t-2 border-t-[#96794F] shadow-2xl py-2 rounded-none">
                  {allNavigationServices.map((item, idx) => {
                    const isItemActive = pathname === item.href;
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setServicesOpen(false)}
                        className={`block px-4 py-2 font-serif text-[13.5px] transition-colors border-b border-slate-100 last:border-b-0 ${
                          isItemActive
                            ? "text-[#96794F] font-bold bg-[#FAF6F0]"
                            : "text-[#333333] hover:text-[#96794F] hover:bg-slate-50"
                        }`}
                      >
                        {formatAmpersand(item.title)}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tin tức / Blog */}
            <Link
              href="/blog"
              onMouseEnter={() => {
                if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
                if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
                setServicesOpen(false);
                setAboutOpen(false);
              }}
              className={`px-3 py-2 font-serif text-[15px] border-b-2 transition-colors ${
                isBlogActive
                  ? "font-semibold text-[#96794F] border-[#96794F]"
                  : "font-medium text-[#1A1816] border-transparent hover:text-[#96794F]"
              }`}
            >
              Tin tức
            </Link>

            {/* Giới thiệu (Dropdown Thành viên) */}
            <div
              className="relative group py-2"
              onMouseEnter={handleAboutEnter}
              onMouseLeave={handleAboutLeave}
            >
              <Link
                href="/#gioi-thieu"
                className={`flex items-center gap-1 px-3 py-1 font-serif text-[15px] border-b-2 transition-colors ${
                  isAboutActive
                    ? "font-semibold text-[#96794F] border-[#96794F]"
                    : "font-medium text-[#1A1816] border-transparent group-hover:text-[#96794F]"
                }`}
              >
                <span>Giới thiệu</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    aboutOpen ? "rotate-180 text-[#96794F]" : "group-hover:rotate-180 group-hover:text-[#96794F]"
                  } ${isAboutActive ? "text-[#96794F]" : ""}`}
                />
              </Link>

              {/* Dropdown Menu Container */}
              <div
                className={`absolute left-0 top-full pt-1.5 w-48 z-50 transition-all duration-200 ${
                  aboutOpen
                    ? "opacity-100 visible pointer-events-auto translate-y-0"
                    : "opacity-0 invisible pointer-events-none -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0"
                }`}
              >
                {/* Generous invisible hover bridge connecting trigger link to menu */}
                <div className="absolute -top-4 left-0 right-0 h-5 bg-transparent" />

                <div className="bg-white border border-slate-200 border-t-2 border-t-[#96794F] shadow-2xl py-2 rounded-none">
                  <Link
                    href="/thanh-vien"
                    onClick={() => setAboutOpen(false)}
                    className={`block px-4 py-2 font-serif text-[13.5px] transition-colors ${
                      pathname.startsWith("/thanh-vien")
                        ? "text-[#96794F] font-bold bg-[#FAF6F0]"
                        : "text-[#333333] hover:text-[#96794F] hover:bg-slate-50"
                    }`}
                  >
                    Thành viên
                  </Link>
                </div>
              </div>
            </div>

            {/* Liên hệ */}
            <Link
              href="/lien-he"
              onMouseEnter={() => {
                if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
                if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
                setServicesOpen(false);
                setAboutOpen(false);
              }}
              className={`px-3 py-2 font-serif text-[15px] border-b-2 transition-colors ${
                isContactActive
                  ? "font-semibold text-[#96794F] border-[#96794F]"
                  : "font-medium text-[#1A1816] border-transparent hover:text-[#96794F]"
              }`}
            >
              Liên hệ
            </Link>
          </nav>

          {/* Right Header items: Search icon & Login Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (searchOpen) setSearchQuery("");
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#1A1816] hover:text-[#96794F] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={searchOpen ? "Đóng tìm kiếm" : "Mở tìm kiếm"}
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            <Link
              href="/admin/"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-95 text-[#14130F] text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#14130F]" />
              <span>Đăng nhập</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/admin/"
              className="p-2 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] text-[#14130F] shadow-sm hover:brightness-110 active:scale-95 transition-all"
              aria-label="Đăng nhập quản trị"
              title="Đăng nhập quản trị"
            >
              <LogIn className="w-4 h-4 text-[#14130F]" />
            </Link>
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (searchOpen) setSearchQuery("");
              }}
              className="p-2 text-[#1A1816] hover:text-[#96794F]"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href={`tel:${firmInfo.phoneRaw}`}
              className="p-2 rounded-full bg-[#96794F] hover:bg-[#82673E] text-white"
              aria-label="Gọi điện"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1A1816]"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Live Search Bar expandable with Instant Filter Dropdown */}
        {searchOpen && (
          <div className="pt-3 pb-3 border-t border-slate-100 mt-2 animate-in fade-in duration-150 relative">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                placeholder="Tìm dịch vụ, bài viết pháp luật, luật sư (ví dụ: doanh nghiệp, ly hôn, hợp đồng...)"
                className="w-full px-4 py-2.5 pl-10 pr-10 rounded-full border border-slate-300 text-sm focus:outline-none focus:border-[#96794F] text-[#1A1816] shadow-sm bg-slate-50 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-[#96794F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  aria-label="Xóa từ khóa"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Instant Search Results Dropdown */}
              {normalizedQuery && searchResults && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden z-[60] max-h-[460px] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                  {searchResults.totalCount === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-sm space-y-2">
                      <p>
                        Không tìm thấy kết quả phù hợp cho từ khóa <strong>&ldquo;{searchQuery}&rdquo;</strong>.
                      </p>
                      <p className="text-xs text-slate-400">
                        Cần tư vấn trực tiếp vụ việc? Gọi Hotline 24/7:{" "}
                        <a
                          href={`tel:${firmInfo.phoneRaw}`}
                          className="text-[#96794F] font-bold hover:underline"
                        >
                          {firmInfo.hotline}
                        </a>
                        {" - "}
                        <a
                          href={`tel:${firmInfo.secondaryPhoneRaw}`}
                          className="text-[#96794F] font-bold hover:underline"
                        >
                          {firmInfo.secondaryPhone}
                        </a>
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 space-y-4 text-left">
                      {/* Services Group */}
                      {searchResults.services.length > 0 && (
                        <div>
                          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#96794F] bg-[#FAF6F0] rounded flex items-center justify-between">
                            <span>Lĩnh vực & Dịch vụ ({searchResults.services.length})</span>
                          </div>
                          <div className="mt-1 divide-y divide-slate-100">
                            {searchResults.services.map((svc, idx) => (
                              <Link
                                key={idx}
                                href={svc.href}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setSearchQuery("");
                                }}
                                className="block px-3 py-2.5 hover:bg-slate-50 rounded transition-colors group cursor-pointer"
                              >
                                <span className="font-serif text-sm font-semibold text-[#1A1816] group-hover:text-[#96794F] block">
                                  {formatAmpersand(svc.title)}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Articles Group */}
                      {searchResults.articles.length > 0 && (
                        <div>
                          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1A1816] bg-slate-100 rounded flex items-center justify-between">
                            <span>Bài viết & Cẩm nang pháp lý ({searchResults.articles.length})</span>
                          </div>
                          <div className="mt-1 divide-y divide-slate-100">
                            {searchResults.articles.map((art, idx) => (
                              <Link
                                key={idx}
                                href={art.href || `/blog/${art.slug}/`}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setSearchQuery("");
                                }}
                                className="block px-3 py-2.5 hover:bg-slate-50 rounded transition-colors group cursor-pointer"
                              >
                                <span className="font-serif text-sm font-semibold text-[#1A1816] group-hover:text-[#96794F] block line-clamp-1">
                                  {formatAmpersand(art.title)}
                                </span>
                                {art.excerpt && (
                                  <span className="text-xs text-slate-500 block line-clamp-1 mt-0.5">
                                    {art.excerpt}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Attorneys Group */}
                      {searchResults.attorneys.length > 0 && (
                        <div>
                          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#96794F] bg-[#FAF6F0] rounded flex items-center justify-between">
                            <span>Luật sư & Chuyên gia ({searchResults.attorneys.length})</span>
                          </div>
                          <div className="mt-1 divide-y divide-slate-100">
                            {searchResults.attorneys.map((atty, idx) => (
                              <Link
                                key={idx}
                                href={atty.link || `/thanh-vien/${atty.id}/`}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setSearchQuery("");
                                }}
                                className="block px-3 py-2.5 hover:bg-slate-50 rounded transition-colors group cursor-pointer"
                              >
                                <span className="font-serif text-sm font-semibold text-[#1A1816] group-hover:text-[#96794F] block">
                                  {atty.name}
                                </span>
                                <span className="text-xs text-slate-500 block mt-0.5">
                                  {atty.role}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-2 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
          {/* Ngôn ngữ trên mobile */}
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Ngôn ngữ / Language:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-flag="en"
                onClick={() => handleSelectLanguage("en")}
                className={`w-6 h-4 rounded-[2px] overflow-hidden border cursor-pointer ${
                  currentLang === "en"
                    ? "border-2 border-[#0B132B] ring-2 ring-[#0B132B]/35 scale-110 shadow-md opacity-100"
                    : "border-slate-300 opacity-80 hover:opacity-100"
                }`}
                title="English"
              >
                <FlagUK />
              </button>
              <button
                type="button"
                data-flag="ja"
                onClick={() => handleSelectLanguage("ja")}
                className={`w-6 h-4 rounded-[2px] overflow-hidden border cursor-pointer ${
                  currentLang === "ja"
                    ? "border-2 border-[#0B132B] ring-2 ring-[#0B132B]/35 scale-110 shadow-md opacity-100"
                    : "border-slate-300 opacity-80 hover:opacity-100"
                }`}
                title="日本語"
              >
                <FlagJapan />
              </button>
              <button
                type="button"
                data-flag="ko"
                onClick={() => handleSelectLanguage("ko")}
                className={`w-6 h-4 rounded-[2px] overflow-hidden border cursor-pointer ${
                  currentLang === "ko"
                    ? "border-2 border-[#0B132B] ring-2 ring-[#0B132B]/35 scale-110 shadow-md opacity-100"
                    : "border-slate-300 opacity-80 hover:opacity-100"
                }`}
                title="한국어"
              >
                <FlagKorea />
              </button>
              <button
                type="button"
                data-flag="vi"
                onClick={() => handleSelectLanguage("vi")}
                className={`w-6 h-4 rounded-[2px] overflow-hidden border cursor-pointer ${
                  currentLang === "vi"
                    ? "border-2 border-[#0B132B] ring-2 ring-[#0B132B]/35 scale-110 shadow-md opacity-100"
                    : "border-slate-300 opacity-80 hover:opacity-100"
                }`}
                title="Tiếng Việt"
              >
                <FlagVietnam />
              </button>
            </div>
          </div>

          {/* Địa chỉ trên mobile (Link mở Google Maps) */}
          <a
            href="https://maps.app.goo.gl/Y91ruvwpFkt7DguQ7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 text-xs text-slate-600 hover:text-[#96794F] border-b border-slate-100"
          >
            <MapPin className="w-3.5 h-3.5 text-[#96794F] shrink-0" />
            <span className="truncate">{firmInfo.headquarters}</span>
          </a>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 font-serif text-[15px] border-b border-slate-100 ${
              isHomeActive ? "font-bold text-[#96794F]" : "font-semibold text-[#1A1816]"
            }`}
          >
            Trang chủ
          </Link>

          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`w-full flex items-center justify-between py-2 font-serif text-[15px] border-b border-slate-100 ${
                isServicesActive ? "font-bold text-[#96794F]" : "font-semibold text-[#1A1816]"
              }`}
            >
              <span>Dịch vụ</span>
              <ChevronDown className={`w-4 h-4 ${mobileServicesOpen ? "rotate-180" : ""} ${isServicesActive ? "text-[#96794F]" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 py-2 space-y-1.5 bg-slate-50">
                {allNavigationServices.map((item, idx) => {
                  const isItemActive = pathname === item.href;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-1 text-xs transition-colors ${
                        isItemActive
                          ? "text-[#96794F] font-bold"
                          : "text-slate-700 hover:text-[#96794F]"
                      }`}
                    >
                      • {formatAmpersand(item.title)}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 font-serif text-[15px] border-b border-slate-100 ${
              isBlogActive ? "font-bold text-[#96794F]" : "font-semibold text-[#1A1816]"
            }`}
          >
            Tin tức
          </Link>

          <div>
            <button
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              className={`w-full flex items-center justify-between py-2 font-serif text-[15px] border-b border-slate-100 ${
                isAboutActive ? "font-bold text-[#96794F]" : "font-semibold text-[#1A1816]"
              }`}
            >
              <span>Giới thiệu</span>
              <ChevronDown className={`w-4 h-4 ${mobileAboutOpen ? "rotate-180" : ""} ${isAboutActive ? "text-[#96794F]" : ""}`} />
            </button>
            {mobileAboutOpen && (
              <div className="pl-4 py-2 space-y-1.5 bg-slate-50">
                <Link
                  href="/thanh-vien"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-1 text-xs transition-colors ${
                    pathname.startsWith("/thanh-vien")
                      ? "text-[#96794F] font-bold"
                      : "text-slate-700 hover:text-[#96794F]"
                  }`}
                >
                  • Thành viên
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/lien-he"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 font-serif text-[15px] ${
              isContactActive ? "font-bold text-[#96794F]" : "font-semibold text-[#1A1816]"
            }`}
          >
            Liên hệ
          </Link>

          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/admin/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-95 text-[#14130F] text-xs font-bold uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#14130F]" />
              <span>Đăng nhập Quản trị</span>
            </Link>
          </div>
        </div>
      )}
      {/* Vị trí khởi tạo ẩn của Google Translate (không dùng display:none để widget mount thành công) */}
      <div
        id="google_translate_element"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      />
    </header>
    </>
  );
};
