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
} from "lucide-react";
import {
  allNavigationServices,
  firmInfo,
  usefulArticles,
  teamMembersList,
} from "@/data/mockData";
import { formatAmpersand } from "@/components/ui/Ampersand";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="masthead"
      className={`w-full bg-white z-50 transition-all duration-300 ${isSticky
          ? "fixed top-0 left-0 shadow-[0_2px_29px_rgba(34,34,34,0.14)] py-2.5"
          : "relative py-4 border-b border-slate-100"
        }`}
    >
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-2 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
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
    </header>
  );
};
